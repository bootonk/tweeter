/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // build HTML for tweet
  const createTweetElement = function(tweetObj) {
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
  
    const tweetElement = `
    <article class="tweet">
      <header>
        <div class="left-header">
          <img src="${tweetObj.user.avatars}">
          <p>${tweetObj.user.name}</p>
        </div>
        <div class="right-header">
          <p>${tweetObj.user.handle}</p>
        </div>
      </header>
      <p class="content">${escape(tweetObj.content.text)}</p>
      <footer>
        <p>${timeago.format(tweetObj.created_at)}</p>
        <div class="footer-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
    `
    return tweetElement;
  };

  // process each tweet in the database and create HTML for each
  const renderTweets = function(tweetArr) {
    $( "#tweets-container" ).empty();
    for (const tweet of tweetArr) {
      const buildNewTweet = createTweetElement(tweet);
      $( '#tweets-container' ).prepend(buildNewTweet);
    }
  };
  
  // load tweets from external server
  const loadTweets = function() {
    $.get( "/tweets" )
    .done(function (tweetData) {
      renderTweets(tweetData);
    }).fail(function( jqXHR, textStatus, errorThrown ) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown );
  });
  };

  const resetForm = function() {
    $( "#tweet-text" ).val("");
    $( ".counter" ).val(140).addClass( "under-limit ");
  };

  // ajax form submission to post new tweet and add to tweet list
    $( "#post-tweet" ).submit(function( event ) {
      event.preventDefault();

      // error handling to meet post requirements
      if ($( "form output" ).hasClass( "under-limit" )) {
        $( ".error p").text("Type a letter, any letter");
        $( ".error" ).slideDown( "slow" );

      } else if ($( "form output" ).hasClass( "over-limit" )) {
        $( ".error p").text("Cut down the word count");
        $( ".error" ).slideDown( "slow" );

      } else {
        $( ".error" ).slideUp( "slow" );

        // happy path for posted tweet
        const serializedURL = $( this ).serialize();
        $.post( "/tweets", serializedURL)
        .done(function( data ) {
          resetForm()
          loadTweets();
        }).fail(function( jqXHR, textStatus, errorThrown ) {
          console.log(jqXHR);
          console.log(textStatus);
          console.log(errorThrown );
        });  
      }
    });

  loadTweets();
});