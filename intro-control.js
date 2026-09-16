(function(){
  'use strict';
  var intro=document.getElementById('intro');
  if(!intro||!document.body.classList.contains('intro-lock'))return;

  var key='shiten-intro-last-seen-v2';
  var now=Date.now();
  var seenRecently=false;
  try{
    var last=parseInt(localStorage.getItem(key)||'0',10)||0;
    seenRecently=last>0&&(now-last)<30*60*1000;
    localStorage.setItem(key,String(now));
  }catch(_){ }
  var duration=seenRecently?650:1700;
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
