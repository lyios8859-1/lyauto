const Table = require("cli-table3");
const chalk = require("chalk");

const table = new Table({
  head: ["模板名称", "仓库地址/git", "分支"],
  style: {
    head: ["green"]
  }
});

function listTable(tplList, lyric) {
  const list = Object.keys(tplList);
  if (list.length) {
    list.forEach(key => {
      table.push([key, tplList[key]["url"], tplList[key]["branch"]]);
      if (Object.is(table.length, list.length)) {
        console.log(table.toString());
        if (lyric) {
          console.log(chalk.green(`\u2714 ${lyric}`));
        }
        process.exit();
      }
    });
  } else {
    console.log(table.toString());
    if (lyric) {
      console.log(chalk.green(`\u2714 ${lyric}`));
    }
    process.exit();
  }
}

exports.listTable = listTable;
