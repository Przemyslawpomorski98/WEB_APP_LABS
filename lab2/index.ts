let clapSound: HTMLAudioElement;
let boomSound: HTMLAudioElement;
let hihatSound: HTMLAudioElement;
let kickSound: HTMLAudioElement;

const channel1: any[] = [];
appStart();

function appStart(): void {
    document.body.addEventListener('keypress', onKeyDown);
    const playChannel1 = document.querySelector('#playChannel1');
    playChannel1.addEventListener('click', onPlayChannel1)
    getAudioTags();
}

function onPlayChannel1(): void  {
    channel1.forEach(sound => {
        setTimeout(() => playSound(sound.key), sound.time)
    })
}

function getAudioTags() {
    clapSound = document.querySelector('[data-sound="clap"]');
    boomSound = document.querySelector('[data-sound="boom"]');
    hihatSound = document.querySelector('[data-sound="hihat"]');
    kickSound = document.querySelector('[data-sound="kick"]');
}

function onKeyDown(ev: KeyboardEvent): void {
    const key = ev.key;
    const time = ev.timeStamp;
    channel1.push({key, time});
    playSound(key);
    console.log(channel1);
}

function playSound(key: string) {
    switch(key){
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

