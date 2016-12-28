
/*
 * Run `stylus --watch` on stylus files.
 */

const spawn = require('child_process').spawn

var layoutStyles = spawn('stylus', ['-w', 'layout-styles/', '-o', 'site/stylesheets/', '-c'])

layoutStyles.stdout.on('data', function (buffer) {
  console.log(buffer.toString())
})
layoutStyles.stderr.on('data', function (error) {
  console.log(error.toString())
})
layoutStyles.on('close', function (code) {
  console.log('Close with code ', code)
})

var contentStyles = spawn('stylus', ['-w', 'layout-styles/', '-o', 'site/stylesheets/', '-c'])

contentStyles.stdout.on('data', function (buffer) {
  console.log(buffer.toString())
})
contentStyles.stderr.on('data', function (error) {
  console.log(error.toString())
})
contentStyles.on('close', function (code) {
  console.log('Close with code ', code)
})


