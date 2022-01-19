const gameboard = (function() {
    const currentBoard = ['','o','x','x','','x','o','','o'];
    return currentBoard
})();

            console.log(gameboard)

const player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    return {name, symbol}
}

const Jim = player('Jim', 'o')
const Keiren = player('Keiren', 'x')

            console.log(Keiren.name, Keiren.symbol)
            console.log(Jim.name, Jim.symbol)

const gameControl = () => {}

const createBoard = (function(){
    for (let i=0; i<9; i++){
        let square = document.createElement('div')
        square.id = 'square'
        let board = document.getElementById('board')
        board.appendChild(square)
        square.setAttribute('data-label', i)       
    }
})()

const populateArray = (function(){
    for (let i=0; i<9; i++){
    let board = document.getElementById('board')
    
    board.childNodes[i+1].textContent = gameboard[i]
    }
})()
