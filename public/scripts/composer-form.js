$(document).ready(function() {
  // default states
  $( ".new-tweet" ).hide();
  $( ".error " ).hide();

  // toggle tweet form with write tweet nav text
  $( ".toggle-form" ).click(function() {
    $( ".new-tweet" ).toggle( "slow" )
    $( "#post-tweet textarea").focus();
  })
});