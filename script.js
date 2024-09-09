const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
// const progressBar = document.querySelector('.progress-bar::after');
const title = document.getElementById('title');
const progressBar = document.getElementById('progress');
const progressContainer = document.querySelector('.progress-bar'); 
const artist = document.getElementById('artist');
const songThumbnail = document.getElementById('song-thumbnail');
const currentTimeDisplay = document.getElementById('current-time');
const totalDurationDisplay = document.getElementById('total-duration');

const tracks = [
    {
        title: 'Khamoshiyan',
        artist: 'by Arijit Singh',
        src: 'khamoshiyan.mp3',
        thumbnail: 'khamo.jpeg'
    },
    {
        title: 'Kaise Hua',
        artist: 'by Vishal Mishra',
        src: 'Kaise Hua.mp3',
        thumbnail: 'kaise.jpg'
    },
    {
        title:'Sunn Raha Hai',
        artist:'by Raxstar and Shreya Ghoshal',
        src:'Sunn Raha.mp3',
        thumbnail:'sun.jpg'
    },
    {
        title: 'Baatein Ye Kabhi Na',
        artist: 'by Arijit Singh and Jeet Ganguly',
        src: 'baatein Ye.mp3',
        thumbnail: 'baatein.jpeg'
    }
   
];

let currentTrack = 0;
let isPlaying = false;

function loadTrack(trackIndex) {
    const track = tracks[trackIndex];
    audio.src = track.src;
    title.innerText = track.title;
    artist.innerText = track.artist;
    songThumbnail.src = track.thumbnail;
}

function playTrack() {
    audio.play();
    isPlaying = true;
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
}

function pauseTrack() {
    audio.pause();
    isPlaying = false;
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
}

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
});

nextBtn.addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    playTrack();
});

prevBtn.addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    playTrack();
});

audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.floor(audio.currentTime % 60);
    currentTimeDisplay.innerText = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

    let totalMinutes = Math.floor(audio.duration / 60);
    let totalSeconds = Math.floor(audio.duration % 60);
    totalDurationDisplay.innerText = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
});

progressContainer.addEventListener('click', (event) => {
    const width = progressContainer.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
});

// Load the first track initially
loadTrack(currentTrack);
