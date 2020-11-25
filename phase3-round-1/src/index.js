// write your code here
const url = "http://localhost:3000/images"
const commentUrl = "http://localhost:3000/comments"

document.addEventListener('DOMContentLoaded', () => {

    getImage()
    getComments()
})

function getImage(){
    fetch(url)
        .then(res => res.json())
        .then((image) => renderImage(image))
       //console.log(image[0].title)
}

function renderImage(image){
    let imageCard = document.getElementById('imagecard')
    
    let h2 = document.getElementById('h2-title')
    h2.innerText = image[0].title


    let likes = document.getElementById('likes-id')
    likes.innerText = image[0].likes + " likes"

    let img = document.getElementById('image-id')
    img.src = image[0].image

    let button = document.getElementById('button-liker')
   //console.log(button)

    button.addEventListener('click', (event) => {
        updateLikes(image)
    })
   
}
 // having an issue with my updateLikes function, it updates the DB, 
//and the likes on the page, but you currently have to 
//refresh the page to see the new likes number
function updateLikes(image){
    
     let imageId =image[0].id
     let addedLikes =image[0].likes + 1

     
     let newData = {likes: addedLikes}

     fetch(`${url}/${imageId}`, {
         method: "PATCH",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(newData)
     })
        .then(res => res.json())
        .then((image) => renderImage(image))
}

function getComments(){
    fetch (commentUrl)
        .then(res => res.json())
        .then(comment => renderComments(comment))

}

function renderComments(comment){
   let commentBox = document.getElementById('comment-id')
    commentBox.innerText = comment[0].content

    let commentButton = document.getElementById('commenter-button')
   // console.log(commentButton)

   commentButton.addEventListener('click', (event) => {
      addComment(comment)
   })
}

function addComment(event){
    event.preventDefault()

    //let commentInput = document.getElementById('comment-inputer')
    
    let newCommentData = {
        //imageId: 1,
        content: event.target.content.value
        //having issue getting the new comments to POST to the DB, 
        //I think it might have something to do with line 85 
        //maybe its not quite targetting the right input data
        //OR it has something to do with this input being a part of 
        //a form. I'm a little unclear.
    }
   
    fetch(commentUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newCommentData)
    }) .then (res => res.json())
       .then (json => renderComments(comment))
    
}