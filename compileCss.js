/* global require, module */
const sass = require('node-sass');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const moduleName = 'ui-input';

const inputFile = path.join(__dirname, 'app', 'styles', `${moduleName}.scss`);
const outputFile = path.join(__dirname, 'vendor', `${moduleName}`, `${moduleName}.css`);

const broccoliAlias = `/bootstrap-source`;
const physicalFilePath = path.join(__dirname, 'node_modules/bootstrap/scss');

// Compile main file
const result = sass.renderSync({
  file: inputFile,
  includePaths: ['app/styles', 'node_modules/bootstrap/scss'],
  importer: function(url) {
    const basename = path.basename(url);
    let directory = path.dirname(url);
    if (directory.indexOf(broccoliAlias) !== -1) {
      directory = directory.replace(broccoliAlias, physicalFilePath);
    }
    return { file: path.join(directory, basename) };
  }
});

fs.writeFileSync(outputFile, result.css);
console.log(chalk.bold.green('CSS:') + ` compiled statically to ${outputFile} prior to commit.`);
