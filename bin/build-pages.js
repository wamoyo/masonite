
/*
 * Compile HTML pages of our site
 */

const fs = require('fs')
const exec = require('child_process').exec

const site = 'site'

// First Copy everything inside of content/pages/ into site/
exec('cp -R content/pages/. site/', function (error, stdout, stderr) {
  if (error || stderr) throw error || stderr // Trouble copying content/pages/ into site/
  console.log('Copied content/pages/ into site/')
  readDir(site) // Then read through /site
})

function readDir (dir) {
  fs.readdir(dir, 'utf-8', function (error, files) {
    if (error) throw error // Trouble reading files in readDir()
    files.forEach(function (name) {
      checkFile(name, dir)
    })
  })
}

function checkFile (name, from) {
  fs.lstat(from + '/' + name, function (error, stats) {
    if (error) throw error // Troubling checking file stats
    if (stats.isDirectory() && !name.match(/(^|[\/\\])\../)) readDir(from + '/' + name) // Anything that's a directory, pass back through the read function.
    if (stats.isFile() && !name.match(/(^|[\/\\])\../) && name.match(/\.html$/)) compilePage(name, from + '/') // Anything that's an .html file, compile.
  })
}

function compilePage (file, to) {
  console.log('Getting ', file, to)
  fs.readFile(to + file, 'utf-8', function (error, string) {
    if (error) throw error // File compile error
    if (string.match(/extends ([\w\S]+)/)) {
      var layout = string.match(/extends ([\w\S]+)/)[1]
      var blocks = string.match(/block (\w+)\n+([\s\S]*?)(?=\s+\nblock|$)/g)
      var frags = {}
      blocks.forEach(function (block) {
        var name = block.match(/block ([\w\S]+)/)[1]
        var frag = block.match(/<[\w\W]+>/)[0]
        frags[name] = frag
      })
      getLayout(layout, frags, to)
    }
  })

  function getLayout (layout, frags, to) {
    fs.readFile('layouts/' + layout + '.html', 'utf-8', function (error, layout) {
      if (error) throw error // File read error
      assemblePage(layout, frags, to)
    })
  }

  function assemblePage (layout, frags, to) {
    Object.keys(frags).forEach(function (frag) {
      layout = layout.replace(new RegExp('{{' + frag + '}}'), frags[frag] )
    })
    console.log(to)
    writePage(layout, to)
  }

  function writePage (html, to) {
    fs.writeFile(to + file, html, function (error) {
      if (error) throw error // Trouble writing HTML page
      console.log('Compiled ' + file + ' page')
    })
  }
}

module.exports = compilePage

