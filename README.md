## TaskNG
This is a simple tool for keeping track of tasks using the command line. It has a very small and doesn't get in the way.

## How to install
To install you need to do

```
npm install taskng -g

```

## How to use
TaskNG installs into with 2 binary names. `t` or `tng` so that you can access it really quickly. Running the binary will
print out all of the items that are currently in your list.

### Usage

```
usage: node main.js <note> [options]

note     message that you want to store

options:
   -p, --pop   removes an item from your task list

```

#### `t` or `tng`
prints the contents of your tasks

#### `t i <3 Jaffa cakes`or `tng i <3 Jaffa cakes`
This will store the item in the task list

#### `t -p 2` or `tng -p 2`
This will remove the 2nd item in the list. The number from the list starts at 1.

## Documentation
A nicer set of documents is available [here](http://automatedtester.github.com/taskng)
