// Code here

const URL = "http://localhost:3000/beers/1"
const ul = document.querySelector('reviews')
const ul_list = () => document.querySelector('reviews')

document.addEventListener('DOMContentLoaded', () => {
    getBeer()
    getBeerReview()

     document.querySelector('form').addEventListener('submit', (event) => {
      addReview(event)
      
    })

})

function getBeer(){
    fetch(URL)
     .then(res => res.json())
     .then (beer =>  renderBeer(beer))
}

function getBeerReview(){
    fetch(URL)
 
       
    .then(res => res.json())
    .then(beer => renderBeerReview(beer))
    
}


function renderBeer(beer){
    //console.log(beer)
   let beerBox = document.getElementsByClassName('beer-details')

   let h2 = document.querySelector("h2")
   h2.innerText = beer.name

   let img = document.querySelector('img')
   img.src = beer.image_url

   let beerText = document.querySelector('textarea')
   beerText.innerText = beer.description
    
   beerBox.append(h2, img, beerText)
}

function renderBeerReview(beer){
    // console.log(beer)
  let reviewArray= beer.reviews
 //console.log(reviewArray)
  reviewArray.forEach((review) => {
    console.log(review)
    let li = document.createElement('li')
    li.innerText = review

    li.append(review)
     ul_list().appendChild(li)
  })
   // console.log(reviewArray)

}


function addReview(event){
    console.log(event)
    event.preventDefault() 

    let data = {
      reviews: event.target.textarea.value
    }

 
    let reqObj = {}
    reqObj.method = "POST"
    reqObj.headers ={"Content-Type": "application/json"}
    reqObj.body = JSON.stringify(data)

    fetch(URL, reqObj)
        .then(res => res.json())
        .then(data => addReview(data))
  }

