$(document).ready(function(){
	$('#searchForm').on('submit', function(e){
		let searchText = $('#searchText').val();
		getData(searchText);
		e.preventDefault();
	});
});


function getData(searchText) {
	// console.log(searchText);
	let request = new XMLHttpRequest();
	request.open('GET', 'https://www.omdbapi.com/?apikey=38f4569e&s='+searchText);
	request.onload = function () {
		let data = JSON.parse(this.response);
		let movies = data.Search;
		let output = '';
			$.each(movies, (index, movie) => {
			        output += `
			          <div class="col-md-3">
			            <div class="card text-center">
			              <img src="${movie.Poster}">
			              <h2>${movie.Title}</h2>
			              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Details</a>
			            </div>
			          </div>
			        `;
			      });

			      $('#movies').html(output);
	}	
	request.send();
}


function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}


function getMovie() {
	let movieId = sessionStorage.getItem('movieId');
	console.log(movieId);

	let request = new XMLHttpRequest();
	request.open('GET', 'https://www.omdbapi.com/?apikey=38f4569e&i='+movieId);
	request.onload = function () {
		let movie = JSON.parse(this.response);


		let output =`
		       <div class="row">
		         <div class="block block-left col-md-4">
		           <img src="${movie.Poster}" class="thumbnail">
		         </div>
		         <div class="block block-right col-md-8">
		           <h2>${movie.Title}</h2>
		           <ul class="list-group">
		             <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
		             <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
		             <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
		             <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
		             <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
		             <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
		             <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
		           </ul>
		         </div>
		       </div>
		       <div class="row">
		         <div class="block block-bottom card">
		           <h3>Plot</h3>
		           ${movie.Plot}
		           <hr>
		           <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
		           <a href="index.html" class="btn btn-primary">Go Back To Search</a>
		         </div>
		       </div>
		     `;
		     $('#movie').html(output);
	}	
	request.send();
}














 
