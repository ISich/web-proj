const fileContent = `1 ||| Lida ||| Ира
2 ||| YUNGBLUD ||| Abyss
3 ||| Toto ||| Africa
4 ||| Kai Angel ||| SLAYERR
5 ||| Слава КПСС ||| Остров`;

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
    var currentTrack = audioPlayer.src.split('/').pop(); // Извлекаем только имя файла

    if (!audioPlayer.paused && currentTrack === track.split('/').pop()) {
        stopMusic();
    } else {
        playMusic(track);
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

function getInfo(lineNumber) {
    const lines = fileContent.split('\n');
    if (lines.length < lineNumber)
        return "Без названия - неизвестен";
    for (const line0 of lines){
        let line = line0.split('|||');
        if (Number(line[0]) == lineNumber){
            return `${line[1]} - ${line[2]}`
        }
    }
    return "Без названия - неизвестен";
}

function showGameButton() {
    //НАДО ПОМЕНЯТЬ 2 ЧИСЛО НА КОЛВО ПЕСЕН
    const tracks = getElements(4, 5);
    const ans = getRandomInt(4);

    const track1 = tracks[0];
    const track2 = tracks[1];
    const track3 = tracks[2];
    const track4 = tracks[3];
    const track_ans = tracks[ans];
    
    let colors = ['red-background', 'red-background', 'red-background', 'red-background'];
    colors[ans] = "green-background";
    const color1 = colors[0];
    const color2 = colors[1];
    const color3 = colors[2];
    const color4 = colors[3];
    
    const info1 = getInfo(Number(track1));
    const info2 = getInfo(Number(track2));
    const info3 = getInfo(Number(track3));
    const info4 = getInfo(Number(track4));
    
    document.getElementById('buttonContainer').innerHTML = `
    <button onclick="toggleMusic('static/music/${track_ans}.mp3')">Play/Pause Track</button>
    
    <button class="image-button" onclick="toggleButtonBackground(this,'${color1}')">
    <img src="static/cover/${track1}.jpg" alt="Cover1" width="100px" height="100px">
    </button>
    
    <button class="image-button" onclick="toggleButtonBackground(this, '${color2}')">
    <img src="static/cover/${track2}.jpg" alt="Cover2" width="100px" height="100px">
    </button>
    
    <button class="image-button" onclick="toggleButtonBackground(this, '${color3}')">
    <img src="static/cover/${track3}.jpg" alt="Cover3" width="100px" height="100px">
    </button>
    
    <button class="image-button" onclick="toggleButtonBackground(this, '${color4}')">
    <img src="static/cover/${track4}.jpg" alt="Cover4" width="100px" height="100px">
    </button>
    
    <button onclick="showMenuButtons()">Go menu</button>
    
    `;
    document.getElementById('textContainer').innerHTML = `
    <p>${info1}</p>
    <p>${info2}</p>
    <p>${info3}</p>
    <p>${info4}</p>
    `;

    
}

function showMenuButtons() {
    stopMusic();
    document.getElementById('buttonContainer').innerHTML = `
        <button onclick="showGameButton()">Start button 1</button>
        <button onclick="showGameButton()">Start button 2</button>
        <button onclick="showGameButton()">Start button 3</button>
        <button onclick="showGameButton()">Start button 4</button>
        <button onclick="showGameButton()">Start button 5</button>
    `;
}


function toggleButtonBackground(button, colorClass) {
    //alert(colorClass);
    button.classList.toggle(colorClass, true);
}

window.onload = showMenuButtons;