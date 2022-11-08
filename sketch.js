var asteroid;
var bullet;
var score = 0;
var bullets = 60;

var gameState = "fight"



function preload(){
  bgImg=loadImage("assets/bg.jpeg");
  shipImg=loadImage("assets/ship.png");
  stoneImg=loadImage("assets/stone.png");
  bulletImg=loadImage("assets/bullet.webp")
  winImg=loadImage("assets/win.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  bg=createSprite(displayWidth/2,displayHeight/2,30,30);
  bg.addImage(bgImg)
  bg.scale=0.9

  // creating spaceship;

  spaceship=createSprite(displayWidth-1160,displayHeight-260,50,50);
  spaceship.addImage(shipImg);
  spaceship.scale=0.4

  asteroidGroup = createGroup();
  bulletGroup = createGroup();


  
}

function draw() {


  if(gameState === "fight"){
 
  if(score==55){
    gameState = "won"
  }
  if(spaceship.isTouching(asteroidGroup)){
    for(var i=0; i<asteroidGroup.length;i++){
       if(asteroidGroup[i].isTouching(spaceship)){
         asteroidGroup[i].destroy();
       }
    }
      gameState = "lost"
 }
  if(bullets==0){
    gameState = "bullet"
  }

}

  if(keyWentDown("space")){
    bullet=createSprite(spaceship.x,displayHeight-250,20,10)
    bullet.addImage(bulletImg);
    bullet.scale=0.2
     bullet.velocityY=-20;
     bulletGroup.add(bullet);
     bullets = bullets-1

     //change the depth of bullet;
     bullet.depth=spaceship.depth;
     spaceship.depth=spaceship.depth+2
  }

  if(keyDown("LEFT_ARROW")){
    spaceship.x=spaceship.x-25;   
  }
  if(keyDown("RIGHT_ARROW")){
    spaceship.x=spaceship.x+25;
 
  }

  if(spaceship.isTouching(asteroidGroup)){
    for(var i=0; i<asteroidGroup.length;i++){
       if(asteroidGroup[i].isTouching(spaceship)){
         asteroidGroup[i].destroy();
       }
    }
 }

 if(asteroidGroup.isTouching(bulletGroup)){
  for(var i=0;i<asteroidGroup.length;i++){     
      
   if(asteroidGroup[i].isTouching(bulletGroup)){
        asteroidGroup[i].destroy()
        bulletGroup.destroyEach()

        score = score+2

   }
  }
}
  asteroidA();
  drawSprites();


  textSize(20)
  fill("white")
  text("Score = " + score,displayWidth-200,displayHeight-750)
  text("Bullets = " + bullets,displayWidth-210,displayHeight-720)

  if(gameState == "lost"){
  
    textSize(100)
    fill("red")
    text("You Lost ",400,400)
    asteroidGroup.destroyEach();
    player.destroy();
    asteroidGroup.destroyEach();

  
  }
  if(gameState == "won"){
 
    bg.addImage(winImg)
    bg.scale=0.3
    asteroidGroup.destroyEach();
    spaceship.destroy();
    // asteroidGroup.destroyEach();


}

 if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  asteroidGroup.destroyEach();
  spaceship.destroy();
  asteroidGroup.destroyEach();

}
}




function asteroidA(){
  if(frameCount%60==0){
    asteroid=createSprite(random(width-1150,width-100),random(50,50),20,20);
    asteroid.velocityY=3
    asteroid.addImage(stoneImg);
    asteroid.scale=0.2;
    asteroid.lifetime=500;
    asteroid.lifetime = 400

    asteroidGroup.add(asteroid);
  }
}