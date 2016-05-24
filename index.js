// ------------------------------------
// #POSTHTML - EXPRESS
// ------------------------------------

var fs = require('fs')
var posthtml = require('posthtml')

module.exports = function (path, options, cb) {
  options.extend = options.extend || false

  var plugins

  if (!options.plugins && options.extend === false) {
    plugins = options.settings['view options'] || []
  } else if (options.extend === true) {
    plugins = options.plugins.concat(options.settings['view options'])
  } else {
    plugins = options.plugins || []
  }

  fs.readFile(path, function (err, content) {
    if (err) return cb(new Error(err))

    posthtml(plugins)
      .process(content.toString())
      .then((result) => {
        return cb(null, result.html)
      })
  })
}
