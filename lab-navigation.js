(() => {
  const groups = [
    {name:'시작하기',pages:[['plan','내 설치 계획'],['macbook','기기 준비'],['start','첫날 설치'],['storage','장비·저장공간']]},
    {name:'도구 선택',pages:[['models','모델 비교'],['dictation','받아쓰기 앱']]},
    {name:'활용·운영',pages:[['workflows','실사용·홈서버'],['architecture','Hermes 팀 구성'],['remote','원격 접속']]},
    {name:'참고자료',pages:[['reviews','사용 후기'],['sources','공식 출처']]},
    {name:'용어집',pages:[['glossary','용어 찾기']]}
  ];
  const terms = [
    ['LLM','대규모 언어 모델','모델','글을 읽고 답하거나 작성하는 모델. 에이전트가 작업을 판단할 때 사용하는 두뇌 역할입니다.','models'],
    ['로컬 AI','내 기기에서 처리','기본','모델을 내 컴퓨터에서 실행하는 방식. 앱에 클라우드 후처리가 켜져 있으면 일부 데이터는 외부로 나갈 수 있습니다.','models'],
    ['추론','Inference','모델','학습된 모델에 입력을 넣어 답이나 결과물을 만드는 과정입니다. 모델을 새로 학습시키는 것과는 다릅니다.','models'],
    ['양자화','Quantization · Q4 · 4bit','모델','모델의 수치를 더 적은 비트로 표현해 메모리 사용량을 줄이는 방식. 정확도나 속도가 달라질 수 있습니다.','models'],
    ['B · 파라미터','14B · 30B','모델','B는 10억을 뜻합니다. 14B는 약 140억 개 파라미터이며, 파일 크기나 필요한 메모리와 같은 숫자는 아닙니다.','models'],
    ['토큰','Token','모델','모델이 글을 처리하는 조각 단위. 한 글자나 한 단어와 항상 일치하지 않습니다.','models'],
    ['컨텍스트','Context window','모델','한 번에 참고할 수 있는 입력과 대화의 범위. 길어지면 메모리 사용량도 늘 수 있습니다.','models'],
    ['통합 메모리','Unified memory · RAM','기본','Apple Silicon에서 CPU와 GPU가 함께 사용하는 메모리. 운영체제·앱·모델이 함께 쓰므로 32GB 전체를 모델에 쓸 수는 없습니다.','storage'],
    ['스왑','Swap','기본','메모리가 부족할 때 저장장치에 일부 데이터를 옮기는 방식. 메모리 여유가 생긴 것과 같지 않고 작업이 느려질 수 있습니다.','storage'],
    ['Ollama','모델 실행 도구','모델','모델을 내려받아 실행하고 다른 앱이 사용할 수 있게 연결하는 도구. 모델 자체의 이름은 아닙니다.','models'],
    ['MLX','Apple Silicon 연산 프레임워크','모델','Apple Silicon에서 기계학습 연산을 다루는 프레임워크. MLX용 모델과 실행 도구를 구분해서 확인하세요.','models'],
    ['에이전트','Agent','에이전트','모델의 판단에 도구 사용을 연결해 여러 단계의 작업을 수행하는 프로그램입니다.','architecture'],
    ['멀티에이전트','Multi-agent','에이전트','조사·작성·검토처럼 여러 역할을 나누는 구조. 역할 수만큼 모델을 동시에 실행해야 하는 것은 아닙니다.','architecture'],
    ['Hermes Agent','헤르메스','에이전트','이 가이드에서 작업과 도구 사용을 연결하는 에이전트. 실제 답변 모델은 별도로 선택하고 연결합니다.','architecture'],
    ['도구 호출','Tool calling','에이전트','모델이 검색·파일 읽기 같은 기능을 요청하는 것. 기능 접근 권한과 실행 승인은 별도로 관리해야 합니다.','architecture'],
    ['API','프로그램 간 연결 창구','에이전트','다른 프로그램에 정해진 형식으로 요청하고 응답받는 방법. API라는 말 자체가 클라우드나 유료를 뜻하지는 않습니다.','architecture'],
    ['RAG','검색 증강 생성','모델','관련 문서를 먼저 찾고, 찾은 내용을 모델에 전달해 답하게 하는 방식. 근거 문서를 확인하는 과정은 여전히 필요합니다.','workflows'],
    ['임베딩','Embedding','모델','문장의 의미를 숫자 목록으로 표현하는 방식. 비슷한 내용을 찾는 문서 검색 등에 사용합니다.','workflows'],
    ['ASR · 전사','Speech recognition · 받아쓰기','음성·이미지','음성을 글로 바꾸는 작업. 요약이나 할 일 추출과는 별도 단계입니다.','dictation'],
    ['Whisper','음성 인식 모델','음성·이미지','음성을 텍스트로 바꾸는 모델 계열. MacWhisper 앱이나 Wispr Flow 서비스와는 구분합니다.','dictation'],
    ['TTS','Text to speech','음성·이미지','글을 음성으로 읽어주는 기술. 음성을 글로 바꾸는 ASR과 반대 방향입니다.','models'],
    ['OCR','문자 인식','음성·이미지','스캔 문서나 사진 속 글자를 텍스트로 추출하는 기술. 표·고유명사·숫자는 결과를 확인하세요.','workflows'],
    ['ComfyUI','노드형 생성 도구','음성·이미지','모델 로딩·이미지 생성 같은 단계를 노드로 연결하는 작업 도구. 각 모델의 하드웨어 지원은 따로 확인합니다.','workflows'],
    ['SSH','원격 터미널 접속','원격','다른 컴퓨터에 암호화된 연결로 접속해 명령을 실행하는 방법. 화면 전체를 조작하는 원격 데스크톱과 다릅니다.','remote'],
    ['Tailscale · Tailnet','사설 연결망','원격','Tailscale은 기기들을 사설망으로 연결하는 서비스이고, Tailnet은 그 연결망입니다. 연결 후에도 사용자 권한과 접근 규칙을 관리해야 합니다.','remote'],
    ['tmux','터미널 세션 관리','원격','터미널 작업을 세션으로 유지해 연결이 끊긴 뒤 다시 이어갈 수 있게 합니다. 컴퓨터 재부팅 뒤의 프로세스 복구를 보장하지는 않습니다.','remote'],
    ['헤드리스','Headless','원격','모니터·키보드를 상시 연결하지 않고 원격으로 운영하는 방식. 처음에는 로컬 로그인과 복구 경로부터 확보하세요.','remote'],
    ['SSD · HDD','저장장치','기본','둘 다 파일을 보관합니다. SSD는 앱·모델 실행용, 남는 HDD는 백업·보관용으로 역할을 나누는 구성입니다.','storage']
  ];
  const glossary=document.createElement('section');glossary.id='glossary';glossary.className='panel';
  glossary.innerHTML='<div class="section-head"><div><h2>용어집</h2></div><p>설명에서 막히면 여기서 뜻을 찾고, 관련 가이드로 이어가세요.</p></div><div class="glossary-controls"><label>용어 검색<input type="search" id="termSearch" placeholder="예: 양자화, Whisper, 원격" autocomplete="off"></label><label>분야<select id="termCategory"><option value="">전체 분야</option></select></label><button type="button" class="btn" id="clearTerms">초기화</button></div><p id="termCount" role="status" aria-live="polite"></p><dl id="termResults" class="term-results"></dl>';
  document.querySelector('.panel').parentNode.insertBefore(glossary,document.querySelector('.panel'));
  panels.push(glossary);
  const oldNav=document.querySelector('.tabs');oldNav.hidden=true;
  const nav=document.createElement('div');nav.className='site-navigation';
  nav.innerHTML='<nav class="primary-nav" aria-label="주요 메뉴">'+groups.map(g=>`<a href="#${g.pages[0][0]}">${g.name}</a>`).join('')+'</nav><nav class="secondary-nav" aria-label="관련 메뉴"></nav>';
  oldNav.after(nav);
  const primaryNav=nav.querySelector('.primary-nav');
  const pageTools=document.createElement('div');pageTools.className='page-tools';
  pageTools.innerHTML='<span id="locationLabel"></span><a href="#glossary">용어가 궁금할 때</a>';
  nav.after(pageTools);
  const nativeOpen=openPanel;
  openPanel=function(id,push=true,scroll=true){
    if(!panels.some(p=>p.id===id))id='plan';
    nativeOpen(id,push,scroll);
    const group=groups.find(g=>g.pages.some(p=>p[0]===id));
    primaryNav.querySelectorAll('a').forEach((a,i)=>{if(groups[i]===group)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});
    nav.querySelector('.secondary-nav').innerHTML=group.pages.map(([key,name])=>`<a href="#${key}"${key===id?' aria-current="page"':''}>${name}</a>`).join('');
    nav.querySelector('.secondary-nav').hidden=group.pages.length===1;
    const label=group.pages.find(p=>p[0]===id)[1];
    pageTools.querySelector('span').textContent=group.name+' / '+label;
    pageTools.querySelector('a').hidden=id==='glossary';
    document.title=label+' · Hermes Local Lab';
  };
  panels.forEach(p=>{const heading=p.querySelector('h2');if(heading){heading.id='heading-'+p.id;p.setAttribute('role','region');p.setAttribute('aria-labelledby',heading.id);heading.tabIndex=-1}});
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href^="#"]');if(!a||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
    const id=a.getAttribute('href').slice(1);if(!panels.some(p=>p.id===id))return;
    e.preventDefault();openPanel(id);
    document.querySelector('#'+id+' h2')?.focus({preventScroll:true});
  });
  const input=document.getElementById('termSearch'),category=document.getElementById('termCategory'),results=document.getElementById('termResults');
  [...new Set(terms.map(t=>t[2]))].forEach(name=>{const option=document.createElement('option');option.value=name;option.textContent=name;category.append(option)});
  function renderTerms(){
    const query=input.value.trim().toLocaleLowerCase();
    const matches=terms.filter(t=>(!category.value||t[2]===category.value)&&t.slice(0,4).join(' ').toLocaleLowerCase().includes(query));
    results.replaceChildren();
    matches.forEach(([name,alias,group,meaning,page])=>{
      const item=document.createElement('div');item.className='term-item';
      const dt=document.createElement('dt');dt.textContent=name;
      const subtitle=document.createElement('span');subtitle.className='term-alias';subtitle.textContent=alias;
      dt.append(subtitle);const dd=document.createElement('dd');dd.textContent=meaning;
      const link=document.createElement('a');link.href='#'+page;link.textContent='관련 가이드 →';link.setAttribute('aria-label',name+' 관련 가이드');dd.append(link);item.append(dt,dd);results.append(item);
    });
    document.getElementById('termCount').textContent=matches.length?matches.length+'개 용어':'찾는 용어가 없습니다. 다른 표현을 입력하거나 분야를 전체로 바꿔보세요.';
  }
  input.addEventListener('input',renderTerms);category.addEventListener('change',renderTerms);
  document.getElementById('clearTerms').addEventListener('click',()=>{input.value='';category.value='';renderTerms();input.focus()});renderTerms();
  const modelTable=document.querySelector('#models table');
  document.querySelector('#models .section-head p').textContent='32GB 구성을 위한 비교 후보입니다. 추천은 가이드의 판단이며, 이 기기에서 실측한 성능 순위는 아닙니다.';
  const filter=document.createElement('div');filter.className='model-filter';filter.innerHTML='<label>모델 분야<select id="modelCategory"><option value="">전체 분야</option></select></label><span id="modelCount" role="status" aria-live="polite"></span>';
  modelTable.parentNode.before(filter);
  const rows=[...modelTable.tBodies[0].rows],modelSelect=filter.querySelector('select');
  const fieldNames={LLM:'대화·글쓰기',Image:'이미지',Video:'영상',ASR:'음성 인식',TTS:'음성 합성',OCR:'문자 인식',RAG:'문서 검색'};
  [...new Set(rows.map(r=>r.cells[0].textContent.trim()))].forEach(key=>{const o=document.createElement('option');o.value=key;o.textContent=fieldNames[key]+' · '+key;modelSelect.append(o)});
  function filterModels(){let count=0;rows.forEach(r=>{r.hidden=!!modelSelect.value&&r.cells[0].textContent.trim()!==modelSelect.value;if(!r.hidden)count++});filter.querySelector('span').textContent=count+'개 모델'}
  modelSelect.addEventListener('change',filterModels);filterModels();
  const siteNote=document.createElement('p');siteNote.className='visitor-note';siteNote.textContent='Apple Silicon Mac · 메모리 32GB 구성을 중심으로 한 개인 구축 가이드입니다. 설치 목록은 이 브라우저에만 저장되며 계정 동기화나 실제 설치를 수행하지 않습니다. 모델·가격·지원 환경은 설치 전 공식 출처에서 확인하세요.';
  document.querySelector('.footer').before(siteNote);

  // One search entry, shared across guides and glossary, without adding another menu.
  const topbar=document.querySelector('.topbar');
  const brand=document.querySelector('.brand');
  const home=document.createElement('a');home.href='#plan';home.className='home-link';home.textContent='Hermes Local Lab';home.setAttribute('aria-label','Hermes Local Lab 시작하기');brand.replaceChildren(home);
  topbar.querySelector('.meta').textContent='Apple Silicon · 32GB 가이드';
  const searchButton=document.createElement('button');searchButton.type='button';searchButton.className='site-search-button';searchButton.textContent='문서 검색';searchButton.setAttribute('aria-haspopup','dialog');topbar.append(searchButton);
  // Keep the same destinations in a compact, shared masthead.
  topbar.insertBefore(primaryNav,searchButton);
  const dialog=document.createElement('dialog');dialog.className='site-search-dialog';dialog.setAttribute('aria-labelledby','siteSearchTitle');
  dialog.innerHTML='<div class="search-dialog-head"><h2 id="siteSearchTitle">문서 검색</h2><button class="btn" type="button" id="closeSiteSearch">닫기</button></div><label for="siteSearchInput">가이드 또는 용어 찾기</label><input id="siteSearchInput" type="search" placeholder="예: 원격 접속, 받아쓰기, 양자화" autocomplete="off"><p id="siteSearchCount" role="status" aria-live="polite"></p><div id="siteSearchResults"></div><p class="search-help">이 가이드 안에서 검색합니다. Esc로 닫기 · ⌘/Ctrl + K로 열기</p>';
  document.body.append(dialog);
  const siteInput=dialog.querySelector('input'),searchResults=dialog.querySelector('#siteSearchResults');
  const pageIndex=groups.flatMap(g=>g.pages.filter(([id])=>id!=='glossary').map(([id,name])=>({id,name,group:g.name,text:document.getElementById(id).textContent.toLowerCase()})));
  function renderSearch(){
    const q=siteInput.value.trim().toLowerCase();searchResults.replaceChildren();
    const found=q?pageIndex.filter(p=>(p.name+' '+p.text).toLowerCase().includes(q)):pageIndex.filter(p=>['plan','start','models','dictation'].includes(p.id));
    const matchingTerms=q?terms.filter(t=>t.slice(0,4).join(' ').toLowerCase().includes(q)):[];
    const rank=(title,alias='')=>!q?0:title.toLowerCase()===q?6:title.toLowerCase().includes(q)?4:alias.toLowerCase().includes(q)?3:1;
    const matches=[...found.map(p=>({title:p.name,detail:p.group,id:p.id,rank:rank(p.name)})),...matchingTerms.map(t=>({title:t[0],detail:'용어 · '+t[1],id:'glossary',term:t[0],rank:rank(t[0],t[1])}))].sort((a,b)=>b.rank-a.rank).slice(0,10);
    dialog.querySelector('#siteSearchCount').textContent=q?(matches.length?'검색 결과 '+matches.length+'개'+(found.length+matchingTerms.length>10?' · 상위 10개 표시':''):'검색 결과가 없습니다. 더 짧은 단어나 용어로 다시 찾아보세요.'):'자주 찾는 가이드';
    matches.forEach(m=>{const a=document.createElement('a');a.href='#'+m.id;const strong=document.createElement('strong');strong.textContent=m.title;const small=document.createElement('span');small.textContent=m.detail;a.append(strong,small);a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();e.stopPropagation();searchNavigated=true;dialog.close();if(m.term){input.value=m.term;category.value='';renderTerms()}openPanel(m.id);document.querySelector('#'+m.id+' h2')?.focus({preventScroll:true})});searchResults.append(a)});
  }
  let searchReturnFocus,searchNavigated=false;
  function showSearch(){if(dialog.open)return;searchNavigated=false;searchReturnFocus=document.activeElement;renderSearch();dialog.showModal();siteInput.focus()}
  searchButton.addEventListener('click',showSearch);siteInput.addEventListener('input',renderSearch);
  dialog.querySelector('#closeSiteSearch').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();dialog.close()}},true);
  dialog.addEventListener('close',()=>{if(!searchNavigated&&searchReturnFocus?.isConnected)searchReturnFocus.focus({preventScroll:true})});
  document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();showSearch()}});

  // Do not present unmeasured recommendation stars as benchmark scores.
  if(modelTable.tHead.rows[0].cells.length===6){modelTable.tHead.rows[0].deleteCell(5);rows.forEach(row=>row.deleteCell(5))}
  document.querySelector('#models .section-head p').textContent='작은 모델 하나로 시작하고, 결과가 부족할 때 더 큰 모델을 비교하세요. 실측 성능 순위가 아닌 설치 후보입니다.';
  const footer=document.querySelector('.footer');footer.replaceChildren();
  const footerName=document.createElement('span');footerName.textContent='Hermes Local Lab · 독립적인 개인 구축 가이드';
  const footerDate=document.createElement('span');footerDate.textContent='문서·UI 검토 2026.09.11 · 기기 성능 실측 전';footer.append(footerName,footerDate);
  const policy=document.createElement('details');policy.className='editorial-detail source-policy';
  policy.innerHTML='<summary>이 가이드의 확인 범위</summary><p>2026.09.11에 모델 카드, 설치 안내, 받아쓰기 처리 방식과 원격 도구 문서를 확인했습니다. 공식 지원 여부와 이 가이드의 선택 제안은 다릅니다. 다운로드 용량은 최대 메모리 사용량이 아니며, 한국어 정확도·속도는 이 맥미니에서 아직 측정하지 않았습니다.</p><p>가격은 결제 지역과 플랜에 따라 달라 고정 금액을 기재하지 않습니다. 무료 표시는 앱 또는 개인용 무료 플랜 기준입니다. 공식 링크는 해당 도구 설명과 함께 확인하세요.</p>';
  document.querySelector('#sources .section-head').after(policy);
  // Short local outline: no extra top-level menu or sidebar.
  panels.forEach(panel=>{
    panel.querySelector('h2')?.setAttribute('aria-level','1');
    panel.querySelectorAll('h3').forEach(h=>h.setAttribute('aria-level','2'));
    panel.querySelectorAll('h4').forEach(h=>h.setAttribute('aria-level','3'));
    const headings=[...panel.querySelectorAll(':scope > h3')];
    if(headings.length>=2){
      const outline=document.createElement('nav');outline.className='page-outline';outline.setAttribute('aria-label','이 페이지에서');
      const label=document.createElement('span');label.textContent='이 페이지에서';outline.append(label);
      headings.forEach(h=>{
        h.tabIndex=-1;h.classList.add('outline-target');
        const b=document.createElement('button');b.type='button';b.textContent=h.textContent;
        b.addEventListener('click',()=>{h.scrollIntoView({block:'start',behavior:reduced()?'instant':'smooth'});h.focus({preventScroll:true})});outline.append(b);
      });
      panel.querySelector('.section-head')?.after(outline);
    }
  });
  const nextPages={macbook:['start','첫날 설치','준비를 마쳤다면'],start:['models','모델 비교','모델을 더 비교하려면'],models:['plan','내 설치 계획','필요한 도구를 골랐다면'],dictation:['workflows','활용 방법','받아쓴 문장을 활용하려면'],workflows:['architecture','Hermes 팀 구성','작업을 역할별로 나누려면'],architecture:['remote','원격 접속','밖에서도 사용하려면'],remote:['plan','내 설치 계획','설정할 도구를 정리하려면'],storage:['start','첫날 설치','저장장치를 준비했다면'],reviews:['models','모델 비교','내 기기에 맞게 고르려면'],sources:['plan','내 설치 계획','설치 계획으로 돌아가기']};
  Object.entries(nextPages).forEach(([id,[target,title,reason]])=>{const nav=document.createElement('nav');nav.className='reading-next';nav.setAttribute('aria-label','다음 가이드');const small=document.createElement('span');small.textContent=reason;const a=document.createElement('a');a.href='#'+target;a.textContent=title+' →';nav.append(small,a);document.getElementById(id).append(nav)});
  document.querySelectorAll('th').forEach(th=>th.scope='col');
  document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>document.querySelector('.panel.active h2')?.focus({preventScroll:true})));
  const skip=document.createElement('a');skip.href='#plan';skip.className='skip-content';skip.textContent='본문으로 이동';skip.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();document.querySelector('.panel.active h2')?.focus()});document.body.prepend(skip);
  document.querySelectorAll('.table-wrap').forEach(wrap=>{if(wrap.closest('#dictation'))return;wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label',(wrap.closest('.panel').querySelector('h2')?.textContent||'비교')+' 표, 좁은 화면에서는 좌우 스크롤');const hint=document.createElement('p');hint.className='table-scroll-hint';hint.textContent='표가 잘리면 좌우로 밀어서 확인하세요.';wrap.before(hint)});
  const updateChrome=()=>{
    const masthead=topbar.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--masthead-height',masthead+'px');
    document.documentElement.style.setProperty('--site-chrome-height',(masthead+nav.getBoundingClientRect().height+24)+'px');
  };
  if('ResizeObserver' in window){const observer=new ResizeObserver(updateChrome);observer.observe(topbar);observer.observe(nav)}updateChrome();
  openPanel(location.hash.slice(1)||'plan',false,false);
})();
