const chalk = require("chalk");
const ora = require("ora");
const { prompt } = require("inquirer");
const download = require("download-git-repo");
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
    name: "url",
    message: "初始化项目的Git URL:",
    default: "./"
  }
];

module.exports = prompt(question).then(({ name, project, url }) => {
  const gitPlace = tplList[name]["url"];
  const gitBranch = tplList[name]["branch"];
  const lyOra = ora("正在下载模板.....\n\n");
  let gitUrl = `direct:${gitPlace}#${gitBranch}`;
  let path = `${url}${project}`;
  lyOra.start();
  download(gitUrl, path, { clone: true }, err => {
    if (err) {
      console.log(chalk.red("Error"));
      process.exit();
    }
    lyOra.stop();
    listTable(tplList, "新项目已成功初始化!");
  });
});
