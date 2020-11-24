//Create variables here
var canvas,backgroundImage
var database

var dogstand,foodStock,fooddata,dogsit
var feed,addFood,milkImage
var fedTime,lastFed,currentTime
var foodObj
function preload()
{
	//load images here
dogstand=loadImage("images/dogImg.png")
dogsit=loadImage("images/dogImg1.png")
milkImage=loadImage("images/Milk.png")
}

function setup() {
  canvas=createCanvas(1500,500)
  foodObj = new Food()
  dog=createSprite(400,350,50,50)
  dog.addImage(dogstand)
  dog.scale=0.15
  
  
  
  
// create sprite

foodStock=database.ref("Food")
foodStock.on("value",readStock)
 textSize(20)

fedTime=database.ref("FeedTime")
fedTime.on("value",function(data){
  lastFed=data.val()
})

Feed=createButton("Feed The Dog")
Feed.position(700,95)
Feed.mousePressed(feedDog)

addFood = createButton("Add Food")
addFood.position(800,95)
addFood.mousePressed(addFoods)







}

function draw() {  
background(46,139,87)
textSize(15)
fill("black")

if(lastFed>12){
  text("last feed: "+lastFed%12+"PM",450,30)
}
else if(lastFed==0){
  text("last feed: 12 AM",350,30)
}

if(keyDown(UP_ARROW)){
  writeData(fooddata)
  dog.addImage(dogsit)
  }
foodObj.display()
  drawSprites();
  //add styles here

}

function readStock (data){
fooddata=data.val()
}

function writeData(x){
if (x <= 0){
  x=0
}
else{
  x=x-1
} 
database.ref("/").update({
  Food:x
})
}