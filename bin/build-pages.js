
/*
 * Compile HTML pages of our site
 */

const fs = require('fs')

fs.readdir('content/pages/', 'utf-8', function (error, files) {
  if (error) throw error // Trouble reading files
  files.forEach(function (file) {
    !file.match(/^\./) && compilePage(file.split('.')[0])
  })
})

function compilePage (file) {
  fs.readFile('content/pages/' + file + '.html', 'utf-8', function (error, string) {
    if (error) throw error // File compile error
    var layout = string.match(/extends ([\w\S]+)/)[1]
    var blocks = string.match(/block (\w+)\n+([\s\S]*?)(?=\s+\nblock|$)/g)
    var frags = {}
    blocks.forEach(function (block) {
      var name = block.match(/block ([\w\S]+)/)[1]
      var frag = block.match(/<[\w\W]+>/)[0]
      frags[name] = frag
    })
    getLayout(layout, frags)
  })

  function getLayout (layout, frags) {
    fs.readFile('layouts/' + layout + '.html', 'utf-8', function (error, layout) {
      if (error) throw error // File read error
      assemblePage(layout, frags)
    })
  }

  function assemblePage (layout, frags) {
    Object.keys(frags).forEach(function (frag) {
      layout = layout.replace(new RegExp('{{' + frag + '}}'), frags[frag] )
    })
    writePage(layout)
  }

  function writePage (html) {
    fs.writeFile('site/' + file + '.html', html, function (error) {
      if (error) throw error // Trouble writing HTML page
      console.log('Wrote ' + file + ' page')
    })
  }
}

