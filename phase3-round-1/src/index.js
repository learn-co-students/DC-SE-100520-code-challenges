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

    // let postComments = document.querySelectorAll('ul > li')
    //     // postCommnets.innerText = post.
        //  console.log(post.comments)

    let likeBtn = document.querySelector('#likeBtn')
      likeBtn.addEventListener('click', (event) => {
          getLikes(event, postLikes)
      })


}

function getLikes(event, postLikes){

  let likes = +postLikes.innerText.split(" ")[0] + 1;


  fetch(url, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({likes: likes})
  }).then((res) => res.json())
    .then((post) => postLikes.innerText = `${post.likes} likes`)


}


// Click on the heart icon to increase image likes, and still see them when I reload the page
// Add a comment (no persistance needed)