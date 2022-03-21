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
  backgroundMove();
}


// Move player 

// function movePlayer() {
	
// 	if (game.pressionado[KEY.W]) {
// 		let topo = parseInt($("#player").css("top"));
// 		$("#player").css("top",topo-10);
	
// 	}
	
// 	if (game.pressionado[KEY.S]) {
		
// 		let topo = parseInt($("#player").css("top"));
// 		$("#player").css("top",topo+10);	
// 	}
	
// 	if (game.pressionado[KEY.D]) {
		
		
// 	}

// 	} 

// função com problema..

function moveplayer() {
	
	if (game.pressionado[KEY.W]) {
		var topo = parseInt($("#player").css("top"));
		$("#player").css("top",topo-10);
	
	}
	
	if (game.pressionado[KEY.S]) {
		
		var topo = parseInt($("#player").css("top"));
		$("#player").css("top",topo+10);	
	}
	
	if (game.pressionado[KEY.D]) {
		
		//Chama fun��o Disparo	
	}
}

// The value of key is a decimal (keycode)
const KEY = {
  W: 87,
  S: 83,
  D: 68,
};


// Test key pressionado

game.pressionado = [];

$(document).keydown(function (e) {
  game.pressionado[e.which] = true;
});

$(document).keyup(function (e) {
  game.pressionado[e.which] = false;
});
