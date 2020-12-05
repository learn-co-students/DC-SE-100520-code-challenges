const url = 'http://localhost:3000/beers/1'
const updateBtn = () => document.querySelector('.description')

//ON PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {
    //see FIRST beer's details
    fetch(url)
        .then(res => res.json())
        .then(beer => renderBeer(beer))

    //update beer and persist
    //submit a form
    updateBtn().addEventListener('submit', (event) =>{
        updateBeer(event)
    })
})


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

