$(document).ready(function() {

// postContainer holds all of Community posts
const postContainer = $("#showPosts");
const newPost = $("#newPost")

// Variable to hold Community posts
const posts = "";


$("#communityPost").on("submit", addPost)

function addPost(event) {
  event.preventDefault();
  const userInput = $("#user").val().trim();
  const postInput = $("#post").val().trim();
  
  console.log(postInput)

  submitPost({user: userInput, body: postInput});

}

function submitPost(postInput) {

  $.post("/api/posts", postInput).then( function(postInput) {
  
    console.log(postInput)
    createPost(postInput)
    
  })

}

function createPost(postInput) {
  let formattedDate = new Date(postInput.createdAt);
  formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm a");
  postContainer.append(newPost);
  newPost.append(`<p id='user'>${postInput.name}</p>`);
  newPost.append(`<p id='post'>${postInput.body}</p>`);
  newPost.append(`<p id='time'>${formattedDate}</p>`);
 
  return createPost;
}

// function createRows(postInput) {
//   postContainer.empty();
//   // var postsToAdd = [];
//   // for (var i = 0; i < posts.length; i++) {
//   //   postsToAdd.push(createNewRow(posts[i]));
//   // }
//   postContainer.append(`<p>${postInput.body}</p>`);
// }

// This function constructs a post's HTML
function createNewRow(postInput) {
  const formattedDate = new Date(postInput.createdAt);
  formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
  const newPostCard = $("<div>");
  newPostCard.addClass("card");
  const deleteBtn = $("<button>");
  deleteBtn.text("x");
  deleteBtn.addClass("delete btn btn-danger");
  const newPostDate = $("<small>");
  const newPostCardBody = $("<div>");
  newPostCardBody.addClass("card-body");
  const newPostBody = $("<p>");
  newPostBody.text(post.body);
  newPostDate.text(formattedDate);;
  newPostCardHeading.append(deleteBtn);

  newPostCardBody.append(newPostBody);

  newPostCard.append(newPostCardBody);
  newPostCard.data("post", post);
  return newPostCard;
}

// $(document).on("click", "button.delete", handlePostDelete);
// // This function figures out which post we want to delete and then calls deletePost
// function handlePostDelete() {
//   var currentPost = $(this)
//     .parent()
//     .parent()
//     .data("post");
//   deletePost(currentPost.id);
// }


});

