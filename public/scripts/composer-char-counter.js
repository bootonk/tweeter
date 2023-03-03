$(document).ready(function() {
  $( "#tweet-text" ).keyup(function() {
    let keyCount = 140;
    const keyPressed = $( this ).val().length;
    keyCount -= keyPressed;
    
    // add/remove class to flag invalid submission
    if (keyCount === 140) {
      $( ".counter" ).addClass("under-limit");
    } else {
      $( ".counter" ).removeClass("under-limit");
    }

    if (keyCount < 0) {
      $( ".counter" ).addClass("over-limit");
    } else {
      $( ".counter" ).removeClass("over-limit");
    }

    // update form counter
    const counterOutput = $( this ).parent().find(".counter");
    counterOutput.text(keyCount);
  });
});