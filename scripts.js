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
    const ans = getRandomInt(4);

    const track_ans = tracks[0];
    const track1 = tracks[1];
    const track2 = tracks[2];
    const track3 = tracks[3];
    //const track1 = (getRandomInt(4) + 1).toString();
    document.getElementById('buttonContainer').innerHTML = `
        <button onclick="toggleMusic('music/${track_ans}.mp3')">Play/Pause Track 1</button>

        <button class="image-button" onclick="toggleButtonBackground(this, 'green-background')">
        <img src="cover/${track_ans}.jpg" alt="Play Music" width="100px" height="100px">
        </button>

        <button class="image-button" onclick="toggleButtonBackground(this, 'red-background')">
        <img src="cover/${track1}.jpg" alt="Play Music" width="100px" height="100px">
        </button>

        <button class="image-button" onclick="toggleButtonBackground(this, 'red-background')">
        <img src="cover/${track2}.jpg" alt="Play Music" width="100px" height="100px">
        </button>

        <button class="image-button" onclick="toggleButtonBackground(this, 'red-background')">
        <img src="cover/${track3}.jpg" alt="Play Music" width="100px" height="100px">
        </button>

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


function toggleButtonBackground(button, colorClass) {
    button.classList.toggle(colorClass);
}

window.onload = showMultipleButtons;