#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const chalk = require("chalk");
const path = require("path");
const fs = require('fs-extra');
const boxen = require('boxen');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

const BOXEN_OPTS = {
  padding: 1,
  margin: 1,
  align: 'center',
  borderColor: '#678491',
  borderStyle: 'round'
};

if (process.argv.slice(2).join('') === '-v') {
  console.log(`hzzly-cli: ${pkg.version}`);
  return;
}

function init() {
  const messages = [];
  messages.push(
    `🔥  Welcome to use hzzly-cli ${chalk.grey(`v${pkg.version}`)}`
  );
  messages.push(
    chalk.grey('https://github.com/hzzly/hzzly-cli')
  );
  messages.push(
    chalk.grey('https://www.npmjs.com/package/hzzly-cli')
  )
  console.log(boxen(messages.join('\n'), BOXEN_OPTS));
  checkVersion()
}

/**
 * 检查版本信息
 */
function checkVersion() {
  console.log();
  console.log('🛠️  Checking your hzzly-cli version...');

  let checkResult = false;
  const notifier = updateNotifier({
    pkg,
    updateCheckInterval: 0
  });

  const update = notifier.update;
  if (update) {
    const messages = [];
    messages.push(`Update available ${chalk.grey(update.current)} → ${chalk.green(update.latest)}`)
    messages.push(`Run ${chalk.cyan(`npm i -g ${pkg.name}`)} to update`)
    console.log(boxen(messages.join('\n'), { ...BOXEN_OPTS, borderColor: '#fae191' }));
    console.log('🛠️  Finish checking your hzzly-cli. CAUTION ↑↑', '⚠️');
  }
  else {
    checkResult = true;
    console.log('🛠️  Finish checking your hzzly-cli. OK', chalk.green('✔'));
  }
  return checkResult;
}

function checkAppName(appName) {
  const to = path.resolve(appName);
  console.log(path.resolve(appName));
  console.log(fs.pathExistsSync(to));
  if (appName === '.') {
    checkEmpty(to)
  } else if (checkExist(to)) {
    inquirer.prompt([{
      type: 'confirm',
      message: 'Target directory exists. Continue?',
      name: 'ok',
    }]).then(answers => {
      if (answers.ok) {
        checkEmpty(to)
        // downloadAndGenerate('hzzly/webpack-template', tmp)
      }
    })
  } else {
    console.log('downloadAndGenerate')
  }
}

function checkExist(path) {
  return fs.pathExistsSync(path);
}

function checkEmpty(path) {
  const dirFiles = fs.readdirSync(path);
  if (dirFiles.length > 0) {
    inquirer.prompt([{
      type: 'confirm',
      name: 'ok',
      message: 'Target directory is not empty and will delete. Continue?',
    }]).then(answers => {
      if (answers.ok) {
        console.log('downloadAndGenerate')
        // downloadAndGenerate('hzzly/webpack-template', tmp)
      }
    })
  }
}

program
  .version(pkg.version)
  .usage('<command> [options] <app-name> [folder-name]')
  .option("-c, --clone", "use git clone")
  .on("--help", () => {
    console.log();
    console.log("Examples:");
    console.log();
    console.log(
      chalk.gray("  # create a new react project")
    );
    console.log("  $ hzzly create demo");
    console.log();
  });

program
  .command('setup')
  .description('run remote setup commands')
  .action(function () {
    console.log('setup');
  });

program
  .command('create')
  .description('generate a new project from a template')
  .action(function () {
    init();
    const appName = program.args[0];
    if (typeof appName === 'string') {
      checkAppName(appName);
    } else {
      const opts = [{
        type: 'input',
        name: 'appName',
        message: 'Please enter the app name for your project：',
        validate: appName => {
          if (!appName) {
            return '⚠️  app name must not be null！';
          }
          return true;
        }
      }];

      inquirer.prompt(opts).then(({ appName }) => {
        if (appName) {
          checkAppName(appName);
        }
      })
    }
  })

program
  .command('check')
  .description('check test')
  // .on('--help', printHelp)
  .action((checkname, option) => {
    // 获得了参数，可以在这里做响应的业务处理
    var prompList = [
      {
        type: 'input',
        message: '姓名',
        name: 'name'
      }, {
        type: 'input',
        message: '手机号',
        name: 'phone',
        validate: val => {
          if (val.match(/\d{11}/g)) {
            return true
          }
          return '请输入11位数字'
        }
      }, {
        type: 'confirm',
        message: '是否参加本次考核？',
        name: 'assess'
      }, {
        type: 'confirm',
        message: '是否同意本次考核须知？',
        name: 'notice',
        when: answers => {
          return answers.assess
        }
      }, {
        type: 'list',
        message: '欢迎来到本次考核，请选择学历：',
        name: 'eductionBg',
        choices: [
          "大专",
          "本科",
          "本科以上"
        ],
        filter: val => {//将选择的内容后面加学历
          return val + '学历'
        }
      }, {
        type: 'rawlist',
        message: '请选择你爱玩的游戏：',
        name: 'game',
        choices: [
          "LOL",
          "DOTA",
          "PUBG"
        ]
      }, {
        type: 'expand',
        message: '请选择你喜欢的水果：',
        name: 'fruit',
        choices: [
          {
            key: "a",
            name: "Apple",
            value: "apple"
          },
          {
            key: "O",
            name: "Orange",
            value: "orange"
          },
          {
            key: "p",
            name: "Pear",
            value: "pear"
          }
        ]
      }, {
        type: 'checkbox',
        message: '请选择你喜欢的颜色：',
        name: 'color',
        choices: [
          {
            name: "red"
          },
          new inquirer.Separator(), // 添加分隔符
          {
            name: "blur",
            checked: true // 默认选中
          },
          {
            name: "green"
          },
          new inquirer.Separator("--- 分隔符 ---"), // 自定义分隔符
          {
            name: "yellow"
          }
        ]
      }, {
        type: 'password',
        message: '请输入你的游戏密码：',
        name: 'pwd'
      }

    ]
    inquirer.prompt(prompList).then(answers => {
      console.log(answers);
    })
  })
program.parse(process.argv)
