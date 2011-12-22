var fs = require('fs')
    , colors = require('colors');

var TaskNG = function(){};

var TASK_TEMPLATE = {
  tasks: []
  , p1End: 0
  , p2End: 0
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
      if (message.search(/:p1/i) >= 0){
        if (task.p1End >= 0) {
          task.p1End++;
          task.p2End++;
          task.tasks.splice(task.p1End, 0, message);
        } else {
          task.p1End = 0;
          task.p2End = 0;
          task.tasks.splice(task.p1End, 0, message);
        }
      } else {
        if (message.search(/:p2/i) >= 0){
          if (task.p2End >= 0) {
            task.p2End++;
            task.tasks.splice(task.p2End, 0, message);
          } else {
            task.p1End = 0;
            task.p2End = 0;
            task.tasks.splice(task.p2End, 0, message);
          }
        } else {
          task.tasks.push(message);
        }
      }
      fs.writeFile(process.env.HOME + "/.tasks", JSON.stringify(task), "utf-8", function(err){
        if (err) throw err;
      });
    }
  });
};

TaskNG.prototype.view = function(){
  fs.readFile(process.env.HOME + "/.tasks", "utf-8", function(err, data){
    if (err) {
      fs.open(process.env.HOME + "/.tasks", "w", function(err, fd){
        if (err) throw err;
        fs.write(fd, JSON.stringify(TASK_TEMPLATE), null, "utf-8", function(err, written, buffer) {
          if (err) throw err;
          fs.close(fd, function(err){ if (err) throw err;});
        });
     });
    } else {
      var task = JSON.parse(data);
      for (var i=0; i < task.tasks.length; i++){
        var txt = "#" + (i + 1) + " : " + task.tasks[i];
        if (task.tasks[i].search(/:P1/i) >= 0) {
          console.log(txt.red);
        }
        if (task.tasks[i].search(/:P2/i) >= 0) {
          console.log(txt.yellow);
        } else {
          console.log(txt);
        }
      } 
    }
  });
};

TaskNG.prototype.pop = function(index){
  fs.readFile(process.env.HOME + "/.tasks", "utf-8", function(err, data){
    if (err) throw err;
    var task = JSON.parse(data);
    if (task.tasks[index-1].search(/:p1/i) >= 0){
      task.p1End--;
      task.p2End--;
    }
    if (task.tasks[index-1].search(/:p2/i) >= 0){
      task.p2End--;
    }
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
