// SpaceShip game project..

// Develop by joaocasado
// Based in dioproject

// Start a game
function start() {
  // Hide start msg
  $('#msgStart').hide();
  // On stared hide msg and make this:
  $('#backgroundGame').append("<div id='player' class='animationOne'></div>");
  $('#backgroundGame').append("<div id='enemyOne' class='animationTwo'></div>");
  $('#backgroundGame').append("<div id='enemyTwo'></div>");
  $('#backgroundGame').append("<div id='ally' class='animationThree' ></div>");
  $('#backgroundGame').append("<div id='score'></div>");
  $('#backgroundGame').append("<div id='energy'></div>");
}

const msgStart = document.getElementById('msgStart');
const startEvent = msgStart.addEventListener('click', start);

// Sound game
let shootSound = document.getElementById('shootSound');
let explosionSound = document.getElementById('explosionSound');
let music = document.getElementById('music');
let gameOverSound = document.getElementById('gameOverSound');
let lostSound = document.getElementById('lostSound');
let rescueSound = document.getElementById('rescueSound');

// Music Loop (main music)
music.addEventListener('ended',
  function () {
    if(music.currentTime = 0){
      music.currentTime = 0;

      music.play();
    }
  },
  false,
);


// Scoreboard
let points = 0;
let saved = 0;
let losers = 0;

// Energy Player
// When started
let playEnergy = 3;

// Using in loop
let game = {};

// Game Loop
game.timer = setInterval(loop, 30);
// Set interval is a function that run a loop every interval
// Run the loop every 30ms

function loop() {
  // These functions run in to background of game

  // Move the background of game
  const backgroundMove = () => {
    let left = parseInt($('#backgroundGame').css('background-position'));
    $('#backgroundGame').css('background-position', left - 1);
  };
  // Loop Music
  music.play();


  // Run a movement of background
  backgroundMove();

  // Run a loop when press a key and run a animation
  movePlayer();

  // Run a movement  random whith enemy one
  enemyMovementOne();

  // Run a movement  whith enemy two
  enemyMovementTwo();

  // Run a movement  ally
  moveAlly();

  // Detect a colission
  collisions();
  // Most score player
  score();
  // Scoreboard()

  // Update player energy
  energy();
}

// Most image of status energy

function energy() {
  if (playEnergy == 3) {
    $('#energy').css('background-image', 'url(imgs/energyThree.png)');
  }

  if (playEnergy == 2) {
    $('#energy').css('background-image', 'url(imgs/energyTwo.png)');
  }

  if (playEnergy == 1) {
    $('#energy').css('background-image', 'url(imgs/energyOne.png)');
  }

  if (playEnergy == 0) {
    $('#energy').css('background-image', 'url(imgs/emptyEnergy.png)');

    //Game Over
  }
}

// Move player

//  Get a decimal value key
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
  // Move up
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

// Move enemy one

let enemyOnespeed = 5;

// Movement occurred in axys y
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

// Move enemy two

function enemyMovementTwo() {
  positionX = parseInt($('#enemyTwo').css('left'));
  $('#enemyTwo').css('left', positionX - 3);

  if (positionX <= 0) {
    $('#enemyTwo').css('left', 775);
  }
}

// Move ally

function moveAlly() {
  positionX = parseInt($('#ally').css('left'));
  $('#ally').css('left', positionX + 1);

  if (positionX > 906) {
    $('#ally').css('left', 0);
  }
}

// Shoot

let canShoot = true;

function shoot() {

  // shoot sound
  shootSound.play();

  // Can i shoot verify
  if (canShoot == true) {
    // Isn't allow shoot multiples
    canShoot = false;

    // Get a value of element helicopter position (player)
    playerTop = parseInt($('#player').css('top'));
    positionX = parseInt($('#player').css('left'));

    // Shootx receice start position of shoot
    shootX = positionX + 190;

    // topShoot receice start position of shoot
    topShoot = playerTop + 37;
    $('#backgroundGame').append("<div id='shoot'></div");
    $('#shoot').css('top', topShoot);
    $('#shoot').css('left', shootX);

    // Shot course time (loop)
    // Run the loop every 9ms

    var timeShoot = window.setInterval(runShoot, 15);
  }

  function runShoot() {
    positionX = parseInt($('#shoot').css('left'));
    $('#shoot').css('left', positionX + 15);

    // Limit of shoot course
    // If limite > 900 remove shoot and interval (loop)
    // Null confirm that shoot is removed
    // That shoot is removed is possible run again canShoot

    if (positionX > 900) {
      window.clearInterval(timeShoot);
      timeShoot = null;
      $('#shoot').remove();
      canShoot = true;
    }
  }
}

// Collisions
function score() {
  $('#score').html(
    '<h2> Pontos: ' +
      points +
      ' Salvos: ' +
      saved +
      ' Perdidos: ' +
      losers +
      '</h2>',
  );
}

