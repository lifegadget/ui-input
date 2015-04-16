/*jshint unused:false*/
import Ember from 'ember';

var SharedSecurity = Ember.Mixin.create({
    
    passwordSecurity: null,
    _securityNumberOfCores: 16, // used to quantify how long to hack a password
    
    // RULE LIBRARY
    // ----------------
    _securityRulesLibrary: [
        // Length Requirement
        [ 
            'lengthRequirement', 
            {
                events: ['focusOut'],
                rule: function(context, eventType, event) {
                    let limit = context.length;
                    let result = false;
                    let valueLength = this.get('value').length;
                    let keyCode = event.keyCode;
                    let controlKeys = context.get('_KEYBOARD.controlKeys');
                    // anticipate incoming keystroke effect on length
                    if (Ember.A([46,8]).contains(keyCode)) {
                        valueLength = valueLength - 1; // backspace, delete key
                    } else if (!controlKeys.contains(keyCode)) {
                        valueLength = valueLength + 1; // non control character adds to length
                    }

                    if(limit && valueLength > limit) {
                        result = {
                            event: true,
                            animate: true,
                            sound: true,
                        };
                        if(!controlKeys.contains(keyCode)) {
                            result.cancel = true;
                        }
                    }
                    return result;
                } // end rule()
            } 
        ],
        // Secure Password
        // > keeps the "passwordSecurity" field up-to-date, no visual/auditory 
        // > updates by default
        [ 
            'securePassword', 
            {
                events: ['focusOut','keyDown'],
                rule: function(context, eventType, event) {
                    let result = false;
                    let password = context.get('value');
                    let cores = context.get('_securityNumberOfCores');
                    // The strengthMeter code was adopted from: http://jsfiddle.net/fh9FP/12/
                    // unfortunately direct attribution wasn't possible as the author never made reference to themselves
                    let strengthMeter = function(password,cpuCores = 16) {
                        // init character classes
                        let numEx = /\d/;
                        let lcEx = /[a-z]/;
                        let ucEx = /[A-Z]/;
                        let syEx = /\W/;
                        // let meterMult = 1;
                        let character_set_size = 0;
    
                        // loop over each char of the password and check it per regexes above.
                        // weight numbers, upper case and lowercase at .75, 1 and .25 respectively.
                        if (numEx.test(password)) {
                            character_set_size += 10;
                        }
                        if (ucEx.test(password)) {
                            character_set_size += 26;
                        }
                        if (lcEx.test(password)) {
                            character_set_size += 26;
                        }
                        if (syEx.test(password)) {
                            character_set_size += 32;
                        }

                        // assume that 100% is a meterMult of maxMulti
                        let strength = Math.pow(character_set_size, password.length);
                        // make numbers more human readable
                        // thanks http://stackoverflow.com/questions/2901102/how-to-print-number-with-commas-as-thousands-separators-in-javascript
                        let numberWithCommas = x => {
                            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        };
                        // convert seconds to a description that is human friendly
                        // thanks http://stackoverflow.com/questions/8211744/convert-milliseconds-or-seconds-into-human-readable-form
                        let secondsToStr = seconds => {
                            // TIP: to find current time in milliseconds, use:
                            // var milliseconds_now = new Date().getTime();
                            seconds = Math.round(seconds);
                            var numyears = Math.floor(seconds / 31536000);
                            if(numyears){
                                return numberWithCommas(numyears) + ' year' + ((numyears > 1) ? 's' : '');
                            }
                            var numdays = Math.floor((seconds % 31536000) / 86400);
                            if(numdays){
                                return numdays + ' day' + ((numdays > 1) ? 's' : '');
                            }
                            var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
                            if(numhours){
                                return numhours + ' hour' + ((numhours > 1) ? 's' : '');
                            }
                            var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
                            if(numminutes){
                                return numminutes + ' minute' + ((numminutes > 1) ? 's' : '');
                            }
                            var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
                            if(numseconds){
                                return numseconds + ' second' + ((numseconds > 1) ? 's' : '');
                            }
                            return 'less then a second'; //'just now' //or other string you like;
                        };
        
                        // thanks http://stackoverflow.com/questions/1685680/how-to-avoid-scientific-notation-for-large-numbers-in-javascript
                        let toFixed = x => {
                            let e;
                            if (Math.abs(x) < 1.0) {
                                e = parseInt(x.toString().split('e-')[1]);
                                if (e) {
                                    x *= Math.pow(10,e-1);
                                    x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
                                }
                            } else {
                                e = parseInt(x.toString().split('+')[1]);
                                if (e > 20) {
                                    e -= 20;
                                    x /= Math.pow(10,e);
                                    x += (new Array(e+1)).join('0');
                                }
                            }
                            return x;
                        };

                        // init crackers at hashes/second
                        // all numbers from slowest computer here http://hashcat.net/oclhashcat-plus/
                        let rateMd5 = 1333000000; 
                        let rateSHA1 = 433000000;
                        let rateMd5crypt = 855000;
                        let rateBcrypt = 604;
        
                        // thresholds
                        let thresholds = new Map([
                            ['very-weak', 5.0e8],
                            ['weak', 5.0e14],
                            ['moderate', 5.0e16],
                            ['strong', 5.0e22],
                            ['very-strong', null]
                        ]);
        
                        let relativeStrength = x => {
                            if (password === null || password === '') {
                                return '';
                            }
                            else if(x < thresholds.get('very-weak')) {
                                return 'very weak';
                            }
                            else if(x < thresholds.get('weak') ) {
                                return 'weak';
                            } else if(x < thresholds.get('moderate')) {
                                return 'moderate';
                            } else if(x < thresholds.get('strong')) {
                                return 'strong';
                            } else {
                                return 'very strong';
                            }
                        };
                        // boolean on strong/not strong password (based on # of possibilities)
                        let isStrong = x => {
                            return x < thresholds.get('strong') ? false : true;
                        };
                        return {
                            strength: relativeStrength(strength),
                            isStrong: isStrong(strength),
                            possibilities: numberWithCommas(strength),
                            md5: secondsToStr(toFixed(strength/(rateMd5*cpuCores))),
                            SHA1: secondsToStr(toFixed(strength/(rateSHA1*cpuCores))),
                            Md5crypt: secondsToStr(toFixed(strength/(rateMd5crypt*cpuCores))),
                            Bcrypt: secondsToStr(toFixed(strength/(rateBcrypt*cpuCores)))
                        };
                    };
                    let strength = strengthMeter(password,cores);
                    context.set('passwordSecurity', strength);

                    return result;                      
                } // end rule()
            } 
        ]
    ],    
    
});


SharedSecurity[Ember.NAME_KEY] = 'Security Support';
export default SharedSecurity; 
