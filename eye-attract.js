(function(){
  'use strict';
  var previous='https://raw.githubusercontent.com/kanatama0416-glitch/person1-shiten/42d0b943505dbbe0da0a75b5be0c80f0c0a0cb39/eye-attract.js';
  fetch(previous,{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('shared eye script '+r.status);return r.text();}).then(function(code){
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
  }).catch(function(e){console.error('eye-attract load failed',e);});
})();
