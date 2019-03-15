const path = require("path");
const {
  mkdirsSync,
  startReadFileContents,
  writeFiles,
  fileDisplay
} = require("./fileUtils.js");

const arrFile = fileDisplay("../local_template");
const reg = RegExp("\\\\", "g");

// 修改该值即可生成新的项目
let myProjecName = "app";

arrFile.forEach(v => {
  let originPath = v.replace(reg, "/"); // ../local_template/bulid/README.md
  let filePath = originPath.replace("local_template", myProjecName); // ../src/build/README.md
  let uri = filePath.substring(0, filePath.lastIndexOf("/")); // ../src/build
  // let fileName = originPath.substring(originPath.lastIndexOf("/")+1, originPath.length); // README.md

  // 开始读文件
  startReadFileContents(originPath)
    .then(data => {
      // 创建目录
      mkdirsSync(uri);
      // 替换内容
      //let cons = fileContentsReplace(data, "console", "替换后的内容");

      // 写文件
      writeFiles(filePath, data);
    })
    .catch(err => {
      console.error("Error: ", err);
    });
});
