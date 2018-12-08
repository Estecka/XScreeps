Object.defineProperty(Creep.prototype, "cargoSize", {
    configurable: true,
    get: function(){ return _.sum(this.carry); }
});
Object.defineProperty(Creep.prototype, "isFull", {
    configurable: true,
    get: function(){ return this.cargoSize >= this.carryCapacity; }
});
Object.defineProperty(Creep.prototype, "isEmpty", {
    configurable: true,
    get: function(){ return this.cargoSize <= 0; }
});

Creep.prototype.withdrawMax = function(target, type, amount){
    let free = this.carryCapacity - this.cargoSize;
    free = Math.min(free, amount, target.store[type]);
    
    if (free <=0 && amount != 0)
        return ERR_FULL;
        
    return this.withdraw(target, type, free);
}


Creep.prototype.withdrawAll = function(target, filter) {
    let free = this.carryCapacity - this.cargoSize;
    if (free <= 0)
        return ERR_FULL;
    
    for (let res in target.store) {
        if (target.store[res] > 0 && (!filter || filter.includes(res) )) {
            return this.withdraw(target, res, Math.min(target.store[res], free));
        }
    }
    return ERR_NOT_ENOUGH_RESOURCES;
};

Creep.prototype.transferAllEnergy = function(target){
    if (target.energyCapacity == undefined)
        return ERR_INVALID_TARGET;
        
    let capacity = target.energyCapacity-target.energy;
    if (capacity == 0)
        return ERR_FULL;
    
    if (capacity>this.carry.energy)
        capacity = this.carry.energy;
    
    return this.transfer(target, RESOURCE_ENERGY, capacity);

};

Creep.prototype.transferAll = function(target, filter = null) {
    let free = target.storeCapacity - _.sum(target.store);
    if (free <= 0)
        return ERR_FULL;
        
    for (let res in this.carry) {
        if ((this.carry[res]>0) && (!filter || filter.includes(res))) {
            return this.transfer(target, res, Math.min(this.carry[res], free));
        }
    }
    return ERR_NOT_ENOUGH_RESOURCES;
};

Creep.prototype.moveToRoom = function(name){
    try {
        return this.moveTo(new RoomPosition(25,25, name), {range: 20})
    } catch(e) {
        console.log(e);
        return ERR_INVALID_ARGS;
    }
}