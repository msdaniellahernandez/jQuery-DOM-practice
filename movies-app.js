let currentId = 0; // ID for each movie
let movies = []; // Stores movies for sorting

$(function () {
  // Adds movie to list
  $("#add-movie-form").on("submit", function (e) {
    e.preventDefault();

    const title = $("#movie-title").val().trim();
    const rating = $("#movie-rating").val();

    // Title requirement
    if (title.length < 2) {
      alert("Title must have at least 2 characters!");
      return;
    }
    if (rating < 0 || rating > 10) {
      alert("Rating must be between 0 and 10.");
      return;
    }

    const movie = { id: currentId++, title, rating };
    movies.push(movie);
    const row = createMovieRow(movie);

    $("#movie-rows").append(row);
    $("#add-movie-form").trigger("reset");
  });

  // Removes movie from list
  $("#movie-rows").on("click", ".delete-button", function () {
    const id = $(this).data("id");
    movies = movies.filter(movie => movie.id !== id);
    $(this).closest("tr").remove();
  });

  // Sorts by title or rating
  $("#header-title").on("click", function () {
    sortMovies("title");
  });

  $("#header-rating").on("click", function () {
    sortMovies("rating");
  });

  function sortMovies(key) {
    const direction = $(`#header-${key} .icon`).hasClass("fa-sort-down") ? "asc" : "desc";

    movies.sort((a, b) => {
      if (key === "rating") {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      } else {
        return direction === "asc" ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
      }
    });

    $("#movie-rows").empty();
    for (const movie of movies) {
      $("#movie-rows").append(createMovieRow(movie));
    }

    $(`#header-${key} .icon`).toggleClass("fa-sort-down fa-sort-up");
  }

  function createMovieRow(movie) {
    return `
      <tr>
        <td>${movie.title}</td>
        <td>${movie.rating}</td>
        <td><button class="delete-button" data-id="${movie.id}">Remove</button></td>
      </tr>
    `;
  }
});
