// write your code here
const IMAGES_URL = "http://localhost:3000/images/";
const COMMENTS_URL = "http://localhost:3000/comments/";
const imageImg = () => document.getElementById("image");
const likeSpan = () => document.getElementById("likes");

document.addEventListener("DOMContentLoaded", function () {
  fetchImage(1);

  //add like-button event
  document
    .getElementById("like-button")
    .addEventListener("click", () => handleLikeButton(1));

  //add like-button event
  document
    .getElementById("unlike-button")
    .addEventListener("click", () => handleLikeButton(-1));

  //add comment-form event
  document
    .getElementById("comment-form")
    .addEventListener("submit", (event) => handleAddCommentForm(event));
});

const printLike = (likes) => `${likes} likes`;

function fetchImage(imgId) {
  fetch(`${IMAGES_URL}/${imgId}`)
    .then((res) => res.json())
    .then((image) => renderImage(image));
}

function renderImage(image) {
  imageImg().src = image.image;
  imageImg().dataset.id = image.id;
  likeSpan().innerText = printLike(image.likes);

  fetchComment(image.id);
}

function fetchComment(imgId) {
  fetch(COMMENTS_URL)
    .then((res) => res.json())
    .then((comments) => {
      const filtered_comments = comments.filter(
        (comment) => comment.imageId == imgId
      );

      filtered_comments.forEach((comment) => renderComment(comment));
    });
}

function renderComment(comment) {
  let commentsUl = document.getElementById("comments");

  let li = document.createElement("li");
  li.dataset.id = comment.id;

  let span = document.createElement("span");
  span.innerText = comment.content;

  let button = document.createElement("button");
  button.innerText = "x";
  button.className = "delete-comment-button";
  button.addEventListener("click", (event) => handleDeleteCommentButton(event));

  li.append(span, button);
  commentsUl.append(li);
}

function handleLikeButton(like) {
  const data = {
    likes: +likeSpan().innerText.split(" ")[0] + like,
  };

  const obj = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const img_id = imageImg().dataset.id;
  fetch(`${IMAGES_URL}/${img_id}`, obj)
    .then((res) => res.json())
    .then((img) => {
      likeSpan().innerText = printLike(img.likes);
    });
}

function handleAddCommentForm(event) {
  event.preventDefault();
  if (event.target.comment.value === "") {
    return;
  }
  const data = {
    imageId: imageImg().dataset.id,
    content: event.target.comment.value,
  };

  const obj = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  fetch(`${COMMENTS_URL}`, obj)
    .then((res) => res.json())
    .then((comment) => {
      renderComment(comment);
      event.target.reset();
    });
}

function handleDeleteCommentButton(event) {
  const obj = {
    method: "DELETE",
  };

  const comment_id = event.target.parentElement.dataset.id;
  fetch(`${COMMENTS_URL}/${comment_id}`, obj).then(() =>
    event.target.parentElement.remove()
  );
}
