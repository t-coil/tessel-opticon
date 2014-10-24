var Twitter = require('node-twitter');

var twitterRestClient = new Twitter.RestClient(
  'Plt2Z3sk61MVZbmXtmEDllsWY',
  'ZeFZWJTSvKgKkMj7lz2Gd3Zb9eIY9fltuxgcJfaNs60iDM0JoK',
  '732958704-VUTQbbMnMGebm2WCnCqtUNNuvuxChtkDNg7afNke',
  'ZBlufgfsW4ABCTZ2oqjXMRgoZc2Ejq8ekyuzq6ClR8eVz'
);

twitterRestClient.statusesUpdateWithMedia(
    {
        'status': "WHY WON'T THIS WORK",
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
        }
    }
);