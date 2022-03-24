// SpaceShip game project..

// develop by joaocasado
// based in dioproject

// start a game
function start() {
  // hide start msg
  $('#msgStart').hide();
  // on stared hide msg and make this:
  $('#backgroundGame').append("<div id='player' class='animationOne'></div>");
  $('#backgroundGame').append("<div id='enemyOne' class='animationTwo'></div>");
  $('#backgroundGame').append("<div id='enemyTwo'></div>");
  $('#backgroundGame').append("<div id='ally' class='animationThree' ></div>");
  $('#backgroundGame').append("<div id='score'></div>");
}
const msgStart = document.getElementById('msgStart');
const startEvent = msgStart.addEventListener('click', start);
let pontos = 0;
let salvos = 0;
let perdidos = 0;

let game = {};

//Game Loop
game.timer = setInterval(loop, 30);
// set interval is a function that run a loop every interval
// run the loop every 30ms

function loop() {
  // These functions run in to background of game

  // Move the background of game
  const backgroundMove = () => {
    let left = parseInt($('#backgroundGame').css('background-position'));
    $('#backgroundGame').css('background-position', left - 1);
  };

  // run a movement of background
  backgroundMove();

  // run a loop when press a key and run a animation
  movePlayer();

  // run a movement  random whith enemy one
  enemyMovementOne();

  // run a movement  whith enemy two
  enemyMovementTwo();

  // run a movement  ally
  moveAlly();

  // Detect a colission
  collisions();
}

// Move player

//  get a decimal value key
let KEY = {
  W: 87,
  S: 83,
  D: 68,
  A: 65,
  F: 70,
};

game.press = [];

// Verify key press
$(document).keydown(function (e) {
  game.press[e.which] = true;
});

$(document).keyup(function (e) {
  game.press[e.which] = false;
});

function movePlayer() {
  //move up
  if (game.press[KEY.W]) {
    const top = parseInt($('#player').css('top'));
    const playerTop = top;
    // console.log(playerTop);
    $('#player').css('top', top - 10);

    // Limit of helicopter player move (top)

    if (top <= 10) {
      $('#player').css('top', top + 10);
    }
  }

  // move down
  if (game.press[KEY.S]) {
    const top = parseInt($('#player').css('top'));
    $('#player').css('top', top + 10);
    const playerTop = top;
    // console.log(playerTop);
    // Limit of helicopter player move (top)

    if (top >= 414) {
      $('#player').css('top', top - 10);
    }
  }

  // move right
  if (game.press[KEY.D]) {
    const left = parseInt($('#player').css('left'));
    $('#player').css('left', left + 10);
    if (left >= 690) {
      $('#player').css('left', left - 10);
    }
  }

  // move left
  if (game.press[KEY.A]) {
    const left = parseInt($('#player').css('left'));
    $('#player').css('left', left - 10);
    if (left <= 10) {
      $('#player').css('left', left + 10);
    }
  }

  // Activate Shoot
  if (game.press[KEY.F]) {
    shoot();
  }
}

// move enemy one

const enemyOnespeed = 5;

// movement occurred in axys y
const enemyMovement = parseInt(Math.random() * 334);
let positionY = enemyMovement;

function enemyMovementOne() {
  positionX = parseInt($('#enemyOne').css('left'));
  $('#enemyOne').css('left', positionX - enemyOnespeed);
  $('#enemyOne').css('top', positionY);

  if (positionX <= 0) {
    positionY = parseInt(Math.random() * 334);
    $('#enemyOne').css('left', 694);
    $('#enemyOne').css('top', positionY);
  }
}

// move enemy two

function enemyMovementTwo() {
  positionX = parseInt($('#enemyTwo').css('left'));
  $('#enemyTwo').css('left', positionX - 3);

  if (positionX <= 0) {
    $('#enemyTwo').css('left', 775);
  }
}

// move ally

