function Game(){
    this.stage;
    this.players = [];
    this.bullets = {};
    
    this.playerSize = 50;
    this.player1color = "008080";
    this.player2color = "df6925";
    
    this.bulletLiveTime = 2000;
    this.bulletSpeed = 10;
    this.bulletSize = 10;
    
    this.score = 0;
    
    this.collider = new Collider();
    
    this.init = function(){
        this.stage = new createjs.Stage("game-canvas");
        
        this.playerProto = new Square();
        Player.prototype = this.playerProto;
        
        this.bulletProto = new Square();
        Bullet.prototype = this.bulletProto;
        
        this.addPlayers();
        
        this.scoreText = new createjs.Text( this.score, "20px Arial", "#AAA");
        this.stage.addChild( this.scoreText );
        
        createjs.Ticker.addEventListener("tick", this.tick);
        createjs.Ticker.setFPS(40);
        
        document.onkeydown = this.handleKeyDown;
    }
    this.test = function(){
            this.playerFire( this.players[0] );
        setTimeout( function(){
        this.playerFire( this.players[1] );
            
        }.bind(this), 100 );
    }
    this.addPlayers = function(){

        this.players.push( this.createPlayer( "Player 2", 160, 50, this.playerSize, this.player2color ) );
        this.players.push( this.createPlayer( "Player 1", 100, 50, this.playerSize, this.player1color ) );

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
        bullet.id = bulletId;
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
        // bullets action
        for( var i in this.bullets ){
            this.bullets[i].action( this.stage.canvas );
        }
        //players action
        for( var i in this.players ){
            this.players[i].action( this.stage.canvas );
            
            // check collision 
            var collisionObject = this.collider.collisionTest( this.players[i], this.bullets );
            if ( collisionObject ){
                // remove bullet 
                this.stage.removeChild( collisionObject.shape );
                delete this.bullets[collisionObject.id];
            
                // score
                if( i == 0) this.score++;
                else this.score--;
                this.scoreText.text = this.score;
                
                this.players[i].beep();
            }
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
            case 16: this.playerFire( this.players[0] ); return false; // shift key
            case 32: this.playerFire( this.players[1] ); return false; // H key
        }
    }.bind(this);
};

window.game = new Game();

