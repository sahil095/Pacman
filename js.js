var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = 600;
canvas.height = 400;

mainImage = new Image();
mainImage.ready = false;
mainImage.onload = checkReady;
mainImage.src = "pac.png"

var score = 0;
var gscore = 0;

var player = {
	x : 50,
	y : 50,
	pacmouth : 320,
	pacdir : 0,
	psize : 40,
	speed : 2
}
var enemy = {
	x : 200,
	y : 150,
	speed : 2
}

var keyclick = {};
document.addEventListener("keydown", function (event) {
	keyclick[event.keyCode]=true;
	move(keyclick);
}, false);

document.addEventListener("keydown", function (event) {
	delete keyclick[event.keyCode];
}, false);

function move(keyclick) {
	if(37 in keyclick){
		player.x -= player.speed;
		player.pacdir = 64;
	}
	if(38 in keyclick){
		player.y -= player.speed;
		player.pacdir = 96;
	}
	if(39 in keyclick){
		player.x += player.speed;
		player.pacdir = 0;
	}
	if(40 in keyclick){
		player.y += player.speed;
		player.pacdir = 32;
	}

	if(player.x >= (canvas.width-32)){player.x=0;}
	if(player.y >= (canvas.height-32)){player.y=0;}
	if(player.x < 0){player.x = (canvas.width-32);}
	if(player.y < 0){player.y = (canvas.height-32);}
	if(player.pacmouth == 320){player.pacmouth=352;}
	else{player.pacmouth = 320;}
	render();
}

function checkReady() {
	this.ready = true;
	playgame();
}

function playgame() {
	render();
	requestAnimationFrame(playgame);
}

function render() {
	ctx.fillStyle = "black";
	ctx.fillRect(0,0, canvas.width, canvas.height); 

	ctx.font = "20px Verdana";
	ctx.fillStyle = "white";
	ctx.fillText("Pacman: " + score+" vs Ghost:"+gscore, 2,18);

	ctx.drawImage(mainImage, 0, 0, 32, 32, enemy.x, enemy.y, 32,32);
	ctx.drawImage(mainImage, player.pacmouth, player.pacdir, 32, 32, player.x, player.y, player.psize,player.psize);
}

