// write your code here
const URL = 'http://localhost:3000/images';
const title = () => document.querySelector('h2');
const image = () => document.querySelector('h2 + img');
const likes = () => document.querySelector('span');
const commentList = () => document.querySelector('ul');
const likeButton = () => document.querySelector('span + button');
const commentForm = () => document.querySelector('form');

function getPost(id) {
    fetch(URL + `/${id}`)
        .then(res => res.json())
        .then(data => renderPost(data))
}

function renderPost(post) {
    title().innerText = post.title;
    image().src = post.image;
    likes().innerText = post.likes === 1 ? `${post.likes} like` : `${post.likes} likes`
    likes().dataset.likes = post.likes;
    renderComments(post.comments)
}

function renderComments(comments) {
    comments.forEach(comment => {
        const li = document.createElement('li');
        li.append(comment.content);
        commentList().append(li);
    })
}

function setupLikeButton() {
    likeButton().addEventListener('click', () => {
        let newLikes = +likes().dataset.likes + 1;
        likes().dataset.likes = newLikes;
        likes().innerText = newLikes === 1 ? `${newLikes} like` : `${newLikes} likes`

        fetch(`${URL}/1`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ likes: newLikes })
        })
    })
}

function setupCommentForm() {
    commentForm().addEventListener('submit', addComment)
}

function addComment(event) {
    event.preventDefault();
    const li = document.createElement('li');
    li.append(event.target.comment.value);
    commentList().append(li);
    commentForm().reset();
}

getPost(1);
setupLikeButton();
setupCommentForm();