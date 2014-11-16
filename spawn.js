var tessel = require('tessel'),
    spawn = require('child_process').spawn,
    wholeProgram = require('./apicall');

tessel.listDevices(function(err,devices) {
    if (!devices || devices.length == 0) {
        console.error("Couldn't find any Tessels");
    } else {
        console.log("tessel found");
        var child = spawn("tessel", ["run", "index.js", "--upload-dir", "images"]);
        child.stdout.on('data', function(data) {
            console.log(data.toString());
        });
        child.stderr.on('data', function(data) {
            console.log(data.toString());
        });
        child.on('close', function(data) {
            wholeProgram();
        });
    }
});