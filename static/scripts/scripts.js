const fileContent = `1 | Lida | Ира | Интернет Герои
2 | YUNGBLUD | Abyss | Интернет Герои
3 | Lizer, Flash | False Mirror | Интернет Герои
4 | Kai Angel | SLAYERR | Интернет Герои
5 | Слава КПСС | Остров | Интернет Герои
6 | Skrillex | Bangarang | Электроника
7 | Marshmello | Alone | Электроника
8 | Magnetude | Broken | Электроника
9 | Kanine | Want You | Электронщина
10 | Apashe | Good News | Электронщина
11 | Subtronics | Scream Saver | Электронщина
12 | Apashe | Uebok[VIP] | Электронщина
13 | Marshmello | House Party | Электронщина
14 | Kanine | Higher | Электронщина
15 | REAPER | Runaway | Электронщина
16 | Subtronics | Griztronics II | Электронщина
17 | Ray Volpe | Laserbeam | Электронщина
18 | Subtronics | Gassed Up VIP | Электронщина
19 | Агата кристи | Черная луна | Рок
20 | Любэ | Возле твоей любви | Рок
21 | Гражданская оборона | Нечего терять | Рок
22 | Toto | Africa | Рок
23 | Beatles | Help | Рок
24 | Deftones | Be Quiet | Рок
25 | Король и шут | Камнем по голове | Рок,Поп Музыка
26 | Pink floyd | Another brick in wall | Рок
27 | Nirvana | Come as you are | Рок
28 | Ozzy Osbourne | Crazy train | Рок
29 | Animals | Dondt let ma be understood | Рок
30 | ssshhhiiittt!!! | Надежда | Рок
31 | Серега Пират, qeqoqeq | Зомби апокалипсис | Интернет Герои,Русский Рэп
32 | Серега Пират | АМ ФП | Интернет Герои,Русский Рэп
33 | CMH, mzlf | бейслайн бизнес | Интернет Герои,Русский Рэп
34 | DK, CMH | Мемы | Интернет Герои,Русский Рэп
35 | Ну вы поняли | Поняли | Интернет Герои
36 | Трофим | Город Сочи | Поп Музыка
37 | Руки вверх | Он тебя целует | Поп Музыка
38 | Anna Asti | Царица | Поп Музыка
39 | Комбинация | Не забывай | Поп Музыка
40 | Мираж | Музыка нас связала | Поп Музыка
41 | Игорь Корнелюк | Город которого нет | Поп Музыка
42 | Пошлая Молли | Супермаркет | Поп Музыка
43 | Дискатека авария | Пей пиво | Поп Музыка`;


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
        let line = line0.split(' | ');
        if (line[3].split(',').includes(genre)){
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
        let line = line0.split(' | ');
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