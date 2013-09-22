function Game(){
    this.stage;
    this.object;
    this.squareSize = 10;
    
    this.init = function(){
        this.stage = new createjs.Stage("game-canvas");
        this.object = new createjs.Shape();
        this.object = new Square( 0, 0, this.squareSize );
        this.stage.addChild( this.object.shape );
        createjs.Ticker.addEventListener("tick", this.tick);
        createjs.Ticker.setFPS(30);
        this.stage.update();
        
        document.onkeydown = this.handleKeyDown;
    }
    this.tick = function( event ){
        this.object.action( this.stage.canvas, this.squareSize );
        this.stage.update();
    }.bind(this);
    
    this.handleKeyDown = function(e){
        if(!e){ var e = window.event; }
        switch(e.keyCode) {
            case 38: this.object.setDir("up"); return false;
            case 40: this.object.setDir("down"); return false;
            case 39: this.object.setDir("right"); return false;
            case 37: this.object.setDir("left"); return false;
        }
    }.bind(this);
};

window.game = new Game();

