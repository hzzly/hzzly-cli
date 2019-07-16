#!/usr/bin/env node

// Commander是一个轻量级，富有表现力，以及用于强大的命令行框架的node.js

// 指定从PATH环境变量中来查找node解释器的位置，因此只要环境变量中存在，该脚本即可执行

const program = require('commander');
const inquirer = require('inquirer');
const chalk = require("chalk");
const pkg = require('../package.json');
const CliUtil = require('../lib/util.js');
const util = new CliUtil(program);

if (process.argv.slice(2).join('') === '-v') {
  console.log(`hzzly-cli: ${pkg.version}`);
  return;
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
    util.initializing(pkg);
    const appName = program.args[0];
    if (typeof appName === 'string') {
      util.checkAppName(appName);
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
          util.checkAppName(appName);
        }
      })
    }
  })

program
  .command('check')
  .description('check test')
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

/**
 * error on unknown commands
 */
program.on('command:*', function () {
  console.error('Invalid command: %s\n', program.args.join(' '));
  program.help();
  process.exit(1);
});

function help() {
  program.parse(process.argv);  // 解析
  if (program.args.length < 1) return program.help();
}
help();
