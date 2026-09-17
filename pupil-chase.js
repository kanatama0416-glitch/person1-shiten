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
  /* Keep the original secret-eye play, but never replace copy containing 視点 with an inline eye. */
  body.pupil-chase.secret-mode .view-swap .view-word{display:inline!important}
  body.pupil-chase.secret-mode .view-swap .view-eye-inline{display:none!important;animation:none!important}
  .pupil-msg{position:fixed;z-index:10060;left:50%;bottom:72px;transform:translateX(-50%) translateY(8px);background:#fff;border:3px solid #111;box-shadow:4px 4px 0 var(--p);padding:7px 12px;font:900 11px/1.2 system-ui,sans-serif;opacity:0;pointer-events:none;transition:.2s;white-space:nowrap}.pupil-msg.show{opacity:1;transform:translateX(-50%) translateY(0)}
  .pupil-guide{position:fixed;z-index:10080;background:#fff;border:2px solid #111;box-shadow:2px 2px 0 var(--p);padding:5px 8px;border-radius:10px;font:900 10px/1.2 system-ui,sans-serif;white-space:nowrap;pointer-events:none;animation:pupilGuideBob .7s ease-in-out infinite alternate}
  @keyframes pupilGuideBob{from{transform:translateY(0)}to{transform:translateY(-4px)}}
  `;
  document.head.appendChild(style);

  // Dedicated chase eyes: independent of the word 視点.
  const targetSpecs=[
    {sel:'.essay',x:.88,y:.16,rot:'7deg'},
    {sel:'.book:nth-child(1)',x:.12,y:.34,rot:'-8deg'},
    {sel:'.book:nth-child(3)',x:.88,y:.34,rot:'6deg'},
    {sel:'.book:nth-child(5)',x:.13,y:.34,rot:'-5deg'},
    {sel:'.views',x:.84,y:.18,rot:'8deg'}
  ];
  const chaseLines=[
    'ちょっと家出してくる。',
    '目玉って窮屈なんだよね。',
    '外の世界、見てみたかったんだ。',
    'あっちの目も悪くないな。',
    'でも、なんか落ち着かない。'
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

  let running=false,step=0,dot=null,msg=null,guide=null,guideFrame=0,currentEye=null,runToken=0;
  function say(text){if(!msg){msg=document.createElement('div');msg.className='pupil-msg';document.body.appendChild(msg)}msg.textContent=text;msg.classList.add('show');clearTimeout(say.t);say.t=setTimeout(()=>{if(msg)msg.classList.remove('show')},1900)}
  function center(el){const r=el.getBoundingClientRect();return{x:r.left+scrollX+r.width/2,y:r.top+scrollY+r.height/2}}
  function clearCurrent(){if(currentEye){currentEye.classList.remove('runner-here');currentEye=null}}
  function clearGuide(){if(guideFrame){cancelAnimationFrame(guideFrame);guideFrame=0}if(guide){guide.remove();guide=null}}
  function showGuide(){
    clearGuide();
    if(!dot)return;
    guide=document.createElement('div');guide.className='pupil-guide';guide.textContent='黒目を押してみて！';
    document.body.appendChild(guide);
    const follow=()=>{
      if(!guide||!dot)return;
      const r=dot.getBoundingClientRect();
      let left=r.right+10;
      if(left+guide.offsetWidth>window.innerWidth-8)left=Math.max(8,r.left-guide.offsetWidth-10);
      let top=r.top+r.height/2-guide.offsetHeight/2;
      top=Math.max(8,Math.min(window.innerHeight-guide.offsetHeight-8,top));
      guide.style.left=left+'px';guide.style.top=top+'px';
      guideFrame=requestAnimationFrame(follow);
    };
    follow();
  }
  function cancel(){
    runToken++;
    clearTimeout(say.t);
    clearGuide();
    clearCurrent();
    document.body.classList.remove('pupil-chase','secret-mode');
    toggle.setAttribute('aria-pressed','false');
    if(dot){dot.remove();dot=null}
    eyes.forEach(e=>e.remove());eyes=[];
    if(msg){msg.remove();msg=null}
    running=false;step=0;
  }
  function moveToEye(){
    if(!running)return;
    if(step>=eyes.length){finish();return}
    const token=runToken,eye=eyes[step];eye.scrollIntoView({behavior:'smooth',block:'center'});
    setTimeout(()=>{if(!running||token!==runToken||!dot||!eye.isConnected)return;clearCurrent();currentEye=eye;eye.classList.add('runner-here','eye-pop');setTimeout(()=>{if(eye.isConnected)eye.classList.remove('eye-pop')},450);const p=center(eye.querySelector('.escape-iris'));dot.style.left=p.x+'px';dot.style.top=p.y+'px';if(step===0){setTimeout(()=>{if(running&&token===runToken&&step===0&&dot)showGuide()},540)}},280);
  }
  function catchDot(e){e.preventDefault();e.stopPropagation();if(!running)return;clearGuide();clearCurrent();step++;if(step<eyes.length){say(chaseLines[step]||'黒目にも自由を。');moveToEye()}else finish()}
  function finish(){
    if(!running||!dot)return;
    const token=runToken;
    clearGuide();
    clearCurrent();const iris=toggle.querySelector('.secret-iris');const p=center(iris);dot.style.position='fixed';dot.style.left=(p.x-scrollX)+'px';dot.style.top=(p.y-scrollY)+'px';say('やっぱ、ここがいいや。');
    setTimeout(()=>{if(!running||token!==runToken||!dot)return;dot.classList.remove('on');document.body.classList.remove('pupil-chase','secret-mode');toggle.setAttribute('aria-pressed','false');setTimeout(()=>{if(token!==runToken)return;if(dot){dot.remove();dot=null}eyes.forEach(e=>e.remove());eyes=[];if(msg){msg.remove();msg=null}running=false;step=0},260)},1900)
  }
  function start(e){
    if(running){e.preventDefault();e.stopImmediatePropagation();cancel();return}
    e.preventDefault();e.stopImmediatePropagation();
    running=true;step=0;runToken++;
    const token=runToken;
    // Restore the original hidden-eye gimmicks while keeping inline copy untouched.
    document.body.classList.add('secret-mode','pupil-chase');
    toggle.setAttribute('aria-pressed','true');
    buildEyes();
    const iris=toggle.querySelector('.secret-iris'),p=center(iris);
    dot=document.createElement('button');dot.type='button';dot.className='pupil-runner';dot.setAttribute('aria-label','逃げた黒目をつかまえる');dot.style.left=p.x+'px';dot.style.top=p.y+'px';document.body.appendChild(dot);dot.addEventListener('click',catchDot);
    requestAnimationFrame(()=>{if(!running||token!==runToken||!dot)return;dot.classList.add('on');say(chaseLines[0]);setTimeout(()=>{if(running&&token===runToken)moveToEye()},240)})
  }
  toggle.addEventListener('click',start,true);
})();