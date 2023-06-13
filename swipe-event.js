document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);


var audio = new Audio('caviar.mp3');
var xDown = null;
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
    evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
    if (xDiff > 0) {
      /* right swipe */
      removeContent();
    } else {
      /* left swipe */
      removeContent();
    }
  } else {
    if (yDiff > 0) {
      /* down swipe */
    } else {
      /* up swipe */
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
};

function removeContent() {
  let content = document.getElementById('content');
  content.innerHTML = ''
  content.innerHTML = `
    <input type="file" id="thefile" accept="audio/*" />
    <div class="body">
      <header class="headers">
        <h1 class="headers__title">Sunil Pereira</h1>
        <h2 class="headers__sub-title">1952 -2001</h2>
      </header>
      <ul class="list">
        <li>Sunil Pereira was born on September 14</li>
      </ul>
      <span class="badge">1970</span>
      <p class="description">Sunil Pereira, along with his brothers and friends, formed the band Gypsies</p>
      <p class="description-2">The band was funded by their father</p>
      <ul class="list">
        <li>
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
        </li>
        <li>
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
        </li>
        <li>
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
        </li>
        <li>
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
        </li>
      </ul>
      <canvas id="canvas"></canvas>
      <div class="button-wrapper">
        <button onclick="playSong()" id="play" class="play-button" type="button"><img src="./play.svg" alt="play-button"></button>
      </div>
    </div>
`
  const file = content.querySelector('#thefile');
  file.onchange = function() {

    let files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();
    animateAudio()
  };

  function animateAudio() {
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        var r = barHeight + (25 * (i / bufferLength));
        var g = 250 * (i / bufferLength);
        var b = 50;

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }

    audio.play();
    renderFrame();
  }

  const playButton = content.querySelector('#play')
  playButton.onclick = () => {
    if (!audio.paused) {
      audio.pause();
    } else {
      audio.play();
      animateAudio()
    }
  }
}
