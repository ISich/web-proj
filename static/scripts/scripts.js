const fileContent = `1 ||| Lida ||| Ира
2 ||| YUNGBLUD ||| Abyss
3 ||| Toto ||| Africa
4 ||| Kai Angel ||| SLAYERR
5 ||| Слава КПСС ||| Остров`;

let track1 = '1';
let track2 = '1';
let track3 = '1';
let track4 = '1';
let track_ans = '1';
let cur = -1;
let solut = false;


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


function updateCurrent(val){
    if(val == 1){
        cur = track1;
        document.getElementById("cover_cur").src = `../static/cover/${track1}.jpg`;
        document.getElementById('track_cur').textContent = getInfo(track1);
    }
    else if(val == 2){
        cur = track2;
        document.getElementById("cover_cur").src = `../static/cover/${track2}.jpg`;
        document.getElementById('track_cur').textContent = getInfo(track2);
    }
    else if(val == 3){
        cur = track3;
        document.getElementById("cover_cur").src = `../static/cover/${track3}.jpg`;
        document.getElementById('track_cur').textContent = getInfo(track3);
    }
    else if(val == 4){
        cur = track4;
        document.getElementById("cover_cur").src = `../static/cover/${track4}.jpg`;
        document.getElementById('track_cur').textContent = getInfo(track4);
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

document.addEventListener('DOMContentLoaded', function () {
    const tracks = getElements(4, 5);
    const ans = getRandomInt(4);
    track1 = tracks[0];
    track2 = tracks[1];
    track3 = tracks[2];
    track4 = tracks[3];
    track_ans = tracks[ans];

    document.getElementById('track1').textContent = getInfo(track1);
    document.getElementById('track2').textContent = getInfo(track2);
    document.getElementById('track3').textContent = getInfo(track3);
    document.getElementById('track4').textContent = getInfo(track4);
    document.getElementById('track_ans').textContent = "?????";

    document.getElementById('track_cur').textContent = "____";

 
    document.getElementById("cover1").src = `../static/cover/${track1}.jpg`;
    document.getElementById("cover2").src = `../static/cover/${track2}.jpg`;
    document.getElementById("cover3").src = `../static/cover/${track3}.jpg`;
    document.getElementById("cover4").src = `../static/cover/${track4}.jpg`;
    document.getElementById("cover_ans").src = `../static/cover/${track_ans}.jpg`;

    document.getElementById("cover_cur").src = `../static/cover/0.jpg`;

    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = `../static/music/${track_ans}.mp3`;

    // Функции управления аудиоплеером
    function playMusic() {
        if (!audioPlayer.paused) {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
        } else {
            audioPlayer.play();
        }
    }


    function checkSolution(){
        if(!solut){
            document.getElementById('track_ans').textContent = getInfo(track_ans);
            paintRed();
            solut = true;
            alert(track_ans==cur);
        }
    }

    document.getElementById('playMusic').addEventListener('click', playMusic);
    document.getElementById('solution').addEventListener('click', checkSolution);

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