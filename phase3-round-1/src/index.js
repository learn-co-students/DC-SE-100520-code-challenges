// write your code here
const url = "http://localhost:3000"
let title = () => document.getElementsByClassName('title')[0]
let likes = () => document.getElementsByClassName('likes')[0]
let comments = () => document.getElementsByClassName('comments')[0]
let image = () => document.getElementsByClassName('image')[0]
let imageCard = () => document.getElementsByClassName('image-card')[0]
// The endpoints you will need are:
// 
// - GET `/images/1`
// - PATCH `/images/1`
// - POST `/comments`
// - DELETE `/comments/:id`

document.addEventListener('DOMContentLoaded', () => {
    //me - Till I know any better, I'll load the first image's junk when
    //      user lands on page
    const firstImage = 1;
    grabImage(firstImage);
})


// - See the image received from the server, including its title, likes and comments when the page loads
//
//   me -
//  I guess we just need images/1 by default.
function grabImage(imageId){
    fetch(`${url}/images/${imageId}`).then(resp => resp.json()).then(imageData => renderImage(imageData))
}

// Code to put the pic and info up on the page
function renderImage(imageData){
    console.log(title())
    title().innerText = imageData.title
    image().src = imageData.image
    likes().innerText = `${imageData.likes} likes`
    imageData.comments.forEach(comment => {
        commentLi = document.createElement('li')
        commentLi.innerText = comment.content
        commentLi.classList.add(`imageId-${comment.imageId}`)
        comments().appendChild(commentLi)
    })

    //like button functionality
    function
}

// - Click on the heart icon to increase image likes, and still see them when I reload the page
//
// me -
//  this has gotta be a patch request! let's add an event listener to 
//  the render and then patch it in
function likesGoUp(event){
    console.log('Hey ya like me!!!')
    console.log(event.target)
}

// - Add a comment (no persistance needed)