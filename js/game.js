function Game(){
    this.stage;
    this.players = [];
    this.bullets = {};
    this.playerSize = 20;
    this.player1color = "008080";
    this.player2color = "df6925";
    this.bulletLiveTime = 800;
    this.bulletSpeed = 15;
    this.bulletSize = 10;
    this.init = function(){
        this.stage = new createjs.Stage("game-canvas");
        
        this.playerProto = new Square();
        Player.prototype = this.playerProto;
        
        this.bulletProto = new Square();
        Bullet.prototype = this.bulletProto;
        
        this.addPlayers();
        
        createjs.Ticker.addEventListener("tick", this.tick);
        createjs.Ticker.setFPS(30);
        
        document.onkeydown = this.handleKeyDown;
    }
    this.addPlayers = function(){

        
        this.players.push( this.createPlayer( "Player 1", this.stage.canvas.width / 2 , this.stage.canvas.height / 2, this.playerSize, this.player1color ) );
        this.players.push( this.createPlayer( "Player 2", 0, 0, this.playerSize, this.player2color ) );
        
        for( var i in this.players ){
            this.stage.addChild( this.players[i].shape );            
        }
    }
    this.playerFire = function( player ){
        var bulletSize = this.bulletSize;
        var bulletId = new Date().getTime();
        var bullet = this.createBullet( player.name, player.shape.x + player.size / 2 - bulletSize / 2, player.shape.y + player.size / 2 - bulletSize / 2, bulletSize, player.color );
        bullet.setDir(player.dir);
        bullet.speed = this.bulletSpeed;
        
        this.bullets[bulletId] =  bullet ;
        
        for( var i in this.bullets ){
            this.stage.addChild( this.bullets[i].shape );
        }
        
        setTimeout( function(){
            this.stage.removeChild( bullet.shape );
            delete this.bullets[bulletId];
        }.bind(this), this.bulletLiveTime );
        
    }
    this.createPlayer = function( name, x, y, size, color ){
        var player = new Player( name );
        player.createShape( x, y, size, color );
        return player;
    }
    this.createBullet = function( owner, x, y, size, color ){
        var bullet = new Bullet( owner );
        bullet.createShape( x, y, size, color );
        return bullet;
    }
    this.tick = function( event ){
        for( var i in this.players ){
            this.players[i].action( this.stage.canvas );     
            if ( this.players[i].checkObjectsCollision( this.bullets ) ){
                console.log("hit!" + this.players[i].name );
                this.players[i].beep()
            }
        }
        for( var i in this.bullets ){
            this.bullets[i].action( this.stage.canvas );
        }
        this.stage.update();
    }.bind(this);
    
    this.handleKeyDown = function(e){
        if(!e){ var e = window.event; }
        switch(e.keyCode) {
            case 38: this.players[0].setDir("up"); return false;
            case 40: this.players[0].setDir("down"); return false;
            case 39: this.players[0].setDir("right"); return false;
            case 37: this.players[0].setDir("left"); return false;
            case 87: this.players[1].setDir("up"); return false;
            case 83: this.players[1].setDir("down"); return false;
            case 68: this.players[1].setDir("right"); return false;
            case 65: this.players[1].setDir("left"); return false;
            case 32: this.playerFire( this.players[0] ); return false; // space key
            case 72: this.playerFire( this.players[1] ); return false; // H key
        }
    }.bind(this);
};

window.game = new Game();

