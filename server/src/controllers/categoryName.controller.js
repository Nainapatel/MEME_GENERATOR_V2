var categoryNameModel = require("../../src/models/categoryName.model");
let categoryNamecontroller = {};
var fs = require("fs");
var path = require("path");
const fse = require("fs-extra");
var dir = require("node-dir");

const directoryPath = path.join(__dirname, "../../public/images");

// Fetch category wise names
categoryNamecontroller.getCategoryName = function(req, res) {
  fs.readdir(directoryPath, function(err, data) {
  
    let responseData = data.map((singleCategory) => { return({ name: singleCategory }) });

    console.log("items==========================",data );
    console.log("err", err);
    return res
      .status(200)
      .json({ message: "Show name of category", result: { category: responseData } });
  });
};

categoryNamecontroller.getStickers = function(req, res) {
  var name = req.params.name;
  const FolderName = path.join(__dirname, "../../public/images/" + name);
  console.log("name====================", req.params.name);
  dir.readFiles(
    FolderName,
    function(err, content, next) {
      if (err) throw err;
      next();
    },
    function(err, files) {
      if (err) throw err;
      console.log("finished reading files:", files);

      return res
        .status(200)
        .json({ message: "Show stickers ", result: { stickers: files } });
    }
  );
};

categoryNamecontroller.readDir = function(req, res) {
  fs.readdir(pathname, function(err, data) {
    console.log("path name------------",pathname)
    console.log("----------------name",data)
  
    let responseData = data.map((singleCategory) => { return({ name: singleCategory }) });

    console.log("items==========================",data );
    console.log("err", err);
    return res
      .status(200)
      .json({ message: "Show name of category", result: { category: responseData } });
  });
};

module.exports = categoryNamecontroller;
