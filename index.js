var tessel = require('tessel'),
    camera = require('camera-vc0706').use(tessel.port['D']),
    servolib = require('servo-pca9685'),
    execFile = require('child_process').execFile;

var servo = servolib.use(tessel.port['C']),
    servo1 = 1; // We have a servo plugged in at position 1

// Set this to the milliseconds you want between the setInterval function.
var snapShotDuration = 2000,
    counter = 0,
    pictureInterval;

// Wait for the camera module to say it's ready
camera.on('ready', function () {
    // Take the picture
    pictureInterval = setInterval(function() {
        snapShot();
    }, snapShotDuration);
});

camera.on('error', function (err) {
    console.error(err);
});

var snapShot = function () {
    // The function that goes in your interval. This is what makes the camera take the photo!
    camera.takePicture(function (err, image) {
        if (err) {
            console.log('error taking image', err);
        } else {
            var name = 'photo' + counter + '.jpg';
            console.log('Picture saving as', name, '...');
            process.sendfile(name, image);
            console.log('done.');
            counter = counter + 1;
        }
    });
};

servo.on('ready', function () {
    //  Target position of the servo between 0 (min) and 1 (max).
    var position = 0;
    var servoMove;

    servo.configure(servo1, 0.05, 0.12, function () {
        servoMove = setInterval(function () {
            // Write your callback function here. Take a look at the servo docs for ideas if you need help.

            console.log('Position: ', position);
            servo.move(servo1, position);
            position += 0.01;

            if(position > 1) {
                clearInterval(servoMove);
                clearInterval(pictureInterval);
                camera.disable();
                console.log('IMAGE COMPLETE');
            }
        }, 1000); // Every 1000 milliseconds
    });
});