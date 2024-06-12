const fileContent = `
1 Lida Ира ИнтернетГерои
2 YUNGBLUD Abyss ИнтернетГерои
3 Toto Africa ИнтернетГерои
4 Kai_Angel SLAYERR ИнтернетГерои
5 Слава_КПСС Остров ИнтернетГерои`;


let track1 = '1';
let track2 = '1';
let track3 = '1';
let track4 = '1';
let track_ans = '1';
let cur = -1;
let solut = false;
let genre = '';

function playMusic() {
    if (!audioPlayer.paused) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    } else {
        audioPlayer.play();
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getElements(point){
    var res = [];
    var possible = [];
    var lines = fileContent.split('\n');
    for (const line0 of lines){
        let line = line0.split(' ');
        if (line[3] == genre){
            possible.push(line)
        }
    }
    if (point > possible.length){
        return [];
    }
    while (res.length != point){
        var val = possible[getRandomInt(possible.length)][0];
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
        let line = line0.split(' ');
        if (Number(line[0]) == lineNumber){
            return `${line[1]} - ${line[2]}`
        }
    }
    return "Без названия - неизвестен";
}


function updateCurrent(val){
    if(val == 1){
        cur = track1;
    }
    else if(val == 2){
        cur = track2;
    }
    else if(val == 3){
        cur = track3;
    }
    else if(val == 4){
        cur = track4;
    }

}

function paintGreen(buttons, button){
    buttons.forEach(btn => {
        const parentCell = btn.closest('.grid-item');
        if (parentCell) {
            parentCell.classList.remove('highlight_green');
        }
    });

    // Добавляем класс 'highlight-cell' к родительскому элементу нажатой кнопки
    const parentCell = button.closest('.grid-item');
    if (parentCell) {
        parentCell.classList.add('highlight_green');
    }
}

function paintRed(){
    if (cur == track1 && track_ans != track1){
        const parentCell = document.getElementById("cover1").closest('.grid-item');
        if (parentCell) {
            parentCell.classList.add('highlight_red');
        }
    }
    if (cur == track2 && track_ans != track2){
        const parentCell = document.getElementById("cover2").closest('.grid-item');
        if (parentCell) {
            parentCell.classList.add('highlight_red');
        }
    }
    if (cur == track3 && track_ans != track3){
        const parentCell = document.getElementById("cover3").closest('.grid-item');
        if (parentCell) {
            parentCell.classList.add('highlight_red');
        }
    }
    if (cur == track4 && track_ans != track4){
        const parentCell = document.getElementById("cover4").closest('.grid-item');
        if (parentCell) {
            parentCell.classList.add('highlight_red');
        }
    }

    if (track_ans == track1){
        const parentCell = document.getElementById("cover1").closest('.grid-item');
        if (parentCell) {
            parentCell.classList.add('highlight_green');
        }
    }
    if (track_ans == track2){
        const parentCell = document.getElementById("cover2").closest('.grid-item');
        if (parentCell) {
            parentCell.classList.add('highlight_green');
        }
    }
    if (track_ans == track3){
        const parentCell = document.getElementById("cover3").closest('.grid-item');
        if (parentCell) {
            parentCell.classList.add('highlight_green');
        }
    }
    if (track_ans == track4){
        const parentCell = document.getElementById("cover4").closest('.grid-item');
        if (parentCell) {
            parentCell.classList.add('highlight_green');
        }
    }

}

function update(){
    track1 = '1';
    track2 = '1';
    track3 = '1';
    track4 = '1';
    track_ans = '1';
    cur = -1;
    solut = false;
}

function reastartPage(){
    location.reload();
}

document.addEventListener('DOMContentLoaded', function () {
    update();
    genre = document.getElementById('style-title').innerText;
    const tracks = getElements(4);
    const ans = getRandomInt(4);
    track1 = tracks[0];
    track2 = tracks[1];
    track3 = tracks[2];
    track4 = tracks[3];
    track_ans = tracks[ans];
    document.getElementById('result').textContent = "Угадай ответ";

    document.getElementById('track1').textContent = getInfo(track1);
    //document.getElementById('track1').textContent = style_data['genre'];
    document.getElementById('track2').textContent = getInfo(track2);
    document.getElementById('track3').textContent = getInfo(track3);
    document.getElementById('track4').textContent = getInfo(track4);
    //document.getElementById('track_ans').textContent = "?????";
    //document.getElementById('track_cur').textContent = "____";

 
    document.getElementById("cover1").src = `../static/cover/${track1}.jpg`;
    document.getElementById("cover2").src = `../static/cover/${track2}.jpg`;
    document.getElementById("cover3").src = `../static/cover/${track3}.jpg`;
    document.getElementById("cover4").src = `../static/cover/${track4}.jpg`;

    document.getElementById("cover1").onerror = function() {
        this.src = '../static/cover/0.jpg'; // Путь к вашему стандартному изображению
    };
    document.getElementById("cover2").onerror = function() {
        this.src = '../static/cover/0.jpg'; // Путь к вашему стандартному изображению
    };
    document.getElementById("cover3").onerror = function() {
        this.src = '../static/cover/0.jpg'; // Путь к вашему стандартному изображению
    };
    document.getElementById("cover4").onerror = function() {
        this.src = '../static/cover/0.jpg'; // Путь к вашему стандартному изображению
    };
    //document.getElementById("cover_ans").src = `../static/cover/${track_ans}.jpg`;

    //document.getElementById("cover_cur").src = `../static/cover/0.jpg`;

    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = `../static/music/${track_ans}.mp3`;

    function checkSolution(){
        if(!solut && cur != -1){
            //document.getElementById('track_ans').textContent = getInfo(track_ans);
            paintRed();
            if (cur == track_ans){
                document.getElementById('result').textContent = "Ты крутой";
            }
            else{
                document.getElementById('result').textContent = "Ты чмо";
            }
            solut = true;
        }
    }

    document.getElementById('playMusic').addEventListener('click', playMusic);
    document.getElementById('solution').addEventListener('click', checkSolution);
    document.getElementById('restart').addEventListener('click', reastartPage);

    const buttons = document.querySelectorAll('.img-button');

    // Пройдемся по каждой кнопке и добавим обработчик событий
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // Получаем значение data-index и выводим его в консоль
            const index = button.getAttribute('data-index');
            
            if(!solut){
                paintGreen(buttons, button);
                updateCurrent(index);
            }
        });
    });
});