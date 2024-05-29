const $gifArea = $("#gif-area");
const $searchInput = $("#search");

// using ajax to add gifs

function addgif(res) {
  let numResults = res.data.length;
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults);
    let $newCol = $("<div>", { class: "col-md-4 col-12 mb4" });
    let $newGif = $("<img>", {
      src: res.data[randomIdx].images.original.url,
      class: "w-100",
    });
    $newCol.append($newGif);
    $gifArea.append($newCol);
  }
}

// handle form submission: clear search box & make ajax cell

$("form").on("submit", async function (e) {
  e.preventDefault();

  let searchTerm = $searchInput.val();
  $searchInput.val("");

  const res = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: {
      q: searchTerm,
      api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym",
    },
  });
  addgif(res.data);
});

// remove gif

$("#remove").on("click", function () {
  $gifArea.empty();
});
