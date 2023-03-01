/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" 
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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
  // process tweets array & format each into HTML element to append
  renderTweets(data);

  // override standard form submission with ajax version
  $( "#postTweet" ).submit(function( event ) {
    event.preventDefault();

    const serializedURL = $( this ).serialize();
    $.post( "/tweets", serializedURL);
    
    $( "#tweet-text" ).val("");
  });
});