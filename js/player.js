function Player( name ){
    this.name = name;
    this.speed = 4;
    this.dir = "right";
    this.color;
    this.shape;
    this.isPointInside = function( px, py ){
        if( px < this.shape.x || px > this.shape.x + this.size || py < this.shape.y || py > this.shape.y + this.size ) return false;
        return true;
    }
    this.checkObjectsCollision = function( objects ){
        for( var i in objects ){
            if( objects[i].owner == this.name ) return false;
            if( this.isPointInside( objects[i].shape.x, objects[i].shape.y ) ) return true;
            if( this.isPointInside( objects[i].shape.x + objects[i].size, objects[i].shape.y ) ) return true;
            if( this.isPointInside( objects[i].shape.x, objects[i].shape.y + objects[i].size ) ) return true;
            if( this.isPointInside( objects[i].shape.x + objects[i].size, objects[i].shape.y + objects[i].size ) ) return true;
        }
        return false;
    }
    this.beep = function(){
        var color = this.color;
        this.shape.graphics.beginFill( "FFF" ).rect( 0, 0, this.size, this.size );
        setTimeout( function(){
            this.shape.graphics.beginFill( color ).rect( 0, 0, this.size, this.size );
        }.bind(this), 50);
    }
}


