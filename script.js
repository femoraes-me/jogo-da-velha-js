// ***** Dados Iniciais *****//
// quadro inicial do jogo
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: '',
};

let player = ''; // varivel para saber de quem é a vez
let warning = ''; // variavel de mensagem
let playing = false; // variavel de controle do andamento do jogo

reset();

// ***** EVENTOS ***** //
// Evento de Click para reset
document.querySelector('.reset').addEventListener('click', reset);

// Evento para click nos quadrados //
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

// ***** FUNÇÕES ***** //
// função para clique no item
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if(playing && square[item] === '') {
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
}

// função de reset do jogo
function reset() {
    warning = '';

    let random = Math.floor(Math.random() * 2);

    player = (random === 0) ? 'X' : 'O'

    for(let i in square) {
        square[i] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();
}

// função para renderizar tabuleiro
function renderSquare() {
    for(let i in square) {
        let item = document.querySelector(`div [data-item='${i}']`);
        item.innerHTML = square[i];
    }

    checkGame();
}

// função para renderizar painel de informações
function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

// função para alterar os jogadores
function togglePlayer() {
    player = (player === 'X') ? 'O' : 'X';
    renderInfo();
}

// função para checar se jogo acabou
function checkGame() {
    if(checkWinnerFor('X')) {
        warning = 'Jogador X venceu!'
        playing = false;
    } else if (checkWinnerFor('O')) {
        warning = 'Jogador O venceu!'
        playing = false;
    } else if (checkTied()) {
        warning = 'Empate!'
        playing = false;
    }
}

function checkWinnerFor(player) {
    let pos = [
        //possibilidade horizontais
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',
        //possibilidades verticais
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',
        //possibilidades transversais
        'a1,b2,c3',
        'a3,b2,c1'        
    ];

    for(let i in pos) {
        let posArray = pos[i].split(','); // array com as 3 posições para vitoria
        let won = posArray.every( option => square[option] === player );
        if (won) { return true}
    }

    return false;
}

function checkTied() {
    for(let i in square) {
        if(square[i] === '') {
            return false;
        }
    }

    return true;
}