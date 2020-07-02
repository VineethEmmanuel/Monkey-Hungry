//Global Variable
var MonkeyImage;
var bananaImage,bananaGroup;
var obstacleImage,obstaclesGroup;
var backgroundImg;
var score

function preload (){
  MonkeyImage = loadAnimation("Monkey_03.png","Monkey_02.png","Monkey_01.png","Monkey_10.png","Monkey_08.png","Monkey_09.png","Monkey_07.png","Monkey_05.png","Monkey_06.png","Monkey_04.png");
  
  jungle = loadImage("jungle.jpg");
  
  bananaImg = loadImage("Banana.png");
  
  stoneImage = loadImage("stone.png");
}
function setup() {
  createCanvas(600, 200);
  
  backgroundImg = createSprite(300,-200,600,200);
  backgroundImg.addImage(jungle);
  backgroundImg.scale = 2;
  backgroundImg.velocityX = -10;
  
  Monkey = createSprite(50,130,20,50);
  Monkey.addAnimation("runningAni",MonkeyImage);
  Monkey.scale = 0.14;
  
  banana = createSprite(600,315);
  stone = createSprite(600,175);
  banana.visible = false;
  stone.visible = false;
  
  invisibleGround = createSprite(300,210,900,50);
  invisibleGround.visible = false;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(220);
  
  stone.setCollider("circle",0,0,40);
  banana.setCollider("circle",0,0,40);
  
  if (backgroundImg.x < -390){
      backgroundImg.x = backgroundImg.width/2;
  }
  if (keyDown("space") && Monkey.y>=110){
  Monkey.velocityY = -10;  
  }
  
  Monkey.velocityY = Monkey.velocityY + 0.8;
  
  Monkey.collide(invisibleGround);
  
  if(keyDown("space") && Monkey.y >= 290){
      Monkey.velocityY = -25 ; 
    }
  
  if(score % 10 === 0){
      switch(score){
       case 10:Monkey.scale = 0.16;
       break;
       case 20:Monkey.scale = 0.18;
       break;
       case 30:Monkey.scale = 0.20;
       break;
       case 40:Monkey.scale = 0.22;
       break;
       default:break; 
  }}
  
  if(Monkey.isTouching(bananaGroup)){
   bananaGroup.destroyEach(); 
   score = score + 2;
  }
  
  if(Monkey.isTouching(obstaclesGroup)){
   obstaclesGroup.destroyEach();
   bananaGroup.destroyEach(); 
    backgroundImg.velocityX = 0;
    Monkey.visible = false;
  }
  
    food();
    stones();
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("black");
  text("Score: "+ score,500,50);
}
function food(){
  if (frameCount % 80 === 0) {
    banana.visible = true;
    banana.addAnimation("Banana",bananaImg);
    banana.scale=0.05;
    banana.velocityX = -5;
    banana.y=random(50,100);
    banana.lifetime=120;
    bananaGroup.add(banana);
  }
}
function stones(){
  if (frameCount % 200 === 0){
    stone.visible = true
    stone.addAnimation("Stone",stoneImage);
    stone.scale = 0.11;
    stone.velocityX = -5;
    stone.lifetime=120;
    obstaclesGroup.add(stone);
  }
}