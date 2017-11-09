var topics =["The Hangover", "Anchorman", "Step Brothers", "Baby Driver", "Superbad", "The Empire Strikes Back"]

//creates the button initially
for (var i = 0; i < topics.length; i++){
  $('#buttonSpot').append(
    $('<button class="buttons" data-name="' + topics[i] + '">').text(topics[i])
  );
}

//creates button function -- can use for both on click and on enter key
function createButton (){
  event.preventDefault();
  var userInput = $('#userInput').val();
  var userInputData = $('#userInput').val();
  if (userInput.trim() == ''){
    alert("Enter a Movie!!")
  }else {

  // for some reason, only the first word goes into Data-name for userInput when there is a space
  userInputData = userInputData.replace(/\s+/g, '%20')
  //could have just gotten rid of the space altogether and not as %20 but whatever
  console.log(userInputData)
  topics.push(userInput);
  $('#buttonSpot').append(`<button class="buttons" data-name=${userInputData}>${userInput}</button>`)
  $('#userInput').val('');
  }
}

function getGifs(){
  //this function runs on click of any button class
  $('.gifSpot').empty();
  var movies = $(this).attr('data-name');
  //technically don't need the replace, but I think it makes it more secure
  var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + movies + "&api_key=RawlihL7xMXF7vQNUAbcwO7tdxWXSsb1&limit=10"


$.ajax({
  url: queryUrl,
  method: 'GET'
}).done(function(response){
    for (var i=0; i < 10; i++){
      var src = response.data[i].images.fixed_width_still.url;
    $('.gifSpot').append(`<figure>
                          <img src=${src} class="giphy-embed gif"></img>
                          <figcaption>Rating: ${response.data[i].rating}</figcaption></figure>`)
    }
  })
}

function startGifs (){
  var src = $(this).attr("src");
  if($(this).hasClass('play')){
    $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
    $(this).removeClass('play');
  } else {
    $(this).addClass('play');
    $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
  }
}

//this function loads gifs when enter or submit is pressed
function directLoad(){
  var userInput = $('#userInput').val();
  //will only run if there is a value --- dont know how to make sure it is a movie though
  if(userInput.trim() !== ''){
  $('.gifSpot').empty();
  userInput = userInput.replace(/\s+/g, '%20')


  var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + userInput + "&api_key=RawlihL7xMXF7vQNUAbcwO7tdxWXSsb1&tag=movies&limit=10"

$.ajax({
  url: queryUrl,
  method: 'GET'
}).done(function(response){
  console.log(response);
    for (var i=0; i < 10; i++){
      var src = response.data[i].images.fixed_width_still.url;
    $('.gifSpot').append(`<figure>
                          <img src=${src} class="giphy-embed gif"></img>
                          <figcaption id='text'>Rating: ${response.data[i].rating}</figcaption></figure>`)
      }
    })
  }
}

$('#submit').on('click', function(){
  directLoad();
  createButton();
  })

$('#userInput').keypress(function (e) {
  if(e.which == 13) {
    directLoad();
    createButton();
  }
})

$(document).on('click', '.buttons', getGifs);
$(document).on('click', '.gif', startGifs);

  // event.preventDefault(); look this up
