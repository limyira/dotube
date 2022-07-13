const video = document.querySelector("video");
const play = document.getElementById("play");
const mute = document.getElementById("mute");
const time = document.getElementById("time");
const volume = document.getElementById("volume");
console.log(play);

const handlePlay = (e) => {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
};



play.addEventListener("click", handlePlay);
