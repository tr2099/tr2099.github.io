var step0 = {
  'start': 100,
  'end': 100,
  'time': 1
}


/*

function createHud() {
  $('body').append('<div id="test-hud"></div>');

  $('#test-hud').append('<div id="game-over-inner"></div>')
  $('#test-hud').append('<div id="location-status"></div>');
  $('#test-hud').append('<div id="debug-text"></div>');
  $('#test-hud').append('<div id="debug-time"></div>');
  $('#test-hud').append('<div id="player-status"></div>');
  $('#test-hud').append('<div id="action-status"></div>');
  $('#test-hud').append('<div id="hud-log-inner"></div>');
  $('#test-hud').append('<div id="hud-player-limbs"></div>');
  $('#test-hud').append('<div id="action"></div>');
  $('#test-hud').append('<div id="paused"></div>');
  $('#test-hud').append('<div id="endgame-title"></div>');
  $('#test-hud').append('<div id="game-over"></div>');
  $('#test-hud').append('<div id="action"></div>');
  $('#test-hud').append('<div id="loading"></div>');
}

function getEmptyRoom() {
  return new WIASRRoom();
}

function getSingleCellRoom() {
  var room = getEmptyRoom();
  room.map = []
  room.map.push([])
  room.map[0].push([]);
  room.map[0][0] = '+';
  return room;
}

var MAP_1 = [
  ['+','+','+','+'],
  ['+','+','+','+'],
  ['+','■','+','+'],
  ['+','+','+','+']
]
function getRealRoom() {
  var room = new WIASRRoom({
    "map": MAP_1,
    "cell_meta": {},
    "creatures": {},
    "objects": [],
    "structures": {},
    "x": 0,
    "y": 0,
  });
  room.map = MAP_1;
  room.pathfindingMatrix();
  return room
}

function getSmallRoom() {
  var room = getEmptyRoom();
  room.map = [
    ['++++'],
    ['++++'],
    ['++++'],
    ['++++']
  ];
  return room;
}

function getStructure() {
  return new WIASRStructure({
    "unit_id": 'discs1',
    "structure_type": 'discs',
    "name": 'some structure',
    "description": 'some structure',
    "code": 'discs',
    "x": 10,
    "y": 10,
    "attack_types": {},
    "parts": {
      "rock structure": {
          "health": 100,
          "amputated": false,
      },
      "metal disc": {
          "health": 100,
          "amputated": false,
      }
    },
    "attack": 10,
    "attack_counter": 0,
    "default_attack_counter": 10,

    "skill": 10,
    "weight": 3,
    "symbol": '%'
  });
}

function getRawPlayer() {
  return new WIASRPlayer();
}

function getActor() {
  return new WIASRActor({
    "pathfinder": false,
    "unit_id": "dummy1",
    "code": "troglodyte",
    "symbol": "t",
    "name": "test subject 1",
    "x": 0,
    "y": 0,
    "old_x": 0,
    "old_y": 0,
    "attack_types": {},
    "holds_with": 2,
    "holding": false,
    "moving_counter": 0,
    "crawls_with": 1,
    "stands_on": 1,
    "missing_arms": 0,
    "missing_legs": 0,
    "default_moving_counter": 10,
    "current_moving_counter": 10,
    "limbs": {
      "limb": {
        "health": 100,
        "status": "ok",
        "bleeding": false,
        "standing": true,
        "crawling": true,
        "amputated": false,
        "vital": false,
        "holding": true,
      },
      "limb2": {
        "health": 100,
        "status": "ok",
        "bleeding": false,
        "standing": false,
        "crawling": false,
        "amputated": false,
        "vital": true,
        "holding": false,
      },
      "limb3": {
        "health": 100,
        "status": "ok",
        "bleeding": false,
        "standing": true,
        "crawling": false,
        "amputated": false,
        "vital": false,
        "holding": false,
      }
    },
    "attack": 10,
    "attack_counter": 0,
    "default_attack_counter": 10,
    "impulse_x": 0,
    "impulse_y": 0,
    "weight": 1,
});
}

function getActorHolding() {
  return new WIASRActor({
          "missing_legs": 0,
          "missing_arms": 0,
          "pathfinder": false,
          "unit_id": "dummy1",
          "code": "troglodyte",
          "symbol": "t",
          "name": "test subject 1",
          "x": 10,
          "y": 10,
          "holds_with": 2,
          "holding": new WIASRObject({
                'unit_id': 'ironsword1',
                'limb': false,
                'object_type': 'sword',
                'is_weapon': true,
                'name': 'iron sword',
                'x': 10,
                'y': 10,
                'symbol': '-',
                'impulse_x': 0,
                'impulse_y': 0,
                'attacks': 10,
                'code': 'ironsword',
                'weight': 1,
                'size': 1,
                'bleeding_counter': 0,
            }),
          "moving_counter": 0,
          "default_moving_counter": 10,
          "current_moving_counter": 10,
          "limbs": {
                    "limb": {
                        "health": 100,
                        "status": "ok",
                        "bleeding": false,
                        "standing": false,
                        "crawling": false,
                        "amputated": false,
                        "vital": true,
                        "holding": true,
                    },
                    "limb2": {
                        "health": 100,
                        "status": "ok",
                        "bleeding": false,
                        "standing": false,
                        "crawling": false,
                        "amputated": false,
                        "vital": true,
                        "holding": true,
                    },
                    "limb2": {
                        "health": 100,
                        "status": "ok",
                        "bleeding": false,
                        "standing": true,
                        "crawling": false,
                        "amputated": false,
                        "vital": false,
                        "holding": true,
                    }
          },
          "attack": 10,
          "attack_counter": 0,
          "default_attack_counter": 10,
          "impulse_x": 0,
          "impulse_y": 0,
          "weight": 1,
      }
  );
}


function getTroglodyte() {
  return new WIASRCreature(
    {
          "pathfinder": false,
          "unit_id": "dummy1",
          "species": "Troglodyte",
          "code": "troglodyte",
          "symbol": "t",
          "alive": true,
          "name": "test subject 1",
          "x": 0,
          "y": 0,
          "old_x": 0,
          "old_y": 0,
          "speed": 10,
          "max_speed": 10,
          "attack_types": ['punch','slam','kick'],
          "able_to_walk": 1,
          "able_to_crawl": 1,
          "stands_on": 2,
          "crawls_on": 2,
          "missing_legs": 0,
          "missing_arms": 0,
          "grabbing": false,
          "holds_with": 2,
          "holding": false,
          "moving_counter": 0,
          "default_moving_counter": 10,
          "current_moving_counter": 10,
          "behaviour": 'hostile',
          "limbs": {
                    "head": {
                        "health": 100,
                        "status": "ok",
                        "bleeding": false,
                        "standing": false,
                        "crawling": false,
                        "amputated": false,
                        "vital": true,
                    },
                    "left arm": {
                        "health": 100,
                        "status": "ok",
                        "bleeding": false,
                        "standing": false,
                        "crawling": true,
                        "amputated": false,
                        "punching": true,
                        "holding": true,
                    },
                    "right arm": {
                        "health": 100,
                        "status": "ok",
                        "bleeding": false,
                        "standing": false,
                        "crawling": true,
                        "amputated": false,
                        "punching": true,
                        "holding": true,
                    },
                    "torso": {
                        "health": 100,
                        "status": "ok",
                        "bleeding": false,
                        "standing": false,
                        "crawling": false,
                        "amputated": false,
                        "vital": true,
                    },
                    "left leg": {
                        "health": 100,
                        "status": "ok",
                        "bleeding": false,
                        "standing": true,
                        "crawling": false,
                        "amputated": false,
                    },
                    "right leg": {
                        "health": 100,
                        "status": "ok",
                        "bleeding": false,
                        "standing": false,
                        "crawling": false,
                        "amputated": false,
                    },
          },
          "attack": 10,
          "attack_counter": 0,
          "dodge": 10,
          "default_attack_counter": 10,
          "impulse_x": 0,
          "impulse_y": 0,
          "skill": 20,
          "death_counter": 20,
          "weight": 1,
          "focus": 0.6,
      }
  );
}



function getTroglodyteHolding() {
  return new WIASRCreature(
    {
          "pathfinder": false,
          "unit_id": "dummy1",
          "species": "Troglodyte",
          "code": "troglodyte",
          "symbol": "t",
          "alive": true,
          "name": "test subject 1",
          "x": 0,
          "y": 0,
          "speed": 10,
          "max_speed": 10,
          "attack_types": ['punch','slam','kick'],
          "able_to_walk": 1,
          "able_to_crawl": 1,
          "stands_on": 2,
          "crawls_on": 2,
          "missing_legs": 0,
          "missing_arms": 0,
          "holds_with": 2,
          "grabbing": false,
          "holding": new WIASRObject({
                'unit_id': 'ironsword1',
                'limb': false,
                'object_type': 'sword',
                'is_weapon': true,
                'name': 'iron sword',
                'x': 0,
                'y': 0,
                'symbol': '-',
                'impulse_x': 0,
                'impulse_y': 0,
                'attacks': 10,
                'code': 'ironsword',
                'weight': 1,
                'size': 1,
                'bleeding_counter': 0,
            }),
          "moving_counter": 0,
          "default_moving_counter": 10,
          "current_moving_counter": 10,
          "behaviour": 'hostile',
          "limbs": {
                    "head": {
                        "health": 100,
                        "status": "ok",
                        "bleeding": false,
                        "standing": false,
                        "crawling": false,
                        "amputated": false,
                        "vital": true,
                    },
                    "left arm": {
                        "health": 100,
                        "status": "ok",
                        "bleeding": false,
                        "standing": false,
                        "crawling": true,
                        "amputated": false,
                        "punching": true,
                        "holding": true,
                    },
                    "right arm": {
                        "health": 100,
                        "status": "ok",
                        "bleeding": false,
                        "standing": false,
                        "crawling": true,
                        "amputated": false,
                        "punching": true,
                        "holding": true,
                    },
                    "torso": {
                        "health": 100,
                        "status": "ok",
                        "bleeding": false,
                        "standing": false,
                        "crawling": false,
                        "amputated": false,
                        "vital": true,
                    },
                    "left leg": {
                        "health": 100,
                        "status": "ok",
                        "bleeding": false,
                        "standing": true,
                        "crawling": false,
                        "amputated": false,
                    },
                    "right leg": {
                        "health": 100,
                        "status": "ok",
                        "bleeding": false,
                        "standing": false,
                        "crawling": false,
                        "amputated": false,
                    },
          },
          "attack": 10,
          "attack_counter": 0,
          "dodge": 10,
          "default_attack_counter": 10,
          "impulse_x": 0,
          "impulse_y": 0,
          "skill": 20,
          "death_counter": 20,
          "weight": 1,
          "focus": 0.6,
      }
  );
}

function getSword() {
  return new WIASRObject({
        'unit_id': 'ironsword1',
        'limb': false,
        'object_type': 'sword',
        'is_weapon': true,
        'name': 'iron sword',
        'x': 10,
        'y': 10,
        'symbol': '-',
        'impulse_x': 0,
        'impulse_y': 0,
        'attacks': 10,
        'code': 'ironsword',
        'weight': 1,
        'size': 1,
        'bleeding_counter': 0,
    });
}


function getClub() {
  return new WIASRObject({
        'unit_id': 'club1',
        'limb': false,
        'object_type': 'club',
        'is_weapon': true,
        'name': 'club',
        'x': 10,
        'y': 10,
        'symbol': '-',
        'impulse_x': 0,
        'impulse_y': 0,
        'attacks': 10,
        'code': 'club',
        'weight': 1,
        'size': 1,
        'bleeding_counter': 0,
    });
}

*/