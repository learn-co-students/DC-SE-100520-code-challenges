// write your code here
const url =  'http://localhost:3000'

document.addEventListener('DOMContentLoaded', () => {
    getImage()
})

// See the image received from the server, including its title, likes and comments when the page loads
function getImage(){
    fetch(url+'/images')
        .then(response => response.json())
        .then(imageData => console.log(imageData))

}

function renderContent(){
    
}

// Click on the heart icon to increase image likes, and still see them when I reload the page
// Add a comment (no persistance needed)