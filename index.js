var path = require('path');
var fs = require('fs');

// helper.write = function(data,filename){
//   if(typeof data !== "string") data = JSON.stringify(data);
//   var file = path.join(__dirname, 'output', filename);
//   fs.writeFileSync(file, data);
// };

fs.writeFile(path.join(__dirname, '/tests/') + "test", "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
