
/*
 * Compile CSS sheets with Stylus
 */

var fs = require('fs')
var exec = require('child_process').exec

fs.readdir('layout-styles/', 'utf-8', function (error, files) {
  if (error) throw error // Trouble reading files
  files.forEach(function (file) {
    checkIfFile(file)
  })
})

function checkIfFile (file) {
  fs.stat('layout-styles/' + file, function (error, stat) {
    if (error) throw error // Trouble identifying file
    if (stat.isFile() && !file.match(/^\./)) {
      compileCss(file)
    }
  })
}

function compileCss (file) {
  var command = 'stylus < layout-styles/' + file + ' > site/stylesheets/' + file.split('.')[0] + '.css -c'
  exec(command, function (error, stdout, stderr) {
    if (error || stderr) throw error || stderr // Trouble running stylus command
    return console.log("Compiled CSS " + file, stdout)
  })
}

