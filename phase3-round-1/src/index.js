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
}