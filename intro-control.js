(function(){
  'use strict';
  var intro=document.getElementById('intro');
  if(!intro||!document.body.classList.contains('intro-lock'))return;

  var key='shiten-intro-seen-v1';
  var seen=false;
  try{seen=sessionStorage.getItem(key)==='1';sessionStorage.setItem(key,'1');}catch(_){ }
  var duration=seen?650:1700;
  var fade=Math.max(120,duration-280);

  function finish(){
    var page=document.querySelector('.page');
    [intro,page,document.getElementById('introEye'),document.getElementById('introBrand'),document.getElementById('introRays')].forEach(function(el){
      if(!el||!el.getAnimations)return;
      el.getAnimations().forEach(function(a){try{a.cancel();}catch(_){}});
    });
    document.body.classList.remove('intro-lock');
    if(page){page.style.opacity='1';page.style.filter='none';}
    if(intro&&intro.isConnected)intro.remove();
    document.dispatchEvent(new CustomEvent('shiten:intro-end'));
  }

  intro.style.transition='opacity .28s ease';
  setTimeout(function(){if(intro&&intro.isConnected)intro.style.opacity='0';},fade);
  setTimeout(finish,duration);
})();
