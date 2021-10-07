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
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES)
            if (targets.length) {
                var c_tar = targets.reduce(function(prev, curr) {
                    return helpers.distance(prev.pos.x, prev.pos.y, creep.pos.x, creep.pos.y) < helpers.distance(curr.pos.x, curr.pos.y, creep.pos.x, creep.pos.y) ? prev : curr;
                });
                if (creep.build(c_tar) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(c_tar, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                var repairs = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.hits < structure.hitsMax;
                    }
                })
                if (repairs.length) {
                    var c_rep = repairs.reduce(function(prev, curr) {
                        return helpers.distance(prev.pos.x, prev.pos.y, creep.pos.x, creep.pos.y) < helpers.distance(curr.pos.x, curr.pos.y, creep.pos.x, creep.pos.y) ? prev : curr;
                    });
                    creep.say('🚧 repairz');
                    if (creep.repair(c_rep) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(c_rep, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES).reduce(function(prev, curr) {
                return helpers.distance(prev.pos.x, prev.pos.y, creep.pos.x, creep.pos.y) < helpers.distance(curr.pos.x, curr.pos.y, creep.pos.x, creep.pos.y) ? prev : curr;
            });
            if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;