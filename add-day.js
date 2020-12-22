// Usage:
// node add-day.js dayNumber puzzle-name
// npm run add dayNumber puzzle-name

const fs = require('fs');
const [day, name] = process.argv.slice(2);
const dir = __dirname + '/src/' + day;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
  console.log('Created directory: ', day);
};

[name + '.ts', 'data.ts', 'readme.md'].forEach(fileName => {
  fs.appendFile(dir + '/' + fileName, '', function (err) {
    if (err) throw err;
    console.log('Created: ', fileName);
  });
});

fs.appendFile(__dirname + '/test/' + name + '.test.ts', '', function (err) {
  if (err) throw err;
  console.log('Created: ', name + '.test.ts');
});