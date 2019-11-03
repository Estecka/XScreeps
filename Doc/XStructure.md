# XStructure

## ● StructureLab.prototype.store
Lets read the Lab's `.mineralAmount` via `.store[.mineralType]`.  
**The labs energy amount cannot yet be accessed through the store.** This is a planned feature.
## ● StructureLink.prototype.store
Lets read the Link's `.energy` via `.store.energy`.
## ● StructureStorage.prototype.energy
Lets read the storage's `.store.energy` via `.energy`
## ● StructureTerminal.prototype.energy
Lets read the Terminal's `.store.energy` via `.energy`.


## ● Structure.prototype.timeToLive
The remaining amount of ticks until a structure decays completely, or `Infinity` if the structure doesn't decay.

**This property currently returns inacurates results on the following structures :**  

Roads built on swamp is 5 time higher than it should, (tunnels however are accurate), this is a bug and I'll fix it soon.

Additionally, walls will return the same value as if they were ramparts; this hack was intentional for it was an easy way to let my builders maintain walls to the same HP as ramparts. I'll look into a more elegant way to achieve this result, so I can make this property work as advertised.


## ● StructureExtractor.prototype.mineral
Returns the mineral deposit on the same position as this extractor. The value is cached until the end of the tick.
