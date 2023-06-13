(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(e){if(e.ep)return;e.ep=!0;const i=s(e);fetch(e.href,i)}})();document.addEventListener("touchstart",A,!1);document.addEventListener("touchmove",E,!1);var a=new Audio("caviar.mp3"),m=null,p=null;function x(t){return t.touches||t.originalEvent.touches}function A(t){const n=x(t)[0];m=n.clientX,p=n.clientY}function E(t){if(!(!m||!p)){var n=t.touches[0].clientX,s=t.touches[0].clientY,o=m-n,e=p-s;Math.abs(o)>Math.abs(e)&&(o>0,L()),m=null,p=null}}function L(){let t=document.getElementById("content");t.innerHTML="",t.innerHTML=`
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
`;const n=t.querySelector("#thefile");n.onchange=function(){let e=this.files;a.src=URL.createObjectURL(e[0]),a.load(),a.play(),s()};function s(){var e=new AudioContext,i=e.createMediaElementSource(a),r=e.createAnalyser(),c=document.getElementById("canvas");c.width=window.innerWidth,c.height=window.innerHeight;var d=c.getContext("2d");i.connect(r),r.connect(e.destination),r.fftSize=256;var l=r.frequencyBinCount;console.log(l);var y=new Uint8Array(l),v=c.width,g=c.height,b=v/l*2.5,f,h=0;function w(){requestAnimationFrame(w),h=0,r.getByteFrequencyData(y),d.fillStyle="#000",d.fillRect(0,0,v,g);for(var u=0;u<l;u++){f=y[u];var S=f+25*(u/l),q=250*(u/l),T=50;d.fillStyle="rgb("+S+","+q+","+T+")",d.fillRect(h,g-f,b,f),h+=b+1}}a.play(),w()}const o=t.querySelector("#play");o.onclick=()=>{a.paused?(a.play(),s()):a.pause()}}window.onload=function(){};
