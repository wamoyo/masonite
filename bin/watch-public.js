
/*
 * Watch public/ and rebuild it upon file changes.
 */

const watch = require('chokidar').watch
const exec = require('child_process').exec

watch('public/', {ignored: /(^|[\/\\])\../}) // One-liner for current directory, ignores .dotfiles
  .on('all', function (event, path) {
    console.log(event, path)
  })
  .on('addDir', function (path) {
    var destination = ' site' + path.match(/public([\w\W]+)/)[1]
    var command = 'mkdir -p' + destination
    exec(command, function (error, stdout, stderr) {
      if (error || stderr) throw error || stderr // Trouble adding directory
      console.log('Created directory: site/', path)
    })
  })
  .on('unlinkDir', function (path) {
    var destination = ' site' + path.match(/public([\w\W]+)/)[1]
    var command = 'rm -rf' + destination // Might be problematic because subsequent rm -rf operations will be executed on nonexisting files and directories.
    exec(command, function (error, stdout, stderr) {
      if (error || stderr) throw error || stderr // Trouble removing directory
      console.log('Removed directory: ', destination)
    })
  })
  .on('add', function (path) {
    var destination = ' site' + path.match(/public([\w\W]+)/)[1]
    var command = 'cp ' + path + destination
    exec(command, function (error, stdout, stderr) {
      if (error || stderr) throw error || stderr // Trouble removing directory
      console.log('Copied file to: ', destination)
    })
  })
  .on('change', function (path) {
    var destination = ' site' + path.match(/public([\w\W]+)/)[1]
    var command = 'cp ' + path + destination
    exec(command, function (error, stdout, stderr) {
      if (error || stderr) throw error || stderr // Trouble removing directory
      console.log('Saved file changes to: ', destination)
    })
  })
  .on('unlink', function (path) {
    var destination = ' site' + path.match(/public([\w\W]+)/)[1]
    var command = 'rm -rf' + ' ' + path + destination
    exec(command, function (error, stdout, stderr) {
      if (error || stderr) throw error || stderr // Trouble removing directory
      console.log('Removed file from: ', destination)
    })
  })
  .on('error', function (error) {
    throw error // Chokidar ( file watcher library ) had trouble
  })

