var gamePattern = [];
var userClickedPatern = [];

var buttonColours = ['red', 'yellow', 'blue', 'green'];
var level = 0;
var gameStarted = true;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $('#' + randomChosenColour)
    .fadeIn(200)
    .fadeOut(200)
    .fadeIn(200);

  playSound(randomChosenColour);

  $('h1').text('Level ' + level);
  level++;
}

$('.btn').click(function () {
  var userChosenColour;
  var colorId = $(this).attr('id');
  switch (colorId) {
    case 'green':
      userChosenColour = 'green';
      break;
    case 'red':
      userChosenColour = 'red';
      break;
    case 'blue':
      userChosenColour = 'blue';
      break;
    case 'yellow':
      userChosenColour = 'yellow';
      break;
    default:
      break;
  }

  userClickedPatern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer();
});

function playSound(colour) {
  var audio = new Audio('sounds/' + colour + '.mp3');
  audio.play();
}

function animatePress(clickedColour) {
  $('#' + clickedColour).addClass('pressed');

  setTimeout(function () {
    $('#' + clickedColour).removeClass('pressed');
  }, 100);
}

$(document).keypress(function () {
  if(gameStarted)
    nextSequence();
  
    gameStarted = false;
});

function checkAnswer() {
  var match = true;
  for (var i = 0; i < userClickedPatern.length; i++) {
    if (gamePattern[i] !== userClickedPatern[i]) {
      match = false;
    }
  }
  if (match) {
    console.log('success');
    if (userClickedPatern.length == gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);

      userClickedPatern = [];
    }
  } else {
    console.log('fail');
    gameStarted = true;
    level = 0;

    //flashes red
    $("body").addClass('red');
    setTimeout(function () {
        $("body").removeClass('red');
      }, 100);

    // defeat audio
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    //resets arrays
    userClickedPatern = [];
    gamePattern = [];

    //resets title
    $("h1").text("Press Any key to play");
  }
}
