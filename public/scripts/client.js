$(document).ready(function() {
  /**
   * build HTML for a single tweet
   * @param {*} tweetObj
   * @returns html element to be used in renderTweets()
   */
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

  /**
   * process an array of tweets to append individual tweet HTML to tweets-container
   * @param {*} tweetArr 
   */ 
  const renderTweets = function(tweetArr) {
    $( "#tweets-container" ).empty();
    for (const tweet of tweetArr) {
      const buildNewTweet = createTweetElement(tweet);
      $( '#tweets-container' ).prepend(buildNewTweet);
    }
  };
  
  /** trigger a get request to load tweets */
  const loadTweets = function() {
    $.get( "/tweets" )
    .done(function (tweetData) {
      renderTweets(tweetData);
    }).fail(function( jqXHR, textStatus, errorThrown ) {
      $( ".error p").text("Unable to load tweets, try again shortly");
      $( ".error" ).slideDown( "slow" ).delay(2000).slideUp( "slow" );
  });
  };

  /** helper function to reset character count to 140 and clear text */
  const resetForm = function() {
    $( "#tweet-text" ).val("");
    $( ".counter" ).val(140).addClass( "under-limit ");
  };

  /** helper function to display error message for 2 seconds */
  const showError = function() {
    $( ".error" ).slideDown( "slow" ).delay(2000).slideUp( "slow" );
  };

  // ajax form submission to post new tweet and add to tweet list
    $( "#post-tweet" ).submit(function( event ) {
      event.preventDefault();

      // error handling to meet post requirements
      if ($( "form output" ).hasClass( "under-limit" )) {
        $( ".error p").text("Type a letter, any letter");
        showError();

      } else if ($( "form output" ).hasClass( "over-limit" )) {
        $( ".error p").text("Cut down the word count");
        showError();

      } else {
        // happy path for posted tweet
        const serializedURL = $( this ).serialize();
        $.post( "/tweets", serializedURL)
        .done(function( data ) {
          resetForm();
          loadTweets();
        }).fail(function( jqXHR, textStatus, errorThrown ) {
          resetForm();
          $( ".error p").text("Server error, please contact support");
          showError();
        });
      }
    });

  loadTweets();
});