RoomVisual.prototype.range = function(pos, min, max){
    min += 0.5;
    max += 0.5;
    if (pos instanceof RoomObject)
        pos = pos.pos;
    if (!pos instanceof RoomPosition)
        return ERR_INVALID_ARGS;
    
    this.rect(pos.x-max, pos.y-max, max*2, max*2, {fill: "#f80", opacity: 0.1});
    this.rect(pos.x-min, pos.y-min, min*2, min*2, {fill: "#0f0", opacity: 0.1});
};

StructureTower.prototype.showRange = function(){
    this.room.visual.range(this.pos, 5, 20);
}


const solidRed = {
    fill: "#800",
    opacity: 1,
    stroke: "#c22",
    strokeWidth: 0.03,
};
RoomVisual.prototype.outputArrow = function(x, y){
    this.poly(
        [
            [x + 0.0, y - 0.2],
            [x - 0.2, y + 0.2],
            [x + 0.2, y + 0.2],
            [x + 0.0, y - 0.2],
        ],
        solidRed
    );
};


const solidGreen = {
    fill: "#080",
    opacity: 1,
    stroke: "#0f0",
    strokeWidth: 0.025,
};
RoomVisual.prototype.inputArrow = function(x, y){
    this.poly(
        [
            [x + 0.0, y + 0.2],
            [x - 0.2, y - 0.2],
            [x + 0.2, y - 0.2],
            [x + 0.0, y + 0.2],
        ],
        solidGreen
    );
}