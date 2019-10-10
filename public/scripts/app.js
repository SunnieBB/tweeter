/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
$("#tweets").empty();
  for (tweet in tweets) {
    $("#tweets").prepend(createTweetElement(tweets[tweet]))
  }
}

const createTweetElement = function(tweet) {
  const time = moment(tweet["created_at"]).fromNow();
  const newElement = `
<article class="container">
              <header class="new-tweet">
                <img src="${tweet["user"]["avatars"]}"> 
                <span class="username">
                  ${tweet["user"]["name"]}
                </span>
                <span class="userID">
                  ${tweet["user"]["handle"]}
                </span>
              </header>

              <span>
                "${escape(tweet["content"]["text"])}"
              </span>
              <hr>
            
              <footer> 
                ${time}
                <span class="icon">
                  <i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i>
                </span>
              </footer>

            </article>
`
return newElement;
}

$(() => {
  loadTweets();
  const form = $("form")
  
  form.on("submit", (event) => {
    event.preventDefault()
    const input = $("textarea").val();
    if (!input) {
      $('.error-message').text("empty tweet");
      $(".hiddenError").removeClass("error");
      $(".hiddenError").slideDown(slow);
    } else if (input.length > 140) {
      $('.error-message').text("Too Long! Please see Tweet limit!");
      $(".hiddenError").removeClass("error").slideDown();
    } else {
      $(".hiddenError").slideUp();
        $.ajax('/tweets', { 
          method: 'POST',
          data: form.serialize()
        })
        .then(() => {
          loadTweets();
          $("textarea").val("");
        });
      }
  })

  $(".arrow").click(() => {
    $(".new-tweet").slideToggle();
  })
});

const loadTweets = () => {
  $.ajax('/tweets', {method: 'GET'})
  .then((data) => {
    renderTweets(data);
  });
};

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}




