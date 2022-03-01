var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var started = false;

//KEYPRESS
$(this).keypress(function(event) {
  if (started != true) {
    nextSequence();
    var keyPressed = event.key;
  } else {
  }
});
//BUTTON CLICK
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});
//TRY-CATCH
function checkAnswer(currentLevel){
if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
  if(gamePattern.length===userClickedPattern.length){
  $("#level-title").text("Level " + level); //SUCESS
  level = level + 1;
  setTimeout(function(){
    nextSequence()},2000);
}
}else{
  playSound("wrong");
  $("body").addClass("game-over");//FAILURE
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("#level-title").text("GAME OVER, Press any key to restart");
  startOver(); //RESET
}
}
//FIRST/NEXT SEQUENCE
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  $("#level-title").text("Level "+level);
  started = true;
  userClickedPattern = [];
}
//ANIMATION
function animatePress(currentColour) {
  $("#" + currentColour).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 200);
}
//AUDIO
function playSound(name) {
  var audio = new Audio("sounds/" +name+ ".mp3");
  audio.play();
}
//VARIABLES RESET
function startOver(){
  level = 1;
  gamePattern = [];
  started = false;
}
