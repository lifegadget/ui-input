/* jshint node: true */
'use strict';
const path = require('path');
const info = require('package-info');
const chalk = require('chalk');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ui-input',
  description: 'Input controls for ambitious Ember applications',
  included: function(app, parentAddon) {
    const target = (parentAddon || app);
    this._super.included(app);
    var options = typeof app.options === 'object' ? app.options : {};
    var addonConfig = options['ui-input'] || {};
    // component CSS
    target.import('vendor/ui-input/ui-input.css');
    target.import('vendor/ui-input/ui-input-bootstrap.css'); // only adds what is missing
    target.import('vendor/ui-input/ui-input-flat.css');
    target.import('vendor/ui-input/ui-input-minimal.css');

    if(!addonConfig.quiet) {
      this.ui.writeLine(`ui-input: using ${chalk.bold(info.version)}`);
    }

  },

  treeForStyles: function(tree) {
    const bootstrapPath = path.join(__dirname, 'node_modules', 'bootstrap/scss');
    const trees = [];
    if(tree) {
      trees.push(tree);
    }
    const existingStyle = this._super.treeForStyles.apply(this, arguments);
    const bootstrap = new Funnel(bootstrapPath, {
      srcDir: '/',
      destDir: '/bootstrap-source'
    });
    trees.push(bootstrap);
    if (existingStyle) {
      trees.push(existingStyle);
    }

    return mergeTrees(trees);
  },

};
