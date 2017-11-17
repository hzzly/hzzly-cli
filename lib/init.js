const program = require("commander");
const fs = require("fs-extra");
const path = require("path");
const moment = require("moment");
const chalk = require("chalk");

module.exports = function(dir) {
  // const name = path.join(
  //   process.cwd(),
  //   dir
  // );

  let tplDir = path.resolve(__dirname,'..','template');
  // fse.copySync(tplDir, path.resolve(dir));
  fs.copy(tplDir, path.resolve(dir), err => {
    if (err) return console.error(err)
  
    console.log();
    console.log(
      chalk.red(`init a blog: ${dir}`)
    );
    console.log();
    console.log(
      chalk.gray(
        `Now, initial blog has been created\n  To get started:\n\n  cd ${dir}\n\n you can create a new post by typing 'hzzly_r new <postName>' `
      )
    );
    console.log();
  });

  // fs.ensureDir(name, err => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log();
  //   console.log(
  //     chalk.red(`init a blog: ${dir}`)
  //   );
  //   console.log();
  //   console.log(
  //     chalk.gray(
  //       `Now, initial blog has been created\n  To get started:\n\n  cd ${dir}\n\n you can create a new post by typing 'hzzly_r new <postName>' `
  //     )
  //   );
  //   console.log();
  //   // dir has now been created, including the directory it is to be placed in
  // });
};
