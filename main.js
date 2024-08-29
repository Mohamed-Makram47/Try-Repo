let turn = 'x';
let gamepaused = false;

let x = document.querySelector('.sx');
let o = document.querySelector('.so');

let score = [0,0]

if (localStorage.getItem('score')) {
    score = JSON.parse(localStorage.getItem('score'));
    x.innerHTML = score[0];
    o.innerHTML = score[1];
} else {
    localStorage.setItem('score', JSON.stringify(score));
}


let winlist = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
];

let squares = document.querySelectorAll('.square');

let reset = document.querySelector('.reset');
reset.addEventListener('click', () => {
    x.innerHTML = '0';
    o.innerHTML = '0';
    score[0] = 0
    score[1] = 0
    localStorage.removeItem('score');
    resetsquares(); 
});

function draw() {
    squares.forEach(square => {
        square.classList.remove('hover-x', 'hover-o');
        square.classList.add('draw');
    });
}

function resetsquares() {
    squares.forEach(square => {
        square.innerHTML = '';
        square.classList.remove('green', 'draw');
    });
    gamepaused = false;
    winnerFound = false;
}

let winnerFound = false;
function checkwinner() {

    winlist.forEach(rcd => {
        let box1 = document.getElementById(`box${rcd[0]}`);
        let box2 = document.getElementById(`box${rcd[1]}`);
        let box3 = document.getElementById(`box${rcd[2]}`);

        function green() {
            box1.classList.add('green');
            box2.classList.add('green');
            box3.classList.add('green');
        }

        if (box1.innerHTML === box2.innerHTML && box2.innerHTML === box3.innerHTML && box1.innerHTML !== '' && !winnerFound) {
            winnerFound = true;
            if (box1.innerHTML === 'X') {
                gamepaused = true;
                green();
                score[0] += 1; 
                x.innerHTML = score[0];
                localStorage.setItem('score', JSON.stringify(score));
                setTimeout(resetsquares, 1000);
            } 
            else if (box1.innerHTML === 'O') {
                gamepaused = true;
                green();
                score[1] += 1; 
                o.innerHTML = score[1];
                localStorage.setItem('score', JSON.stringify(score));
                setTimeout(resetsquares, 1000);
            }
        }
    });

    if (!winnerFound) {
        let allFilled = Array.from(squares).every(square => square.innerHTML !== '');
        if (allFilled) {
            gamepaused = true;
            draw();
            setTimeout(resetsquares, 1000);
        }
    }
}

function game(event) {   
    if (gamepaused) return; 
    let box = event.target;
    if (turn === 'x' && box.innerHTML === '') {
        box.innerHTML = 'X';
        turn = 'o';
        checkwinner();
    } 
    else if (turn === 'o' && box.innerHTML === '') {
        box.innerHTML = 'O';
        turn = 'x';
        checkwinner();
    }
}

function handleHover(event) {
    if (gamepaused) return; 
    let box = event.target;
    if (box.innerHTML === '') {
        if (turn === 'x') {
            box.classList.add('hover-x');
        } else {
            box.classList.add('hover-o');
        }
    }
}

function handleHoverOut(event) {
    let box = event.target;
    box.classList.remove('hover-x', 'hover-o');
}

squares.forEach(square => {
    square.addEventListener('mouseover', handleHover);
    square.addEventListener('mouseout', handleHoverOut);
    square.addEventListener('click', game);
});

