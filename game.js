
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var gameInProgress = false;

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

// On click listener handler Button flash animation and clicked
$(".btn").on("click", function() {
  // console.log($(this).attr("id"));
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  // Check answer for each click
  checkAnswer();

});

// Check user input
function checkAnswer() {
  var btnCount = userClickedPattern.length;

  // Wrong answer
  if (userClickedPattern[btnCount-1] != gamePattern[btnCount-1]) {
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").html("Game over, press any key to restart");

    startOver();
  }
  // Correct answer
  else {
    // If last button of round, go to next round
    if (userClickedPattern.length === level) {
      userClickedPattern.length = 0;
      //// TODO: pause time delay
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
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

// Reset values after losing game
function startOver() {
  gamePattern = [];
  level = 0;
  gameInProgress = false;
}