function moveAlly() {
  positionX = parseInt($('#ally').css('left'));
  $('#ally').css('left', positionX + 1);

  if (positionX > 906) {
    $('#ally').css('left', 0);
  }
}

// shoot

let canShoot = true;

function shoot() {
  // Can i shoot verify
  if (canShoot == true) {
    // Isn't allow shoot multiples
    canShoot = false;

    // get a value of element helicopter position (player)
    playerTop = parseInt($('#player').css('top'));
    positionX = parseInt($('#player').css('left'));

    // shootx receice start position of shoot
    shootX = positionX + 190;

    // topShoot receice start position of shoot
    topShoot = playerTop + 37;
    $('#backgroundGame').append("<div id='shoot'></div");
    $('#shoot').css('top', topShoot);
    $('#shoot').css('left', shootX);

    // shot course time (loop)
    // run the loop every 9ms

    var timeShoot = window.setInterval(runShoot, 15);
  }

  function runShoot() {
    positionX = parseInt($('#shoot').css('left'));
    $('#shoot').css('left', positionX + 15);

    // limit of shoot course
    // if limite > 900 remove shoot and interval (loop)
    // null confirm that shoot is removed
    // that shoot is removed is possible run again canShoot

    if (positionX > 900) {
      window.clearInterval(timeShoot);
      timeShoot = null;
      $('#shoot').remove();
      canShoot = true;
    }
  }
}

// Collisions

