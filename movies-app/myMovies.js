let currentId = 0;

let movieList = [];

$(function () {
  //delete parent
  $("#new-movie-form").on("submit", function (evt) {
    evt.preventDefault();
    let title = $("#title").val();
    let rating = $("#rating").val();

    let movieInfo = { title, rating, currentId };
    const HTMLtoAppend = createMovieInfoHTML(movieInfo);

    currentId++;
    movieList.push(movieInfo);

    $("#movie-table-body").append(HTMLtoAppend);
    $("#new-movie-form").trigger("reset");
  });

  //on click delete, delete parent from array of movies
  $("tbody").on("click", ".btn.btn-danger", function (evt) {
    let indexToRemoveAt = movieList.findIndex(
      (movie) => movie.currentId === +$(evt.target).data("deleteId")
    );

    movieList.splice(indexToRemoveAt, 1);

    $(evt.target).closest("tr").remove();
  });

  $(".fas").on("click", function (evt) {
    // figure out what direction we are sorting and the key to sort by
    let direction = $(evt.target).hasClass("fa-sort-down") ? "down" : "up";
    let keyToSortBy = $(evt.target).attr("id");
    let sortedMovies = sortBy(movieList, keyToSortBy, direction);

    // empty the table
    $("#movie-table-body").empty();

    // loop over our object of sortedMovies and append a new row
    for (let movie of sortedMovies) {
      const HTMLtoAppend = createMovieInfoHTML(movie);
      $("#movie-table-body").append(HTMLtoAppend);
    }

    // toggle the arrow
    $(evt.target).toggleClass("fa-sort-down");
    $(evt.target).toggleClass("fa-sort-up");
  });
});

/* accepts an array of objects and a key and sorts by that key */

function sortBy(array, keyToSortBy, direction) {
  return array.sort(function (a, b) {
    // since rating is a number, we have to convert these strings to numbers
    if (keyToSortBy === "rating") {
      a[keyToSortBy] = +a[keyToSortBy];
      b[keyToSortBy] = +b[keyToSortBy];
    }
    if (a[keyToSortBy] > b[keyToSortBy]) {
      return direction === "up" ? 1 : -1;
    } else if (b[keyToSortBy] > a[keyToSortBy]) {
      return direction === "up" ? -1 : 1;
    }
    return 0;
  });
}

/* createMovieDataHTML accepts an object with title and rating keys and returns a string of HTML */

function createMovieInfoHTML(data) {
  return `
    <tr>
      <td>${data.title}</td>
      <td>${data.rating}</td>
      <td>
        <button class="btn btn-danger" data-delete-id=${data.currentId}>
          Delete
        </button>
      </td>
    <tr>
  `;
}
