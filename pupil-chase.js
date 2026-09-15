(()=>{
  const toggle=document.getElementById('secretToggle');
  if(!toggle||toggle.dataset.eyeChaseV2)return;
  toggle.dataset.eyeChaseV2='1';

  const style=document.createElement('style');
  style.textContent=`
  .escape-eye{position:absolute;z-index:10040;width:58px;height:34px;border:3px solid #111;border-radius:50%;background:#fff;opacity:0;transform:scale(.2,.08) rotate(var(--rot,0deg));transition:opacity .25s ease,transform .48s cubic-bezier(.2,.9,.3,1.2);pointer-events:none;box-shadow:2px 2px 0 rgba(0,0,0,.08)}
  body.pupil-chase .escape-eye{opacity:1;transform:scale(1) rotate(var(--rot,0deg))}
  .escape-eye .escape-iris{position:absolute;width:22px;height:22px;left:15px;top:3px;border:2px solid #111;border-radius:50%;background:var(--p)}
  .escape-eye .escape-pupil{position:absolute;width:9px;height:9px;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:50%;background:#111;transition:opacity .12s ease}
  .escape-eye.runner-here .escape-pupil{opacity:0}
  .escape-eye.eye-pop{animation:escapeEyePop .42s cubic-bezier(.2,.9,.3,1.2)}
  @keyframes escapeEyePop{50%{transform:scale(1.18,.82) rotate(var(--rot,0deg))}}
  .pupil-runner{position:absolute;width:11px;height:11px;border:0;padding:0;border-radius:50%;background:#111;z-index:10050;transform:translate(-50%,-50%) scale(0);transition:left .48s cubic-bezier(.18,.9,.3,1.12),top .48s cubic-bezier(.18,.9,.3,1.12),transform .2s ease;cursor:pointer;touch-action:manipulation;box-shadow:none}
  .pupil-runner.on{transform:translate(-50%,-50%) scale(1)}.pupil-runner:active{transform:translate(-50%,-50%) scale(.72)}
  body.pupil-chase .secret-iris:after{opacity:0}
  .pupil-msg{position:fixed;z-index:10060;left:50%;bottom:72px;transform:translateX(-50%) translateY(8px);background:#fff;border:3px solid #111;box-shadow:4px 4px 0 var(--p);padding:7px 12px;font:900 11px/1.2 system-ui,sans-serif;opacity:0;pointer-events:none;transition:.2s;white-space:nowrap}.pupil-msg.show{opacity:1;transform:translateX(-50%) translateY(0)}
  `;
  document.head.appendChild(style);

  // These eyes are generated from stable page sections, not from occurrences of the word 視点.
  const targetSpecs=[
    {sel:'.essay',x:.88,y:.16,rot:'7deg'},
    {sel:'.book:nth-child(1)',x:.12,y:.42,rot:'-8deg'},
    {sel:'.book:nth-child(3)',x:.88,y:.48,rot:'6deg'},
    {sel:'.book:nth-child(5)',x:.13,y:.64,rot:'-5deg'},
    {sel:'.views',x:.84,y:.18,rot:'8deg'}
  ];
  let eyes=[];
  function buildEyes(){
    eyes.forEach(e=>e.remove());eyes=[];
    for(const spec of targetSpecs){
      const host=document.querySelector(spec.sel);if(!host)continue;
      const r=host.getBoundingClientRect();
      const eye=document.createElement('div');eye.className='escape-eye';eye.style.setProperty('--rot',spec.rot);
      eye.innerHTML='<span class="escape-iris"><span class="escape-pupil"></span></span>';
      eye.style.left=(r.left+scrollX+r.width*spec.x-29)+'px';
      eye.style.top=(r.top+scrollY+r.height*spec.y-17)+'px';
      document.body.appendChild(eye);eyes.push(eye);
    }
  }

  let running=false,step=0,dot=null,msg=null,currentEye=null;
  function say(text){if(!msg){msg=document.createElement('div');msg.className='pupil-msg';document.body.appendChild(msg)}msg.textContent=text;msg.classList.add('show');clearTimeout(say.t);say.t=setTimeout(()=>msg.classList.remove('show'),1050)}
  function center(el){const r=el.getBoundingClientRect();return{x:r.left+scrollX+r.width/2,y:r.top+scrollY+r.height/2}}
  function clearCurrent(){if(currentEye){currentEye.classList.remove('runner-here');currentEye=null}}
  function moveToEye(){
    if(step>=eyes.length){finish();return}
    const eye=eyes[step];eye.scrollIntoView({behavior:'smooth',block:'center'});
    setTimeout(()=>{clearCurrent();currentEye=eye;eye.classList.add('runner-here','eye-pop');setTimeout(()=>eye.classList.remove('eye-pop'),450);const p=center(eye.querySelector('.escape-iris'));dot.style.left=p.x+'px';dot.style.top=p.y+'px'},280);
  }
  function catchDot(e){e.preventDefault();e.stopPropagation();clearCurrent();step++;if(step<eyes.length){say(step===1?'次の目へ！':step===3?'まだ逃げる！':'こっちこっち！');moveToEye()}else finish()}
  function finish(){
    clearCurrent();const iris=toggle.querySelector('.secret-iris');const p=center(iris);dot.style.position='fixed';dot.style.left=(p.x-scrollX)+'px';dot.style.top=(p.y-scrollY)+'px';say('ただいま。');
    setTimeout(()=>{dot.classList.remove('on');document.body.classList.remove('pupil-chase');setTimeout(()=>{dot.remove();dot=null;eyes.forEach(e=>e.remove());eyes=[];running=false;step=0},260)},520)
  }
  function start(e){
    if(running)return;e.preventDefault();e.stopImmediatePropagation();
    running=true;step=0;document.body.classList.add('secret-mode','pupil-chase');toggle.setAttribute('aria-pressed','true');buildEyes();
    const iris=toggle.querySelector('.secret-iris'),p=center(iris);
    dot=document.createElement('button');dot.type='button';dot.className='pupil-runner';dot.setAttribute('aria-label','逃げた黒目をつかまえる');dot.style.left=p.x+'px';dot.style.top=p.y+'px';document.body.appendChild(dot);dot.addEventListener('click',catchDot);
    requestAnimationFrame(()=>{dot.classList.add('on');say('黒目が逃げた！ 目の中を探して！');setTimeout(moveToEye,240)})
  }
  toggle.addEventListener('click',start,true);
})();