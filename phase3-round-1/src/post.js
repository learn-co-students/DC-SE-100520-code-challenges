class Post{

    constructor(postObj){
        this.id = postObj.id;
        this.title = postObj.title;
        this.likes = postObj.likes;
        this.image =postObj.image;
    }

    like(){
        this.likes += 1;
    }

    async getComments(){
        return await Adapter.getComments(this.id);
    }

    downVote(){
        this.likes -= 1;
    }
}