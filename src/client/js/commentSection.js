const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const xBtn = document.querySelectorAll("#xBtn")



const addcomment = (text, newCommentId) => {
    const VideoComments = document.querySelector(".video__comments ul")
    const newComment = document.createElement("li");
    newComment.dataset = newCommentId;
    newComment.className = "video__comment";
    const icon = document.createElement("i");
    icon.className = "fas fa-comment"
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    const rmSpan = document.createElement("span");
    rmSpan.innerText = "❌";
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(rmSpan);
    VideoComments.prepend(newComment);
}





const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    console.log("hi")
    console.log("submit")
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if (text === "") {
        return;
    }
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });
    if (response.status === 201) {
        textarea.value = "";
        const { newCommentId } = await response.json();
        addcomment(text, newCommentId);

    }

};

if (form) {
    form.addEventListener("submit", handleSubmit);
}

const removeComment = async (event) => {
    const videoList = document.querySelector(".video__comment")
    const commentId = videoList.dataset.id;
    const li = event.target.parentElement;
    li.remove();
    const response = await fetch(`/api/videos/${commentId}/remove`,{
        method:"DELETE"
    })
        
}

xBtn.forEach(xBtn => {
    xBtn.addEventListener("click", removeComment)
}) 

