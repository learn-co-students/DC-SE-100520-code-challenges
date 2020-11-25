// write your code here
const url =  'http://localhost:3000/images/1'

document.addEventListener('DOMContentLoaded', () => {
    getImage()


      
})

// See the image received from the server, including its title, likes and comments when the page loads
function getImage(){
    fetch(url)
        .then(response => response.json())
        .then(post => renderContent(post))

}


function renderContent(post){

    let postTitle = document.getElementById('titleOfPost')
        postTitle.innerText = post.title

    let postImage = document.getElementById('image')
        postImage.src = post.image
    
    let postLikes = document.getElementById('likes')
        postLikes.innerText = `${post.likes} likes`

    let postComments = document.querySelectorAll('li') //not complete
         console.log(post.comments[0].content)

    let likeBtn = document.querySelector('#likeBtn')
      likeBtn.addEventListener('click', (event) => {
          getLikes(event, postLikes)
      })

    let postAComment= document.querySelector('#commentBtn')
      postAComment.addEventListener('submit',(event) =>{ 
          
      })

}

//I got this function to work but I am not confident in my undersatnding 
function getLikes(event, postLikes){

  let likes = +postLikes.innerText.split(" ")[0] + 1;
  fetch(url, 
    {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({likes: likes})
  })
    .then((res) => res.json())
    .then((post) => postLikes.innerText = `${post.likes} likes`)


}


// Add a comment (no persistance needed)
// function createComment(event){
//     event.preventDefault()

// }