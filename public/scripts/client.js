/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const renderTweets = function(tweetArr) {
  for (const tweet of tweetArr) {
    const buildNewTweet = createTweetElement(tweet);
    const appendNewTweet = $('#tweets-container').append(buildNewTweet);
  }
};

const createTweetElement = function(tweetObj) {
  const newArticle = $("<article>").addClass("tweet");
  
  const newHeader = `
        <header>
          <div class="left-header">
            <img src="${tweetObj.user.avatars}">
            <p>${tweetObj.user.name}</p>
          </div>
          <div class="right-header">
            <p>${tweetObj.user.handle}</p>
          </div>
        </header>`;

  const newBody = $("<p>").addClass("content").text(tweetObj.content.text);
  
  const newFooter = `
        <footer>
          <p>${tweetObj.created_at}</p>
          <div class="footer-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>`

  newArticle.append(newHeader);
  newArticle.append(newBody);
  newArticle.append(newFooter);

  return newArticle;
};

$(document).ready(function() {
  // override standard form submission with ajax version
  $( "#post-tweet" ).submit(function( event ) {
    event.preventDefault();

    const serializedURL = $( this ).serialize();
    $.post( "/tweets", serializedURL);
    
    $( "#tweet-text" ).val("");
  });

  // load tweets from external server
  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: "/tweets",
      success: (responseData) => { renderTweets(responseData) },
      error: (err) => { console.log("ah ah ahhhh", err.message) }
    })
  };

  loadTweets();

});