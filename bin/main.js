#!/usr/bin/env node

var TaskNG = require(__dirname + "/../lib/taskng").TaskNG
  , nomnom = require("nomnom");

var options = nomnom.options({
      note: {
        position: 0,
        help: "message that you want to store" 
      }
      , pop: {
        abbr: 'p'
        , help: "removes an item from your task list"
      }
      , version: {
        flag: true
        , abbr: 'v'
        , help: "writes the version to the screen"
      }
    }).parse();


var taskng = new TaskNG();
if (options._.length != 0) {
 taskng.add(options._.join(' '));
} 
if (options._.length === 0 && !options.pop && !options.version){ 
  taskng.view();
}

if (options.pop){
  taskng.pop(options.pop);
}

if (options.version){
  console.log("TaskNG Version 0.1.0");
}
