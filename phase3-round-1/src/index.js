// write your code here
const url = "http://localhost:3000"
let title = () => document.getElementsByClassName('title')[0]
let likes = () => document.getElementsByClassName('likes')[0]
let comments = () => document.getElementsByClassName('comments')[0]
let image = () => document.getElementsByClassName('image')[0]
let imageCard = () => document.getElementsByClassName('image-card')[0]
// const commentDelInnerHTML = `<button class='delete-button'>⌦</button>`
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
            let commentLi = document.createElement('li')
            let delComment = document.createElement('button')
            let spanText = document.createElement('span')
            delComment.innerText = '⌦'
            delComment.classList.add('del-button')
            delComment.addEventListener('click',(event)=>{
                trashComment(event)
            })
            commentLi.id = `comment-${comment.id}`

            spanText.innerText = comment.content
            commentLi.append(delComment, spanText)
            commentLi.classList.add(`imageId-${comment.imageId}`)
            
            comments().append(commentLi)
        })
    }
    //like button functionality
    document.getElementsByClassName('like-button')[0].addEventListener('click', (event) => {
        let like = 1
        likesGoUp(event, like)
    })

    //non-persist comments
    document.getElementsByClassName('comment-form')[0].addEventListener('submit',(event) => {
        event.preventDefault()
        // console.log(document.getElementsByClassName("comment-input")[0].innerText)
        // console.log(event.target.childNodes[0])
        // debugger
        writeThatComment(event)
    })

    //stretch goal.  dislike button
    document.getElementsByClassName('dislike-button')[0].addEventListener('click',(event)=>{
        let like = -1
        likesGoUp(event, like)
    })
}

// - Click on the heart icon to increase image likes, and still see them when I reload the page
//
// me -
//  this has gotta be a patch request! let's add an event listener to 
//  the render and then patch it in
function likesGoUp(event, like){
    // console.log('Hey ya like me!!!')
    // console.log(event.target.parentElement.parentElement)
    let imageId = imageCard().id.split('-')[1]
    // console.log(imageId)
    let data = {}
        data.likes = +likes().innerText.split(' ')[0] + like
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
function addComment(event, comment = null){
    // console.log(event.target.childNodes[1].value)
    let newComment = document.createElement('li')
    newComment.id = `comment-${comment.id}`
    let newSpan = document.createElement('span')
    newSpan.innerText = event.target.childNodes[1].value
    let delComment = document.createElement('button')
    delComment.innerText = '⌦'
    delComment.classList.add('del-button')
    delComment.addEventListener('click',(event)=>{
        trashComment(event)
    })

    newComment.classList.add(`imageId-${imageCard().id.split('-')[1]}`)
    newComment.append(delComment,newSpan)
    comments().appendChild(newComment)
    event.target.childNodes[1].value = ""
}

// STRETCH GOALS
// - Downvote an image
// me 
// yeah, gonna basically do this the same ... wait.  no. Gonna add an 
// extra param to likesGoUp and be done with the function


// - Still see the comments written after reloading the page
//   > For this one, you want to make a POST request to the `/comments` endpoint.
//   > Your comment object must have an `imageId` key with a value of `1` for it to work.
//me
//  let's write the fetch post for this sucker and then figure out the
//  details on calling it
function writeThatComment(event){
    // console.log(imageCard().id)
    let data = {}
        data.imageId = +imageCard().id.split("-")[1]
        data.content = event.target.childNodes[1].value
    
    let commentObj = {}
        commentObj.method = "POST"
        commentObj.headers = {"Content-Type": "application/json"}
        commentObj.body = JSON.stringify(data)

    fetch(`${url}/comments`, commentObj).then(resp => resp.json()).then((comment) => addComment(event, comment))
} 


// - Delete a comment
//   > To persist this, you will have to make a DELETE request to the `/comments/:id` endpoint.
//
//me
//  hmm.  to get this working, we're gonna need to add the comments.id as
//  an id to each comment (at render and writeThatComment), and a delete
//  html clickable. then we can fetch delete etc etc

function trashComment(event){
    // debugger
    console.log(event.target)
    let delId = event.target.parentNode.id.split("-")[1]
    let comment = document.getElementById(event.target.parentNode.id)
    // console.log(`${url}/comments/${delId}`)
    fetch(`${url}/comments/${delId}`, {method: 'DELETE'}).then(resp => resp.json()).then(resp => console.log(resp))
    comment.remove()
}