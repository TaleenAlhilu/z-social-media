let posts = [];

//event listend for whne the user creates a post
document.getElementById("create-post").addEventListener("click", function(){
    let username = document.getElementById("username").value;
    let postText = document.getElementById("post-text").value;


    if(postText === ""){
        alert("please enter a text in your post");
        return;
    }

    if(username === ""){
        username = "Anonymous";
    }

    //an object for what creating a post will have
    let createPost = {
        username: username,
        text: postText,
        timestamp: new Date(), //https://www.w3schools.com/js/js_dates.asp
        likes: 0,
        replies: []
    }

    posts.push(createPost);

    document.getElementById("post-text").value = "";

    sharePosts(createPost);

});

//function to show the posts in the page
function sharePosts(post){
    let postSection = document.createElement("div");

    const name = document.createElement("p"); //creating a paragraph for user name and the time
    let time = post.timestamp;
    name.textContent = `${post.username} (${time})`; //setting the post with the user name and time stamp
    postSection.appendChild(name);

    const caption = document.createElement("p");
    caption.textContent = post.text;
    postSection.appendChild(caption);

    //event listener for the like button after creating it
    const likeButton = document.createElement("button");
    likeButton.textContent = `Like(${post.likes})`;

    likeButton.addEventListener("click", function () {
        post.likes++;  //incrementing how many likes
        likeButton.textContent = `Like(${post.likes})`;
    });

    const replyButton = document.createElement("button");
    replyButton.textContent = "Reply";
    replyButton.classList.add("reply-button");

    //section for replies when the user clicks to reply
    replyButton.addEventListener("click", function () {
        const replySec = document.createElement("div");
        const replyInput = document.createElement("input");
        replyInput.placeholder = "Username (optional)";

        const textInput = document.createElement("input");
        textInput.placeholder = "add a comment";

        const submitButton = document.createElement("button");
        submitButton.textContent = "click to post";

        replySec.appendChild(replyInput);
        replySec.appendChild(textInput);
        replySec.appendChild(submitButton);
        postSection.appendChild(replySec);

        submitButton.addEventListener("click", function () {
            if (textInput.value === "") {
                alert("Please enter a reply");
                return;
            }

            const username = replyInput.value || "Anonymous";
            const userReply = textInput.value; 

            const showReply = document.createElement("p");
            const replyBlock = document.createElement("div");
            showReply.textContent = `${username}: ${userReply}`;

            //a like button for the reply
            const likeB = document.createElement("button");
            let likes = 0;
            likeB.textContent = `Like(${likes})`;
            likeB.addEventListener("click", function(){
                likes++;
                likeB.textContent = `Like(${likes})`;
            });

            //a delete button for the reply
            const deleteReply = document.createElement("button");
            deleteReply.textContent = "Delete";

            deleteReply.addEventListener("click", function () {
                replyBlock.remove();
            });

            replyBlock.appendChild(showReply); 
            replyBlock.appendChild(deleteReply);
            replies.appendChild(replyBlock);
            replyBlock.appendChild(likeB);//appending the likes button for the reply
    
           //remocing the reply feild when the user enter a reply 
            replySec.remove();
        });

    });

    //a delete button for the post
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        postSection.remove();
    });

    const replies = document.createElement("div");
    replies.classList.add("replies");

    postSection.appendChild(likeButton);
    postSection.appendChild(replyButton);
    postSection.appendChild(deleteButton);
    postSection.appendChild(replies);

    document.getElementById("display-posts").appendChild(postSection);
}

//filtering posts based on what the user searches
document.getElementById("search-input").addEventListener("input", function (){
    let input = document.getElementById("search-input").value;
    let searchedName = input.toLowerCase(); //it wont matter if the user searched with upper or lower case it will still find the post based on the word
    let searchedPost = [];

    //looping through the posts to find what the user searched for
    for(let i = 0; i < posts.length; i++){
        let postName = posts[i].text.toLowerCase();
        if (postName.includes(searchedName)) {
            searchedPost.push(posts[i]);
        }
    }

    document.getElementById("display-posts").innerHTML = "";

    if (searchedPost.length === 0) {
        const noPost = document.createElement("p");
        noPost.textContent = `No posts found with the term "${input}"`; // if the post wasnt found this message is displayed
        document.getElementById("display-posts").appendChild(noPost);
    }else{
        for (let i = 0; i < searchedPost.length; i++) {
            sharePosts(searchedPost[i]);
        }
    }
});


