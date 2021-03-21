var clapSound;
var boomSound;
var hihatSound;
var kickSound;
var channel1 = [];
appStart();
function appStart() {
    document.body.addEventListener('keypress', onKeyDown);
    var playChannel1 = document.querySelector('#playChannel1');
    playChannel1.addEventListener('click', onPlayChannel1);
    getAudioTags();
}
function onPlayChannel1() {
    channel1.forEach(function (sound) {
        setTimeout(function () { return playSound(sound.key); }, sound.time);
    });
}
function getAudioTags() {
    clapSound = document.querySelector('[data-sound="clap"]');
    boomSound = document.querySelector('[data-sound="boom"]');
    hihatSound = document.querySelector('[data-sound="hihat"]');
    kickSound = document.querySelector('[data-sound="kick"]');
}
function onKeyDown(ev) {
    var key = ev.key;
    var time = ev.timeStamp;
    channel1.push({ key: key, time: time });
    playSound(key);
    console.log(channel1);
}
function playSound(key) {
    switch (key) {
        case 'a':
            clapSound.currentTime = 0;
            clapSound.play();
            break;
        case 's':
            boomSound.currentTime = 0;
            boomSound.play();
            break;
        case 'k':
            hihatSound.currentTime = 0;
            hihatSound.play();
            break;
        case 'l':
            kickSound.currentTime = 0;
            kickSound.play();
            break;
    }
}
