$(document).ready(function() {
  // default load states
  $( ".new-tweet" ).hide();
  $( ".error " ).hide();
  $( ".scroll-container" ).hide();

  /** update nav content for closed form context */
  const closeTheForm = function() {
    $( ".right-nav i" ).removeClass( "fa-angles-up" ).addClass( "fa-angles-down" );
    $( ".right-nav p" ).text( "Write a new tweet" );
  };

  /** update nav content for open form context */
  const openTheForm = function() {
    $( ".right-nav i" ).removeClass( "fa-angles-down" ).addClass( "fa-angles-up" );
    $( ".right-nav p" ).text( "Hide tweet builder" );
    $( "#post-tweet textarea" ).focus();
  }

  /** toggle visibility state of form */
  const toggleFormVisiblity = function() {
    $( ".new-tweet" ).toggle( "slow" );
  }

  // toggle tweet form with nav click
  $( ".toggle-form" ).click(function() {
    if ( $( ".new-tweet" ).is( ":visible" )) {
      toggleFormVisiblity();
      closeTheForm();
    } else {
      toggleFormVisiblity();
      openTheForm();
    }
  })

  // create scroll trigger for scroll container
  $(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
        $( ".scroll-container" ).show();
    } else {
        $( ".scroll-container" ).hide();
    }
});

  // when clicked, scroll to top and activate tweet form
  $( ".scroll-container" ).click(function() {
    if ( $( ".new-tweet" ).is( ":visible" )) {
      $( "#post-tweet textarea" ).focus();
    } else {
      toggleFormVisiblity();
      openTheForm();
    }
  })
});