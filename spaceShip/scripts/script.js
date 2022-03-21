// SpaceShip game project..

function start() {
  $('#msgStart').hide();
  // on stared hide msg and make this:
  $('#backgroundGame').append("<div id='player' class='animationOne'></div>");
  $('#backgroundGame').append("<div id='enemyOne' class='animationTwo'></div>");
  $('#backgroundGame').append("<div id='enemyTwo'></div>");
  $('#backgroundGame').append("<div id='ally' class='animationThree' ></div>");
}
const msgStart = document.getElementById('msgStart');
const startEvent = msgStart.addEventListener('click', start);

// Background of  game

let game = {};

//Game Loop

// set interval is a function that run a loop every interval
// run the loop every 30ms
game.timer = setInterval(loop, 30);

// Move the background of game

function loop() {
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
  // run a movement random whith enemy two

  enemyMovementTwo();
  moveAlly();
}

// Move player

//  get a value decimal of key
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
    var top = parseInt($('#player').css('top'));
    $('#player').css('top', top - 10);

    // Limit of helicopter player move (top)

    if (top <= 10) {
      $('#player').css('top', top + 10);
    }
  }

  // move down
  if (game.press[KEY.S]) {
     var top = parseInt($('#player').css('top'));
    $('#player').css('top', top + 10);

    // Limit of helicopter player move (top)

    if (top >= 414) {
      $('#player').css('top', top - 10);
    }
  }

  // move right
  if (game.press[KEY.D]) {
   var  left = parseInt($('#player').css('left'));
    $('#player').css('left', left + 10);
    if (left >= 690) {
      $('#player').css('left', left - 10);
    }
  }

  // move left
  if (game.press[KEY.A]) {
    var left = parseInt($('#player').css('left'));
    $('#player').css('left', left - 10);
    if (left <= 10) {
      $('#player').css('left', left + 10);
    }
  }

  

  // Shooting
  //Key of shot
  if (game.press[KEY.F]) {
    shoot();
  }

}

// Enemy move

let enemyOnespeed = 5;

// movement occurred in axys y

let enemyMovement = parseInt(Math.random() * 334);
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

let canShoot = true;

function shoot() {
  // Can i shoot verify
  if (canShoot == true) {
    // Isn't allow shoot multiples
    canShoot = false;

    top = parseInt($('#player').css('top'));
    positionX = parseInt($('#player').css('left'));
    shootX = positionX + 190;
    topShoot = top +37;
    $('#backgroundGame').append("<div id='shoot'></div");
    $('#shoot').css('top', topShoot);
    $('#shoot').css('left', shootX);

     var timeShoot = window.setInterval(runShoot, 30);
  } //Fecha CanShoot

  function runShoot() {
    positionX = parseInt($('#shoot').css('left'));
    $('#shoot').css('left', positionX + 15);

    if (positionX > 900) {
      window.clearInterval(timeShoot);
      timeShoot = null;
      $('#shoot').remove();
      canShoot = true;
    }
  } // Fecha executashoot()
} // Fecha shoot()
