function Square( x, y, size, color ){
    this.size;
    this.createShape = function( x, y, size, color ){
        x = x || 0;
        y = y || 0;
        this.color = color || "F0F";
        this.size = size || 20;
        this.shape = new createjs.Shape();
        this.shape.graphics.setStrokeStyle(2);
        this.shape.graphics.beginFill( this.color );
        this.shape.graphics.rect( 0, 0, this.size, this.size );
        this.shape.graphics.endFill();
        this.shape.x = x;
        this.shape.y = y;
    }
    this.action = function( canvas ){
        
        switch( this.dir ){
            case "up": 
                this.shape.y -= this.speed;
                break;
            case "down": 
                this.shape.y += this.speed;
                break;
            case "left": 
                this.shape.x -= this.speed;
                break;
            case "right": 
                this.shape.x += this.speed;
                break;
        }
        
        // infinite canvas
        if( this.shape.x > canvas.width + this.size ) this.shape.x = - this.size;
        if( this.shape.x < -this.size ) this.shape.x = canvas.width + this.size;
        if( this.shape.y > canvas.height + this.size ) this.shape.y = - this.size;
        if( this.shape.y < -this.size ) this.shape.y = canvas.height + this.size;
    }
    this.setDir = function( dir ){
        if( dir == "up" || dir == "down" || dir == "left" || dir == "right")
            this.dir = dir;
    }
    this.size = 0;
    this.speed = 4;
    this.dir = "right";
    this.color;
    this.shape;
}

