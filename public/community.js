$(document).ready(function() {

//holds all of Community posts
const postContainer = $("#showPosts");
const newPost = $("#newPost")



$("#communityPost").on("submit", addPost)

function addPost(event) {
  event.preventDefault();
  const userInput = $("#user").val().trim();
  const postInput = $("#post").val().trim();
  
  console.log(postInput)

  submitPost({user: userInput, body: postInput});

}

function submitPost(postInput) {

  $.post("/api/posts", postInput)
    .then( function(res) {
      $.get('/api/posts')
      .then(function(allPosts) {
        console.log(allPosts)
        createPost(allPosts)
      })
  
    // console.log(postInput)
    // createPost(postInput)
    
  })

}

function createPost(allPosts) {
 allPosts.forEach(postInput => {
     let formattedDate = new Date(postInput.createdAt);
  formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm a");
  postContainer.append(newPost);
  newPost.append(`<p id='user'>${postInput.name}</p>`);
  newPost.append(`<p id='post'>${postInput.body}</p>`);
  newPost.append(`<p id='time'>${formattedDate}</p>`);
  console.log(user);
  console.log(post);
 })
};








});





