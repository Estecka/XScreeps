RoomPosition.prototype.fromLiteral = function(obj){
    try { return new RoomPosition(obj.x, obj.y, obj.roomName); }
    catch (e) { return null; }
};