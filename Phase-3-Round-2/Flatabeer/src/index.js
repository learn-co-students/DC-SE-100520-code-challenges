// Code here

const URL = "http://localhost:3000/beers/1"


document.addEventListener('DOMContentLoaded', () => {
    getBeer()
   

})

function getBeer(){
    fetch(URL)
     .then(res => res.json())
     .then (beer =>  renderBeer(beer))
}

function getBeerReviews(){

}


function renderBeer(beer){
    console.log(beer)
   let beerBox = document.getElementsByClassName('beer-details')

   let h2 = document.querySelector("h2")
   h2.innerText = beer.name

   let img = document.querySelector('img')
   img.src = beer.image_url

   let beerText = document.querySelector('textarea')
   beerText.innerText = beer.description
    
   beerBox.append(h2, img, beerText)
}
function renderBeerReviews(){

}

 let ul = document.querySelector('reviews')
   let li = document.querySelector('comments-here')
   li.innerText = beer.reviews
function addReview(event){
    console.log(event)
    
    // event.preventDefault() // means when we click submit it's going to do something 

    // let data = {
    //   name: event.target.name.value,
    //   image: event.target.image.value,
    //   likes: 0
    // }
    
    //   let reqObj = {}

    //     reqObj.method = "POST"
    //     reqObj.headers ={"Content-Type": "application/json"}
    //     reqObj.body = JSON.stringify(data)

    //   fetch(URL, reqObj)
    //     .then(res => res.json())
    //     .then(data => renderToy(data))
  }

