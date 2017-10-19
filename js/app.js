(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({
        delay: 50
      }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };


  $('button').click(function(event) {
    var myLength = $("#search").val().length;
    var mySearch = $("#search").val();
    while(movies.length > 0){
    movies.pop();}
    // Cancel default navigation of link
    event.preventDefault();
    //console.log('button clicked');
    //console.log(myLength);
    console.log(mySearch);
    if (myLength < 1) {
      alert('please enter a search');
      return;
    }

    var $xhr = $.getJSON('https://omdb-api.now.sh/?s=' + mySearch);
    $xhr.done(function(data) {
      if ($xhr.status !== 200) {
        // The served an unsuccessful status code.
        return;
      }

      //console.log(data.Search);
      var films = data.Search;
      //console.log(films);
      for (var i = 0; i < films.length; i++) {
        var movie = {};
        movie.id = films[i].imdbID;
        movie.poster = films[i].Poster;
        movie.title = films[i].Title;
        movie.year = films[i].Year;
        movies.push(movie);
      }
      console.log(movie);
      console.log(movies);
      return renderMovies();
    })
  });


  // ADD YOUR CODE HERE
})();
