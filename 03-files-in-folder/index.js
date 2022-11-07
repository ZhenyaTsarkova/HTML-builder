const fs = require('fs');
const path = require('path');
const { stdout } = process;
fs.readdir(__dirname + '/secret-folder',
   { withFileTypes: true },
   (err, files) => {
      stdout.write("Содержимое папки secret-folder:");
      if (err)
         stdout.write(err);
      else {
         files.forEach(file => {
            if (file.isFile()) {
               let pa = __dirname + "\\secret-folder\\" + file.name;
               fs.stat(pa, function (err, stats) {
                  stdout.write(file.name.slice(0, file.name.indexOf('.')) + '   ' + path.extname(file.name) + '   ' + stats.size / 1000 + 'kb\n');
               });
            }
         })
      }
   })