(function(){
  'use strict';
  function init(){
    var eye=document.getElementById('secretToggle');
    if(!eye)return;
    eye.addEventListener('click',function(){
      requestAnimationFrame(function(){
        document.body.classList.remove('secret-mode');
        void document.body.offsetWidth;
        document.body.classList.add('secret-mode');
        eye.setAttribute('aria-pressed','true');
      });
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
