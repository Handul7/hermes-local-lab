(() => {
  'use strict';
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const canAnimate=()=>!preference.matches&&typeof Element.prototype.animate==='function';
  const timing={duration:300,easing:'cubic-bezier(.22,1,.36,1)'};
  const running=new Set();
  function play(node,frames,options=timing){
    if(!node||!canAnimate())return null;
    const animation=node.animate(frames,options);running.add(animation);
    animation.finished.then(()=>running.delete(animation),()=>running.delete(animation));
    return animation;
  }
  const nav=document.querySelector('.primary-nav');
  const line=document.createElement('span');line.className='nav-motion-line is-initial';line.setAttribute('aria-hidden','true');
  nav.append(line);nav.classList.add('motion-nav');
  function positionLine(instant=false){
    const current=nav.querySelector('a[aria-current]');if(!current)return;
    const parent=nav.getBoundingClientRect(),rect=current.getBoundingClientRect();
    if(instant)line.classList.add('is-initial');
    line.style.width=rect.width+'px';line.style.transform=`translate(${rect.left-parent.left}px,${rect.bottom-parent.top-2}px)`;
    if(instant){line.getBoundingClientRect();line.classList.remove('is-initial')}
  }
  const entranceAnimations=new Set();
  function enterPanel(panel){
    entranceAnimations.forEach(a=>a.cancel());entranceAnimations.clear();
    if(!panel||!canAnimate())return;
    const heading=panel.querySelector(':scope > .section-head')||panel.querySelector('.lab-builder h2');
    const intro=panel.querySelector('.builder-intro');
    const content=panel.querySelector('.builder-layout')||[...panel.children].find(el=>el!==heading&&!el.matches('.page-outline'));
    // Only entrance groups move; long documents and sticky controls do not.
    [heading,intro,content].filter((node,i,all)=>node&&all.indexOf(node)===i).forEach((node,i)=>{
      const animation=play(node,[{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:540,delay:i*65,easing:timing.easing,fill:'backwards'});
      if(animation){entranceAnimations.add(animation);animation.finished.then(()=>entranceAnimations.delete(animation),()=>entranceAnimations.delete(animation))}
    });
  }
  // Content is always visible by default, including without IntersectionObserver.
  const revealed=new WeakSet();
  const revealAnimations=new Map();
  const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(!entry.isIntersecting)continue;
      const node=entry.target;observer.unobserve(node);revealed.add(node);
      if(node.contains(document.activeElement))continue;
      const animation=play(node,[{opacity:.12,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:620,easing:timing.easing});
      if(animation){revealAnimations.set(node,animation);animation.finished.then(()=>revealAnimations.delete(node),()=>revealAnimations.delete(node))}
    }
  },{threshold:0,rootMargin:'0px 0px -48px 0px'}):null;
  function prepareReveals(){
    observer?.disconnect();
    revealAnimations.forEach(a=>a.cancel());revealAnimations.clear();
    if(!observer||!canAnimate())return;
    const panel=document.querySelector('.panel.active');
    if(!panel)return;
    const candidates=[...panel.querySelectorAll(':scope > .grid > *, :scope > .steps > *, :scope > .cards > *, :scope > .table-wrap, :scope > .review-list > article, :scope > .usecase-grid > article, :scope > .daily-use, :scope > .case-watchlist > article, :scope > h3, :scope > .reading-next')];
    candidates.forEach(node=>{
      if(revealed.has(node))return;
      if(node.getBoundingClientRect().top<innerHeight){revealed.add(node);return}
      observer.observe(node);
    });
  }
  document.addEventListener('focusin',event=>{
    revealAnimations.forEach((animation,node)=>{if(node.contains(event.target))animation.cancel()});
  });
  const progress=document.createElement('span');
  progress.className='reading-progress';progress.setAttribute('aria-hidden','true');
  document.querySelector('.site-navigation').append(progress);
  let scrollFrame=0;
  function updateProgress(){
    scrollFrame=0;
    const panel=document.querySelector('.panel.active');if(!panel)return;
    const rect=panel.getBoundingClientRect();
    const chrome=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--site-chrome-height'))||176;
    const distance=rect.height-Math.max(1,innerHeight-chrome);
    const fraction=distance>0?Math.max(0,Math.min(1,(chrome-rect.top)/distance)):0;
    progress.style.transform='scaleX('+fraction+')';
  }
  function scheduleProgress(){if(!scrollFrame)scrollFrame=requestAnimationFrame(updateProgress)}
  window.addEventListener('scroll',scheduleProgress,{passive:true});
  window.addEventListener('resize',scheduleProgress);
  if('ResizeObserver' in window)new ResizeObserver(scheduleProgress).observe(document.body);
  const navigate=openPanel;
  openPanel=function(id,push=true,scroll=true){
    const previous=document.querySelector('.panel.active');
    entranceAnimations.forEach(a=>a.cancel());entranceAnimations.clear();
    navigate(id,push,scroll);
    positionLine();
    const next=document.querySelector('.panel.active');
    if(next!==previous)enterPanel(next);
    requestAnimationFrame(()=>{prepareReveals();updateProgress()});
  };
  // Search is a light sheet; its focus handling and dismissal stay native.
  const search=document.querySelector('.site-search-dialog');
  if(search&&'MutationObserver' in window)new MutationObserver(()=>{
    if(search.open)play(search,[{opacity:0,transform:'translateY(12px) scale(.985)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:280,easing:timing.easing});
  }).observe(search,{attributes:true,attributeFilter:['open']});
  // Native details keeps its keyboard semantics; only its visual height is animated.
  const detailsInFlight=new Map();
  function settle(detail,state){
    if(detailsInFlight.get(detail)!==state)return;
    detail.open=state.open;detail.style.height=state.height;detail.style.overflow=state.overflow;
    detailsInFlight.delete(detail);
  }
  document.addEventListener('click',event=>{
    const summary=event.target.closest('summary');
    if(!summary||event.defaultPrevented||event.target.closest('a,button,input,select'))return;
    const detail=summary.parentElement;
    if(detail.tagName!=='DETAILS'||detail.classList.contains('page-outline')||!canAnimate())return;
    event.preventDefault();
    const prior=detailsInFlight.get(detail);
    const height=detail.getBoundingClientRect().height;
    const state={open:prior?!prior.open:!detail.open,height:prior?prior.height:detail.style.height,overflow:prior?prior.overflow:detail.style.overflow};
    prior?.animation.cancel();
    detail.style.height=state.height;detail.style.overflow=state.overflow;
    detail.open=state.open;
    const target=detail.getBoundingClientRect().height;
    detail.open=true;detail.style.height=height+'px';detail.style.overflow='hidden';
    detailsInFlight.set(detail,state);
    state.animation=play(detail,[{height:height+'px'},{height:target+'px'}]);
    state.animation.finished.then(()=>settle(detail,state),()=>{});
  });
  // The planner replaces its buttons after a selection; animate the new control.
  document.addEventListener('click',event=>{
    const button=event.target.closest('button[data-add]');if(!button)return;
    const id=button.dataset.add;
    requestAnimationFrame(()=>play(document.querySelector('button[data-add="'+CSS.escape(id)+'"]'),[{transform:'scale(.96)'},{transform:'scale(1)'}],{...timing,duration:180}));
  },true);
  preference.addEventListener('change',()=>{
    if(preference.matches){running.forEach(a=>a.cancel());detailsInFlight.forEach((state,detail)=>settle(detail,state))}
    positionLine(true);
    prepareReveals();
  });
  if('ResizeObserver' in window)new ResizeObserver(()=>positionLine(true)).observe(nav);
  window.addEventListener('resize',()=>positionLine(true));
  document.fonts?.ready.then(()=>positionLine(true));
  positionLine(true);
  enterPanel(document.querySelector('.panel.active'));
  prepareReveals();updateProgress();
})();
