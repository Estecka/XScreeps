const repairIDcache = {};
const repairIDExpiration = {};
const REFRESH_TIME = 100;

Object.defineProperty(Room.prototype, "repairList", {
    configurable: true,
	get: function(){
		if (this._repairList)
			return this._repairlist;

		else
		if (repairIDcache[this.name] && repairIDExpiration[this.name] > Game.time) {
			repairIDcache[this.name] = _.filter(repairIDcache[this.name], id => {
				let str = Game.getObjectById(id);
				return str && str.hits < str.hitsMax;
			});
			return this._repairlist = repairIDcache[this.name].map(id=>Game.getObjectById(id));
		}

		else {
			this._repairlist  = this.find(FIND_STRUCTURES, {filter:  str => str.hits<str.hitsMax });
			repairIDcache[this.name] = this._repairlist.map(obj => obj.id);
			repairIDExpiration[this.name] = Game.time + REFRESH_TIME;
			return this._repairlist;
		}
	},
});

/** Creates a creep using the first available Spawn in the room.
 * @param [string] body
 * @param {string} name
 * @param {Object} memory
**/
Room.prototype.createCreep = function(body, name, memory){
    if (!this.controller.my)
        return ERR_NOT_OWNER; //You don't own this room
    let spawnList = this.find(FIND_MY_SPAWNS);
    if (!spawnList.length)
        return ERR_NOT_FOUND; //You have no spawns there
    
    let theChosenOne;
    for(let spawn in spawnList){
        spawn = spawnList[spawn];
        if(spawn.spawning)
            continue;
        else
            theChosenOne = spawn;
            break;
    }
    
    if (theChosenOne==undefined)
        return ERR_BUSY; //All spawns are busy
    
    return theChosenOne.createCreep(body, name, memory);
}


let findEmptiestFuel = function(array, free = 0){
    let result = undefined;
    for (var i in array){
        let obj = array[i];
        let f = obj.energyCapacity - obj.energy;
        if (f>free){
            free = f;
            result = obj;
        }
    }
    return result;
}

/** Find the best spot to drop your energy **/
Room.prototype.findBestRefuelSpot = function(structures = [STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_TOWER, STRUCTURE_LAB]){
    console.log(new Error("Deprecated function used : findRefuelSpot").stack);
    if (!this.controller.my)
        return null;
    
    /** @type {Structure[]} str **/
    let all = this.find(FIND_MY_STRUCTURES);
    let free = 0;
    let obj = null;
    let result = null //this.controller;
    
    for (let i in structures){
        let some = _.filter(all, (s)=>s.structureType == structures[i] && !s.memory.output);
        obj = findEmptiestFuel(some, free);
        if (obj && obj.energyCapacity-obj.energy > free)
            result = obj;
            if (result)
                break;
    }
    return result;
};

let findEmptiestStore = function(array, free = 0){
    let result = null;
    for (var i in array){
        let obj = array[i];
        let f = obj.storeCapacity - _.sum(obj.store);
        if (f>free){
            free = f;
            result = obj;
        }
    }
    return result;
}
/** Find the best spot to drop your cargo **/
Room.prototype.findBestStorage = function(structures = [STRUCTURE_STORAGE, STRUCTURE_CONTAINER]){
    console.log(new Error("Deprecated function used : findBestStorage").stack);
    
    /** @type {Structure[]} str **/
    let all = this.find(FIND_STRUCTURES);
    let free = 0;
    let obj = null;
    let result = null;
    
    for (let i in structures){
        let some = _.filter(all, (s)=>(s.structureType == structures[i]));
        obj = findEmptiestStore(some, free);
        if (obj && obj.storeCapacity-_.sum(obj.store) > free)
            result = obj;
    }
    return result;
};

Room.prototype.findStoredResource = function(resourceType, structures = [STRUCTURE_CONTAINER, STRUCTURE_STORAGE]){
    let all = this.find(FIND_STRUCTURES);
    
    let amount = 0;
    let result = null;
    for (let i in structures){
        let some = _.filter(all, (s)=>s.structureType == structures[i]);
        for (let str in some){
            str = some[str];
            let avail = str.store[resourceType];
            if (avail > 0 && avail > amount){
                amount = avail;
                result = str;
            }
        }
    }
    return result;
}