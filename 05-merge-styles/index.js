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
                  fs.readFile(__dirname + '/styles/' + item.name, (err, data) => {
                     arr.push(data.toString())
                  });
               }
            }
         }
         return resolve(arr)
      })
})

// let text = '';
//    for (const item of files) {
//       if (item.isFile() && path.extname(item.name) === '.css') {
//          fs.readFile(__dirname + '/styles/' + item.name, (err, data) => {
//             fs.writeFile(__dirname + '/project-dist/bundle.css', text + data, () => {
//                text = text + data
//             })
//          });
//       }
//    }

async function processArray() {

   let result = await promise;
   console.log(result)
   fs.writeFile(__dirname + '/project-dist/bundle.css', result.join(''), () => {
   })
}
processArray();
