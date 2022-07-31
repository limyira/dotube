import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const startBtn = document.querySelector("#startBtn");
const preview = document.querySelector("#preview");


let stream;
let recorder;
let videoFile;



const files = {
    input: "recording.webm",
    output: "output.mp4",
    thumb:"thumbnail.jpg",
}

const handleDownload = async () => {

    startBtn.removeEventListener("click", handleDownload);

    startBtn.innerText = "Transcoding....";

    startBtn.disabled = true;



    const ffmpeg = createFFmpeg({ corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js', log: true });
    await ffmpeg.load();

    ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));

    await ffmpeg.run("-i", files.input, "-r", "60", files.output);


    await ffmpeg.run("-i", files.input, "-ss", "00:00:01", "-frames:v", "1", files.thumb)

    const mp4File = ffmpeg.FS("readFile", files.output);
    const thumbFile = ffmpeg.FS("readFile", files.thumb );

    const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
    const thumbBlob = new Blob([thumbFile.buffer], {type: "image/jpg"});


    const mp4Url = URL.createObjectURL(mp4Blob);
    const thumbUrl = URL.createObjectURL(thumbBlob);




    const a = document.createElement("a");
    a.href = mp4Url;
    a.download = "My Recording.mp4";
    document.body.appendChild(a);
    a.click();



    const thumbA = document.createElement("a");
    thumbA.href = thumbUrl;
    thumbA.download = "Thumbnail.jpg";
    document.body.appendChild(thumbA);
    thumbA.click();


    startBtn.disabled = false;
    startBtn.innerText = "Start Recording";
    init();
    startBtn.addEventListener("click", handleStart)
    
}



const handleStop = () => {
    startBtn.innerText ="Download Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleDownload);
    recorder.stop();
}


const handleStart =() => {
    startBtn.innerText = "Stop Recording"
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);

    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
        videoFile = URL.createObjectURL(event.data)
        preview.srcObject = null;
        preview.src = videoFile;
        preview.loop = true
        preview.play();
    }
    
    recorder.start();
    
}


const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio:true,
        video:true,
    })
    console.log(stream)
    preview.srcObject = stream;
    preview.play()
}

init();

startBtn.addEventListener("click", handleStart)