const fs = require("fs");
const { prompt } = require("inquirer");

let tplList = require(`${__dirname}/../templates/templates.json`);

const question = [
  {
    type: "input",
    name: "name",
    message: "要删除的模板：",
    validate(val) {
      if (tplList[val]) {
        return true;
      } else if (Object.is(val, "")) {
        return "名称不能为空！";
      } else if (!tplList[val]) {
        return "不存在此模板！";
      }
    }
  }
];

module.exports = prompt(question).then(({ name }) => {
  delete tplList[name];
  fs.writeFile(
    `${__dirname}/../templates/templates.json`,
    JSON.stringify(tplList),
    "utf-8",
    err => {
      if (err) {
        console.log(err);
      }
      console.log("模板删除成功！");
    }
  );
});
