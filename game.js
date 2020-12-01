
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var gameInProgress = false;

// On click listener handler Button flash animation and clicked
$(".btn").on("click", function() {

  // console.log($(this).attr("id"));
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  // Check answer when last button for level is pressed
  if (userClickedPattern.length === level) {
    checkAnswer(userChosenColor);
  }
});

//Check for keyboard key press to start game
$(document).keydown(function() {
  if (!gameInProgress) {
    gameInProgress = true;
    userClickedPattern.length = 0;
    gamePattern.length = 0;
    nextSequence();
    $("#level-title").html("Level " + level);
  }
});


// Check user input
function checkAnswer(color) {
  // Right answer
  if (gamePattern[level - 1] === color) {
    userClickedPattern.length = 0;
    //// TODO: pause time delay
    setTimeout(function () {
      nextSequence();
    }, 1000);

  // Wrong answer
  } else {
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").html("Game over, press any key to restart");

  }

}


function nextSequence() {
  // Update level and heading
  level++;
  $("#level-title").html("Level " + level);

  // Choose random color
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Button press functions
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
}

// Play audio sound for button
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Button flash animation
function animatePress(currentColor) {
    $("#" + currentColor).fadeOut(40).fadeIn(40);
}
