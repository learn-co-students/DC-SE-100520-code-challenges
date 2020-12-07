const url = 'http://localhost:3000/beers/1'
const updateBtn = () => document.querySelector('.description')
const reviewBtn = () => document.querySelector('.review-form')

//ON PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {
    //see FIRST beer's details
    fetch(url)
        .then(res => res.json())
        .then(beer => renderBeer(beer))

    //update beer and persist
    //submit a form
    updateBtn().addEventListener('submit', (event) => {
        updateBeer(event)
    })

    //add a review, submit
    reviewBtn().addEventListener('submit', (event) => {
        addReview(event)
    })
}) // closes DOMContentLoaded


function renderBeer(beer){

    //include name
    let beerName = document.querySelector('#beerName')
    beerName.innerText = beer.name

    //image
    let beerPic = document.querySelector('#beerPic')
    beerPic.src = beer.image_url

    //descrip
    let beerFacts = document.querySelector('#descrip')
    beerFacts.innerText = beer.description

    //reviews
    let beerReviews = document.querySelector('.reviews')
    ReviewArray = beer.reviews

    ReviewArray.forEach(review => {
        let li = document.createElement('li')
        li.innerText = review
        beerReviews.appendChild(li)
    })
}


function updateBeer(event){
    // debugger
    event.preventDefault()
    let newBeerDescription = event.target[0].value
    
    let newBeerData = {
        description: newBeerDescription
    }

    let metaData = {
        method: "PATCH",
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(newBeerData)
    }

    fetch(url, metaData)
        .then(res => res.json())
        .then(beer => renderBeer(beer))
}

//add a review
function addReview(event){
    //post rqst
    //get review content
    event.preventDefault()

    let li = document.createElement(`li`)
    li.innerText = event.target.firstElementChild.value
    
    let beerReviews = document.querySelector('.reviews')
    beerReviews.appendChild(li)
}

