var trex, trex_running;  
var groundImage;
var score=0
var obstacleG
var cloudsG
var gameState="startState"
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  
  groundImage = loadImage("ground2.png")
  cloudsImage = loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
 trex_collided=loadAnimation("trex_collided.png")
  game=loadImage("gameOver.png")
  restar=loadImage("restart.png")
  checkP=loadSound("checkPoint.mp3")
  Die=loadSound("die.mp3")
  Jump=loadSound("jump.mp3")
}

function setup(){
  createCanvas(600,200);
  
  
  
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  
  //creating game over sprite
  gameOver=createSprite(300,100)
  gameOver.addImage(game)
  gameOver.scale=0.40
  gameOver.visible=false
  
  
  // creating ground
  ground=createSprite(200,170,100,10)
  ground.addImage("groundImage",groundImage);
  ground.velocityX=-5
  
  //creating restart sprite
  restart=createSprite(300,125)
  restart.addImage(restar)
  restart.scale=0.40
  restart.visible=false
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
  obstacleG=new Group()
  cloudsG=new Group()
  //creating an objest below the ground
  gr = createSprite(50,180,100,10);
  
  //making gr invisible
  gr.visible=false;

}
  
function draw(){
  //set background color 
  background(280);
  if(gameState==="startState"){
    if(keyDown("space")){
      gameState="playState"
     
    }
     text("press spacebar to start",300,100)
    ground.velocityX=0
  }
  if(gameState==="playState"){
    if(keyDown("space")&&trex.y>140){
    trex.velocityY = -10;
    Jump.play();
    }
    if(score%100===0&&score>0){
      checkP.play()
    }
    if(trex.isTouching(obstacleG)){
    gameState="endState"
      trex.velocityY=-5
      Die.play()
  }
     ground.velocityX=-(5+Math.round(score/100))
    score=score+Math.round(frameCount/650)
     if(ground.x<0){
    ground.x=ground.width/2
  }
  cloud()
  obstacles()
  }
   
  else if(gameState==="endState"){
    ground.velocityX=0
    obstacleG.setVelocityXEach(0)
    cloudsG.setVelocityXEach(0)
    obstacleG.setLifetimeEach(-1)
    cloudsG.setLifetimeEach(-1)
     trex.changeAnimation("collided",trex_collided)
    gameOver.visible=true
    restart.visible=true
   
    if(mousePressedOver(restart)){
      gameState="startState"
      obstacleG.destroyEach()
      gameOver.visible=false
      restart.visible=false
      score=0
      cloudsG.destroyEach()
      trex.changeAnimation("running",trex_running)
    }
  }
   text("score "+score,500,15)
  
 
  //gravity for trex
  trex.velocityY = trex.velocityY + 0.5;
  
  //stop trex from falling down
  trex.collide(gr)
  drawSprites();
  console.log(frameCount/100)
}
function cloud(){
  if(frameCount%100===0)
    {
      
  //creating the clouds
  clouds = createSprite(700,20,100,100)
  clouds.velocityX=-5
  clouds.addImage(cloudsImage)
      
  clouds.lifetime=140
  
  //giving random height to cloud
  clouds.y=Math.round(random(10,80))
  
  //adding scale to the cloud
  clouds.scale=0.30
      
      trex.depth=clouds.depth+1
      cloudsG.add(clouds)
  
  //continuous clouds command
  if(clouds.x<0){
    clouds.x=700
  }
  
    }
  
} 

function obstacles(){
  if(frameCount%100===0){
    //creating the obstacles
    obstacle=createSprite(610,155)
  obstacle.lifetime=122
  obstacleG.add(obstacle)
  //giving the velocity to the obstacles
  obstacle.velocityX=-(5+Math.round(score/100))
    var n=Math.round(random(1,6))
    switch(n){
           case 1 : obstacle.addImage(obstacle1);
        obstacle.scale=0.6
      break
      case 2 : obstacle.addImage(obstacle2);
        obstacle.scale=0.6
          break
          case 3 : obstacle.addImage(obstacle3);
        obstacle.scale=0.6
          break
          case 4 : obstacle.addImage(obstacle4);
        obstacle.scale=0.6
          break
          case 5 : obstacle.addImage(obstacle5);
        obstacle.scale=0.5
          break
          case 6 : obstacle.addImage(obstacle6);
        obstacle.scale=0.5
          break
  }
           
  }
  }    