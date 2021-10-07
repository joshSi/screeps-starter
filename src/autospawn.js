var autoSpawn = {

    /** @param {Creep} creep **/
    run: function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Deleting creep memory:', name);
            }
        }
        
        if (Game.spawns['Spawn1'].room.controller.level > 1) {
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
            console.log('Builder count: ' + builders.length);
        
            if(builders.length < Game.spawns['Spawn1'].room.controller.level + 1) {
                var newName = 'Builder' + Game.time;
                if (Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
                    {memory: {role: 'builder'}}) === 0)
                    console.log('Spawning new builder: ' + newName);
            }
        }
        
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgrader count: ' + upgraders.length);
    
        if(upgraders.length < 2) {
            var newName = 'Upgrader' + Game.time;
            if (Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
                {memory: {role: 'upgrader'}}) === 0)
                console.log('Spawning new upgrader: ' + newName);
        }
    
        if(Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.6});
        }
        
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvester count: ' + harvesters.length);
    
        if(harvesters.length < 2) {
            var newName = 'Harvester' + Game.time;
            if (Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'harvester'}}) === 0)
                console.log('Spawning new harvester: ' + newName);
        }
    }
};

module.exports = autoSpawn;