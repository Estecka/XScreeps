# XCreep

## ● Creep.prototype.cargoSize
The total amount of resource carried by a creep.

## ● Creep.prototype.isFull
Whether a creep is able to carry more resources.

## ● Creep.prototype.isEmpty
Whether a creep carries any resource at all.

## ◼ Creep.prototype.transferAllEnergy (target)
Transfers as much of of a creep's carried energy as possible, into a structure `target` that implements `energyAmount` and `energyCapacity`.

#### Return value
Any error code returned by `creep.transfer`, or : 

| Constant					| value 	| description	
| :---						|	-----:	| :---			
| OK		    			| 0			| Some energy will be transferred to the target
| ERR_NOT_ENOUGH_RESOURCES	| -6		| The creep doen't carry any energy
| ERR_INVALID_TARGET		| -7		| `target` does not implement `energyCapacity`
| ERR_FULL	    			| -8		| The target is full

## ◼ Creep.prototype.transferAll (target, filter = null)
Transfers as much of of a creep's carried resources as possible, into a structure `target` that implements `store` and `storeCapacity`.

Due to creeps not being able to transfer multiple resources at once, it may actually takes several calls to get this action to transfer the entierty of the creep's cargo into the structure. The order resources are transfered depends on what order they are defined into `creep.carry`, this _usually_ means energy will be transfered first.

#### Return value
Any error code returned by `creep.transfer`, or : 

| Constant					| value 	| description	
| :---						|	-----:	| :---			
| OK		    			| 0			| Some resources will be transferred to the target
| ERR_NOT_ENOUGH_RESOURCES	| -6		| The creep doesn't carry any resource, `filter` is empty, or the creep doesn't carry any of the resources defined in `filter`
| ERR_FULL	    			| -8		| The target is full


## ◼ Creep.prototype.moveToRoom (name)
Make a creep moves to a room with the given name.
The creep will stop moving once within 25 tile to the center of the room.


## ◼ Creep.prototype.withdrawMax (target, type, amount)
Withdraw as much of the resource `type` as possible from the `target`'s `store`, but not more than `amount`.

#### Return value
Any error code returned by `creep.withdraw`, or : 

| Constant					| value 	| description	
| :---						|	-----:	| :---			
| OK		    			| 0			| Some resources will be withdrawn from the target
| ERR_NOT_ENOUGH_RESOURCES	| -6		| The target doesn't contain any of the specified resource `type`.
| ERR_FULL	    			| -8		| The creep is full


## ◼ Creep.prototype.withdrawAll (target, filter = null)
Withdraw as much resources as possible from the `target`'s `store`, but not more than `amount`.  
`filter` is an array of resource types the operation should be limited to. If undefined, resources of every types will be withdrawn.

Due to creeps being unable to withdraw multiple resource types at once, it may take more than one tick to actually whithdraw the entierty of a structure's content.

#### Return value
Any error code returned by `creep.withdraw`, or : 

| Constant					| value 	| description	
| :---						|	-----:	| :---			
| OK		    			| 0			| Some resources will be withdrawn from the target
| ERR_NOT_ENOUGH_RESOURCES	| -6		| The target doesn't contain any of the specified resource `type`.
| ERR_FULL	    			| -8		| The creep is full
