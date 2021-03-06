
    const myGame = {
    Gameboard: ['','','','','','','','',''],
    Players: [],
    playerTurn: '',
    init: function() {
        this.cacheDom();
        this.bindEvents();
        this.playerTurn = ''
    
    },

    render: function(){
        this.square.forEach(item =>{
            item.textContent=this.Gameboard[item.getAttribute('data-index')]
        })
        this.player1Banner.textContent="Player 1 is..."+this.Players[0].name+". "+this.Players[0].name+'\'s symbol is...'+this.Players[0].marker;
        this.player2Banner.textContent="Player 2 is..."+this.Players[1].name+". "+this.Players[1].name+'\'s symbol is...'+this.Players[1].marker;
      
    },
    
    cacheDom: function() {
        this.game = document.getElementsByClassName('game')
        this.board = document.querySelector('.board')
        this.input = document.querySelectorAll('input')
        this.square = document.querySelectorAll('.square')
        this.playBtn = document.getElementById('playBtn')
        this.player1Banner = document.getElementById('player1Banner')
        this.player2Banner = document.getElementById('player2Banner')
        this.progress = document.getElementById('progress')
        this.computer = document.getElementById('computer')
        this.label  = document.querySelector('label')
    },
    bindEvents: function(){
        
        this.assignPlayers = this.assignPlayers.bind(this)
        this.updateProgress = this.updateProgress.bind(this)
        this.whoseTurn = this.whoseTurn.bind(this)
        this.markSpot = this.markSpot.bind(this)

       

        this.playBtn.addEventListener('click', this.assignPlayers)
        this.playBtn.addEventListener('click', this.updateProgress)
        this.playBtn.addEventListener('click', this.whoseTurn)
        this.square.forEach(item => {item.addEventListener('click', this.markSpot)})
        this.square.forEach(item => {item.addEventListener('click', this.updateProgress)})

    },
   unbindEvents: function(){
    this.playBtn.removeEventListener('click', this.assignPlayers)
    this.playBtn.removeEventListener('click', this.updateProgress)
    this.playBtn.removeEventListener('click', this.whoseTurn)
    this.square.forEach(item => {item.removeEventListener('click', this.markSpot)})
    this.square.forEach(item => {item.removeEventListener('click', this.updateProgress)})
        
   },
   
    testFunction: function Player(name, marker){
       this.name = name
       this.marker = marker
   },

   assignPlayers: function (){

            const player1 = new this.testFunction(this.input[0].value,'X');
            this.Players.push(player1);

            if(this.computer.checked=true && this.input[1]==''){
                const player2 = new this.testFunction('The Computer','O');
                this.Players.push(player2);
            }
            else{
                const player2 = new this.testFunction(this.input[1].value,'O');
                this.Players.push(player2);
            }
            this.hideDivs()
        },
            
    hideDivs:function(){        
            this.playBtn.classList.add('hidden')
            this.input[0].classList.add('hidden')
            this.input[1].classList.add('hidden')
            this.computer.classList.add('hidden')
            this.label.classList.add('hidden')
            this.render()
},

    whoseTurn: function (){
        //radomly selects who should go first
        if (this.playerTurn===''){
            let x = Math.round(Math.random())
            this.playerTurn=x 
            this.updateProgress()
            console.log(this.playerTurn)
        }
        else if (this.playerTurn===0){
            this.playerTurn=1
            console.log(this.playerTurn)
        }
        else if (this.playerTurn===1) 
        {this.playerTurn=0
        console.log(this.playerTurn)}
    },

    //I DON'T LIKE THAT CHECK WIN IS HERE...MAYBE IT SHOULD BE SET OFF BY AN EVENT EMITTER OR SOMETHING

    
    markSpot: function (event) {

        if(this.computer.checked=false){
            let x = event.target.getAttribute('data-index')

            if(this.playerTurn===0){
                //an illegal move will prevent someone marking the same spot twice and will not change the player turn. This is acheived by setting the player turn to the opposite before calling whoseTurn() again.
                if(this.Gameboard[x]=='X' || this.Gameboard[x]=='O'){
                    this.playerTurn=1
                    return}

                else{
                    this.Gameboard[x]='X';
                    this.render();
                    
                }
                this.checkWin()
                this.whoseTurn()
            }
            else if(this.playerTurn===1){
                //an illegal move will prevent someone marking the same spot twice and will not change the player turn
                if(this.Gameboard[x]=='X' || this.Gameboard[x]=='O'){
                    this.playerTurn=0
                    return}
                else{
                this.Gameboard[x]='O'
                this.render()
                
            }
            this.checkWin()
            this.whoseTurn()
            }
            console.log(this.Gameboard)

        }
        //this runs the program when computer is playing...but it is not finished yet
        else{

            if(this.playerTurn===0){
                let x = event.target.getAttribute('data-index')
                //an illegal move will prevent someone marking the same spot twice and will not change the player turn. This is acheived by setting the player turn to the opposite before calling whoseTurn() again.
                if(this.Gameboard[x]=='X' || this.Gameboard[x]=='O'){
                    this.playerTurn=1
                    return}

                else{
                    this.Gameboard[x]='X';
                    this.render();
                    
                }
                this.checkWin()
                this.whoseTurn()
            }
            else if(this.playerTurn===1){
                let x = this.randomNumber()
                this.checkBoard(x)
                this.Gameboard[x]='O'
                this.render()
                this.checkWin()
                this.whoseTurn()
            }}

        
        },
   
    checkWin: function() {
        if(
        this.Gameboard[0]==this.Gameboard[1]&&this.Gameboard[0]==this.Gameboard[2]&&this.Gameboard[0]!=='' ||
        this.Gameboard[3]==this.Gameboard[4]&&this.Gameboard[3]==this.Gameboard[5] &&this.Gameboard[3]!==''  ||
        this.Gameboard[6]==this.Gameboard[7]&&this.Gameboard[6]==this.Gameboard[8] &&this.Gameboard[6]!=='' ||
        this.Gameboard[0]==this.Gameboard[3]&&this.Gameboard[0]==this.Gameboard[6] &&this.Gameboard[0]!=='' ||
        this.Gameboard[1]==this.Gameboard[4]&&this.Gameboard[1]==this.Gameboard[7] &&this.Gameboard[1]!=='' ||
        this.Gameboard[2]==this.Gameboard[5]&&this.Gameboard[2]==this.Gameboard[8] &&this.Gameboard[2]!=='' ||
        this.Gameboard[0]==this.Gameboard[4]&&this.Gameboard[0]==this.Gameboard[8] &&this.Gameboard[0]!=='' ||
        this.Gameboard[2]==this.Gameboard[4]&&this.Gameboard[2]==this.Gameboard[6] &&this.Gameboard[2]!==''
        )
                
        {   
            
            this.progress.textContent = this.Players[this.playerTurn].name + " is the winner";
            this.render()
            this.unbindEvents()
            
            //need to unbind event listener once someone has won
        };
        if (this.Gameboard.indexOf('')==-1){
            this.progress.textContent = 'The Game is a Draw'
            this.render()
            this.unbindEvents()
            
            }
        },

        updateProgress: function (){
            if (this.playerTurn!==''){
            this.progress.textContent = 'It is '+this.Players[this.playerTurn].name+'\'s turn'
            }
            this.render() 
        },

        randomNumber: function(){
            return Math.floor(Math.random() * (8 - 0 + 1) + 0)
        },

        checkBoard: function(x){
           if (this.Gameboard.indexOf(x)!==-1){
               this.checkBoard(this.randomNumber)
           }
           else {
                return
           }
        }


        // Computer: function () {
        
        //     if (this.playerTurn=0){
        //         this.markSpot()
        //     }
        //     else{
        //         x = this.randomNumber()
        //         if(this.Gameboard[x]=='X' || this.Gameboard[x]=='O'){
        //             this.playerTurn=0
        //             return}
        //         else{
        //         this.Gameboard[x]='O'
        //         this.render()
                
        //     }
        //     this.checkWin()
        //     this.whoseTurn()
        //     }
        // },
};



myGame.init()