function collisions() {
  // indetify colissions
  const collisionOne = $('#player').collision($('#enemyOne'));
  const collisionTwo = $('#player').collision($('#enemyTwo'));
  const collisionThree = $('#shoot').collision($('#enemyOne'));
  const collisionFour = $('#shoot').collision($('#enemyTwo'));
  const collisionFive = $('#player').collision($('#ally'));
  const collisionSix = $('#enemyTwo').collision($('#ally'));

  // console.log(collisionOne);

  // when conditions is true reposition enemy random
  // first colission
  if (collisionOne.length > 0) {
    // get a enemy position on axys "x" and "y"
    enemyOneX = parseInt($('#enemyOne').css('left'));
    enemyOneY = parseInt($('#enemyOne').css('top'));
    // after get enemy positions prepared a functions
    // using whith param enemy positions
    explosionOne(enemyOneX, enemyOneY);

    positionY = parseInt(Math.random() * 334);
    $('#enemyOne').css('left', 694);
    $('#enemyOne').css('top', positionY);
  }

  // when conditions is true reposition enemy random
  // second colission between player and enemy 2
  if (collisionTwo.length > 0) {
    enemyTwoX = parseInt($('#enemyTwo').css('left'));
    enemyTwoY = parseInt($('#enemyTwo').css('top'));
    explosionTwo(enemyTwoX, enemyTwoY);

    $('#enemyTwo').remove();

    repositionEnemyTwo();
  }

  // Shoot collision
  // will occur when the player hits the enemies
  //  collision three fire with enemy one
  if (collisionThree.length > 0) {

    // when hitting enemy 1 the player will gain 100 points
    score = score + 100;

    // get the enemy's position
    enemyOneX = parseInt($('#enemyOne').css('left'));
    enemyOneY = parseInt($('#enemyOne').css('top'));

    // used the same explosion already created
    explosionOne(enemyOneX, enemyOneY);
    //
    // interrupts the course of the shot, causing when it hits
    // the enemy he does not continue
    $('#shoot').css('left', 950);

    // the value of the parameter refers to the value of the trigger's initial function,
    // which will cause the trigger to be removed if it is greater than 900

    // When the enemy is hit it will be repositioned random
    positionY = parseInt(Math.random() * 334);
    $('#enemyOne').css('left', 694);
    $('#enemyOne').css('top', positionY);
  }

  //  collision four  fire with enemy two

  // works very similar to above
  if (collisionFour.length > 0) {
    
    enemyTwoX = parseInt($('#enemyTwo').css('left'));
    enemyTwoY = parseInt($('#enemyTwo').css('top'));
    $('#enemyTwo').remove();
    // We use the explosionTwo declared below
    explosionTwo(enemyTwoX, enemyTwoY);
    $('#shoot').css('left', 950);
    // we also use the enemyTwo replacement function declared below..
    repositionEnemyTwo();
  }

  // collision 5 between player and ally

  if (collisionFive.length > 0) {
    // reposition the ally and remove it from the screen
    // will call the function reposition ally
    repositionAlly();
    $('#ally').remove();
  }

  // collision 6 between ally and enemyTwo
  if (collisionSix.length > 0) {
    // get a position ally
    allyX = parseInt($('#ally').css('left'));
    allyY = parseInt($('#ally').css('top'));
    // call function exlposionThree using param allyX and allyY
    explosionThree(allyX, allyY);
    $('#ally').remove();

    repositionAlly();
  }

  //Explosion
  // get a params declaret before in explosionOne
  function explosionOne(enemyOneX, enemyOneY) {
    // create element in html
    $('#backgroundGame').append("<div id='explosionOne'></div");
    $('#explosionOne').css('background-image', 'url(imgs/explosion.png)');
    // get element create in up line to facility acess
    const div = $('#explosionOne');
    div.css('top', enemyOneY);
    div.css('left', enemyOneX);
    // animate jquery expanded a div and decrease opacity velocity slow
    div.animate({ width: 200, opacity: 0 }, 'slow');
    // after run explosion remove explosin in 1s
    let timeExplosion = window.setInterval(removeExplosion, 1000);

    function removeExplosion() {
      // remove div and set interval
      div.remove();
      window.clearInterval(timeExplosion);
      // for confirm
      timeExplosion = null;
    }
  }

  // reposition enemy two
  function repositionEnemyTwo() {
    // enemy will only be repositioned after 5 seconds..

    var timeColisionFour = window.setInterval(repositionFour, 5000);

    function repositionFour() {
      window.clearInterval(timeColisionFour);
      timeColisionFour = null;
      // enemy will only be repositioned if the game is not over yet
      if (endGame == false) {
        $('#backgroundGame').append('<div id=enemyTwo></div');
      }
    }
  }

  function explosionTwo(enemyTwoX, enemyTwoY) {
    $('#backgroundGame').append("<div id='explosionTwo'></div");
    $('#explosionTwo').css('background-image', 'url(imgs/explosion.png)');
    var divTwo = $('#explosionTwo');
    divTwo.css('top', enemyTwoY);
    divTwo.css('left', enemyTwoX);
    divTwo.animate({ width: 200, opacity: 0 }, 'slow');

    var timeExplosionTwo = window.setInterval(removeExplosionTwo, 1000);

    function removeExplosionTwo() {
      divTwo.remove();
      window.clearInterval(timeExplosionTwo);
      timeExplosionTwo = null;
    }
  }

  // after remove respawn ally in 6s
  function repositionAlly() {
    let timeAlly = window.setInterval(repositionSix, 6000);

    function repositionSix() {
      window.clearInterval(timeAlly);
      timeAlly = null;

      if (endGame == false) {
        $('#backgroundGame').append(
          "<div id='ally' class='animationThree'></div>",
        );
      }
    }
  }

  function explosionThree(allyX, allyY) {
    // create a div whith class animationFour
    $('#backgroundGame').append(
      "<div id='explosionThree' class='animationFour'></div",
    );
    $('#explosionThree').css('top', allyY);
    $('#explosionThree').css('left', allyX);
    let timeExplosionThree = window.setInterval(resetExplosion, 1000);
    function resetExplosion() {
      $('#explosionThree').remove();
      window.clearInterval(timeExplosionThree);
      timeExplosionThree = null;
    }
  }

  // this variable will identify the end of the game, preventing elements and events from occurring at this stage
  let endGame = false;
}
