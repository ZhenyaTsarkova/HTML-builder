const fs = require('fs');
const path = require('path');
const { stdout } = process;



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
                  input.on('end', () => arr.push(data.toString()));
               }
            }
         }
         process.on('exit', () => resolve(arr));
      })
})

async function processArray() {

   let result = await promise;
   const input = result.join('');
   fs.writeFile(__dirname + '/project-dist/bundle.css', input, () => {});
   

}
processArray();
