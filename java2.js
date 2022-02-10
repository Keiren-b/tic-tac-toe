

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
    Gameboard: [],
    playerTurn: ''
}
//********************************************************************* */
function initialTurn(){
    //radomly selects who should go first
    
        myGame.playerTurn = Math.round(Math.random())
        
        // this.updateProgress()
        
    }
initialTurn();

function whoseTurn(){
    if (myGame.playerTurn===0){
        myGame.playerTurn=1
        
    }
    else if (myGame.playerTurn===1) 
    {myGame.playerTurn=0
    }
    alert('Player Turn is ' + myGame.playerTurn)
    events.off('playBtn', whoseTurn)
};

//********************************************************************* */
  square = document.querySelectorAll('.square')
  playBtn = playBtn = document.getElementById('playBtn')





  square.forEach(item =>{item.addEventListener('click', update)})
  playBtn.addEventListener('click', ()=>{events.emit('playBtn', '')})

  function update(e){
    e.target.textContent=e.target.getAttribute('data-index')
    events.emit('squareClick', e.target.getAttribute('data-index'))
  }



  
      events.on('squareClick', markBoard)
      events.on('squareClick', pushArray)
      events.on('playBtn', whoseTurn)

  
  function markBoard(x){
      square[x].textContent='X'
  }

  function pushArray(x){
    myGame.Gameboard.push(square[x].textContent)
  }