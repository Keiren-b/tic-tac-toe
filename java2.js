

var events = {
    events: {},
    on: function (eventName, fn) {
      this.events[eventName] = this.events[eventName] || [];
      this.events[eventName].push(fn);
    },
    off: function(eventName, fn) {
      if (this.events[eventName]) {
        for (var i = 0; i < this.events[eventName].length; i++) {
          if (this.events[eventName][i] === fn) {
            this.events[eventName].splice(i, 1);
            break;
          }
        };
      }
    },
    emit: function (eventName, data) {
      if (this.events[eventName]) {
        this.events[eventName].forEach(function(fn) {
          fn(data);
        });
      }
    }
  };
//********************************************************************* */
const myGame = {
    Gameboard: ['','','','','','','','',''],
    playerTurn: ''
}
//********************************************************************* */
// function initialTurn(){
//     //radomly selects who should go first
    
//         myGame.playerTurn = Math.round(Math.random())
        
//         // this.updateProgress()
        
//     }
// initialTurn();

function whoseTurn(input){

    if (myGame.playerTurn===''){
        myGame.playerTurn = Math.round(Math.random())
        console.log(myGame.playerTurn)
    }
       else if (myGame.playerTurn===0){
        myGame.playerTurn=1
        console.log(myGame.playerTurn)
    }
    else if (myGame.playerTurn===1) 
    {myGame.playerTurn=0
    console.log(myGame.playerTurn)}
    
    events.off('playBtn', whoseTurn)
};

//********************************************************************* */
  square = document.querySelectorAll('.square')
  playBtn = playBtn = document.getElementById('playBtn')





  square.forEach(item =>{item.addEventListener('click', update)})
  playBtn.addEventListener('click', ()=>{events.emit('playBtn', '')})

  function update(e){
    // e.target.textContent=e.target.getAttribute('data-index')
    events.emit('squareClick', e.target.getAttribute('data-index'))
  }



  
      events.on('squareClick', markBoard)
      events.on('squareClick', pushArray)
      events.on('squareClick', whoseTurn)
      events.on('playBtn', whoseTurn)

  
  function markBoard(x){
      //an illegal move will prevent someone marking the same spot twice and will not change the player turn. This is acheived by setting the player turn to the opposite before calling whoseTurn() again.
      if (square[x].textContent=="X" || square[x].textContent=="O" && myGame.playerTurn==0)
      {alert ('Choose another Square')
      myGame.playerTurn=1}
      else if (square[x].textContent=="X" || square[x].textContent=="O" && myGame.playerTurn==1)     
      {alert ('Choose another Square')
      myGame.playerTurn=0
    }
   
      
      else if (myGame.playerTurn==0){
          square[x].textContent="X"
      }
      else {
        square[x].textContent='O'
      }
  }

  function pushArray(x){
    myGame.Gameboard[x] = square[x].textContent
  }