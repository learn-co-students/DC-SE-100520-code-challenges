// Code here
const URL = 'http://localhost:3000/beers'
const beerName = () => document.getElementById('beername')
const beerImage = () => document.getElementById('beerpic')
const beerDescription = () => document.getElementById('beerdeets')
const beerReviews = () => document.getElementById('beerreviews')
const beerButton = () => document.getElementById('beerbutton')

// - See the first beer's details, including its **name, image, description, and reviews**, when the page loads

document.addEventListener('DOMContentLoaded', () => {
    getBeer()
    document.getElementById('reviewform').addEventListener('submit', (event) => { writeReview(event)})

})


// document.querySelector('beerform').addEventListener('submit', (event) => {
//     event.preventDefault()
//    
function getBeer(){
    fetch(URL + '/1')
        .then(response => response.json())
        .then(beer => renderBeer(beer))
}   

function renderBeer(beer){
    beerName().innerText = beer.name 
    beerImage().src = beer.image_url 
    beerDescription().innerText = beer.description

    beerReviews().innerText = ""
        beer.reviews.forEach(review => { 
        let aReview = document.createElement('li')
        aReview.innerText = review
        beerReviews().appendChild(aReview)  

        
        })
        
    beerButton().addEventListener('click', () => {
        updateBeer(event)
    })

   
}

// Change the beer's description and **still see that change when reloading the page**

function updateBeer(event){
    event.preventDefault()

    let newBeerInfo = {
        description: document.querySelector('#beerdeets').value    
    }
    
    
    let metaData ={
        headers: {"Content-Type" : "application/json"},
        method: "PATCH",
        body: JSON.stringify(newBeerInfo)
    }

    fetch((URL + '/1'), metaData)
        .then(response => response.json())
        .then(newBeerInfo => renderBeer(newBeerInfo))
          
}
    
// - Add a review for the beer (no persistence needed)

function writeReview(event){
    event.preventDefault()
 
    let newReview = document.createElement('li')
    newBeerReviewText = document.querySelector('#reviewspace').value
    newReview.innerText = newBeerReviewText
    beerReviews().appendChild(newReview)
      
    }





/* <main>
      <div class="beer-details">
        <h2>Beer Name Goes Here</h2>
        <img src="assets/image-placeholder.jpg">

        <form class="description">
          <textarea>Beer description goes here</textarea>
          <button>Update Beer</button>
        </form>

        <h3>Leave a Review</h3>
        <form class="review-form">
          <textarea></textarea>
          <input type="submit" value="Submit">
        </form>

        <h3>Customer Reviews</h3>
        <ul class="reviews">
          <li>Replace with actual reviews</li>
          <li>From the server</li>
        </ul>
      </div>
    </main> */



