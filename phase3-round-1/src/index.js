// write your code here
const imgURL = "http://localhost:3000/images";
const commentsURL = "http://localhost:3000/comments";

document.addEventListener("DOMContentLoaded", () => {
  getImages();
  getComments();
});

function getImages() {
  fetch(`${imgURL}/1`)
    .then((resp) => resp.json())
    .then((img) => renderImg(img));
}

function getComments() {
  fetch(`${commentsURL}`)
    .then((resp) => resp.json())
    .then((comment) => renderComments(comment));
}

function renderImg(img) {
  let h2 = document.querySelector(".title");
  h2.innerText = img.title;
  let image = document.querySelector(".image");
  image.src = img.image;
  let likes = document.querySelector(".likes");
  likes.innerText = `${img.likes} likes`;
  let button = document.querySelector(".like-button");
  button.addEventListener("click", () => {
    addLikes(likes, img);
  });

  let submit_comment = document.querySelector(".comment-form");
  submit_comment.addEventListener("submit", (event) => {
    createComment(img, event);
  });
}

function renderComments(comments) {
  let commentList = document.querySelector(".comments");
  commentList.innerHTML = " ";

  comments.forEach((comment) => {
    let newListItem = document.createElement("li");
    newListItem.innerText = comment.content;
    commentList.appendChild(newListItem);
  });
}

function createComment(img, event) {
  event.preventDefault();

  let newComment = {};
  (newComment.imageId = img.id),
    (newComment.content = event.target.comment.value);

  fetch(`${commentsURL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })
    .then((resp) => resp.json())
    .then((comment) => renderComments(comment));
}

function addLikes(likes, img) {
  let id = img.id;
  let newLikes = +likes.innerText.split(" ")[0] + 1;

  let data = {};
  data.likes = newLikes;

  fetch(`${imgURL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((newData) => renderImg(newData));
}
