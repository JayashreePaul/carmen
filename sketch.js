//c10 Student Activity
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var carm, carm_running,edges;
var groundImage;
var bg, backgroundImg;
var obstaclesGroup;
var car, carImg;
var gameOver,gameOverImg;
var restart,restartImg;
var score;

function preload(){
  carm_running = loadAnimation("carm.1.png","carm2.png","carm3.png","carm4.png","carm5.png")
  groundImage = loadImage("ground2.png")
 backgroundImg = loadImage("bg.png")
 obstacle1 = loadImage("drone.png");
 obstacle2 = loadImage("papertar.png");
 obstacle3 = loadImage("paperstar2.png");
 carImg = loadImage("acme car.png");
 gameOverImg = loadImage("gameOver.png"); 
 restartImg = loadImage("restart.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);

 carm = createSprite(windowWidth/2+100,windowHeight-200,100,50);
 carm.addAnimation("running", carm_running);
 carm.scale = 0.75;

 car = createSprite(windowWidth/2-700,windowHeight-90,100,100)
 car.addImage(carImg);
 car.scale = 0.75

 bg = createSprite(windowWidth/2,windowHeight/2,1700,500)
 bg.x = windowWidth/2;

 bg.addImage(backgroundImg);
 bg.scale = 9;
 bg.velocityX=-2
 
   obstaclesGroup= new Group();

   carm.setCollider("circle",-70,60,150);
   carm.debug = true;
   
   score = 0
   gameOver = createSprite(250,80,50,20);
   gameOver.addImage(gameOverImg);
   gameOver.scale=0.5;
   restart = createSprite(250,130,50,20);
   restart.addImage(restartImg);
  restart.scale=0.5;

}
function draw() {

  background("grey");
  
  text("Score: "+ score, 10,50);
 
  if(gameState === PLAY){
   
    bg.depth=carm.depth
 carm.depth=carm.depth+1;
  
    if (keyDown("space")){
      carm.y = carm.y-70;
      carm.velocityY= -2;

  } 
  carm.y= carm.y+2;
   
    bg.velocity.x = -4;
   
    score = score + Math.round(frameCount/600);

    if (bg.x < 0){
      bg.x = bg.width/2;
     }
     console.log(bg.x)
     
   
     
    
    
   
   // carm.position.y =  World.mouse.position.y
    
   spawnObstacles();
    
    ///if(obstaclesGroup.isTouching(carm)){
        //gameState = END;
       //carm.changeAnimation("carm1.png")
   // }
      gameOver.visible= false;
      restart.visible= false;
  }
  else if (gameState === END) {
    bg.velocity.x = 0;
   
   obstaclesGroup.setVelocityXEach(0);
   
   obstaclesGroup.setLifetimeEach(-1);
   

   gameOver.visible= true;
   restart.visible= false;
  

 }

 
  
  drawSprites();
  
}
function spawnObstacles(){
  
 
  if(frameCount%250===0){
  
  obstacles= createSprite(windowWidth,windowHeight-100,10,40)
  obstacles.position.y=Math.round(random(windowHeight-90,windowHeight-250))
  obstacles.velocity.x=-4 ;
  
  
  
  
  
  var r= Math.round(random(1,3))
  switch(r){
            case 1:obstacles.addImage(obstacle1)
            break;
            case 2:obstacles.addImage(obstacle2)
            break;
            case 3:obstacles.addImage(obstacle3)
            break;
            
            default:break;
   
  }
  obstacles.scale=0.15
  obstacles.lifetime=270;
 
  obstaclesGroup.add(obstacles);
  }
  
}
