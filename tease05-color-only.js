(function(){
  'use strict';

  function start(){
    if(!/\/person5-shiten(?:\/|$)/.test(location.pathname))return;
    var eye=document.querySelector('#secretToggle,#tearToggle');
    if(!eye)return;

    var style=document.createElement('style');
    style.id='shiten-tease05-color-only-style';
    style.textContent=`
.shiten-tease-glitch-word{display:none!important}
#secretToggle.shiten-tease-glitch,#tearToggle.shiten-tease-glitch{animation:none!important;filter:none!important}
#secretToggle.shiten-v3-color-spin .secret-iris,
#tearToggle.shiten-v3-color-spin .tear-iris,
#secretToggle.shiten-v3-color-spin [class*="iris"],
#tearToggle.shiten-v3-color-spin [class*="iris"]{animation:shitenV3IrisColors 1.9s linear both!important}
#secretToggle.shiten-v3-color-spin,#tearToggle.shiten-v3-color-spin{animation:shitenV3EyeColors 1.9s linear both!important}
@keyframes shitenV3IrisColors{
  0%,100%{background:#9b7cff}
  14%{background:#ff4f87}
  28%{background:#58c8ff}
  42%{background:#70dc8b}
  56%{background:#ffd83d}
  70%{background:#ff7a59}
  84%{background:#d66bff}
}
@keyframes shitenV3EyeColors{
  0%,100%{filter:none;box-shadow:0 0 0 0 transparent}
  14%{filter:hue-rotate(55deg) saturate(1.8);box-shadow:0 0 0 3px #ff4f87}
  28%{filter:hue-rotate(120deg) saturate(1.9);box-shadow:0 0 0 3px #58c8ff}
  42%{filter:hue-rotate(190deg) saturate(1.9);box-shadow:0 0 0 3px #70dc8b}
  56%{filter:hue-rotate(260deg) saturate(1.8);box-shadow:0 0 0 3px #ffd83d}
  70%{filter:hue-rotate(325deg) saturate(1.9);box-shadow:0 0 0 3px #ff7a59}
  84%{filter:hue-rotate(390deg) saturate(1.8);box-shadow:0 0 0 3px #d66bff}
}
@media(prefers-reduced-motion:reduce){#secretToggle.shiten-v3-color-spin,#tearToggle.shiten-v3-color-spin{animation:none!important}}
`;
    document.head.appendChild(style);

    var observer=new MutationObserver(function(){
      document.querySelectorAll('.shiten-tease-glitch-word').forEach(function(node){node.remove();});
    });
    observer.observe(document.body,{childList:true,subtree:true});

    var timer=setTimeout(function(){
      eye.classList.add('shiten-v3-color-spin');
      setTimeout(function(){eye.classList.remove('shiten-v3-color-spin');},1950);
    },8170);

    function cancel(){
      clearTimeout(timer);
      eye.classList.remove('shiten-v3-color-spin');
      document.querySelectorAll('.shiten-tease-glitch-word').forEach(function(node){node.remove();});
      observer.disconnect();
    }
    eye.addEventListener('pointerdown',cancel,{once:true,passive:true});
    eye.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')cancel();},{once:true});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
