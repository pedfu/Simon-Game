
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var firstTimeClicking = false;
var randomChosenColour;
var level = 0;

// Starting the game by pressing any key
$(document).keypress(function(event) {
  if( !firstTimeClicking ) {
    nextSequence();
  }

  firstTimeClicking = true;
});

// Adding a listener to all buttons
$(".btn").click(function ( event ) {
  var userChosenColour = event.target.id;
  userClickedPattern.push( userChosenColour );

  animatePress( userChosenColour );
  playSound( userChosenColour );

  checkingUserAnswer( userClickedPattern.length - 1 );
});

// Checking if the answer is right
function checkingUserAnswer(currentValue) {
  var isEverythingRight = true;

  if( userClickedPattern[currentValue] !== gamePattern[currentValue] ) {
    gameOver();
  } else {
    if( userClickedPattern.length === gamePattern.length ) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }

  return isEverythingRight;
}

// Finish the game and make it ready for another round
function gameOver() {
  $( "#level-title" ).text( "Game Over, Press Any Key to Restart" );

  firstTimeClicking = false;

  $("body").addClass("game-over");
  playSound("wrong");

  setTimeout( function() {
    $( "body" ).removeClass("game-over");
  }, 200);

  userClickedPattern = [];
  gamePattern = [];
  level = 0;
}

// Generates another sequence to the gamePattern
function nextSequence() {
  userClickedPattern = [];

  var randomNumber = Math.floor( Math.random() * 4 );
  level++;
  $( "#level-title" ).text( "Level " + level );

  randomChosenColour = buttonColours[ randomNumber ];
  gamePattern.push(randomChosenColour);

  $( "#" + randomChosenColour ).fadeOut(50).fadeIn(50);
  playSound( randomChosenColour );
}

// Play sound
function playSound( id ) {
  var audio = new Audio( "sounds/" + id + ".mp3" );
  audio.play();
}

// Animate
function animatePress( currentColour ) {
  $( "#" + currentColour ).fadeOut(50).fadeIn(50);
  $( "#" + currentColour ).addClass("pressed");

  setTimeout( function() {
    $( "#" + currentColour ).removeClass("pressed");
  }, 100);
}
