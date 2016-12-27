
/*
 * Compile HTML pages of our site
 */

var fs = require('fs')

fs.readdir('content/pages/', 'utf-8', function (err, files) {
  if (err) throw Error('trouble reading files')
  files.forEach(function (file) {
    return compilePage(file.split('.')[0])
  })
})

function compilePage (file) {
  fs.readFile('content/pages/' + file + '.html', 'utf-8', function (err, string) {
    if (err) throw Error('file read error')
    var layout = string.match(/extends ([\w\S]+)/)[1]
    var blocks = string.match(/block (\w+)\n+([\s\S]*?)(?=\s+\nblock|$)/g)
    var frags = {}
    blocks.forEach(function (block) {
      var name = block.match(/block ([\w\S]+)/)[1]
      var frag = block.match(/<[\w\W]+>/)[0]
      frags[name] = frag
    })
    return getLayout(layout, frags)
  })

  function getLayout (layout, frags) {
    fs.readFile('layouts/' + layout + '.html', 'utf-8', function (err, layout) {
      if (err) throw Error('file read error')
      assemblePage(layout, frags)
    })
  }

  function assemblePage (layout, frags) {
    Object.keys(frags).forEach(function (frag) {
      layout = layout.replace(new RegExp('{{' + frag + '}}'), frags[frag] )
    })
    return writePage(layout)
  }

  function writePage (html) {
    fs.writeFile('_site/' + file + '.html', html, function (err) {
      if (err) throw Error('trouble writing HTML page')
      return console.log('Wrote ' + file + ' page')
    })
  }
}

