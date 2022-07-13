var buttoncolors=[ "red", "blue", "green", "yellow" ];

var gamepattern = [];
var userClickedPattern =[];
var started = false;
var level =0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+ level);
    newseq();
    started = true ;
  }
});


$(".btn").click(
function (){
var userChosenColor = $(this).attr("id");

userClickedPattern.push(userChosenColor);
console.log(userClickedPattern);
gameSound(userChosenColor);
animatePress(userChosenColor);
checkAnswer(userClickedPattern.length-1);
});

function startOver(){
  level =0;
  started =false;
  gamepattern=[];
}
function checkAnswer(currlevel){
if(gamepattern[currlevel]===userClickedPattern[currlevel]){
  console.log("success");
  if(userClickedPattern.length===gamepattern.length){
    setTimeout(function(){
      newseq();
    },1000);
  }
}
else{

  $("#level-title").text("Game Over, Press Any Key to Restart");
gameSound("wrong");
$("body").addClass("game-over");
setTimeout(function(){
  $("body").removeClass("game-over");
},200);
startOver();
}
}

function  newseq(){
  userClickedPattern=[];
  level ++;
  $("#level-title").text("Level "+ level);

  var randomnum= Math.floor((Math.random()*4));
  var randomChosenColor = buttoncolors[randomnum];
  gamepattern.push(randomChosenColor);

  $("#" + randomChosenColor).delay(100).fadeOut().fadeIn('slow');
  //samajh nhi aaya
gameSound(randomChosenColor);


}
function gameSound(name){
  var audio = new Audio("sounds/"+ name +".mp3" );
  audio.play();
}


function animatePress(currentColour){
$("#"+ currentColour).addClass("pressed");
setTimeout(function(){
  $("#"+ currentColour).removeClass("pressed");
},100);
}
