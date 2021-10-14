/*
 * Room claiming unit; not expected to automatically spawn
 */

var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room.controller) {
            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
        }
        creep.moveTo(Game.flags["room_2"])
    }
};

module.exports = roleClaimer;