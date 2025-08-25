let playerSprite;
let floor;
let jumpSwitch = false;
let backgroundImg;
let plataformas;
let gravity = 500;
let key;
let uWin;
let winSwitch = false;
let heart;
let lives = 3;
let gameOver;
let gameOverSwitch = false;

// --- NEW: Spike balls ---
let spikeBalls;
let spikeBallImg;

function preload(){
    backgroundImg = loadImage("assets/back2.png.jpg");
    uWin = loadImage("assets/uWIN.jpg.png");
    heart = loadImage("assets/heart pixel art 254x254.png");
    gameOver = loadImage("assets/gameOver.png.gif");
    spikeBallImg = loadImage("assets/obs0.png.png"); 
}

function setup() {
    new Canvas(windowWidth, windowHeight);
    playerSprite = new Sprite();
    playerSprite.addAni('standing', 'assets/standing.png.png');
    playerSprite.addAni('left','assets/walkingLeft1.png.png','assets/walkingLeft2.png.png');
    playerSprite.addAni('right','assets/walkingRight1.png.png','assets/walkingRight2.png.png')
    playerSprite.addAni('jumping', 'assets/jumping.png');
    playerSprite.width = 60;
    playerSprite.debug = false;
    playerSprite.scale = 1.5;
    playerSprite.x = 900;
    //playerSprite.gravityScale = 0.5;
    playerSprite.mass = 1;
    floor = new Sprite(width/2,windowHeight+10,windowWidth,50,STATIC);
    floor.opacity = 0;
    world.gravity.y = gravity;
    key = new Sprite();
    key.addAni('key','assets/key.png.jpg');
    key.x = 80;
    key.y = 100;
    key.static = true;
    key.scale = 0.6;

    plataformas = new Group();
    plataformas.color = 'red';
   
    while (plataformas.length < 3) {
        let plataforma = new plataformas.Sprite();
        plataforma.x = plataformas.length * 200;
        plataforma.y = plataformas.length * 120+200;
        plataforma.addAni('plataforma','assets/metalPlatform.png.jpg');
        plataforma.scale = 0.5;
        plataforma.debug = false;
        plataforma.width = 100;
        plataforma.static = true;
    }
    
    // spike ball en cada plataforma
    spikeBalls = [];
    for (let i = 0; i < 3; i++) {
        let plat = plataformas[i];
        let spike = new Sprite();
        spike.img = spikeBallImg;
        spike.width = 40;
        spike.height = 40;
        spike.scale = 0.45;
        spike.collider = 'circle';
        spike.x = plat.x; 
        spike.y = plat.y + 25; 
        spike.static = true;
        spike.debug = false;
        spikeBalls.push(spike);
    }
}

function update() {
   image(backgroundImg,0,0,windowWidth,windowHeight);
   playerSprite.rotation = 0;

//Sistema de Vidas
   if(lives == 3){
       image(heart,width-100,50,50,50);
       image(heart,width-150,50,50,50);
       image(heart,width-200,50,50,50);
   }
   if(lives == 2){
       image(heart,width-150,50,50,50);
       image(heart,width-200,50,50,50);
   }
   if(lives == 1){
       image(heart,width-200,50,50,50);
   }

   // con la spike ball
   for(let i=0; i < spikeBalls.length; i++) {
       if(playerSprite.collides(spikeBalls[i])) {
           lives -= 1;
           playerSprite.y -= 20;
       }
   }

   if(lives <= 0){
       lives = 0;
       gameOverSwitch = true;
   }

//sistema de Colisiones

    if (playerSprite.collides(floor)||playerSprite.collides(plataformas)) {
        //playerSprite.velocity.y = 0;
        jumpSwitch = true;
    }

    if(playerSprite.collides(plataformas[2])){
        plataformas[2].position.x += random(-5,5);
   
    }
    if(playerSprite.collides(plataformas[1])){
        plataformas[1].position.x += random(-5,5);
       
    }
    if(playerSprite.collides(plataformas[0])){
        plataformas[0].position.x += random(-5,5);
       
    }

    //key Interaction

    if(playerSprite.collides(key)){
        //print("Encontraste la llave!");
        winSwitch = true;
       
    }
    if(winSwitch){
        image(uWin,0,0,width,height);
        for(var i = 0;i<3;i++){
            plataformas[i].position.x = -500;
            spikeBalls[i].position.x = -1000;
        }
        key.position.x = -500;
    }
    //playerSprite.speed = 3;

    if (kb.released('d')) {
        playerSprite.changeAni('standing');
    }
    if (kb.released('a')) {
        playerSprite.changeAni('standing');
    }
    if (kb.released('w')) {
        playerSprite.changeAni('standing');
    }

    if (kb.pressing('w')&&jumpSwitch==true) {
        playerSprite.velocity.y = -50;
        playerSprite.changeAni('jumping');
        jumpSwitch = false;
       
    }  else if (kb.pressing('a')) {
        playerSprite.velocity.x = -10;
        playerSprite.changeAni('left');
    } else if (kb.pressing('d')) {
        playerSprite.velocity.x = 10;
        playerSprite.changeAni('right');
    } else {
      playerSprite.speed = 0;
    }

//Mecánica final del juego
    if(gameOverSwitch){
       image(gameOver,0,0,width,height);
       for(let i=0;i<3;i++){
           plataformas[i].x = -1000;
           spikeBalls[i].x = -1000;
       }
       key.x = -1000;
   }
}