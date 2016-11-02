var fs = require('fs-extra')

// TODO minify before copy
var dependencies = [
    // [<source_path>, <destination_path>]
    ['node_modules/card/dist/card.js', 'www/js/card.js']
];

dependencies.forEach(function(value) {
    fs.copy(value[0], value[1]);
});