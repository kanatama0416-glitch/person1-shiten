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
