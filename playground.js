//add a review
function addReview(event){
    //post rqst
    //get review content
    let newReview = event.target.firstElementChild.value
        //just wanted to try a different method from target[0]
    //package new content
    let newReviewData = {
        reviews: newReview
    }
    //metadata
    let reviewMetaData = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newReviewData)
    }
    debugger
    //update DB
    fetch(url, reviewMetaData)
        .then(res => res.json())
        .then(data => console.log(data))

}



//add a review, submit
reviewBtn().addEventListener('submit', (event) => {
    addReview(event)
})