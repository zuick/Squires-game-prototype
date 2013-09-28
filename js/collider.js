function Collider(){
    this.isPointInsideRect = function( point, rect ){
        if( point.x < rect.x || point.x > rect.x + rect.w || point.y < rect.y || point.y > rect.y + rect.h ) return false;
        return true;
    }
    this.collisionTest = function( object, objects ){
        var result = false;
        for( var i in objects ){
            if( objects[i].owner == object.name ) continue;
            
            var rect = { x: object.shape.x, y: object.shape.y, w: object.size, h: object.size };
            
            if( this.isPointInsideRect( { x: objects[i].shape.x, y: objects[i].shape.y }, rect ) ) result = objects[i];
            if( this.isPointInsideRect( { x: objects[i].shape.x + objects[i].size, y: objects[i].shape.y }, rect ) ) result = objects[i];
            if( this.isPointInsideRect( { x: objects[i].shape.x, y: objects[i].shape.y + objects[i].size }, rect ) ) result = objects[i];
            if( this.isPointInsideRect( { x: objects[i].shape.x + objects[i].size, y: objects[i].shape.y + objects[i].size }, rect ) ) result = objects[i];
        }
        return result;
    }
}
   


