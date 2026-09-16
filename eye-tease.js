(function(){'use strict';
function start(){
  var eye=document.querySelector('#secretToggle,#tearToggle');if(!eye)return;
  var path=location.pathname,kind=/\/person2-shiten(?:\/|$)/.test(path)?2:/\/person3-shiten(?:\/|$)/.test(path)?3:/\/person4-shiten(?:\/|$)/.test(path)?4:/\/person5-shiten(?:\/|$)/.test(path)?5:0;
  if(!kind)return;
  var reduced=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduced)return;
  var style=document.createElement('style');style.textContent=`
.shiten-gimmick-tease{position:fixed;z-index:2147482999;pointer-events:none}
.shiten-tease-food{right:80px;bottom:29px;width:20px;height:13px;border:2px solid #111;border-radius:50%;background:#fff;animation:shitenFoodPeek 1.35s ease-in-out both}.shiten-tease-food:before{content:'';position:absolute;left:7px;top:3px;width:5px;height:5px;border-radius:50%;background:#111}.shiten-tease-food:after{content:'';position:absolute;left:9px;top:4px;width:2px;height:2px;border-radius:50%;background:#fff}
#secretToggle.shiten-tease-hungry .secret-iris,#tearToggle.shiten-tease-hungry .tear-iris,#secretToggle.shiten-tease-hungry [class*="iris"],#tearToggle.shiten-tease-hungry [class*="iris"]{transform:translate(-7px,1px)!important;transition:transform .18s ease!important}
.shiten-tease-cat-pupil{width:5px;height:27px;border-radius:999px;background:#111;opacity:0;transform:translate(-50%,-50%) scaleY(.2);animation:shitenCatPeek 1.35s ease-in-out both}
.shiten-tease-tear{width:12px;height:16px;border:2px solid #111;background:#74dc8a;border-radius:60% 50% 62% 42%;transform:rotate(45deg) scale(.4);opacity:0;animation:shitenTearDrop 1.35s ease-in both}
.shiten-tease-sprout{width:3px;height:0;background:#111;border-radius:2px;transform-origin:50% 100%;opacity:0;animation:shitenSproutStem .75s ease-out .72s both}.shiten-tease-sprout:before,.shiten-tease-sprout:after{content:'';position:absolute;bottom:8px;width:9px;height:6px;border:2px solid #111;background:#74dc8a;border-radius:70% 30% 70% 30%;opacity:0;animation:shitenSproutLeaf .45s ease-out 1s both}.shiten-tease-sprout:before{right:1px;transform-origin:100% 100%;transform:rotate(-28deg) scale(.3)}.shiten-tease-sprout:after{left:1px;transform-origin:0 100%;transform:scaleX(-1) rotate(-28deg) scale(.3)}
#secretToggle.shiten-tease-glitch,#tearToggle.shiten-tease-glitch{animation:shitenEyeGlitch 1.15s steps(1,end) both!important}.shiten-tease-glitch-word{right:72px;bottom:55px;font:900 12px/1 -apple-system,BlinkMacSystemFont,"Hiragino Sans","Yu Gothic",sans-serif;letter-spacing:.08em;color:#111;background:#fff;border:2px solid #111;padding:4px 6px;box-shadow:2px 2px 0 #111;opacity:0;animation:shitenGlitchWord 1.15s steps(1,end) both}
@keyframes shitenFoodPeek{0%{opacity:0;transform:translateX(-10px) translateY(3px) rotate(-12deg) scale(.7)}18%,72%{opacity:1}45%{transform:translateX(7px) translateY(-3px) rotate(7deg) scale(1)}100%{opacity:0;transform:translateX(25px) translateY(1px) rotate(-6deg) scale(.75)}}
@keyframes shitenCatPeek{0%,100%{opacity:0;transform:translate(-50%,-50%) scaleY(.15)}22%,76%{opacity:1;transform:translate(-50%,-50%) scaleY(1)}}
@keyframes shitenTearDrop{0%{opacity:0;transform:translateY(-7px) rotate(45deg) scale(.35)}18%{opacity:1}55%{opacity:1;transform:translateY(16px) rotate(45deg) scale(1)}68%,100%{opacity:0;transform:translateY(24px) rotate(45deg) scale(.65)}}
@keyframes shitenSproutStem{0%{opacity:0;height:0}25%{opacity:1}100%{opacity:1;height:13px}}@keyframes shitenSproutLeaf{0%{opacity:0}100%{opacity:1;transform:rotate(-28deg) scale(1)}}
@keyframes shitenEyeGlitch{0%,100%{filter:none}16%{filter:hue-rotate(90deg) saturate(1.8);transform:translate(-2px,1px) rotate(-5deg)}34%{filter:hue-rotate(210deg) saturate(2);transform:translate(2px,-1px) rotate(-1deg)}52%{filter:hue-rotate(330deg) saturate(1.7);transform:translate(-1px,0) rotate(-4deg)}70%{filter:none;transform:translate(1px,0) rotate(-3deg)}84%{filter:hue-rotate(150deg);transform:translate(0,0) rotate(-6deg)}}
@keyframes shitenGlitchWord{0%,100%{opacity:0;transform:translateX(0)}12%{opacity:1;transform:translateX(-2px)}28%{opacity:1;transform:translateX(2px)}78%{opacity:1;transform:translateX(-1px)}90%{opacity:0}}
@media(max-width:390px){.shiten-tease-food{right:75px}.shiten-tease-glitch-word{right:68px}}`;
  document.head.appendChild(style);
  var nodes=[],timers=[],done=false;
  function later(fn,ms){var id=setTimeout(fn,ms);timers.push(id);return id}
  function add(node){nodes.push(node);document.body.appendChild(node);return node}
  function clear(){nodes.forEach(function(n){if(n&&n.parentNode)n.parentNode.removeChild(n)});nodes=[];eye.classList.remove('shiten-tease-hungry','shiten-tease-glitch')}
  function stop(){if(done)return;done=true;timers.forEach(clearTimeout);clear()}
  function rect(){return eye.getBoundingClientRect()}
  function run(){
    if(done)return;clear();
    if(kind===2){eye.classList.add('shiten-tease-hungry');var f=document.createElement('div');f.className='shiten-gimmick-tease shiten-tease-food';add(f);later(clear,1450)}
    if(kind===3){var r=rect(),p=document.createElement('div');p.className='shiten-gimmick-tease shiten-tease-cat-pupil';p.style.left=(r.left+r.width/2)+'px';p.style.top=(r.top+r.height/2)+'px';add(p);later(clear,1450)}
    if(kind===4){var r4=rect(),t=document.createElement('div'),s=document.createElement('div');t.className='shiten-gimmick-tease shiten-tease-tear';t.style.left=(r4.left+r4.width/2-6)+'px';t.style.top=(r4.bottom-2)+'px';s.className='shiten-gimmick-tease shiten-tease-sprout';s.style.left=(r4.left+r4.width/2)+'px';s.style.top=(r4.bottom+28)+'px';add(t);add(s);later(clear,1700)}
    if(kind===5){eye.classList.add('shiten-tease-glitch');var w=document.createElement('div');w.className='shiten-gimmick-tease shiten-tease-glitch-word';w.textContent='視展';add(w);later(function(){if(!done&&w.parentNode)w.textContent='視点'},260);later(function(){if(!done&&w.parentNode)w.textContent='shiten'},520);later(function(){if(!done&&w.parentNode)w.textContent='視展'},780);later(clear,1250)}
  }
  later(run,4300);eye.addEventListener('pointerdown',stop,{once:true,passive:true});eye.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')stop()},{once:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();