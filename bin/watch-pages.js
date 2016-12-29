
/*
 * Watch content/pages/ and rebuild pages upon changes to page content.
 * Also watch layouts/ and rebuild pages upon changes to layouts.
 */

const watch = require('chokidar').watch
const exec = require('child_process').exec
const compilePage = require('./build-pages')

watch('content/pages/', {ignored: /(^|[\/\\])\../}) // One-liner for current directory, ignores .dotfiles
  .on('all', function (event, path) {
    console.log(event, path)
  })
  .on('addDir', function (path) {
    var destination = ' site' + path.match(/pages([\w\W]+)/)[1]
    var command = 'mkdir -p' + destination
    exec(command, function (error, stdout, stderr) {
      if (error || stderr) throw error || stderr // Trouble adding directory
      console.log('Created directory: site/', path)
    })
  })
  .on('unlinkDir', function (path) {
    var destination = ' site' + path.match(/pages([\w\W]+)/)[1]
    var command = 'rm -rf' + destination // Might be problematic because subsequent rm -rf operations will be executed on nonexisting files and directories.
    exec(command, function (error, stdout, stderr) {
      if (error || stderr) throw error || stderr // Trouble removing directory
      console.log('Removed directory: ', destination)
    })
  })
  .on('add', function (path) {
    var to = path.match(/pages\/(.*[\\\/])/) ? 'site/' + path.match(/pages\/(.*[\\\/])/)[1] : 'site/'
    var fileName = path.split('/').pop()
    console.log('Add ', fileName)
    exec('cp ' + path + ' ' + to + fileName, function (error, stdout, stderr) {
      if (error || stderr) throw error || stderr // Trouble copying file
      console.log('Copied file to: ', to)
      compilePage(fileName, to)
    })
  })
  .on('change', function (path) {
    var to = path.match(/pages\/(.*[\\\/])/) ? 'site/' + path.match(/pages\/(.*[\\\/])/)[1] : 'site/'
    var fileName = path.split('/').pop()
    console.log('Changed ', fileName)
    exec('cp ' + path + ' ' + to + fileName, function (error, stdout, stderr) {
      if (error || stderr) throw error || stderr // Trouble copying file
      console.log('Copied file to: ', to)
      compilePage(fileName, to)
    })
  })
  .on('unlink', function (path) {
    var destination = ' site' + path.match(/pages([\w\W]+)/)[1]
    var command = 'rm -rf' + ' ' + path + destination
    exec(command, function (error, stdout, stderr) {
      if (error || stderr) throw error || stderr // Trouble removing directory
      console.log('Removed file from: ', destination)
    })
  })
  .on('error', function (error) {
    throw error // Chokidar ( file watcher library ) had trouble
  })

