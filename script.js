var Airtable = require("airtable");
var base = new Airtable({
  apiKey: "keyweomR3DyiEOj84",
}).base("appRg418XISw0Yzad");

function filterItems(type, filter){
  let allItems = Array.from(document.querySelectorAll('.grid-item'))
  let filteredItems;

  filteredItems = allItems.filter()
}


// function filterItems(type, filter) {
//   let allItems = Array.from(document.querySelectorAll(".grid-item"));
//   let filteredItems;

//   filteredItems = allItems.filter((item) => item.dataset.year.includes(filter));
// }


// function sortItems(e) {
//   let allItems = Array.from(document.querySelectorAll(".grid-item"));
//   let sortedItems;

//   sortedItems = allItems.sort(function (a, b) {
//     return (a.dataset.title.localeCompare(b.dataset.title));
//   });

//   // if (e?.target.dataset.type == "newest") {
//   //   e?.target.setAttribute("data-type", "oldest");

//   //   sortedItems = allItems.sort(function (a, b) {
//   //     return (
//   //       parseInt(a.dataset.year.toString()) -
//   //       parseInt(b.dataset.year.toString())
//   //     );
//   //   });
//   // } else {
//   //   e?.target.setAttribute("data-type", "newest");

//   //   sortedItems = allItems.sort(function (a, b) {
//   //     return (
//   //       parseInt(b.dataset.year.toString()) -
//   //       parseInt(a.dataset.year.toString())
//   //     );
//   //   });
//   // }

//   sortedItems.forEach((item) =>
//     document.querySelector(".grid-items").append(item)
//   );
// }


let years = [];

base("playlist")
  .select({
    // Selecting the first 5 records in Grid view:
    maxRecords: 50,
    view: "Grid view",
  })
  .eachPage(
    function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      records.forEach(function (song) {
        console.log("song", song.fields);

        // song.fields.year.forEach((year) => {
        //   if (!years.includes(year)) years.push(year);
        // });

        let container = document.querySelector(".container");

        let airtableItem = document.createElement("div")
        airtableItem.classList.add('airtable-item')

        container.append(airtableItem)

        console.log(container)


        // let gridItem;

        // gridItem = document.createElement("div");
        // gridItem.classList.add("grid-item");
        // gridItem.setAttribute("data-title", song.fields.title);
        // gridItem.setAttribute("data-year", song.fields.year);

        // let songTitle = document.createElement("h2");
        // songTitle.classList.add("grid-item--title");
        // songTitle.innerHTML = `${song.fields.title} – ${song.fields.year}`;
        // gridItem.append(songTitle);

        // document.body.append(gridItem)
        // container.append(gridItem);
      });

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
    },
    function done(err) {
      if (err) {
        console.error(err);
        return;
      } else {
        console.log("done");
        years.forEach((year) => {
          let container = document.querySelector(".filters-year");

          let tag = document.createElement("button");
          tag.classList.add("filter-btn");
          tag.setAttribute("data-filter", year);
          tag.setAttribute("data-type", "year");
          tag.innerHTML = year;

          container.append(tag);

          tag.addEventListener("click", () => filterItems("year", year));
        });

        document
          .querySelector(".sort-toggle")
          .addEventListener("click", (e) => sortItems(e));
      }
    }
  );
