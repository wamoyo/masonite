
/*
 * Compile CSS sheets with Stylus
 */

var fs = require('fs')
var exec = require('child_process').exec

fs.readdir('layout-styles/', 'utf-8', function (error, files) {
  if (error) throw Error('Trouble reading files')
  files.forEach(function (file) {
    checkIfFile(file)
  })
})

function checkIfFile (file) {
  fs.stat('layout-styles/' + file, function (error, stat) {
    if (error) throw Error('Trouble identifying file')
    if (stat.isFile()) {
      compileCss(file)
    }
  })
}

function compileCss (file) {
  var command = 'stylus < layout-styles/' + file + ' > _site/stylesheets/' + file.split('.')[0] + '.css -c'
  exec(command, (error, stdout, stderr) => {
    if (error) throw Error('Error running stylus command')
    return console.log(`${stdout}` || `${stderr}`)
  })
}

