var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleClaimer = require('role.claimer');
var autoSpawn = require('autospawn');
require('constants');

module.exports.loop = function () {
    // Game.spawns['Spawn1'].spawnCreep([CLAIM,MOVE], "Clayman", {memory: {role: 'claimer'}})
    
        autoSpawn.run(Game.spawns['Spawn1'], 2, 4, 5);
        autoSpawn.run(Game.spawns['Spawn2'], 0, 3, 2);
    
    for (var rm in Game.rooms) {
        var towers = Game.rooms[rm].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    (
                    structure.structureType == STRUCTURE_TOWER   ||
                    structure.structureType == STRUCTURE_STORAGE ||
                    structure.structureType == STRUCTURE_SPAWN   ||
                    structure.structureType == STRUCTURE_CONTROLLER
                    ) && structure.hits < structure.hitsMax
                }
            });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
            // Prioritizes hostile elimination
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
        });
    }

    for(var name in Game.creeps) {
        const creep = Game.creeps[name];
        switch (creep.memory.role) {
        case 'harvester':
            roleHarvester.run(creep);
            break;
        case 'upgrader':
            roleUpgrader.run(creep);
            break;
        case 'builder':
            roleBuilder.run(creep);
            break;
        case 'claimer':
            roleClaimer.run(creep);
            break;
        default:
            break;
        }
    }
}