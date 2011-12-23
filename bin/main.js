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
      , edit: {
        abbr: 'e'
        , help: "edits the task in your list" 
      }
      , show: {
        abbr: 's'
        , help: "show this specific label. To add a label just put : before label. E.g. :foobar"
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
if (options._.length === 0 && !options.pop && !options.version && !options.edit && !options.show){ 
  taskng.view();
}

if (options.edit){
  taskng.edit(options.edit, options._.join(' '));
}

if (options.pop){
  taskng.pop(options.pop);
}

if (options.show){
  taskng.show(options.show);
}

if (options.version){
  console.log("TaskNG Version 0.2.0");
}
