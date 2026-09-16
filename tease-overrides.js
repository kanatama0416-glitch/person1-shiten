(function(){
  'use strict';

  function start(){
    var path=location.pathname;
    var is03=/\/person3-shiten(?:\/|$)/.test(path);
    var is04=/\/person4-shiten(?:\/|$)/.test(path);
    var is05=/\/person5-shiten(?:\/|$)/.test(path);
    if(!is03&&!is04&&!is05)return;

    var eye=document.querySelector('#secretToggle,#tearToggle');
    if(!eye)return;

    var root=document.documentElement;
    root.classList.add(is03?'shiten-tease-v2-03':is04?'shiten-tease-v2-04':'shiten-tease-v2-05');

    var style=document.createElement('style');
    style.id='shiten-tease-overrides-style';
    style.textContent=`
html.shiten-tease-v2-03 .shiten-tease-cat-pupil{display:none!important}
html.shiten-tease-v2-04 .shiten-tease-tear,
html.shiten-tease-v2-04 .shiten-tease-sprout{display:none!important}
html.shiten-tease-v2-05 .shiten-tease-glitch-word{display:none!important}
html.shiten-tease-v2-05 #secretToggle.shiten-tease-glitch,
html.shiten-tease-v2-05 #tearToggle.shiten-tease-glitch{animation:none!important;filter:none!important}

html.shiten-tease-v2-03 #secretToggle.shiten-v2-cat-eye,
html.shiten-tease-v2-03 #tearToggle.shiten-v2-cat-eye{
  overflow:hidden!important;
  background:#ffd83d!important;
  border-color:#111!important;
  opacity:1!important;
  transform:rotate(3deg) scale(1.04)!important;
  box-shadow:0 0 0 3px #ffd83d,3px 3px 0 #111!important;
  transition:background-color .3s ease,transform .3s ease,box-shadow .3s ease,opacity .3s ease!important;
}
html.shiten-tease-v2-03 #secretToggle.shiten-v2-cat-eye .secret-iris,
html.shiten-tease-v2-03 #tearToggle.shiten-v2-cat-eye .tear-iris,
html.shiten-tease-v2-03 #secretToggle.shiten-v2-cat-eye [class*="iris"],
html.shiten-tease-v2-03 #tearToggle.shiten-v2-cat-eye [class*="iris"]{opacity:0!important}
html.shiten-tease-v2-03 #secretToggle.shiten-v2-cat-eye::before,
html.shiten-tease-v2-03 #tearToggle.shiten-v2-cat-eye::before{
  content:""!important;position:absolute!important;inset:0!important;display:block!important;
  background:#ffd83d!important;border:0!important;box-shadow:none!important;z-index:30!important;pointer-events:none!important;
}
html.shiten-tease-v2-03 #secretToggle.shiten-v2-cat-eye::after,
html.shiten-tease-v2-03 #tearToggle.shiten-v2-cat-eye::after{
  content:""!important;position:absolute!important;left:50%!important;top:50%!important;
  width:4px!important;height:24px!important;background:#111!important;border:0!important;border-radius:999px!important;
  box-shadow:none!important;transform:translate(-50%,-50%)!important;z-index:31!important;pointer-events:none!important;
  animation:shitenV2CatPupil 1.85s ease both!important;
}

.shiten-v2-eye-sprout{position:fixed;z-index:2147483002;width:3px;height:24px;background:#111;border-radius:3px;pointer-events:none;transform-origin:50% 100%;animation:shitenV2SproutStem 1.9s ease both}
.shiten-v2-eye-sprout::before,.shiten-v2-eye-sprout::after{content:"";position:absolute;top:-3px;width:13px;height:8px;background:#70dc8b;border:2px solid #111;opacity:0}
.shiten-v2-eye-sprout::before{right:1px;border-radius:80% 25% 80% 25%;transform-origin:100% 100%;animation:shitenV2LeafLeft 1.9s ease both}
.shiten-v2-eye-sprout::after{left:1px;border-radius:25% 80% 25% 80%;transform-origin:0 100%;animation:shitenV2LeafRight 1.9s ease both}

html.shiten-tease-v2-05 #secretToggle.shiten-v2-color-spin .secret-iris,
html.shiten-tease-v2-05 #tearToggle.shiten-v2-color-spin .tear-iris,
html.shiten-tease-v2-05 #secretToggle.shiten-v2-color-spin [class*="iris"],
html.shiten-tease-v2-05 #tearToggle.shiten-v2-color-spin [class*="iris"]{animation:shitenV2IrisColors 1.85s linear both!important}
html.shiten-tease-v2-05 #secretToggle.shiten-v2-color-spin,
html.shiten-tease-v2-05 #tearToggle.shiten-v2-color-spin{animation:shitenV2EyeColorPulse 1.85s linear both!important}
.shiten-v2-mojibake{position:fixed;z-index:2147483002;right:72px;bottom:55px;pointer-events:none;white-space:nowrap;padding:4px 6px;border:2px solid #111;background:#fff;color:#111;box-shadow:2px 2px 0 #111;font:900 12px/1.05 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:.04em;animation:shitenV2MojibakeBox 1.85s steps(1,end) both}

@keyframes shitenV2CatPupil{0%{opacity:0;transform:translate(-50%,-50%) scaleY(.15)}16%,78%{opacity:1;transform:translate(-50%,-50%) scaleY(1)}100%{opacity:0;transform:translate(-50%,-50%) scaleY(.2)}}
@keyframes shitenV2SproutStem{0%{opacity:0;transform:scaleY(0)}8%{opacity:1}30%,76%{opacity:1;transform:scaleY(1)}100%{opacity:0;transform:scaleY(1)}}
@keyframes shitenV2LeafLeft{0%,24%{opacity:0;transform:rotate(0deg) scale(.15)}42%,78%{opacity:1;transform:rotate(-28deg) scale(1)}100%{opacity:0;transform:rotate(-28deg) scale(.9)}}
@keyframes shitenV2LeafRight{0%,24%{opacity:0;transform:rotate(0deg) scale(.15)}42%,78%{opacity:1;transform:rotate(28deg) scale(1)}100%{opacity:0;transform:rotate(28deg) scale(.9)}}
@keyframes shitenV2IrisColors{0%,100%{background:#9b7cff}16%{background:#ff4f87}32%{background:#58c8ff}48%{background:#70dc8b}64%{background:#ffd83d}80%{background:#ff7a59}}
@keyframes shitenV2EyeColorPulse{0%,100%{filter:none;box-shadow:0 0 0 0 transparent}16%{filter:hue-rotate(70deg) saturate(1.7);box-shadow:0 0 0 3px #ff4f87}32%{filter:hue-rotate(150deg) saturate(1.8);box-shadow:0 0 0 3px #58c8ff}48%{filter:hue-rotate(230deg) saturate(1.9);box-shadow:0 0 0 3px #70dc8b}64%{filter:hue-rotate(310deg) saturate(1.8);box-shadow:0 0 0 3px #ffd83d}80%{filter:hue-rotate(390deg) saturate(1.7);box-shadow:0 0 0 3px #9b7cff}}
@keyframes shitenV2MojibakeBox{0%,100%{opacity:0;transform:translate(0,0) rotate(0)}8%{opacity:1;transform:translate(-2px,1px) rotate(-2deg)}22%{opacity:1;transform:translate(2px,-1px) rotate(1deg)}38%{opacity:1;transform:translate(-1px,-1px) rotate(-1deg)}54%{opacity:1;transform:translate(2px,1px) rotate(2deg)}70%{opacity:1;transform:translate(-2px,0) rotate(-1deg)}86%{opacity:1;transform:translate(1px,-1px) rotate(1deg)}94%{opacity:0}}
@media(max-width:390px){.shiten-v2-mojibake{right:68px;font-size:11px}}
@media(prefers-reduced-motion:reduce){.shiten-v2-eye-sprout,.shiten-v2-mojibake{display:none!important}html.shiten-tease-v2-03 #secretToggle.shiten-v2-cat-eye,html.shiten-tease-v2-03 #tearToggle.shiten-v2-cat-eye,html.shiten-tease-v2-05 #secretToggle.shiten-v2-color-spin,html.shiten-tease-v2-05 #tearToggle.shiten-v2-color-spin{animation:none!important}}
`;
    document.head.appendChild(style);

    var timers=[];
    var nodes=[];
    var active=false;
    function later(fn,ms){var id=setTimeout(fn,ms);timers.push(id);return id;}
    function add(node){nodes.push(node);document.body.appendChild(node);return node;}
    function clearCustom(){
      timers.forEach(clearTimeout);timers=[];
      nodes.forEach(function(node){if(node&&node.parentNode)node.parentNode.removeChild(node);});nodes=[];
      eye.classList.remove('shiten-v2-cat-eye','shiten-v2-color-spin');
      active=false;
    }
    function cancel(){clearCustom();}

    function tease03(){
      if(active)return;active=true;
      eye.classList.add('shiten-v2-cat-eye');
      later(function(){eye.classList.remove('shiten-v2-cat-eye');active=false;},1850);
    }

    function tease04(){
      if(active)return;active=true;
      var rect=eye.getBoundingClientRect();
      var sprout=document.createElement('div');
      sprout.className='shiten-v2-eye-sprout';
      sprout.style.left=(rect.left+rect.width/2-1.5)+'px';
      sprout.style.top=(rect.top+rect.height/2-24)+'px';
      add(sprout);
      later(function(){if(sprout.parentNode)sprout.parentNode.removeChild(sprout);nodes=nodes.filter(function(n){return n!==sprout;});active=false;},1950);
    }

    function tease05(){
      if(active)return;active=true;
      eye.classList.add('shiten-v2-color-spin');
      var word=document.createElement('div');
      word.className='shiten-v2-mojibake';
      word.textContent='視�';
      add(word);
      var glyphs=['視�','�展','縺励※','譁�','ｼ荳','Sh!†?n','���','視?'];
      glyphs.slice(1).forEach(function(text,i){later(function(){if(word.parentNode)word.textContent=text;},180*(i+1));});
      later(function(){eye.classList.remove('shiten-v2-color-spin');if(word.parentNode)word.parentNode.removeChild(word);nodes=nodes.filter(function(n){return n!==word;});active=false;},1900);
    }

    later(function(){
      if(is03)tease03();
      else if(is04)tease04();
      else if(is05)tease05();
    },8170);

    eye.addEventListener('pointerdown',cancel,{once:true,passive:true});
    eye.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')cancel();},{once:true});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
