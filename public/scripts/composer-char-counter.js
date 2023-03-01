$(document).ready(function() {
  $( "#tweet-text" ).keyup(function(event) {
    let keyCount = 140;
    const keyPressed = $( this ).val().length;

    if (keyCount < 140 && event.keyCode === 8) {
      keyCount += keyPressed;
    }

    keyCount -= keyPressed;
    
    if (keyCount < 0) {
      $( ".counter" ).addClass("over-limit");
    } else {
      $( ".counter" ).removeClass("over-limit");
    }

    const counterOutput = $( this ).parent().find(".counter");
    const updateCounter = counterOutput.text(keyCount);

  });

});