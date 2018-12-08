// global.STRUCTURE_DECAY_COST = {
//     [STRUCTURE_RAMPART] : RAMPART_DECAY_AMOUNT /RAMPART_DECAY_TIME,
//     [STRUCTURE_CONTAINER] : CONTAINER_DECAY /CONTAINER_DECAY_TIME_OWNED,
//     [STRUCTURE_ROAD] :                          ROAD_DECAY_AMOUNT /ROAD_DECAY_TIME,
//     swamp: CONSTRUCTION_COST_ROAD_SWAMP_RATIO * ROAD_DECAY_AMOUNT /ROAD_DECAY_TIME,
//     tunnel: CONSTRUCTION_COST_ROAD_WALL_RATIO * ROAD_DECAY_AMOUNT /ROAD_DECAY_TIME,
// }


// Object.defineProperty(Structure.prototype, "decayCost", {
//     configurable: true,
//     get: function(){
//         let cost  = STRUCTURE_DECAY_COST[this.structureType];
//         if (cost == undefined)
//             return 0;
        
//         if (this.structureType == STRUCTURE_ROAD){
//             if (this.hitsMax==CONSTRUCTION_COST_ROAD_SWAMP_RATIO * ROAD_HITS)
//                 return cost * CONSTRUCTION_COST_ROAD_SWAMP_RATIO;
//             if (this.hitsMax==CONSTRUCTION_COST_ROAD_WALL_RATIO * ROAD_HITS)
//                 return cost * CONSTRUCTION_COST_ROAD_WALL_RATIO;
//         }
        
//         if (this.structureType == STRUCTURE_CONTAINER && this.room.controller.owner == undefined)
//             return cost * 5;
        
//         return cost;
//     }
// });

/** @type {Structure} this**/
Object.defineProperty(Structure.prototype, "timeToLive", {
   configurable: true,
   get: function(){
       if (this.structureType == STRUCTURE_WALL)
            this.ticksToDecay = RAMPART_DECAY_TIME;
        if (this.ticksToDecay === undefined && this.structureType != STRUCTURE_WALL)
            return Infinity;
            
        let decayTime = 500;
        let decayAmount = 1000;
        
        switch(this.structureType){
            case STRUCTURE_ROAD: decayTime=ROAD_DECAY_TIME; decayAmount=ROAD_DECAY_AMOUNT; break;
            case STRUCTURE_RAMPART: decayTime=RAMPART_DECAY_TIME; decayAmount=RAMPART_DECAY_AMOUNT; break;
            case STRUCTURE_WALL: decayTime=RAMPART_DECAY_TIME; decayAmount=RAMPART_DECAY_AMOUNT; break;
            case STRUCTURE_CONTAINER: decayTime=CONTAINER_DECAY_TIME_OWNED; decayAmount=CONTAINER_DECAY; break;
        }
        if (this.structureType == STRUCTURE_ROAD && this.hitsMax == 750000 /*this.pos.lookFor(LOOK_TERRAIN) == "wall"*/) {
           decayAmount *= 150;
        }
        
        // console.log(this.structureType+"; "+this.pos.lookFor(LOOK_TERRAIN)+"; "+this.hits+'*'+decayTime+'/'+decayAmount);
        return this.ticksToDecay + ( Math.max(0, this.hits-decayAmount) * decayTime/decayAmount );
   }
});

Object.defineProperty(StructureExtractor.prototype, "mineral", {
    configurable: true,
    get: function(){
        return this._mineral ? this._mineral : (this._mineral = this.pos.lookFor(LOOK_MINERALS)[0]);
    }
});

var storeOnMineral = {
    configurable: true,
    get: function(){
        if (this.mineralType)
            return {[this.mineralType]: this.mineralAmount};
        else
            return {};
    }
}
var storeOnEnergy = {
    configurable: true,
    get: function(){ return {energy: this.energy}; }
}
var energyOnStore = {
    configurable: true,
    get: function(){ 
        let n = this.store.energy;
        return n ? n : 0;
    }
}

Object.defineProperty(StructureLink.prototype, "store", storeOnEnergy);
Object.defineProperty(StructureTerminal.prototype, "energy", storeOnEnergy);
Object.defineProperty(StructureStorage.prototype, "energy", storeOnEnergy);
Object.defineProperty(StructureLab.prototype, "store", storeOnMineral);