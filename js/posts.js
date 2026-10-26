let posts = [];

$.getJSON("data/posts.json", function(data) 
{
  posts = data;
  showPosts(posts);
});



let postsForm = document.getElementById("postsForm");
let postMessage = document.getElementById("postMessage");

postsForm.noValidate = true;

postsForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let postId = document.getElementById("postId").value.trim();
  let postTitle = document.getElementById("postTitle").value.trim();
  let postCategory = document.getElementById("postCategory").value;
  let postFormat = document.getElementById("postFormat").value;
  let postValue = document.getElementById("postValue").value;
  let postDescription = document.getElementById("postDescription").value.trim();

  postMessage.style.color = "red";

  if (postId === "" || isNaN(postId)) {
    postMessage.textContent = "Please enter a post ID number.";
    return;
  }

  if (postTitle === "") {
    postMessage.textContent = "Please enter a post title.";
    return;
  }

  if (postCategory === "") {
    postMessage.textContent = "Please choose a category.";
    return;
  }

  if (postFormat === "") {
    postMessage.textContent = "Please choose a post format.";
    return;
  }

  if (postValue === "" || postValue < 1 || postValue > 5) {
    postMessage.textContent = "Importance level must be from 1 to 5.";
    return;
  }

  let newPost = {
    id: Number(postId),
    title: postTitle,
    category: postCategory,
    format: postFormat,
    value: Number(postValue),
    description: postDescription
  };

  let found = false;

  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === newPost.id) {
      posts[i] = newPost;
      found = true;
    }
  }

  if (found === false) {
    posts.push(newPost);
  }

  postMessage.style.color = "green";

  if (found === true) {
    postMessage.textContent = "Post " + newPost.id + " was updated.";
  } else {
    postMessage.textContent = "Post " + newPost.id + " was added.";
  }

  console.log(JSON.stringify({ posts: posts }, null, 2));

  showPosts(posts);
  postsForm.reset();
});



function showPosts(list) {
    $("#allPosts").empty();

    if (list.length === 0) {
        $("#allPosts").text("No posts found.");
        return;
    }

    $.each(list, function (i, p) {
        let card = $("<div>").addClass("card mb-3");
        let body = $("<div>").addClass("card-body");

        body.append($("<h5>").addClass("card-title").text(p.title));
        body.append($("<p>").text("ID: " + p.id + " | Category: " + p.category + " | Format: " + p.format + " | Importance: " + p.value));
        body.append($("<p>").text("Description: " + p.description));
        body.append($("<button>").addClass("btn btn-sm btn-outline-primary edit me-2").data("id", p.id).text("Edit"));
        body.append($("<button>").addClass("btn btn-sm btn-outline-danger delete").data("id", p.id).text("Delete"));

        card.append(body);
        $("#allPosts").append(card);
    });
}

function searchPosts() {
    let text = $("#searchPost").val().toLowerCase();

    let results = $.grep(posts, function (p) {
        return String(p.id).includes(text) ||
               p.title.toLowerCase().includes(text) ||
               p.category.toLowerCase().includes(text);
    });

    showPosts(results);
}

$("#searchButton").click(searchPosts);
$("#searchPost").on("keyup", searchPosts);

$("#allPosts").on("click", ".edit", function () {
    let id = $(this).data("id");
    let p = $.grep(posts, function (x) { return x.id === id; })[0];

    $("#postId").val(p.id);
    $("#postTitle").val(p.title);
    $("#postCategory").val(p.category);
    $("#postFormat").val(p.format);
    $("#postValue").val(p.value);
    $("#postDescription").val(p.description);
});

$("#allPosts").on("click", ".delete", function () {
    let id = $(this).data("id");
    posts = $.grep(posts, function (x) { return x.id !== id; });
    searchPosts();
});