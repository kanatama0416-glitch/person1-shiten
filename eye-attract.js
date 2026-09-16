(function(){
  'use strict';

  function start(){
    var eye=document.querySelector('#secretToggle,#tearToggle');
    if(!eye)return;

    eye.classList.add('shiten-attract-eye');

    var style=document.createElement('style');
    style.id='shiten-eye-attract-style';
    style.textContent=`
#secretToggle.shiten-attract-eye,#tearToggle.shiten-attract-eye{will-change:transform,opacity;transform-origin:50% 50%}
#secretToggle.shiten-attract-blink,#tearToggle.shiten-attract-blink{animation:shitenEyeBlink .42s ease-in-out 1}
#secretToggle.shiten-attract-look .secret-iris,#tearToggle.shiten-attract-look .secret-iris,
#secretToggle.shiten-attract-look .tear-iris,#tearToggle.shiten-attract-look .tear-iris,
#secretToggle.shiten-attract-look [class*="iris"],#tearToggle.shiten-attract-look [class*="iris"]{transform:translate(-5px,-4px)!important}
body.cat-ready #secretToggle.shiten-attract-look::after{transform:translate(calc(-50% - 5px),calc(-50% - 4px))!important}
#secretToggle.shiten-attract-near,#tearToggle.shiten-attract-near{opacity:.82!important;transform:translate(-9px,-9px) rotate(-3deg) scale(1.08)!important;box-shadow:3px 3px 0 #111!important}
.shiten-eye-hint{position:fixed;z-index:2147483000;right:78px;bottom:19px;pointer-events:none;background:var(--p,#ff4f87);color:#111;border:3px solid #111;border-radius:999px;padding:10px 14px;font:900 14px/1.1 -apple-system,BlinkMacSystemFont,"Hiragino Sans","Yu Gothic",sans-serif;white-space:nowrap;box-shadow:4px 4px 0 #111;opacity:0;transform:translate(10px,3px) scale(.88) rotate(-2deg);transition:opacity .18s ease,transform .22s cubic-bezier(.2,.85,.3,1.2)}
.shiten-eye-hint::after{content:'→';display:inline-block;margin-left:5px;font-size:16px;line-height:1;transform:rotate(8deg)}
.shiten-eye-hint.shiten-eye-hint-show{opacity:1;transform:translate(0,0) scale(1) rotate(-2deg);animation:shitenHintBob 1.05s ease-in-out .28s infinite alternate}
.shiten-eye-question{position:fixed;z-index:2147483000;right:27px;bottom:63px;pointer-events:none;font:900 22px/1 Arial,sans-serif;color:#111;text-shadow:2px 2px 0 #fff;opacity:0;transform:translateY(5px) scale(.7) rotate(8deg);animation:shitenQuestion 1.65s ease both}
@keyframes shitenEyeBlink{0%,100%{transform:rotate(-6deg) scaleY(1)}45%,58%{transform:rotate(-6deg) scaleY(.16)}}
@keyframes shitenHintBob{from{margin-bottom:0}to{margin-bottom:4px}}
@keyframes shitenQuestion{0%{opacity:0;transform:translateY(5px) scale(.7) rotate(8deg)}18%,70%{opacity:1;transform:translateY(0) scale(1) rotate(-4deg)}100%{opacity:0;transform:translateY(-4px) scale(.9) rotate(3deg)}}
@media(max-width:390px){.shiten-eye-hint{right:74px;bottom:20px;padding:9px 12px;font-size:13px}}
@media(prefers-reduced-motion:reduce){#secretToggle.shiten-attract-blink,#tearToggle.shiten-attract-blink{animation:none}.shiten-eye-hint{transition:none}.shiten-eye-hint.shiten-eye-hint-show{animation:none}.shiten-eye-question{animation:none;opacity:1}.shiten-eye-question.shiten-eye-question-hide{opacity:0}}
`;
    document.head.appendChild(style);

    var timers=[];
    var hint=null;
    var question=null;
    var done=false;

    function later(fn,ms){
      var id=setTimeout(fn,ms);
      timers.push(id);
      return id;
    }

    function removeHint(){
      if(hint&&hint.parentNode)hint.parentNode.removeChild(hint);
      hint=null;
    }

    function removeQuestion(){
      if(question&&question.parentNode)question.parentNode.removeChild(question);
      question=null;
    }

    function finish(){
      if(done)return;
      done=true;
      timers.forEach(clearTimeout);
      timers=[];
      eye.classList.remove('shiten-attract-blink','shiten-attract-look','shiten-attract-near');
      removeHint();
      removeQuestion();
    }

    var isPerson1=/\/person1-shiten(?:\/|$)/.test(location.pathname);
    if(isPerson1){
      later(function(){
        if(done)return;
        hint=document.createElement('div');
        hint.className='shiten-eye-hint';
        hint.textContent='触ってみる？';
        document.body.appendChild(hint);
        requestAnimationFrame(function(){if(hint)hint.classList.add('shiten-eye-hint-show');});
        later(function(){
          if(!hint)return;
          hint.classList.remove('shiten-eye-hint-show');
          later(removeHint,260);
        },8000);
      },650);
    }

    later(function(){
      if(done)return;
      eye.classList.remove('shiten-attract-blink');
      void eye.offsetWidth;
      eye.classList.add('shiten-attract-blink');
      later(function(){if(!done)eye.classList.remove('shiten-attract-blink');},500);
    },3000);

    later(function(){
      if(done)return;
      eye.classList.add('shiten-attract-look');
      later(function(){if(!done)eye.classList.remove('shiten-attract-look');},1800);
    },6000);

    later(function(){
      if(done)return;
      eye.classList.add('shiten-attract-near');
    },10000);

    later(function(){
      if(done)return;
      question=document.createElement('div');
      question.className='shiten-eye-question';
      question.textContent='?';
      document.body.appendChild(question);
      later(removeQuestion,1750);
    },15000);

    eye.addEventListener('pointerdown',finish,{once:true,passive:true});
    eye.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){finish();}
    },{once:true});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
