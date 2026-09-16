(function(){
  'use strict';

  function start(){
    var path=location.pathname;
    var is02=/\/person2-shiten(?:\/|$)/.test(path);
    var is04=/\/person4-shiten(?:\/|$)/.test(path);
    var is05=/\/person5-shiten(?:\/|$)/.test(path);
    if(!is02&&!is04&&!is05)return;

    if(is02){
      var room=document.getElementById('eyeRoom');
      var launcher=document.getElementById('secretToggle');
      if(!room||!launcher)return;
      var closeEye=launcher.cloneNode(true);
      closeEye.removeAttribute('id');
      closeEye.classList.add('shiten-room-eye-close');
      closeEye.setAttribute('aria-label','目玉の部屋を閉じる');
      closeEye.setAttribute('aria-pressed','true');
      closeEye.style.position='fixed';
      closeEye.style.right='14px';
      closeEye.style.bottom='18px';
      closeEye.style.zIndex='2147483600';
      closeEye.style.opacity='.96';
      closeEye.style.boxShadow='3px 3px 0 #111';
      closeEye.style.display='none';
      room.appendChild(closeEye);
      room.addEventListener('toggle',function(){closeEye.style.display=room.open?'block':'none';});
      room.addEventListener('close',function(){closeEye.style.display='none';});
      launcher.addEventListener('click',function(){setTimeout(function(){if(room.open)closeEye.style.display='block';},0);});
      closeEye.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();if(room.open)room.close();});
      return;
    }

    if(is04){
      var button=document.getElementById('tearToggle');
      var garden=document.getElementById('p4Garden');
      if(!button||!garden)return;
      var active=false;
      button.addEventListener('click',function(){
        if(active){
          garden.style.display='none';
          active=false;
          button.setAttribute('aria-pressed','false');
          button.setAttribute('aria-label','植物をもう一度表示する');
        }else{
          garden.style.display='';
          active=true;
          button.setAttribute('aria-pressed','true');
          button.setAttribute('aria-label','植物を消す');
        }
        setTimeout(function(){button.disabled=false;},0);
      });
      return;
    }

    if(is05){
      var finaleButton=document.getElementById('secretToggle');
      if(!finaleButton)return;
      var finaleActive=false;
      function restoreButton(){
        finaleButton.disabled=false;
        finaleButton.style.zIndex='';
        finaleButton.style.opacity='';
        finaleButton.setAttribute('aria-pressed','false');
        finaleButton.setAttribute('aria-label','05 final ending');
      }
      finaleButton.addEventListener('click',function(){
        var finale=document.querySelector('.final-finale');
        if(finaleActive&&finale){
          finale.remove();
          document.body.style.overflow='';
          finaleActive=false;
          restoreButton();
          return;
        }
        finaleActive=true;
        setTimeout(function(){
          finaleButton.disabled=false;
          finaleButton.style.zIndex='2147483600';
          finaleButton.style.opacity='.96';
          finaleButton.setAttribute('aria-pressed','true');
          finaleButton.setAttribute('aria-label','フィナーレを閉じる');
        },0);
      });
      var observer=new MutationObserver(function(){
        if(finaleActive&&!document.querySelector('.final-finale')){
          finaleActive=false;
          restoreButton();
        }
      });
      observer.observe(document.body,{childList:true});
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
