alert("Rules for the game:- The game shows the first colour in the sequence (blue). The user clicks on the blue button.Next, the game shows the next colour (red), the user has to remember the sequence is blue, red and so on and so forth.If the user messes up the sequence, then the game ends.");


var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});



$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {
        $("body").addClass("game-over");
        playSound("wrong");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Click to Restart");
        startOver();

    }

}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];

}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();

}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

