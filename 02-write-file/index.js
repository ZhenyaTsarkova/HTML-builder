const { stdin, stdout } = process;
const fs = require('fs');
let text = '';
fs.writeFile('./02-write-file/text.txt', '', () => {
});
stdout.write("Привет! Введи любой текст:\n");
stdin.on('data', data => {
   fs.writeFile('./02-write-file/text.txt', text + data, () => {
      text = text + data;
   });

   if (data.includes('exit')) {
      process.exit();
   }
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('Пока!'));