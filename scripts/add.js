const inquirer = require("inquirer");
const path = require("path");
const fs = require('fs')
const fse = require("fs-extra");
const rm = require('rimraf')
const Logger = require("./logger");
const chalk = require("chalk");
async function add() {
  const answer = await inquirer.prompt([
    {
      name: "add",
      message: "Where to add?",
      default: "project-" + new Date().valueOf().toString(),
    },
  ]);
  const target = path.resolve(answer.add);
  if(fs.existsSync(target)){
      const answer = await inquirer.prompt([
          {
              type:'confirm',
              name:'override',
              message: chalk.yellow(path.relative(process.cwd(),target))+' exists. Override?',
              default:false
          }
      ])
      if(!answer.override){
          Logger.line()
          Logger.info('Aborted. Nothing changed.')
          return
      }else{
          Logger.line()
          rm.sync(target)
          Logger.info('Clear folder')
      }

  }
  try {
    const source = path.resolve(__dirname, "../template");
    fs.mkdirSync(target, { recursive: true });
    fse.copySync(source, target);
  } catch (err) {
    Logger.error("Errored!");
    Logger.error(err);
  }
  Logger.info("New project at:", target);
}
add();
