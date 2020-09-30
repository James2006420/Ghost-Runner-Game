var tower, towerImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var ghost, ghostImage;
var invisibleBlock, invisibleBlockGroup;
var gameState;
var spookySound

function preload()
{
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup()
{
  createCanvas(600, 600);
  
  spookySound.loop();
  
  tower = createSprite(300, 300);
  tower.addImage(towerImage);
  
  tower.velocityY = 5;
  
  doorGroup = new Group();
  
  climberGroup = new Group();
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.4;
  
  invisibleBlockGroup = new Group();
  
  gameState = "play";
}

function draw()
{
  background("black");
  
  if(gameState === "play")
    {
         if(tower.y > 400)
      {
        tower.y = 300;
      }

    if(keyDown("space"))
      {
        ghost.velocityY = -10;
      }

    ghost.velocityY = ghost.velocityY + 0.8;

    if(keyDown("a"))
      {
        ghost.x = ghost.x - 5;
      }

    if(keyDown("d"))
      {
        ghost.x = ghost.x + 5;
      }

    if(climberGroup.isTouching(ghost))
      {
        // ghost.collide(climberGroup);
        ghost.velocityY = 0;
      }
      
      if(ghost.y > 600 || invisibleBlockGroup.isTouching(ghost))
        {
          gameState = "end";
        }

        spawnDoor();

        spawnClimber();

        drawSprites();
    }
  
  if(gameState === "end")
    {
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("GAME OVER", 300, 300);
    }
  
}

function spawnDoor()
{
  if(frameCount%100 === 0)
    {
     door = createSprite(200, -50) 
     door.addImage(doorImage);
     door.velocityY = 5;
     door.x = Math.round(random(120, 400));
     door.lifetime = 140
     doorGroup.add(door);
    
     ghost.depth = door.depth;
     ghost.depth++;
    }
}

function spawnClimber()
{
  if(frameCount%100 === 0)
    {
      climber = createSprite(200, 10);
      climber.addImage(climberImage);
      climber.velocityY = 5;
      climber.x = door.x;
      climber.lifetime = 140;
      climberGroup.add(climber);
      
      invisibleBlock = createSprite(200, 15);
      invisibleBlock.width = climber.width;
      invisibleBlock.height = 2;
      invisibleBlock.x = door.x;
      invisibleBlock.velocityY = 5;
      invisibleBlock.debug = true;
      invisibleBlockGroup.add(invisibleBlock);
     }
}