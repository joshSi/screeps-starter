var autoSpawn = {

    /** @param {Creep} creep **/
    run: function(spawner, builder_count, harvester_count, upgrader_count) {
        if (spawner) {
            console.log(spawner.name)
            for(var name in Memory.creeps) {
                if(!Game.creeps[name]) {
                    delete Memory.creeps[name];
                    console.log('Deleting creep memory:', name);
                }
            }
            
            if (spawner.room.controller.level > 1) {
                var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'&& creep.pos.roomName == spawner.room.name);
                // console.log(spawner.room.name)
                console.log('Builder count: ' + builders.length);
            
                if(builders.length < spawner.room.controller.level + builder_count) {
                    var newName = 'Builder' + Game.time;
                    if (spawner.spawnCreep([WORK,WORK,CARRY,MOVE], newName,
                        {memory: {role: 'builder'}}) === 0)
                        console.log('Spawning new builder: ' + newName);
                }
            }
            
            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.pos.roomName == spawner.room.name);
            console.log('Upgrader count: ' + upgraders.length);
        
            if(upgraders.length < upgrader_count) {
                var newName = 'Upgrader' + Game.time;
                if (spawner.spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], newName,
                    {memory: {role: 'upgrader'}}) === -6)
                    if (spawner.spawnCreep([WORK,WORK,CARRY,MOVE], newName,
                        {memory: {role: 'upgrader'}}) === 0)
                        console.log('Spawning new upgrader: ' + newName);
            }
        
            if(spawner.spawning) {
                var spawningCreep = Game.creeps[spawner.spawning.name];
                spawner.room.visual.text(
                    '🛠️' + spawningCreep.memory.role,
                    spawner.pos.x + 1,
                    spawner.pos.y,
                    {align: 'left', opacity: 0.6});
            }
            
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.pos.roomName == spawner.room.name);
            console.log('Harvester count: ' + harvesters.length);
        
            if(harvesters.length < harvester_count) {
                var newName = 'Harvester' + Game.time;
                if (spawner.spawnCreep([WORK,CARRY,MOVE], newName,
                    {memory: {role: 'harvester'}}) === 0)
                    console.log('Spawning new harvester: ' + newName);
            }
        }
    }
};

module.exports = autoSpawn;