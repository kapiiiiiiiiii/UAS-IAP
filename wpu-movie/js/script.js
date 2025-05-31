function searchMovie() {
    console.log("Searching:", $('#search-input').val());
    $('#movie-list').html('');

    $.ajax({
        url: 'https://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '9a100b21',
            's': $('#search-input').val()
        },
        success: function (result) {
            console.log("Result from OMDB API:", result);
            if (result.Response === "True") {
                let movies = result.Search;

                $.each(movies, function(i, data) {
                    $('#movie-list').append(`
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <img src="${data.Poster}" class="card-img-top" alt="${data.Title}">
                                <div class="card-body">
                                    <h5 class="card-title">${data.Title}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                                    <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}">
                                        See Detail
                                    </a>
                                </div>
                            </div>
                        </div>
                    `);
                });

                $('#search-input').val('');

            } else {
                console.warn("OMDB Error:", result.Error);
                $('#movie-list').html(`
                    <div class="col">
                        <h1 class="text-center">${result.Error}</h1>
                    </div>
                `);
            }
        },
        error: function () {
            console.error("AJAX Error: Cannot connect to OMDB API");
            $('#movie-list').html('<h3 class="text-center text-danger">Error connecting to the movie database.</h3>');
        }
    });
}

// Tombol search diklik
$('#search-button').on('click', function () {
    searchMovie();
});

// Tekan enter di input
$('#search-input').on('keyup', function (e) {
    if (e.which === 13) {
        searchMovie();
    }
});

// Klik tombol See Detail
$('#movie-list').on('click', '.see-detail', function () {
    console.log("See detail clicked!", $(this).data('id'));
    $.ajax({
        url: 'https://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '9a100b21',
            'i': $(this).data('id')
        },
        success: function (movie) {
            if (movie.Response === "True") {
                $('.modal-body').html(`
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${movie.Poster}" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"><h3>${movie.Title}</h3></li>
                                <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                                <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                                <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                                <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                            </ul>
                        </div>
                    </div>
                `);
            }
        }
    });
});
