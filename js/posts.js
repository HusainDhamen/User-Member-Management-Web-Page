let posts = [];

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

  postsForm.reset();
});