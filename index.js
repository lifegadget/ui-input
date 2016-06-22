/* jshint node: true */
'use strict';

module.exports = {
  name: 'ui-input',
  description: 'Input controls for ambitious Ember applications',
  included: function(app, parentAddon) {
    const target = (parentAddon || app);
    this._super.included(app);
    const o = Object.assign(
      { fa: false, animate: false, quiet: false, animateOperation: 'override' },
      app.options['ui-input']
    );
    // component CSS
    target.import('vendor/ui-input/ui-input.css');
    target.import('vendor/ui-input/ui-input-bootstrap.css'); // only adds what is missing
    target.import('vendor/ui-input/ui-input-flat.css');
    target.import('vendor/ui-input/ui-input-minimal.css');

    // specific to this addon
    target.import('vendor/ui-icon/ui-icon.css');
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
      target.import(animateRoot + '_base.css');

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
      this.ui.writeLine('ui-input:%s, %s', faMessage, animateMessage);
    }

  }
};
