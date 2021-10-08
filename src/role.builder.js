/*
 * Builds on construction sites
 */

var helpers = require('helpers');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var close_target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (close_target) {
                if (creep.build(close_target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(close_target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                var close_repair = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.hits < structure.hitsMax;
                    }
                })
                if (close_repair) {
                    creep.say('🚧 repairz');
                    if (creep.repair(close_repair) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(close_repair, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
        else {
            var close_source = creep.pos.findClosestByPath(FIND_SOURCES, {
                filter: (source) => {
                    return source.energy >= creep.store.getCapacity();
                }
            })
            if (creep.harvest(close_source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(close_source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;