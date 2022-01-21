var canvas, backgroundImage;

var player, npc, npcG;
var bg, bg1;
var track;
var fuel, fuelImg;
var pcImg, pcL, pcR, npcImg;
var fuelCount=100;
var score=0;
var coin, coinImg, coinG;
var rock, rockImg;
var over, overImg;
var restart, rImg;
var win, winImg;
var gameState=0;

function preload(){
  track = loadImage("track.png");
  pcImg = loadImage("pc1.png");
  pcL = loadImage("pc1left.png");
  pcR = loadImage("pc1right.png");
  npcImg = loadImage("npc.png");
  fuelImg = loadImage("fuel.png");
  coinImg = loadImage("coin.png");
  resetImg = loadImage("reset.png");
  overImg = loadImage("game over.png");
  rImg = loadImage("Restart.png");
  rockImg = loadImage("rock.png");
  winImg = loadImage("win.png");
}

function setup(){
  canvas = createCanvas(1600, 800);

    bg = createSprite(750,400);
      bg.addImage(track);
      bg.x=width/2;

      bg1 = createSprite(800,-570);
      bg1.addImage(track);
      bg1.x=width/2;
      

    player = createSprite(765,700,10,20);
      player.addImage(pcImg);

      over = createSprite(800,400);
      over.addImage(overImg);

      win = createSprite(800,300);
      win.addImage(winImg);

      restart = createSprite(800, 600);
      restart.addImage(rImg);

      npcG = new Group();
      fuelG = new Group();
      coinG = new Group();
      rockG = new Group();
}


function draw(){
  background(rgb(0,0,0));
      //bg = image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);

      bg.scale = 1.5;
      bg1.scale = 1.5;

      if(gameState===0){
      
      over.visible = false;
      restart.visible = false;
      win.visible = false;

      bg.velocityY = 20;
      bg1.velocityY = 20;

      bg.scale = 1.5;
      bg1.scale = 1.5;

      if(bg.y>1260){
        bg.y=-570;
      }

      if(bg1.y>1260){
        bg1.y=-570;
      }
      
      if(keyIsDown(UP_ARROW) && player.y>0){
        player.y-=15;
      }

      if(keyIsDown(DOWN_ARROW) && player.y<800){
        player.y+=15;
      }

      if(keyIsDown(LEFT_ARROW) && player.x>450){
        player.x-=15;
        player.addImage(pcL);
      }
      
      else if(keyIsDown(RIGHT_ARROW) && player.x<1150){
        player.x+=15;
        player.addImage(pcR);
      }

      else{
        player.addImage(pcImg);
      }

      textSize(40);
      fill("white");
      stroke("red");
      strokeWeight(8);
      text("Fuel:" + fuelCount, 1450,350);

      textSize(40);
      fill("white");
      stroke("blue");
      strokeWeight(8);
      text("Score:" + score, 1450,50);

      spawnNPC(); 
      spawnFuel();
      fuelTank();
      spawnCoins();
      refuel();
      spawnRocks();
      scoreB();
    }

    if(gameState===1){
      bg.velocityY = 0;
      bg1.velocityY = 0;

      over.visible = true;
      restart.visible = true;

      if(mousePressedOver(restart)){
        score=0;
        fuelCount=100;
        gameState=0;
      }

      npcG.destroyEach();
      rockG.destroyEach();
      coinG.destroyEach();
      fuelG.destroyEach();
      
    }

    if(gameState===2){
      win.visible = true;
      win.scale = 2;
      restart.visible = true;

      bg.velocityY = 0;
      bg1.velocityY = 0;
      
      if(mousePressedOver(restart)){
        score=0;
        fuelCount=100;
        gameState=0;  
      }
      
      npcG.destroyEach();
      rockG.destroyEach();
      coinG.destroyEach();
      fuelG.destroyEach();

      
    }

    textSize(40);
      fill("white");
      stroke("red");
      strokeWeight(8);
      text("Fuel:" + fuelCount, 1450,350);

      textSize(40);
      fill("white");
      stroke("blue");
      strokeWeight(8);
      text("Score:" + score, 1430,50);

      drawSprites();
}

function spawnNPC(){
  if(frameCount%60===0){
    npc=createSprite(random(450,1150),-5);
    npc.addImage(npcImg);
    npc.velocityY = 20;
    npcG.add(npc);
    npcG.setLifetimeEach(45);
  }

  if(player.isTouching(npcG)){
    score-=10;
    npcG.destroyEach();
  }

  
}

function spawnFuel(){
  if(frameCount%190===0){
    fuel=createSprite(random(450,1150),-5);
    fuel.addImage(fuelImg);
    fuel.velocityY = 20;
    fuelG.add(fuel);
    fuelG.setLifetimeEach(45);
  }
}

function fuelTank(){
  if(frameCount%5===0){
    fuelCount = fuelCount-1;
  }

  if(fuelCount<0){
    fuelCount=0;
  }
}

function refuel(){
  if(player.isTouching(fuelG)){
    fuelCount=100;
    fuelG.destroyEach();
  }

  if(fuelCount===0){
    gameState=1;
  }
}

function spawnCoins(){
  if(frameCount%300===0){
    coin = createSprite(random(450,1150), -5);
    coin.addImage(coinImg);
    coin.velocityY = 20;
    coinG.add(coin);
    coinG.setLifetimeEach(45);
    }

  if(player.isTouching(coinG)){
    score+=10;
    coinG.destroyEach();
  }  
}

function scoreB(){
  if(frameCount%20===0 && fuelCount>0){
    score+=1;
  }

  if(score<0){
    score=0;
  }

  if(score>50){
    score=50;
  }
  
  if(score===50){
    gameState=2;
  }
}

function spawnRocks(){
  if(frameCount%50===0){
  rock = createSprite(random(450,1150),-10, 96,96);
  rock.addImage(rockImg);
  rock.velocityY = 20;
  rockG.add(rock);
  rockG.setLifetimeEach(45);
  }

  if(player.isTouching(rockG)){
    rockG.destroyEach();
    rockG.velocityY=0;
    gameState=1;
  }
}
