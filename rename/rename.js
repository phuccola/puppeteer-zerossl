const fs = require('fs');

// Rename
fs.readdirSync( __dirname)
  .filter(filename => filename.includes('.txt'))
  .forEach(filename => {
  if (filename.includes('validate_') && filename.includes('_txt')) {
    const validateRegex = /.*validate_/g;
    const newFilename = filename.replace(validateRegex, '').replace('_txt', '')
    fs.renameSync(filename, newFilename, function(err) {
      if ( err ) console.log('ERROR: ' + err);
    });
  }
});

// Remove first line
fs.readdirSync( __dirname)
  .filter(filename => filename.includes('.txt'))
  .forEach(filename => {
  fs.readFile(filename, 'utf8', function(err, data) {
    const lines = data.split('\n')
    if (lines[0].includes('URL')) {
      const newContent = data.split('\n').slice(1).join('\n');
      fs.writeFile(filename, newContent, function(err, data) {
        if (err) {console.log(err)
      }});
    }
  });
});

