var Twitter = require('node-twitter'),
    exec = require('child_process').exec;

var wholeProgram = function() {

  var twitterRestClient = new Twitter.RestClient(
    'Plt2Z3sk61MVZbmXtmEDllsWY',
    'ZeFZWJTSvKgKkMj7lz2Gd3Zb9eIY9fltuxgcJfaNs60iDM0JoK',
    '732958704-VUTQbbMnMGebm2WCnCqtUNNuvuxChtkDNg7afNke',
    'ZBlufgfsW4ABCTZ2oqjXMRgoZc2Ejq8ekyuzq6ClR8eVz'
  );

  var child = exec('convert -colors 32 -layers optimize-transparency -resize 50% images/*.jpg images/mygif.gif', function(error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }

      twitterRestClient.statusesUpdateWithMedia(
          {
              'status': 'Testing Tessel-Opticon!',
              'media[]': 'images/mygif.gif'
          },
          function(error, result) {
              if (error)
              {
                  console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
              }

              if (result)
              {
                  console.log(result);
                  var deleted = exec('rm -rf images/*', function(err, stdout, stderr) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("POST AND DELETE COMPLETED");
                    }
                  });
              }
          }
      );
  });

}

module.exports = wholeProgram;



