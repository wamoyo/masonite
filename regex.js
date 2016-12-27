var fs = require('fs')

fs.readFile('content/pages/home.html', 'utf-8', function (err, string) {
  var blocks = string.match(/block (\w+)\n+([\s\S]*?)(?=\s+\nblock|$)/g)
  var frags = {}
  blocks.forEach(function (block) {
    var name = block.match(/block (\w+)/)[1]
    var frag = block.match(/<[\w\W]+>/)[0]
    frags[name] = frag
  })
  console.log(JSON.stringify(frags, null, 2))
})
