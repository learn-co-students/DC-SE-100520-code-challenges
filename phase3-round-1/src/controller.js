class Controller{

    static async init(){
        let post = await Controller.getPost(1);
        let likeButton = document.querySelector('#post-like-button');
        let downVoteButton = document.querySelector('#downvote');
        let comments = await Controller.getComments();
        let newCommentForm = document.querySelector('#comment-form');
        downVoteButton.addEventListener('click', Controller.downVote);
        likeButton.addEventListener('click', Controller.likePost);
        newCommentForm.addEventListener('submit', Controller.leaveComment);
        Controller.displayPost(post);
        Controller.displayComments(comments);

    }

    static async getPost(id){
        let post;
        await Adapter.getImage(id)
        .then(img => post = new Post(img));
        return post;
    }

    static displayPost(post){
        document.querySelector('#post-title').innerText = post.title;
        document.querySelector('#post-image').src = post.image;
        document.querySelector('#post-likes').innerText = post.likes + ' likes';
        document.querySelector('#post-like-button').value = post.id;
        document.querySelector('#downvote').value = post.id;
        document.querySelector('#comment-form').dataset.id = post.id;
    }

    static async likePost(event){
        let post = await Controller.getPost(event.target.value);
        post.like();
        Adapter.updatePost(post);
        Controller.displayPost(post);
    }

    static async downVote(event){
        let post = await Controller.getPost(event.target.value);
        post.downVote();
        Adapter.updatePost(post);
        Controller.displayPost(post);
    }

    static displayComment(comment){
        let commentsList = document.querySelector('#comments-list');
        let li = document.createElement('li');
        let btn = document.createElement('button');
        li.innerText = comment.content;
        li.dataset.id = comment.id;
        btn.dataset.id = comment.id;
        btn.addEventListener('click', Controller.deleteComment);
        btn.innerText ='Delete Comment';
        btn.classList.add('comment-button');
        li.appendChild(btn);
        commentsList.appendChild(li);
    }

    static async deleteComment(event){
        await Adapter.deleteComment(event.target.dataset.id);
        Controller.displayComments(await Controller.getComments());
    }

    static displayComments(comments){
        let list = document.querySelector('#comments-list');
        while(list.firstChild){
            list.removeChild(list.firstChild);
        }
        comments.forEach(comment => {
            Controller.displayComment(comment);
        })
    }

    static async getComments(){
        let commentsArray = []
        await Adapter.getComments()
        .then(comments => comments.forEach(comment => {
            commentsArray.push(comment);
        }))
        return commentsArray
    }

    static async leaveComment(event){
        event.preventDefault();
        let comment = new Object();
        comment.content = event.target.comment.value;
        comment.imageId = event.target.dataset.id; 
        console.log(comment.imageId); 
        await Adapter.updateComment(comment);
        Controller.displayComment(comment);
        event.target.reset()
    }
}