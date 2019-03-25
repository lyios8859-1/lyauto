const fs = require("fs");
const { prompt } = require("inquirer");

let tplList = require(`${__dirname}/../templates/templates.json`);
let { listTable } = require(`${__dirname}/../tools/utils.js`);

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
    JSON.stringify(tplList, null, 2),
    "utf-8",
    err => {
      if (err) {
        console.error("Error: ", err);
        return;
      }
      //console.log("模板删除成功！");
      listTable(tplList, "模板删除成功！");
    }
  );
});
