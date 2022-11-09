const fs = require('fs');
const path = require('path');
const { stdout } = process;

fs.access(__dirname + '/project-dist/bundle.css', (err) => {
   if (err) return
   else {
      fs.unlink(__dirname + '/project-dist/bundle.css', () => {})
      return
   }
})

var promise = new Promise(function (resolve, reject) {
   let arr = [];

   fs.readdir(__dirname + '/styles',
      { withFileTypes: true },
      (err, files) => {
         if (err)
            stdout.write(err);
         else {
            for (const item of files) {
               if (item.isFile() && path.extname(item.name) === '.css') {
                  const input = fs.createReadStream(__dirname + '/styles/' + item.name, 'utf-8');

                  let data = '';

                  input.on('data', chunk => data += chunk);
                  input.on('end', () => {
                     arr.push(data.toString())
                     if (arr.length > 0) {
                        fs.appendFile(__dirname + '/project-dist/bundle.css', arr[arr.length - 1], (err) => {
                           if (err) throw err;
                        });
                     }
                  });

               }

            }
         }
         process.on('exit', () => resolve(arr));
      })
})

async function processArray() {
   await promise;
}
processArray();
