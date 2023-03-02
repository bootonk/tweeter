$(document).ready(function() {
  // default states
  $( ".new-tweet" ).hide();
  $( ".error " ).hide();
  $( ".scroll-container" ).hide();

  // toggle tweet form with write tweet nav text
  $( ".toggle-form" ).click(function() {
    if ( $( ".new-tweet" ).is(":visible")) {
      $( ".new-tweet" ).toggle( "slow" );
      $( ".right-nav p" ).text( "Write a new tweet" );
      $(this).find($(".fa-solid")).removeClass('fa-angles-up').addClass('fa-angles-down');
    } else {
      $( ".new-tweet" ).toggle( "slow" );
      $( "#post-tweet textarea").focus();
      $( ".right-nav p" ).text( "Hide tweet poster" );
      $(this).find($(".fa-solid")).removeClass('fa-angles-down').addClass('fa-angles-up');
    }
  })

  $(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
        $( ".scroll-container" ).show();
    } else {
        $( ".scroll-container" ).hide();
    }
});

  $( ".scroll-container" ).click(function() {
    if ( $( ".new-tweet" ).is(":visible")) {
      $( "#post-tweet textarea").focus();
    } else {
      $( ".new-tweet" ).toggle( "slow" );
      $( "#post-tweet textarea").focus();
      $( ".right-nav p" ).text( "Hide tweet poster" );
      $(this).find($(".fa-solid")).removeClass('fa-angles-down').addClass('fa-angles-up');
    }
  })
});