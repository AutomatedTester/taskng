var fs = require('fs');

var TaskNG = function(){};

var TASK_TEMPLATE = {
  tasks: []
}

TaskNG.prototype.add = function(message){
  fs.readFile(process.env.HOME + "/.tasks", "utf-8", function(err, data){
    if (err){
      TASK_TEMPLATE.tasks.push(message);
      fs.open(process.env.HOME + "/.tasks", "a", function(err, fd){
        if (err) throw err;
        fs.write(fd, JSON.stringify(TASK_TEMPLATE), null, "utf-8", function(err, written, buffer) {
          if (err) throw err;
          fs.close(fd, function(err){ if (err) throw err;});
        });
     });
    } else {
      task = JSON.parse(data);
      task.tasks.push(message);
      fs.writeFile(process.env.HOME + "/.tasks", JSON.stringify(task), "utf-8", function(err){
        if (err) throw err;
      });
    }
  });
};

TaskNG.prototype.view = function(){
  fs.readFile(process.env.HOME + "/.tasks", "utf-8", function(err, data){
    if (err) throw err;
    var task = JSON.parse(data);
    for (var i=0; i < task.tasks.length; i++){
      console.log("#" + (i + 1) + " : " + task.tasks[i]);
    } 
  });
};

TaskNG.prototype.pop = function(index){
  fs.readFile(process.env.HOME + "/.tasks", "utf-8", function(err, data){
    if (err) throw err;
    var task = JSON.parse(data);
    task.tasks.remove(index);
    fs.writeFile(process.env.HOME + "/.tasks", JSON.stringify(task), "utf-8", function(err){
        if (err) throw err;
    });
  });
}

// Based on http://ejohn.org/blog/javascript-array-remove/ 
Array.prototype.remove = function(index) {
  index -= 1;
  var rest = this.slice(index + 1 || this.length);
  this.length = index < 0 ? this.length + index: index;
  return this.push.apply(this, rest);
};

exports.TaskNG = TaskNG;
