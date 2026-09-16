(function(){
  'use strict';
  function init(){
    var eye=document.getElementById('secretToggle');
    if(!eye)return;
    eye.addEventListener('click',function(){
      requestAnimationFrame(function(){
        var on=document.body.classList.contains('secret-mode');
        eye.setAttribute('aria-pressed',String(on));
      });
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
