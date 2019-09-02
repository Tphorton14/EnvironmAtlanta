$(document).ready(function() {


// postContainer holds all of Community posts
const postContainer = $("#showPosts");

// Variable to hold Community posts
const posts = "";


$("#communityPost").on("submit", addPost)

function addPost(event) {
  event.preventDefault();
  const userInput = $("#user").val().trim();
  const postInput = $("#post").val().trim();
  if (!postInput){
    return;
  }
  console.log(postInput)

  submitPost({user: userInput, body: postInput});
  createRows();
}
function submitPost(postInput) {
  $.post("/api/posts", postInput, function() {
    postContainer.append(`<p>${postInput}</p>`);
    console.log(postInput)
})
}




// createRows handles appending all constructed post HTML inside postContainer
function createRows() {
  postContainer.empty();
  var postsToAdd = [];
  for (var i = 0; i < posts.length; i++) {
    postsToAdd.push(createNewRow(posts[i]));
  }
  postContainer.append(postsToAdd);
}

// This function constructs a post's HTML
function createNewRow(post) {
  const formattedDate = new Date(post.createdAt);
  formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
  const newPostCard = $("<div>");
  newPostCard.addClass("card");
  const newPostCardHeading = $("<div>");
  newPostCardHeading.addClass("card-header");
  const deleteBtn = $("<button>");
  deleteBtn.text("x");
  deleteBtn.addClass("delete btn btn-danger");
  const editBtn = $("<button>");
  editBtn.text("EDIT");
  editBtn.addClass("edit btn btn-info");
  const newPostTitle = $("<h2>");
  const newPostDate = $("<small>");
  const newPostAuthor = $("<h5>");
  newPostAuthor.text("Written by: Author name display is in next activity when we learn joins!");
  newPostAuthor.css({
    float: "right",
    color: "blue",
    "margin-top":
    "-10px"
  });
  const newPostCardBody = $("<div>");
  newPostCardBody.addClass("card-body");
  const newPostBody = $("<p>");
  newPostTitle.text(post.title + " ");
  newPostBody.text(post.body);
  newPostDate.text(formattedDate);
  newPostTitle.append(newPostDate);
  newPostCardHeading.append(deleteBtn);
  newPostCardHeading.append(editBtn);
  newPostCardHeading.append(newPostTitle);
  newPostCardHeading.append(newPostAuthor);
  newPostCardBody.append(newPostBody);
  newPostCard.append(newPostCardHeading);
  newPostCard.append(newPostCardBody);
  newPostCard.data("post", post);
  return newPostCard;
}
// Click event for the delete button
$(document).on("click", "button.delete", handlePostDelete);
// This function figures out which post we want to delete and then calls deletePost
function handlePostDelete() {
  var currentPost = $(this)
    .parent()
    .parent()
    .data("post");
  deletePost(currentPost.id);
}


});

