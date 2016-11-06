/* jshint node: true */
'use strict';
const path = require('path');
// const fs = require('fs');
// const chalk = require('chalk');
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
    target.import('vendor/ui-input/ui-input-flat.css');
    target.import('vendor/ui-input/ui-input-minimal.css');
    // if(!addonConfig.quiet) {
    //   const info = JSON.parse(fs.readFileSync('node_modules/ui-input/package.json'));
    //   this.ui.writeLine(`ui-input: using ${chalk.bold(info.version)}`);
    // }
  },

  treeForStyles: function(tree) {
    const bootstrapPath = path.join('node_modules', 'bootstrap/scss');
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
