class Adapter{

    static #baseUrl = 'http://localhost:3000/images'
    static #commentsUrl = 'http://localhost:3000/comments'

    static getImage(id){
        let url = this.#baseUrl + '/' + id;
        return fetch(url)
        .then(res => res.json());
    }

    static getComments(){
        return fetch(this.#commentsUrl)
        .then(res => res.json());
    }

    static deleteComment(commentId){
        let request = new Object();
        let requestUrl = this.#commentsUrl +'/' + commentId;
        request.method = 'DELETE';
        request.headers = {
            'Content-Type': 'application/json'
        };
        return fetch(requestUrl, request)   
    }

    static updatePost(updatedObject){
        let request = new Object();
        let requestUrl = this.#baseUrl + '/' + updatedObject.id
        request.method = 'PATCH';
        request.headers = {
            'Content-Type': 'application/json'
        };
        request.body = JSON.stringify(updatedObject);
        return fetch(requestUrl, request)
        .then(res => res.json())
    }

    static updateComment(comment){
        let commentObj = new Object();
        commentObj.imageId = comment.imageId;
        commentObj.content = comment.content;
        let request = new Object();
        let requestUrl = this.#commentsUrl
        request.method = 'POST';
        request.headers = {
            'Content-Type': 'application/json'
        };
        request.body = JSON.stringify(commentObj);
        return fetch(requestUrl, request)
        .then(res => res.json())
    }
}