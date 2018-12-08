RoomObject.prototype.say = function(speech){
    let style, points, balloon;
    balloon = new RoomVisual(this.room.name);
    points = [
        [this.pos.x-0.5, this.pos.y-1],
        [this.pos.x, this.pos.y-0.5],
        [this.pos.x+0.5, this.pos.y-1],
        ];
    style = {
        "stroke":"#ccc",
        "fill": "#ccc",
        "opacity": 1,
    }
    balloon.poly(points, style);
    
    style = {
        "color": "black",
        "font": "bold 0.58 sans-serif",
        "backgroundColor": "#ccc",
        "backgroundPadding":0.15,
    }
    balloon.text(speech, this.pos.x, this.pos.y-1.25, style);
    return 0;
}

// Creep.prototype._say = Creep.prototype.say;
// Creep.prototype.say = function(message){
//     return this.my ? 
//         this._say(message):
//         RoomObject.prototype.say.call(this, message);
// }