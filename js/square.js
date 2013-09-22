function Square( x, y, s ){
    this.createShape = function( x, y, s ){
        x = x || 0;
        y = y || 0;
        s = s || 20;
        this.shape = new createjs.Shape();
        this.shape.graphics.setStrokeStyle(2);
        this.shape.graphics.beginStroke("#F0A");
        this.shape.graphics.beginFill("#FFF");
        this.shape.graphics.rect( x, y, s, s );
    }
    this.action = function( canvas, outsideSize ){
        
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
        
        if( this.shape.x > canvas.width + outsideSize ) this.shape.x = - outsideSize;
        if( this.shape.x < -outsideSize ) this.shape.x = canvas.width + outsideSize;
        if( this.shape.y > canvas.height + outsideSize ) this.shape.y = - outsideSize;
        if( this.shape.y < -outsideSize ) this.shape.y = canvas.height + outsideSize;
           
    }
    this.setDir = function( dir ){
        if( dir == "up" || dir == "down" || dir == "left" || dir == "right")
            this.dir = dir;
    }
    this.speed = 4;
    this.dir = "right";
    this.shape;
    this.createShape( x, y, s );
}

