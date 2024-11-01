// tooltip
var tooltip = document.querySelectorAll(".tooltip1");

document.addEventListener("mousemove", fn, false);

function fn(e) {
  for (var i = tooltip.length; i--; ) {
    tooltip[i].style.left = e.pageX + "px";
    tooltip[i].style.top = e.pageY + "px";
  }
}
// ..

/* Delay */

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/* Show Video */

function showVideo() {
  var element = document.getElementById("bgvid");
  var button = document.getElementById("button");
  element.style.display = "block";
  button.style.display = "none";
  delay(100).then(() => toggleMute());
  delay(50).then(() => element.play());
  element.volume = 0.5;
  audio.play();
  playIcon.style.display = "none";
  pauseIcon.style.display = "inline";
  updateMedia1(currentIndex);
}
// ..

function mutevid() {
  var video = document.getElementById("bgvid");
  var icon = document.getElementById("icon");
  if (video.muted) {
    video.muted = false;
    icon.className = "fa-sharp fa-solid fa-volume-high";
  } else {
    video.muted = true;
    icon.className = "fa-solid fa-volume-xmark";
  }
}

// Page Load
window.addEventListener("load", function () {
  document.getElementById("loading").style.display = "none";
});

// Music player
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const mediaList = [
  {
    title: "Shotgun Willy - Bombs Away",
    song: "assets/bombs away.mp3",
    video: "assets/background.mp4",
  },
  {
    title: "Creepy Nuts - Otonoke (Dandadan Opening)",
    song: "assets/dandadan.mp3",
    video: "assets/dandadanVid.mp4",
  },
];
let currentIndex = 0;

const bgvideo = document.getElementById("bgvid");
const vidmusic = document.getElementById("audio");
const songtitle = document.getElementById("songtitle");

// Update Media (Skip and Previous buttons)
function updateMedia(index) {
  if (index >= 0 && index < mediaList.length) {
    [bgvideo, songtitle, progress, currentTimeEl, durationEl, playIcon, pauseIcon].forEach((el) => (el.style.opacity = 0));
    setTimeout(() => {
      playIcon.style.display = "none";
      pauseIcon.style.display = "inline";
      [bgvideo, songtitle, progress, currentTimeEl, durationEl, playIcon, pauseIcon, skipButton, prevButton].forEach((el) => (el.style.opacity = 1));
      bgvideo.src = mediaList[index].video;
      bgvideo.play();
      vidmusic.src = mediaList[index].song;
      vidmusic.play();
      songtitle.textContent = mediaList[index].title;
    }, 500);
  }
}
function updateMedia1(index) {
  if (index >= 0 && index < mediaList.length) {
    bgvideo.src = mediaList[index].video;
    bgvideo.play();
    vidmusic.src = mediaList[index].song;
    vidmusic.play();
    songtitle.textContent = mediaList[index].title;
  }
}
skipButton = document.getElementById("next");
prevButton = document.getElementById("prev");

// Skip Button
document.getElementById("next").addEventListener("click", () => {
  prevButton.style.opacity = 0;
  currentIndex = (currentIndex + 1) % mediaList.length;
  updateMedia(currentIndex);
});
// Prev Button
document.getElementById("prev").addEventListener("click", () => {
  skipButton.style.opacity = 0;
  currentIndex = (currentIndex - 1 + mediaList.length) % mediaList.length;
  updateMedia(currentIndex);
});

// Play/Pause toggle functionality
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playIcon.style.display = "none";
    pauseIcon.style.display = "inline";
  } else {
    audio.pause();
    playIcon.style.display = "inline";
    pauseIcon.style.display = "none";
  }
});

// Update progress bar and time display
audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const progressPercent = (currentTime / duration) * 100;
  progress.value = progressPercent + -0.5;

  // Update current time
  currentTimeEl.textContent = formatTime(currentTime);

  // Update total duration
  if (!isNaN(duration)) {
    durationEl.textContent = formatTime(duration);
  }

  // Update progress bar background to fill left part with green as the song plays
  updateProgressBar();
});

// Allow seeking by moving the progress bar
progress.addEventListener("input", () => {
  const duration = audio.duration;
  audio.currentTime = (progress.value / 100) * duration;
  updateProgressBar();
});

// Helper function to format time in mm:ss
function formatTime(time) {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Function to update the progress bar color dynamically
function updateProgressBar() {
  const value = (audio.currentTime / audio.duration) * 100;
  progress.style.background = `linear-gradient(to right, #251917 ${value}%, #b3695d ${value}%)`;
}
