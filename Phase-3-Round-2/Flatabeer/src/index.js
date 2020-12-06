// Code here
const beerUrl = 'http://localhost:3000/beers/'
document.addEventListener('DOMContentLoaded',(event)=> {
    fetchBeer()
    let postAReview = document.querySelector('form.review-form')
    postAReview.addEventListener('submit',(event) => {
        event.preventDefault()
        addReview(event)         
    })
    let descForm = document.querySelector('form.description')
    let updateBtn = document.querySelector('button.updateBtn')
        updateBtn.addEventListener('click', (event) => {
            event.preventDefault()

            upDateBeer(event,descForm)

        })
     
})      


    function fetchBeer() {
        fetch(beerUrl + 1)
        .then(resp => resp.json())
        .then(beer => renderBeer(beer))      
    }   
        

function renderBeer(beer){
   let beerName = document.querySelector('h2')
                beerName.innerText = beer.name
    let beerImg = document.querySelector('img')
              beerImg.src = beer.image_url

    let beerDesc = document.querySelector('textarea#descInput')
        beerDesc.innerText = beer.description
    let beerReviewUl = document.querySelector('ul.reviews')

    beerReviewUl.innerHtml = " "
    
    beer.reviews.forEach(review => {   
        let li = document.createElement('li') 
        li.innerText = review
        beerReviewUl.appendChild(li)
     })

     
        
}

   

function addReview(event){
    let postAReview = document.querySelector('form.review-form')
    let newLi = document.createElement('li') 
    newLi.innerText = event.target.textInp.value

    let beerReviewUl = document.querySelector('ul.reviews')
    beerReviewUl.appendChild(newLi)
    } 

function upDateBeer(event,descForm){
   
     console.log(event.currentTarget)
     newDescInput = event.target.parentNode.beerTextDesc.value
     descForm.innerHtml =  newDescInput
    fetch(beerUrl + 1, {
        method: "PATCH",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({description: newDescInput}),

        })
        .then(res => res.json())
        .then((beer)=> console.log(newDescInput))
}
   

    