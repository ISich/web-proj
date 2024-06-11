let track1 = '1';
let track2 = '1';
let track3 = '1';
let track4 = '1';
let track_ans = '1';

function playMusic(track) {
    var audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = track;
    audioPlayer.play();
}

function stopMusic() {
    var audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.pause();
    audioPlayer.currentTime = 0; // Сбросить время воспроизведения
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getElements(point, count){
    var res = [];
    while (res.length != point){
        var val = (getRandomInt(count) + 1).toString();
        if (!(res.includes(val))){
            res.push(val);
        }
    }
    return res
}

function toggleMusic(track) {
    var audioPlayer = document.getElementById('audioPlayer');
    var currentTrack = audioPlayer.src.split('/').pop(); // Извлекаем только имя файла

    if (!audioPlayer.paused && currentTrack === track.split('/').pop()) {
        stopMusic();
    } else {
        playMusic(track);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const tracks = getElements(4, 5);
    const ans = getRandomInt(4);
    track1 = tracks[0];
    track2 = tracks[1];
    track3 = tracks[2];
    track4 = tracks[3];
    track_ans = tracks[ans];
    
    document.getElementById('track1').textContent = track1;
    

    //const imgContainer = document.getElementById('cover1');
    //imgContainer.innerHTML = `<img src="../static/cover/4.jpg" alt="Случайное изображение" style="width: 300px; height: auto;">`;
    document.getElementById("cover1").src = `../static/cover/4.jpg`;
    alert(1);
});