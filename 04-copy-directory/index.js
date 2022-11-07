const fs = require('fs');
const path = require('path');
const { stdout } = process;

fs.mkdir(path.join(__dirname, 'files-copy'), err => {
   fs.readdir(__dirname + '/files',
      { withFileTypes: true },
      (err, files) => {
         if (err)
            stdout.write(err);
         else {
            files.forEach(file => {
               if (file.isFile()) {
                  fs.readFile(__dirname + '/files/' + file.name, (err, data) => {
                     fs.writeFile(__dirname + '/files-copy/' + file.name, data, () => {
                        fs.mkdir(path.join(__dirname, 'files-copy'), err => {
                        });
                     })
                  });
               }
            })
         }
      })
});
fs.readdir(__dirname + '/files-copy',
   { withFileTypes: true },
   (err, filescopy) => {
      if (err)
         stdout.write(err);
      else {
         filescopy.forEach(file => {
            if (file.isFile()) {
               fs.readFile(__dirname + '/files-copy/' + file.name, (err, data) => {
                  fs.access(__dirname + '/files/' + file.name, fs.F_OK, (err) => {
                     if (err) {
                        fs.unlink(__dirname + '/files-copy/' + file.name, () => {})
                        return
                     }
                  })
               });
            }
         })
      }
   })