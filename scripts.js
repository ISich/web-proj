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

function toggleMusic(track) {
    var audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer.paused || audioPlayer.src !== track) {
        playMusic(track);
    } else {
        stopMusic();
    }
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

function showSingleButton() {
    const tracks = getElements(4, 5);
    for(const r of tracks) {
        console.log(r);
    }
    const track1 = tracks[0];
    //const track1 = (getRandomInt(4) + 1).toString();
    document.getElementById('buttonContainer').innerHTML = `
        <button onclick="toggleMusic('music/${track1}.mp3')">Play/Pause Track 1</button>
        <button onclick="makeRed(this)">Choose botton 1</button>
        <button onclick="makeGreen(this)">Choose button 2</button>
        <button onclick="makeRed(this)">Choose button 3</button>
        <button onclick="showMultipleButtons()">Go menu</button>
        <img src="cover/0.jpg" width="100" height="100" />
    `;
}

function showMultipleButtons() {
    document.getElementById('buttonContainer').innerHTML = `
        <button onclick="showSingleButton()">Start button 1</button>
        <button onclick="showSingleButton()">Start button 2</button>
        <button onclick="showSingleButton()">Start button 3</button>
        <button onclick="showSingleButton()">Start button 4</button>
        <button onclick="showSingleButton()">Start button 5</button>
    `;
}

function makeRed(button) {
    button.classList.add('red-button');
}

function makeGreen(button) {
    button.classList.add('green-button');
}

window.onload = showMultipleButtons;