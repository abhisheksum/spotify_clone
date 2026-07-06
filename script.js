// ===============================
// SONG DATA
// ===============================

const songs = [
    {
        title: "Perfect",
        artist: "Ed Sheeran",
        file: "songs/song1.mp3",
        cover: "images/cover1.jpg"
    },
    {
        title: "Shape Of You",
        artist: "Ed Sheeran",
        file: "songs/song2.mp3",
        cover: "images/cover2.jpg"
    },
    {
        title: "Believer",
        artist: "Imagine Dragons",
        file: "songs/song3.mp3",
        cover: "images/cover3.jpg"
    },
    {
        title: "Faded",
        artist: "Alan Walker",
        file: "songs/song4.mp3",
        cover: "images/cover4.jpg"
    },
    {
        title: "On My Way",
        artist: "Alan Walker",
        file: "songs/song5.mp3",
        cover: "images/cover5.jpg"
    },
    {
        title: "Closer",
        artist: "Chainsmokers",
        file: "songs/song6.mp3",
        cover: "images/cover6.jpg"
    },
    {
        title: "Let Me Love You",
        artist: "DJ Snake",
        file: "songs/song7.mp3",
        cover: "images/cover7.jpg"
    },
    {
        title: "Hymn For The Weekend",
        artist: "Coldplay",
        file: "songs/song8.mp3",
        cover: "images/cover8.jpg"
    }
];

// ===============================
// ELEMENTS
// ===============================

const audio = new Audio();

const playButtons = document.querySelectorAll(".playBtn");

const masterPlay = document.getElementById("masterPlay");

const prevBtn = document.getElementById("prev");

const nextBtn = document.getElementById("next");

const progressBar = document.getElementById("progressBar");

const volume = document.getElementById("volume");

const currentSong = document.getElementById("currentSong");

const currentArtist = document.getElementById("currentArtist");

const currentCover = document.getElementById("currentCover");

const currentTime = document.getElementById("currentTime");

const duration = document.getElementById("duration");

let currentIndex = 0;

// ===============================
// LOAD SONG
// ===============================

function loadSong(index) {

    audio.src = songs[index].file;

    currentSong.innerText = songs[index].title;

    currentArtist.innerText = songs[index].artist;

    currentCover.src = songs[index].cover;
}

loadSong(currentIndex);

// ===============================
// PLAY SONG
// ===============================

function playSong() {

    audio.play();

    masterPlay.innerHTML =
        '<i class="fa-solid fa-pause"></i>';
}

// ===============================
// PAUSE SONG
// ===============================

function pauseSong() {

    audio.pause();

    masterPlay.innerHTML =
        '<i class="fa-solid fa-play"></i>';
}

// ===============================
// MASTER BUTTON
// ===============================

masterPlay.addEventListener("click", () => {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();
    }

});

// ===============================
// PLAY FROM CARD
// ===============================

playButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        currentIndex = index;

        loadSong(currentIndex);

        playSong();

    });

});

// ===============================
// NEXT SONG
// ===============================

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= songs.length) {

        currentIndex = 0;

    }

    loadSong(currentIndex);

    playSong();

});

// ===============================
// PREVIOUS SONG
// ===============================

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = songs.length - 1;

    }

    loadSong(currentIndex);

    playSong();

});

// ===============================
// UPDATE PROGRESS BAR
// ===============================

audio.addEventListener("timeupdate", () => {

    const progress = (audio.currentTime / audio.duration) * 100;

    progressBar.value = progress || 0;

    currentTime.innerText = formatTime(audio.currentTime);

    duration.innerText = formatTime(audio.duration);

});

// ===============================
// SEEK BAR
// ===============================

progressBar.addEventListener("input", () => {

    audio.currentTime = (progressBar.value / 100) * audio.duration;

});

// ===============================
// VOLUME
// ===============================

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});

// ===============================
// AUTO NEXT
// ===============================

audio.addEventListener("ended", () => {

    currentIndex++;

    if (currentIndex >= songs.length) {

        currentIndex = 0;

    }

    loadSong(currentIndex);

    playSong();

});

// ===============================
// FORMAT TIME
// ===============================

function formatTime(time) {

    if (isNaN(time)) return "0:00";

    let minutes = Math.floor(time / 60);

    let seconds = Math.floor(time % 60);

    if (seconds < 10) {

        seconds = "0" + seconds;

    }

    return minutes + ":" + seconds;

}

// ===============================
// KEYBOARD SHORTCUTS
// ===============================

document.addEventListener("keydown", (e) => {

    if (e.code === "Space") {

        e.preventDefault();

        if (audio.paused) {

            playSong();

        } else {

            pauseSong();

        }

    }

    if (e.code === "ArrowRight") {

        nextBtn.click();

    }

    if (e.code === "ArrowLeft") {

        prevBtn.click();

    }

});

// ===============================
// START VOLUME
// ===============================

audio.volume = 1;
