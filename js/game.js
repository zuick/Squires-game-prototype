function Game(){
    this.stage;
    this.objects = {};
    this.squareSize = 10;
    
    this.init = function(){
        this.stage = new createjs.Stage("game-canvas");
        
        this.objects.player1 = new Square( 0, 0, this.squareSize );
        this.objects.player2 = new Square( this.squareSize, this.squareSize, this.squareSize );
        
        this.stage.addChild( this.objects.player1.shape );
        this.stage.addChild( this.objects.player2.shape );
        
        createjs.Ticker.addEventListener("tick", this.tick);
        createjs.Ticker.setFPS(30);
        
        document.onkeydown = this.handleKeyDown;
    }
    this.tick = function( event ){
        this.objects.player1.action( this.stage.canvas );
        this.objects.player2.action( this.stage.canvas );
        
        this.stage.update();
    }.bind(this);
    
    this.handleKeyDown = function(e){
        if(!e){ var e = window.event; }
        switch(e.keyCode) {
            case 38: this.objects.player1.setDir("up"); return false;
            case 40: this.objects.player1.setDir("down"); return false;
            case 39: this.objects.player1.setDir("right"); return false;
            case 37: this.objects.player1.setDir("left"); return false;
            case 87: this.objects.player2.setDir("up"); return false;
            case 83: this.objects.player2.setDir("down"); return false;
            case 68: this.objects.player2.setDir("right"); return false;
            case 65: this.objects.player2.setDir("left"); return false;
        }
    }.bind(this);
};

window.game = new Game();

