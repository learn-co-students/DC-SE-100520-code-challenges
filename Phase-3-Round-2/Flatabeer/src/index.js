// Code here

const URL = "http://localhost:3000/beers/1"



document.addEventListener('DOMContentLoaded', () => {
    getBeer()
    getBeerReview()



    document.querySelector('.description').addEventListener('submit', (event) => {
        updateDescrip(event)
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

   let reviewArray = beer.reviews
   reviewArray.forEach((review) => {
     let ul = document.querySelector('.reviews')
     let li = document.createElement('li')
     li.innerText = review
     console.log(li) // in the console, this prints each line item. when I try to append each line item to the ul, only the first review prints in console, and my li still aren't appending  
     ul.append(li)
   })

   document.querySelector('.review-form').addEventListener('submit', (event) => {
      addReview(event)
   })
   
   //ul.appendChild(li)
   beerBox.append(h2, img, beerText)
}

// function renderBeerReview(beer){
//     // console.log(beer)
//   let reviewArray= beer.reviews
//  //console.log(reviewArray)
//   reviewArray.forEach((review) => {
//     //console.log(review)
//     let li = document.createElement('li')
//     li.innerText = review

//     li.append(review)
//      ul_list().appendChild(li)
//   })
//    // console.log(reviewArray)

// }


function updateDescrip(event){
  event.preventDefault()
    
//debugger
    let data = {
      description: event.target.firstElementChild.value
    }
//console.log(event.target.firstElementChild.value)

    let reqObj = {}
    reqObj.method = "PATCH",
    reqObj.headers ={"Content-Type": "application/json"},
    reqObj.body = JSON.stringify(data)

    fetch(URL, reqObj)
        .then(res => res.json())
        .then(beer => renderBeer(beer))
      
  }



function addReview(event){
  

 debugger 
  let newReview = event.target.firstElementChild.value

 
  let li = document.createElement('li')
  li.innerText = newReview

 let ul = document.querySelector('.reviews')
  ul.append(li)
  
}