

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
    playerTurn: '',
    computerPlayer: false
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
//cache
  square = document.querySelectorAll('.square')
  playBtn = document.getElementById('playBtn')
  computerPlayBtn = document.getElementById('computerPlay')


  //bind
  //PLAY BUTTON
  
  events.on('playBtn', squareEventListenerAdd)
  events.on('playBtn', whoseTurn)
  

      function squareEventListenerAdd(input){
      square.forEach(item =>{item.addEventListener('click', clickUpdate)})
      }

  function clickUpdate(e){
    // e.target.textContent=e.target.getAttribute('data-index')
    events.emit('squareClick', e.target.getAttribute('data-index'))
  }
  events.on('squareClick', markBoard)

  
  events.on('boardChanged', checkWin)
  events.on('boardChanged', whoseTurn)

  //maybe these should be triggered instead on render or from event emitters in other places
  // events.on('squareClick', checkWin)
  // events.on('squareClick', whoseTurn)

  //play btn
  playBtn.addEventListener('click', playBtnUpdate)
  function playBtnUpdate(){
    events.emit('playBtn', true)
  }

 

  //computer Btn
  computerPlayBtn.addEventListener('click', computerBtn)
  function computerBtn(){
    events.emit('computerBtn','')
  }
  events.on('computerBtn', computerUnBind)
  
  
function computerUnBind(){
   events.off('squareClick', markBoard)
}

 


 
  //render
  function render(){
    square.forEach(item =>{
        item.textContent=myGame.Gameboard[item.getAttribute('data-index')]
    })}


// *** This shouldn't be on until the play button is clicked ====> perhaps put events off in init function?


  

 

  
  

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
        myGame.Gameboard[x]="X"
        render()
        events.emit('boardChanged', '')
        
      }
      
      else if (myGame.playerTurn==1){
       
        myGame.Gameboard[x]='O'
        render()
        events.emit('boardChanged', '')
      }
  }

  function computerGame(x){
    if (myGame.playerTurn==0){

      myGame.Gameboard[x]="X"
      render()
      events.emit('boardChanged', '')
    }
    else if (myGame.playerTurn==1){
       
        myGame.Gameboard[computerMove()]='O'
        render()
        events.emit('boardChanged', '')
      }
  }
  


//   function rand(){
//     return Math.floor(Math.random() * (8 - 0 + 1) + 0)
//   }

//   function searchGamboard(num){
//       return myGame.Gameboard[num]
//   }
//   function computer(){
//      let num = rand()
//      let search = searchGamboard(num)
//      if (search == "X" || search == "O"){
//          alert()
//      }

function computerMove(){
let empties = [];

     function emptyIndex(){
       
         
        for (let i=0; i<=9; i++){
            if(myGame.Gameboard[i]==""){
                empties.push(i)
            }
            else{}
        }}
     emptyIndex()

     function getRandomIntInclusive(min, max) {
  
        return Math.floor(Math.random() * (max - min + 1) + min); 
     }

     let rand = getRandomIntInclusive(0, empties.length)

     let answer = empties[rand]
 
    return answer
    }

 

  function checkWin() {
    if(
    myGame.Gameboard[0]==myGame.Gameboard[1]&&myGame.Gameboard[0]==myGame.Gameboard[2]&&myGame.Gameboard[0]!=='' ||
    myGame.Gameboard[3]==myGame.Gameboard[4]&&myGame.Gameboard[3]==myGame.Gameboard[5] &&myGame.Gameboard[3]!==''  ||
    myGame.Gameboard[6]==myGame.Gameboard[7]&&myGame.Gameboard[6]==myGame.Gameboard[8] &&myGame.Gameboard[6]!=='' ||
    myGame.Gameboard[0]==myGame.Gameboard[3]&&myGame.Gameboard[0]==myGame.Gameboard[6] &&myGame.Gameboard[0]!=='' ||
    myGame.Gameboard[1]==myGame.Gameboard[4]&&myGame.Gameboard[1]==myGame.Gameboard[7] &&myGame.Gameboard[1]!=='' ||
    myGame.Gameboard[2]==myGame.Gameboard[5]&&myGame.Gameboard[2]==myGame.Gameboard[8] &&myGame.Gameboard[2]!=='' ||
    myGame.Gameboard[0]==myGame.Gameboard[4]&&myGame.Gameboard[0]==myGame.Gameboard[8] &&myGame.Gameboard[0]!=='' ||
    myGame.Gameboard[2]==myGame.Gameboard[4]&&myGame.Gameboard[2]==myGame.Gameboard[6] &&myGame.Gameboard[2]!==''
    )
            
    {   
        alert('winner')
        // myGame.progress.textContent = myGame.Players[myGame.playerTurn].name + " is the winner";
        // myGame.render()
        // myGame.unbindEvents()
        
        //need to unbind event listener once someone has won
    };
    if (myGame.Gameboard.indexOf('')==-1){
        alert('draw')
        // this.progress.textContent = 'The Game is a Draw'
        // this.render()
        // this.unbindEvents()
        
        }
    }