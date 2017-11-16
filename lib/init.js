// const fse = require("fs-extra");
// const path = require("path");
const program = require('commander');
const moment = require("moment");
const chalk = require('chalk')

module.exports = function(dir) {
  dir = dir || ".";

  // let tplDir = path.resolve(__dirname, "..", "tpl");
  // fse.copySync(tplDir, path.resolve(dir));
  // fse.ensureDirSync(path.resolve(dir, "source", "_extra"));
  console.log(chalk.red(`${dir}: ${moment().format('YYYY-MM-DD,HH:mm:ss')}`));
};
