const chalk = require("chalk");
const ora = require("ora");
const { prompt } = require("inquirer");
let tplList = require(`${__dirname}/../templates/templates.json`);
let { listTable } = require(`${__dirname}/../tools/utils.js`);

const question = [
  {
    type: "input",
    name: "name",
    message: "模板名称:",
    validate(val) {
      if (tplList[val]) {
        return true;
      } else if (Object.is(val, "")) {
        return "名称不能为空！";
      } else if (!tplList[val]) {
        return "这个模板不存在.";
      }
    }
  },
  {
    type: "input",
    name: "project",
    message: "项目名称:",
    validate(val) {
      if (!Object.is(val, "")) {
        return true;
      }
      return "项目名称是必需的！";
    }
  },
  {
    type: "input",
    name: "place",
    message: "初始化项目的Git URL:",
    default: "./"
  }
];

module.exports = prompt(question).then(({ name, project, place }) => {
  const gitPlace = tplList[name]["url"];
  const gitBranch = tplList[name]["branch"];
  const lyOra = ora("正在下载模板.....");

  lyOra.start();
  console.log(`${gitPlace}#${gitBranch} ${place}/${project}`);
  //console.log(chalk.green("新项目已成功初始化!"));
  listTable(tplList, "新项目已成功初始化!");
  lyOra.stop();
});
