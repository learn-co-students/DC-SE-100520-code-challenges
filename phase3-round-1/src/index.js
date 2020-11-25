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
    imageCard().id = `image-${imageData.id}`
    title().innerText = imageData.title
    image().src = imageData.image
    likes().innerText = `${imageData.likes} likes`
    //make comments conditional to handle likes
    if(imageData.comments){
        imageData.comments.forEach(comment => {
            commentLi = document.createElement('li')
            commentLi.innerText = comment.content
            commentLi.classList.add(`imageId-${comment.imageId}`)
            comments().appendChild(commentLi)
        })
    }
    //like button functionality
    document.getElementsByClassName('like-button')[0].addEventListener('click', (event) => {
        likesGoUp(event)
    })

    //non-persist comments
    document.getElementsByClassName('comment-form')[0].addEventListener('submit',(event) => {
        event.preventDefault()
        // console.log(document.getElementsByClassName("comment-input")[0].innerText)
        // console.log(event.target.childNodes[0])
        // debugger
        addComment(event)
    })
}

// - Click on the heart icon to increase image likes, and still see them when I reload the page
//
// me -
//  this has gotta be a patch request! let's add an event listener to 
//  the render and then patch it in
function likesGoUp(event){
    // console.log('Hey ya like me!!!')
    // console.log(event.target.parentElement.parentElement)
    let imageId = imageCard().id.split('-')[1]
    // console.log(imageId)
    let data = {}
        data.likes = +likes().innerText.split(' ')[0] + 1
    console.log(data)
    let likeObj = {}
        likeObj.method = "PATCH"
        likeObj.headers = {"Content-Type": "application/json"}
        likeObj.body = JSON.stringify(data)
    
    fetch(`${url}/images/${imageId}`, likeObj).then(resp => resp.json()).then(updatedImage =>   renderImage(updatedImage))

}
// me -  
// Hmmm.  Some weirdness here.  When I console log  the data object click
// above and click the like I see it trigger th event a bunch of times.
// from the user side, the experience is one click = one like, but
// this is no good for my json server.  Will come back to fool with 
// the event listener if I have time? 



// - Add a comment (no persistance needed)
//
// me 
//  Piece of pie. Add another event listener to render and come back here
function addComment(event){
    // console.log(event.target.childNodes[1].value)
    newComment = document.createElement('li')
    newComment.innerText = event.target.childNodes[1].value
    newComment.classList.add(`imageId-${imageCard().id.split('-')[1]}`)
    comments().appendChild(newComment)
    event.target.childNodes[1].value = ""
}