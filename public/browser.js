function itemTempalte(item) {
  return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">${item.text}</span>
        <div>
          <button data-id="${item._id}"class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
          <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
      </li>`;
}

// inital page load render
let ourHTML = items
  .map(function (item) {
    return itemTempalte(item);
  })
  .join("");
document.getElementById("item-list").insertAdjacentHTML("beforeend", ourHTML);
let createField = document.getElementById("create-field");
document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();
  axios
    .post("/create-item", {
      item: createField.value,
    })
    .then(function (response) {
      document
        .getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemTempalte(response.data));
      createField.value = "";
      createField.focus();
    })
    .catch(function () {
      console.log("please try again here");
    });
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-me")) {
    if (confirm("Do you really want to delete this item permanently")) {
      axios
        .post("/delete-item", {
          id: e.target.getAttribute("data-id"),
        })
        .then(function () {
          e.target.parentElement.parentElement.remove();
        })
        .catch(function () {
          console.log("please try again here");
        });
    }
  }
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("edit-me")) {
      let itemTextElement =
        e.target.parentElement.parentElement.querySelector(".item-text");
      itemTextElement.contentEditable = true;
      itemTextElement.focus();
      // Save changes on blur (when the user clicks outside the element)
      itemTextElement.addEventListener("blur", function () {
        let userInput = itemTextElement.innerHTML;
        axios
          .post("/update-item", {
            text: userInput,
            id: e.target.getAttribute("data-id"),
          })
          .then(function () {
            itemTextElement.contentEditable = false; // Make it non-editable again
          })
          .catch(function () {
            console.log("Please try again");
            itemTextElement.contentEditable = false; // Make it non-editable again even if there is an error
          });
      });

      // Optional: Save changes on pressing Enter key
      itemTextElement.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault(); // Prevent newline
          itemTextElement.blur(); // Trigger blur event to save changes
        }
      });
    }
  });
});

//   if (e.target.classList.contains("edit-me")) {
//     let userInput = prompt(
//       "Enter your desired value",
//       e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
//     );
//     if (userInput) {
//       axios
//         .post("/update-item", {
//           text: userInput,
//           id: e.target.getAttribute("data-id"),
//         })
//         .then(function () {
//           e.target.parentElement.parentElement.querySelector(
//             ".item-text"
//           ).innerHTML = userInput;
//         })
//         .catch(function () {
//           console.log("please try again here");
//         });
//     }
//   }
// });
