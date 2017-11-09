


$('#submit').on('click', function(){
  event.preventDefault();
  var article = $('#search').val();
  var begin = $('#start').val();
  var end = $('#end').val();
  $('.articles').empty();


  if(begin.trim() != '' && end.trim() != ''){
    begin = "&begin_date=" + $('#start').val() + "0101";
    end =  "&end_date=" + $('#end').val() + "0101"
  }else if(begin.trim() != ''){
    begin = "&begin_date=" + $('#start').val() + "0101";
  }else if(end.trim() != ''){
    end =  "&end_date=" + $('#end').val() + "0101"
  }


  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=117277e885cf4ce4807bf0a6f901a90c&q=" + article + begin + end;

$.ajax({
  url: queryURL,
  method: 'GET',
}).done(function(response) {
  $('#search').val('');
  var articles = response.response.docs

console.log(queryURL)
console.log(response.response.docs);




  for(var i=0; i < articles.length; i++){
  // display rank,

  $('.articles').append(`<div class='results'><span id='resNumber'>${[i+1]}: </span>${articles[i].snippet}
                         <p>Source: ${articles[i].source}</p>
                         <p>Pusblished Date: ${articles[i].pub_date}</p>
                         <a href="${articles[i].web_url}"><p>Click here for article</p></a>
                         </div>
                        `)

// }
}
});



})
