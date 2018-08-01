	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
	canvas.width = 600;
	canvas.height = 400;
	mainImage = new Image();
	mainImage.ready = true;
	mainImage.src = "pac.png";
	var btn = document.getElementById("button");
	var res = document.getElementById("again");
	res.style.visibility = "hidden";

	var score = 0;
	var gscore = 0;
	var ghost = false;
	var ghost2 = false;
	var countblink = 10;
	var mouth = 3;

	var player = {
		x : 50,
		y : 50,
		pacmouth : 320,
		pacdir : 0,
		psize : 40,
		speed : 5
	}
	var enemy = {
		x : 200,
		y : 150,
		speed : 2,
		moving : 0,
		dirx : 0,
		diry : 0,
		flash : 0,
		ghosteat : false
	}
	var enemy2 = {
		x : 200,
		y : 150,
		speed : 2,
		moving : 0,
		dirx : 0,
		diry : 0,
		flash : 0,
		ghosteat : false
	}
	var powerdot = {
		x : 10,
		y : 10,
		powerup : false,
		pCountDown : 0,
		ghostNum : 0,
		ghostNum2 : 0
	}

	//Moving Player
	var keyclick = {};
	document.addEventListener("keydown", function (event) {
		keyclick[event.keyCode]=true;
		move(keyclick);
	}, false);

	document.addEventListener("keydown", function (event) {
		delete keyclick[event.keyCode];
	}, false);

	//move player
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

		//slow down the mouth movement
		if(mouth>0){
			mouth--;
		}
		else{
			mouth = 3;
			if(player.pacmouth == 320){
				player.pacmouth=352;
			}
			else{
				player.pacmouth = 320;
			}	
		}
		render();
	}

	function removeCanvas(){
		ctx.clearRect(0,0,canvas.width, canvas.height);
		mainImage = null;
	}

	function onRestart(){
		document.location.reload();
	}

	function onStart(){
		playgame();
		btn.style.visibility = "hidden";
	}

	function playgame() {
		render();
		requestAnimationFrame(playgame);
	}

	function myNum(n){
		return Math.floor(Math.random()*n);
	}

	//draw on canvas
	function render() {
		ctx.fillStyle = "black";
		ctx.fillRect(0,0, canvas.width, canvas.height); 

		//check if powerdot is on screen
		if(!powerdot.powerup && powerdot.pCountDown < 5){
			powerdot.x = myNum(420)+30;
			powerdot.y = myNum(250)+30;
			powerdot.powerup = true;
		}

		//check if ghost is on screen
		if(!ghost){
			enemy.ghostNum = myNum(5)*64;
			enemy.x = myNum(450);
			enemy.y = myNum(250)+30;
			ghost = true;
		}
		if(!ghost2){
			enemy2.ghostNum = myNum(5)*64;
			enemy2.x = myNum(450);
			enemy2.y = myNum(250)+30;
			ghost2 = true;
		}

		//move enemy 1
		if(enemy.moving < 0){
			enemy.moving = (myNum(20)*3)+myNum(1);
			enemy.speed = myNum(2)+1;
			enemy.dirx = 0;
			enemy.diry = 0;

			if(powerdot.ghosteat){enemy.speed = enemy.speed*-1}
			if(enemy.moving % 2){
				if(player.x < enemy.x){
					enemy.dirx = -enemy.speed;
				}else{
					enemy.dirx = enemy.speed;
				}
			}else{
				if(player.y < enemy.y){
					enemy.diry = -enemy.speed;
				}else{
					enemy.diry = enemy.speed;
				}
			}
		}
		enemy.moving--;
		enemy.x = enemy.x + enemy.dirx;
		enemy.y = enemy.y + enemy.diry;

		if(enemy.x >= (canvas.width-32)){enemy.x=0;}
		if(enemy.y >= (canvas.height-32)){enemy.y=0;}
		if(enemy.x < 0){enemy.x = (canvas.width-32);}
		if(enemy.y < 0){enemy.y = (canvas.height-32);}


		//move enemy 2
		if(enemy2.moving < 0){
			enemy2.moving = (myNum(20)*3)+myNum(1);
			enemy2.speed = myNum(2)+1;
			enemy2.dirx = 0;
			enemy2.diry = 0;

			if(powerdot.ghosteat){enemy.speed = enemy2.speed*-1}
			if(enemy2.moving % 2){
				if(player.x < enemy2.x){
					enemy2.dirx = -enemy2.speed;
				}else{
					enemy2.dirx = enemy2.speed;
				}
			}else{
				if(player.y < enemy2.y){
					enemy2.diry = -enemy2.speed;
				}else{
					enemy2.diry = enemy2.speed;
				}
			}
		}
		enemy2.moving--;
		enemy2.x = enemy2.x + enemy2.dirx;
		enemy2.y = enemy2.y + enemy2.diry;

		if(enemy2.x >= (canvas.width-32)){enemy2.x=0;}
		if(enemy2.y >= (canvas.height-32)){enemy2.y=0;}
		if(enemy2.x < 0){enemy2.x = (canvas.width-32);}
		if(enemy2.y < 0){enemy2.y = (canvas.height-32);}


		//Collision detection ghost 1
		if(player.x <= (enemy.x+26) && enemy.x <= (player.x+26) && player.y <= (enemy.y+26) && enemy.y <= (player.y+32)){
			if(powerdot.ghosteat){
				score++;
			}else{
				gscore++;
			}
			player.x = 10;
			player.y = 100;
			enemy.x = 300;
			enemy.y = 200;
			powerdot.pCountDown = 0;
		}

		//Collision detection ghost 2
		if(player.x <= (enemy2.x+26) && enemy2.x <= (player.x+26) && player.y <= (enemy2.y+26) && enemy2.y <= (player.y+32)){
			if(powerdot.ghosteat){
				score++;
			}else{
				gscore++;
			}
			player.x = 10;
			player.y = 100;
			enemy2.x = 300;
			enemy2.y = 200;
			powerdot.pCountDown = 0;
		}


		//Collision detection powerup
		if(player.x <= powerdot.x && powerdot.x <= (player.x+32) && player.y <= powerdot.y && powerdot.y <= (player.y+32)){
			powerdot.powerup = false;
			powerdot.pCountDown = 500;
			powerdot.ghostNum = enemy.ghostNum;
			powerdot.ghostNum2 = enemy2.ghostNum;
			enemy.ghostNum = 384;
			enemy2.ghostNum = 384;
			powerdot.x = 0;
			powerdot.y = 0;
			powerdot.ghosteat = true;
			player.speed = 10;
			enemy2.speed = 1.5;
			enemy.speed = 1.5;
		}

		//powerup countdown
		if(powerdot.ghosteat){
			powerdot.pCountDown--;
			if(powerdot.pCountDown <= 0){
				powerdot.ghosteat = false;
				enemy.ghostNum = powerdot.ghostNum;
				enemy2.ghostNum = powerdot.ghostNum2;
				player.speed = 5;
			}
		}

		//draw powerup dot 
		if(powerdot.powerup){
			ctx.fillStyle = "#ffffff";
			ctx.beginPath();
			ctx.arc(powerdot.x, powerdot.y, 10, 0, Math.PI*2, true);
			ctx.closePath();
			ctx.fill();
		}

			//enemy blinking
			if(countblink>0){
				countblink--;
			}
			else{
				countblink = 20;
				if(enemy.flash == 0){
					enemy.flash = 32;	enemy2.flash = 32;
				}
				else{
					enemy.flash = 0;	enemy2.flash = 0;
				}
			}
			
		//write score
		ctx.font = "20px Verdana";
		ctx.fillStyle = "white";
		ctx.fillText("Pacman: " + score+" vs Ghost:"+gscore, 2,18);

		//check who wins
		if(gscore == 3 || score == 3){
			removeCanvas();
			res.style.visibility = "visible";
			if(gscore > score){
				ctx.textAlign = "center";
				ctx.fillStyle = "";
				ctx.fillText("Ghost wins", 300, 18);
				
			}
			else{
				ctx.fillStyle = "";
				ctx.fillText("Pacman wins",300, 18);
			}
		}

		//draw characters
		ctx.drawImage(mainImage, enemy2.ghostNum, enemy2.flash, 32, 32, enemy2.x, enemy2.y, 32,32);
		ctx.drawImage(mainImage, enemy.ghostNum, enemy.flash, 32, 32, enemy.x, enemy.y, 32,32);
		ctx.drawImage(mainImage, player.pacmouth, player.pacdir, 32, 32, player.x, player.y, player.psize,player.psize);
	}