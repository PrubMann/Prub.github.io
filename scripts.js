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

/* Toggle Unmute */

function toggleMute() {
  var video = document.getElementById("bgvid");
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
}

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
