const myGame =  {

//PubSub Code
events: {
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
},

//game contents
Gameboard: ['','','','','','','','',''],
Players: [],
playerTurn: '',
computerPlayer: false,
init: function() {
  this.cacheDom();
  this.bindEvents();
  this.playerTurn = ''
},

cacheDom: function(){
this.square = document.querySelectorAll('.square')
this.playBtn = document.getElementById('playBtn')
this.computerPlayBtn = document.getElementById('computerPlay')
this.input = document.querySelectorAll('input')
this.resetBtn = document.getElementById('reset')
},

bindEvents: function(){
//RESET BUTTON
this.resetBtn = this.resetBtn.bind(this)
this.resetBtn.addEventListener('click', this.reset)

//PLAY BUTTON
this.playBtn = this.playBtn.bind(this)
this.playBtn.addEventListener('click', this.playBtnUpdate)
,
playBtnUpdate: function(){
  events.emit('playBtn', 'human')
}
events.on('playBtn', assignPlayers)
events.on('playBtn', squareEventListenerAdd)
events.on('playBtn', whoseTurn)
events.on('playBtn', compOrNot)
events.on('playBtn', hideDivs)
events.on('playBtn', updateProgress)
events.on('playBtn', render)

// COMPUTER BUTTON
computerPlayBtn.addEventListener('click', computerPlayBtnUpdate)

function computerPlayBtnUpdate(){
  events.emit('computerPlayBtn', 'computer')
}
events.on('computerPlayBtn', assignPlayers)
events.on('computerPlayBtn', squareEventListenerAdd)
events.on('computerPlayBtn', whoseTurn)
events.on('computerPlayBtn', compOrNot)
events.on('computerPlayBtn', hideDivs)
events.on('computerPlayBtn', updateProgress)
events.on('computerPlayBtn', render)

    function squareEventListenerAdd(input){
    square.forEach(item =>{item.addEventListener('click', clickUpdate)})
    }

function clickUpdate(e){
  // e.target.textContent=e.target.getAttribute('data-index')
  events.emit('squareClick', e.target.getAttribute('data-index'))
}

function compOrNot(check){
if(check=='human'){
events.on('squareClick', markBoard)

}
else if (check=='computer'){
events.on('squareClick', computerGame)
computerGame()

}
}

events.on('boardChanged', checkWin)
events.on('boardChanged', whoseTurn)
events.on('boardChanged', updateProgress)
events.on('callComputer', computerGameComputerMove)




}



}




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

};

//********************************************************************* */

// there are issues with presing play button once and not being able to call multiple functions
//cache
  square = document.querySelectorAll('.square')
  playBtn = document.getElementById('playBtn')
  computerPlayBtn = document.getElementById('computerPlay')


  //bind
  //PLAY BUTTON
  playBtn.addEventListener('click', playBtnUpdate)
  
  function playBtnUpdate(){
    events.emit('playBtn', 'human')
  }

  events.on('playBtn', squareEventListenerAdd)
  events.on('playBtn', whoseTurn)
  events.on('playBtn', compOrNot)

  // COMPUTER BUTTON
  computerPlayBtn.addEventListener('click', computerPlayBtnUpdate)
  
  function computerPlayBtnUpdate(){
    events.emit('computerPlayBtn', 'computer')
  }
  events.on('computerPlayBtn', squareEventListenerAdd)
  events.on('computerPlayBtn', whoseTurn)
  events.on('computerPlayBtn', compOrNot)

      function squareEventListenerAdd(input){
      square.forEach(item =>{item.addEventListener('click', clickUpdate)})
      }

  function clickUpdate(e){
    // e.target.textContent=e.target.getAttribute('data-index')
    events.emit('squareClick', e.target.getAttribute('data-index'))
  }

  function compOrNot(check){
  if(check=='human'){
  events.on('squareClick', markBoard)
  alert('human')
  }
  else if (check=='computer'){
  events.on('squareClick', computerGame)
  computerGame()
  alert('computer')
  }
}
  
  events.on('boardChanged', checkWin)
  events.on('boardChanged', whoseTurn)
  events.on('callComputer', computerGameComputerMove)

  
 

//   //computer Btn
//   computerPlayBtn.addEventListener('click', computerBtn)
//   function computerBtn(){
//     events.emit('computerBtn','')
//   }
//   events.on('computerBtn', computerUnBind)
  
  
// function computerUnBind(){
//    events.off('squareClick', markBoard)
// }

 


 
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
    computerGameHumanMove(x)
    
  }

  else if (myGame.playerTurn==1){
    computerGameComputerMove(x)
  }


}
  function computerGameHumanMove(x){
    
      if(x==undefined){return}
      else if (square[x].textContent=="X" || square[x].textContent=="O")
      {alert ('Choose another Square')
      myGame.playerTurn=0}
      else{
      myGame.Gameboard[x]="X"
      render()
      events.emit('boardChanged', '')
      events.emit('callComputer', "")
      }
    }
    
    function computerGameComputerMove(x){
      
      x=computerMove()
      console.log('x for this round is '+x)
      myGame.Gameboard[x]='O'
      setTimeout(render, 500)
      events.emit('boardChanged', '')
  
  }




  //   if (myGame.playerTurn==0){

  //     myGame.Gameboard[x]="X"
  //     render()
  //     events.emit('boardChanged', '')
  //   }
  //   else if (myGame.playerTurn==1){
       
  //       myGame.Gameboard[computerMove()]='O'
  //       render()
  //       events.emit('boardChanged', '')
  //     }
  // }
  


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

// function computerMove(){
// let empties = [];

//      function emptyIndex(){
       
         
//         for (let i=0; i<9; i++){
//             if(myGame.Gameboard[i]==""){
//                 empties.push(i)
//             }
//             else{}
//         }}
//      emptyIndex()

//      function getRandomIntInclusive(min, max) {
  
//         return Math.floor(Math.random() * (max - min + 1) + min); 
//      }

//      let rand = getRandomIntInclusive(0, empties.length)
//     //  if(rand=9){()=>alert('rand = '+rand)}
//      let answer = empties[rand]
 
//     return answer
//     }

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
  
       let rand = getRandomIntInclusive(0, empties.length-1)
          // console.log('rand is '+ rand)
       let answer = empties[rand]
      // console.log(answer)
   
      return answer
      }
      // for(let i=0; i<100; i++){if (i<100){computerMove()}}

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
    }
    else if (myGame.Gameboard.indexOf('')==-1){
        alert('draw')
        // this.progress.textContent = 'The Game is a Draw'
        // this.render()
        // this.unbindEvents()
        
        }
    }