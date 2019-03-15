const fs = require("fs");
const { prompt } = require("inquirer");

let tplList = require(`${__dirname}/../templates/templates.json`);

const question = [
  {
    type: "input",
    name: "tplName",
    message: "设置模板的名称: ",
    validate(val) {
      if (tplList[val]) {
        return "模板已经存在！";
      } else if (Object.is(val, "")) {
        return "模板名称能为空！";
      } else {
        return true;
      }
    }
  },
  {
    type: "input",
    name: "gitUrl",
    message: "模板的 git https 链接: ",
    validate(val) {
      if (!Object.is(val, "")) {
        return true;
      }
      return "链接不能为空！";
    }
  },
  {
    type: "input",
    name: "Branch",
    message: "模板的分支: ",
    default: "master"
  }
];

/**
 * 信息写入模板文件 templates.json
 *
 * tplName, gitUrl, Branch 分别是 question 中对象的 name 属性值
 */
const resultInfo = prompt(question).then(({ tplName, gitUrl, Branch }) => {
  tplList[tplName] = {};
  tplList[tplName]["url"] = gitUrl.replace(/[\u0000-\u0019]/g, ""); // 过滤unicode字符;
  tplList[tplName]["branch"] = Branch;

  fs.writeFile(
    `${__dirname}/../templates/templates.json`,
    JSON.stringify(tplList, null, 2),
    "utf-8",
    err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("已成功添加新模板!");
    }
  );
});

module.exports = resultInfo;
