function Player( name ){
    this.name = name;
    this.speed = 4;
    this.dir = "right";
    this.color;
    this.shape;
    this.beep = function(){
        var color = this.color;
        this.shape.graphics.beginFill( "FFF" ).rect( 0, 0, this.size, this.size );
        setTimeout( function(){
            this.shape.graphics.beginFill( color ).rect( 0, 0, this.size, this.size );
        }.bind(this), 50);
    }
}


