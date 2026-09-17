(function(){
  'use strict';

  function loadCore(){
    fetch('https://kanatama0416-glitch.github.io/person1-shiten/eye-attract-core.js',{cache:'no-store'})
      .then(function(r){if(!r.ok)throw new Error('shared eye script '+r.status);return r.text();})
      .then(function(code){
        Function(code)();
        var style=document.createElement('style');
        style.id='shiten-pc-position-fix';
        style.textContent=`
/* creator signature: keep it as a quiet continuation of the title */
.creator-signature{
  width:min(430px,92%);max-width:none!important;
  margin:10px auto 0!important;padding:0!important;
  text-align:left!important;position:relative;
  font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans","Yu Gothic",sans-serif;
}
.creator-signature:before{display:none!important;content:none!important}
.creator-signature__name,.creator-signature__role{display:inline!important;vertical-align:baseline}
.creator-signature__name{font-size:12px!important;line-height:1.45!important;font-weight:900!important;letter-spacing:.02em!important;color:#111!important}
.creator-signature__name:before{content:"by ";font-size:9px;font-weight:800;letter-spacing:.08em;color:#777}
.creator-signature__role{margin:0!important;font-size:10px!important;line-height:1.45!important;font-weight:700!important;color:#666!important}
.creator-signature__role:before{content:"  ｜  ";color:#aaa;font-weight:500}
.creator-signature__bio{margin:3px 0 0!important;max-width:none!important;font-size:10.5px!important;line-height:1.55!important;color:#ff4f87!important;font-weight:700!important}
@media(max-width:380px){
  .creator-signature{width:92%!important;margin-top:9px!important;padding:0!important}
  .creator-signature__name{font-size:11.5px!important}
  .creator-signature__role{font-size:9.5px!important}
  .creator-signature__bio{font-size:10px!important}
}
@media (min-width:760px){
  #secretToggle,#tearToggle,.p4-eye-toggle{right:calc((100vw - 620px)/2 + 14px)!important}
  .shiten-eye-hint{right:calc((100vw - 620px)/2 + 78px)!important}
  .shiten-eye-hint.shiten-eye-hint-small{right:calc((100vw - 620px)/2 + 72px)!important}
  .shiten-eye-question{right:calc((100vw - 620px)/2 + 27px)!important}
  .shiten-tease-food{right:calc((100vw - 620px)/2 + 80px)!important}
  .shiten-tease-glitch-word{right:calc((100vw - 620px)/2 + 72px)!important}
}
`;
        document.head.appendChild(style);
      })
      .catch(function(e){console.error('eye-attract load failed',e);});
  }

  function waitForIntro(){
    if(!document.body.classList.contains('intro-lock')&&!document.querySelector('.intro')){
      loadCore();
      return;
    }
    var observer=new MutationObserver(function(){
      if(!document.body.classList.contains('intro-lock')&&!document.querySelector('.intro')){
        observer.disconnect();
        loadCore();
      }
    });
    observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
    setTimeout(function(){
      if(document.body.classList.contains('intro-lock')||document.querySelector('.intro'))return;
      observer.disconnect();
      loadCore();
    },2500);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',waitForIntro,{once:true});
  else waitForIntro();
})();
