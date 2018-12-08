# XRoom

## ● Room.prototype.repairList
An array of all the room's structure that require repairs. 

The results will be cached within the module for up to 100 ticks. A structure that has been fully repaired will properly be removed from the list, but a structure that has been recently damages may take up to 100 ticks before appearing in the list.  
You may tweak this duration to your liking by editing the constant `REFRESH_TIME` at the rop of the module.

## ◼ Room.prototype.createCreep (body, name, memory)
Create a creep using any available Spawn in the room.

#### Return value
Any error code returned by `room.createCreep`, or : 
| Constant					| value 	| description	
| :---						|	-----:	| :---			
| OK		    			| 0			| A spawn has been found 
| ERR_NOT_OWNER    			| -1		| You don't own this room
| ERR_BUSY	    			| -4		| Every spawn in the room is busy
| ERR_NOT_FOUND				| -5		| There is no spawn in the room.