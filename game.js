
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
// var randomNumber;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Button flash animation
    $("#" + randomChosenColor).fadeOut(40).fadeIn(40);
    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();
}


// On click listener handler Button flash animation and clicked
$(".btn").on("click", function() {

  // console.log($(this).attr("id"));
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  $("." + userChosenColor).fadeOut(40).fadeIn(40);
  var audio = new Audio("sounds/" + userChosenColor + ".mp3");
  audio.play();

});