function collisions() {
  // Indetify colissions
  const collisionOne = $('#player').collision($('#enemyOne'));
  const collisionTwo = $('#player').collision($('#enemyTwo'));
  const collisionThree = $('#shoot').collision($('#enemyOne'));
  const collisionFour = $('#shoot').collision($('#enemyTwo'));
  const collisionFive = $('#player').collision($('#ally'));
  const collisionSix = $('#enemyTwo').collision($('#ally'));

  // When conditions is true reposition enemy random
  // First colission
  if (collisionOne.length > 0) {
    // Decreases player's energy with each collision..
    playEnergy--;
    // Get a enemy position on axys "x" and "y"
    enemyOneX = parseInt($('#enemyOne').css('left'));
    enemyOneY = parseInt($('#enemyOne').css('top'));
    // After get enemy positions prepared a functions
    // Using whith param enemy positions
    explosionOne(enemyOneX, enemyOneY);

    positionY = parseInt(Math.random() * 334);
    $('#enemyOne').css('left', 694);
    $('#enemyOne').css('top', positionY);
  }

  // When conditions is true reposition enemy random
  // Second colission between player and enemy 2
  if (collisionTwo.length > 0) {
    // Decreases player's energy with each collision..
    playEnergy--;
    enemyTwoX = parseInt($('#enemyTwo').css('left'));
    enemyTwoY = parseInt($('#enemyTwo').css('top'));
    explosionTwo(enemyTwoX, enemyTwoY);

    $('#enemyTwo').remove();

    repositionEnemyTwo();
  }

  // Shoot collision
  // Will occur when the player hits the enemies
  //  Collision three fire with enemy one
  if (collisionThree.length > 0) {
    // When hitting enemy 1 the player will gain 100 points
    points = points + 100;
    // Updates speed when imigo is shot down
    enemyOnespeed = enemyOnespeed + 0.3;

    // Get the enemy's position
    enemyOneX = parseInt($('#enemyOne').css('left'));
    enemyOneY = parseInt($('#enemyOne').css('top'));

    // Used the same explosion already created
    explosionOne(enemyOneX, enemyOneY);
    //
    // Interrupts the course of the shot, causing when it hits
    // The enemy he does not continue
    $('#shoot').css('left', 950);

    // The value of the parameter refers to the value of the trigger's initial function,
    // Which will cause the trigger to be removed if it is greater than 900

    // When the enemy is hit it will be repositioned random
    positionY = parseInt(Math.random() * 334);
    $('#enemyOne').css('left', 694);
    $('#enemyOne').css('top', positionY);
  }

  //  Collision four  fire with enemy two

  // Works very similar to above
  if (collisionFour.length > 0) {
    // When hitting enemy 2 the player will gain 50 points
    points = points + 50;

    enemyTwoX = parseInt($('#enemyTwo').css('left'));
    enemyTwoY = parseInt($('#enemyTwo').css('top'));
    $('#enemyTwo').remove();
    // We use the explosionTwo declared below
    explosionTwo(enemyTwoX, enemyTwoY);
    $('#shoot').css('left', 950);
    // We also use the enemyTwo replacement function declared below..
    repositionEnemyTwo();
  }

  // Collision 5 between player and ally

  if (collisionFive.length > 0) {
    // Sound
    // When rescue enemy
    rescueSound.play();

    // reposition the ally and remove it from the screen
    // will call the function reposition ally
    saved++;
    repositionAlly();
    $('#ally').remove();
  }

  // Collision 6 between ally and enemyTwo
  if (collisionSix.length > 0) {
    losers++;

    // Get a position ally
    allyX = parseInt($('#ally').css('left'));
    allyY = parseInt($('#ally').css('top'));
    // Call function exlposionThree using param allyX and allyY
    explosionThree(allyX, allyY);
    $('#ally').remove();

    repositionAlly();
  }

  //Explosion
  // Get a params declaret before in explosionOne
  function explosionOne(enemyOneX, enemyOneY) {

    // Sound Explosion
    explosionSound.play();


    // Create element in html
    $('#backgroundGame').append("<div id='explosionOne'></div");
    $('#explosionOne').css('background-image', 'url(imgs/explosion.png)');
    // Get element create in up line to facility acess
    const div = $('#explosionOne');
    div.css('top', enemyOneY);
    div.css('left', enemyOneX);
    // Animate jquery expanded a div and decrease opacity velocity slow
    div.animate({ width: 200, opacity: 0 }, 'slow');
    // After run explosion remove explosin in 1s
    let timeExplosion = window.setInterval(removeExplosion, 1000);

    function removeExplosion() {
      // Remove div and set interval
      div.remove();
      window.clearInterval(timeExplosion);
      // For confirm
      timeExplosion = null;
    }
  }

  // Reposition enemy two
  function repositionEnemyTwo() {
    // Enemy will only be repositioned after 5 seconds..

    var timeColisionFour = window.setInterval(repositionFour, 5000);

    function repositionFour() {
      window.clearInterval(timeColisionFour);
      timeColisionFour = null;
      // Enemy will only be repositioned if the game is not over yet
      if (endGame == false) {
        $('#backgroundGame').append('<div id=enemyTwo></div');
      }
    }
  }

  function explosionTwo(enemyTwoX, enemyTwoY) {

     // Sound Explosion
     explosionSound.play();

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

  // After remove respawn ally in 6s
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

    //When ally dead
    lostSound.play()

    // Create a div whith class animationFour
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

  
  // This variable will identify the end of the game, preventing elements and events from occurring at this stage
  let endGame = false;
}
