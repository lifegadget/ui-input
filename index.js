/* jshint node: true */
'use strict';

module.exports = {
  name: 'ui-input',
  description: 'Input controls for ambitious Ember applications',
  included: function(app) {
    this._super.included(app);
    const o = Object.assign(
      { fa: false, animate: false, quiet: false, animateOperation: 'override' },
      app.options['ui-input']
    );
    // component CSS
    app.import('vendor/ui-input/ui-input.css');
    app.import('vendor/ui-input/ui-input-bootstrap.css'); // only adds what is missing
    app.import('vendor/ui-input/ui-input-flat.css');

    // animations
    const defaultAnimations = [
      'attention_seekers/bounce.css',
      'attention_seekers/flash.css',
      'attention_seekers/pulse.css',
      'attention_seekers/rubberBand.css',
      'attention_seekers/shake.css',
      'attention_seekers/swing.css',
      'attention_seekers/tada.css',
      'attention_seekers/wobble.css'
    ];
    // specific to this addon
    app.import('vendor/ui-icon/ui-icon.css');
    let faMessage = 'font-awesome not referenced explicitly';
    if(o.fa) {
      // font-awesome
      faMessage = 'fa fonts/css added';
      app.import('bower_components/fontawesome/css/font-awesome.css', {overwrite: true});
      app.import('bower_components/fontawesome/fonts/fontawesome-webfont.eot',{destDir: 'fonts', overwrite: true});
      app.import('bower_components/fontawesome/fonts/fontawesome-webfont.svg',{destDir: 'fonts', overwrite: true});
      app.import('bower_components/fontawesome/fonts/fontawesome-webfont.ttf',{destDir: 'fonts', overwrite: true});
      app.import('bower_components/fontawesome/fonts/fontawesome-webfont.woff',{destDir: 'fonts', overwrite: true});
      app.import('bower_components/fontawesome/fonts/fontawesome-webfont.woff2',{destDir: 'fonts', overwrite: true});
      app.import('bower_components/fontawesome/fonts/FontAwesome.otf',{destDir: 'fonts', overwrite: true});
    }
    let animations = [];
    let animateRoot = 'bower_components/animate.css/source/';
    let animateMessage = 'no animations loaded';
    if(o.animate) {
      // annimate.css
      app.import(animateRoot + '_base.css');

      if(o.animate === 'default') {
        animations = defaultAnimations;
        animateMessage = 'default animations loaded';
      } else {
        if(o.animateOperation === 'append' ) {
          animateMessage = 'adding configured animations to default';
          animations = o.animate.concat(defaultAnimations);
        } else {
          animateMessage = 'replace default animations with configured';
          animations = o.animate;
        }
      }

      animations.forEach(function(cssFile) {
        if(cssFile.slice(0,1) === '/' ) {
          cssFile = 'app/ui-icon/' + cssFile;
        } else {
          cssFile = animateRoot + cssFile;
        }
        app.import(cssFile);
      });
    }
    if(!o.quiet) {
      console.log('ui-input:%s, %s', faMessage, animateMessage);
    }

  }
};
