function Player( name ){
    this.name = name;
    this.health = 10;
    this.speed = 4;
    this.dir = "right";
    this.color;
    this.shape;
    this.size;
    this.beep = function(){
        var color = this.color;
        this.shape.graphics.beginFill( "#FFF" ).rect( 0, 0, this.size, this.size );
        setTimeout( function(){
            if(this.death) color = "333";
            this.shape.graphics.beginFill( "#" + color ).rect( 0, 0, this.size, this.size );
        }.bind(this), 50);
    }
    this.hit = function(){
        if( this.health > 0 ){
            this.health--;
            this.beep();
        }else{
            this.dead();
        }
    }
    this.dead = function(){
        this.shape.graphics.beginFill( "#333" ).rect( 0, 0, this.size, this.size );
        this.death = true;
    }
}


