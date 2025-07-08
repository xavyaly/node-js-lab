const fs = require('fs');

//write to file
fs.writeFile('example.txt', 'Hello from node js', (err) => {
    if (err) throw err;
    console.log('File created!');

//Read from file 
fs.readFile('example.txt', 'utf8', (err, data) => {
    if(err) throw err;
    console.log('File content:', data);
    });
});