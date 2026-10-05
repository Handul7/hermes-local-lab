(() => {
  const groups = [
    {name:'시작하기',pages:[['start','AI 서버 초기 설정'],['storage','장비·저장공간'],['plan','내 설치 목록'],['macbook','맥북 준비']],auxiliary:['macbook']},
    {name:'도구 고르기',pages:[['models','무료 AI · 모델'],['dictation','받아쓰기 앱']]},
    {name:'활용·운영',pages:[['workflows','실사용·홈서버'],['architecture','Hermes 팀 구성'],['remote','원격 접속']]},
    {name:'후기·자료',pages:[['reviews','실사용 후기'],['sources','공식 출처'],['glossary','용어집']],auxiliary:['sources','glossary']}
  ];
  const terms = [
    ['DAS','직접 연결 저장장치 · 다스','기본','USB 등으로 컴퓨터 한 대에 연결하는 저장장치. 맥미니가 SMB로 공유하면 Windows·MacBook도 네트워크로 접근할 수 있습니다.','storage'],
    ['NAS','네트워크 저장장치 · 나스','기본','컴퓨터와 별도로 켜 두고 네트워크에서 파일 공유·백업을 제공하는 장치. AI 실행용 SSD나 별도 백업 사본을 자동으로 대체하지는 않습니다.','storage'],
    ['SMB','파일 공유 · Windows 공유','기본','Mac과 Windows가 네트워크로 파일에 접근하는 규약. Mac에 연결한 APFS 디스크도 Mac의 SMB 공유를 통해 Windows에서 사용할 수 있습니다.','storage'],
    ['DAS 절전','HDD Sleep · 슬립 · 스핀다운','기본','케이스 컨트롤러가 유휴 드라이브를 쉬게 하는 동작. Mac의 잠자기와 별개이며, 잠깐의 복귀 지연과 디스크 연결 해제·오류는 구분해야 합니다.','storage'],
    ['RAID 1','미러링 · SINGLE · SHR','기본','두 디스크에 같은 데이터를 기록해 한 디스크 고장에 대비하는 구성. 삭제·랜섬웨어·케이스 고장의 별도 백업이 아닙니다. SINGLE은 디스크를 각각 쓰는 다른 방식입니다.','storage'],
    ['VRAM','GPU 메모리 · 7900 GRE','모델','그래픽카드의 전용 메모리. 내 RX 7900 GRE는 16GB이며, 맥미니의 통합 메모리와 합쳐서 모델을 올리는 구성은 아닙니다.','workflows'],
    ['OpenClaw','오픈클로','에이전트','메신저·도구·자동화를 연결하는 에이전트. 로컬 모델도 쓸 수 있으며 Hermes와 비교할 선택 도구입니다. 모델 자체는 아닙니다.','architecture'],
    ['Orca','오르카 · onorca.dev','에이전트','여러 코딩 에이전트와 작업 폴더를 관리하는 앱. 첫 실행 전에 승인 생략 기본값을 확인하세요.','architecture'],
    ['Paseo','파세오','원격','내 기기의 에이전트를 휴대폰·웹에서 관리하는 도구. 모델 실행기나 전체 화면 원격 데스크톱은 아닙니다.','architecture'],
    ['Dots','ChatGPT Dots','에이전트','클라우드에서 지속적인 업무를 맡는 ChatGPT 기능. 개인 컴퓨터 접근은 별도 허용이며 무료 로컬 모델과는 다릅니다.','architecture'],
    ['ACP','Agent Client Protocol','에이전트','에디터·관리 앱과 에이전트가 대화·도구 실행·승인을 주고받는 연결 규약. 연결된 에이전트의 모든 기능이 노출되는 것은 아닙니다.','architecture'],
    ['MLX Audio','Mac 음성 모델 실행 도구','음성·이미지','Apple Silicon에서 음성 인식·합성 모델을 실행하는 커뮤니티 도구. Qwen 모델이나 완성된 단축키 받아쓰기 앱 자체가 아닙니다.','models'],
    ['강제 정렬','Forced alignment · ForcedAligner','음성·이미지','녹음과 이미 있는 대본을 맞춰 단어나 글자가 나오는 시간을 붙이는 작업. 새로 받아쓰거나 화자를 구분하는 기능과 다릅니다.','models'],
    ['oMLX','MLX 기반 로컬 모델 서버','모델','Apple Silicon에서 모델을 제공하는 오픈 소스 서버. 반복 입력의 캐시와 동시 요청 관리 기능을 제공합니다. MLX 프레임워크나 모델 자체와는 구분합니다.','models'],
    ['KV 캐시','KV cache · Prefix cache','모델','이전에 처리한 입력의 중간 계산을 보관해 재사용하는 캐시. 문맥이 길면 메모리를 더 쓸 수 있으며, SSD에 저장한다고 실행 RAM이 늘어나는 것은 아닙니다.','models'],
    ['추측 디코딩','Speculative decoding · MTP · 초안 모델','모델','여러 다음 토큰을 먼저 제안하고 주 모델이 검증하는 가속 방식. 작은 초안 모델을 함께 쓰는 경우 메모리가 더 필요합니다. 작업과 지원 엔진에 따라 효과가 다릅니다.','models'],
    ['무료 로컬 AI','무료 모델 · 사용료 0원','기본','모델을 내려받아 내 기기에서 추론하면 외부 모델 API 요금이 들지 않는 구성. 하드웨어·전기 비용, 유료 부가 도구와 라이선스 제한은 별개입니다.','models'],
    ['라이선스','License · Apache 2.0 · MIT · NC','기본','모델을 어떤 조건으로 사용·수정·배포할 수 있는지 정한 규칙. 무료 다운로드와 상업 이용 허용은 다릅니다. 정확한 모델 버전의 원문을 확인하세요.','models'],
    ['오픈 웨이트','Open weights · 공개 가중치','모델','모델 가중치 파일이 공개되어 있다는 뜻입니다. 제한 없는 오픈 소스나 무료 상업 이용을 자동으로 뜻하지는 않습니다.','models'],
    ['폴백','Fallback · 보조 모델','에이전트','주 모델이 실패했을 때 다른 제공자로 넘기는 경로. 로컬 AI라도 유료 클라우드 폴백이나 보조 작업을 연결하면 요금이 발생할 수 있습니다.','models'],
    ['LLM','대규모 언어 모델','모델','글을 읽고 답하거나 작성하는 모델. 에이전트가 작업을 판단할 때 사용하는 두뇌 역할입니다.','models'],
    ['로컬 AI','내 기기에서 처리','기본','모델을 내 컴퓨터에서 실행하는 방식. 앱에 클라우드 후처리가 켜져 있으면 일부 데이터는 외부로 나갈 수 있습니다.','models'],
    ['추론','Inference','모델','학습된 모델에 입력을 넣어 답이나 결과물을 만드는 과정입니다. 모델을 새로 학습시키는 것과는 다릅니다.','models'],
    ['양자화','Quantization · Q4 · 4bit','모델','모델의 수치를 더 적은 비트로 표현해 메모리 사용량을 줄이는 방식. 정확도나 속도가 달라질 수 있습니다.','models'],
    ['GGUF','양자화 모델 파일 형식','모델','Ollama·LM Studio·llama.cpp 등에서 사용하는 모델 파일 형식. 파일이 있어도 실행기의 모델 구조 지원·채팅 템플릿·도구 호출을 따로 확인해야 합니다.','models'],
    ['활성 파라미터','MoE · A3B · A4B','모델','한 토큰을 처리할 때 사용하는 파라미터 규모입니다. 전체 가중치 크기나 필요한 메모리와 같지 않습니다. 30B-A3B를 3B 모델의 메모리로 계산하지 마세요.','models'],
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
    ['Jev · TypeSafe','제브 · 젭 · System One','에이전트','정해진 후보 선택·관련도·근거 대조 등을 돕는 클라우드 판단 API. 대화문을 생성하는 무료 로컬 모델은 아닙니다. 이 사이트는 안내만 제공하며 API는 연결하지 않았습니다.','architecture'],
    ['스킬 라우팅','Skill routing · 스킬 추천','에이전트','사용자의 요청에 맞는 스킬을 고르거나 추천하는 과정. 추천 결과가 도구 실행 권한이나 작업 승인까지 뜻하지는 않습니다.','architecture'],
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
  const navLabels={start:'초기 설정',storage:'저장공간',plan:'설치 목록',workflows:'실사용',architecture:'에이전트 구성'};
  openPanel=function(id,push=true,scroll=true){
    if(!panels.some(p=>p.id===id))id='start';
    nativeOpen(id,push,false);
    const group=groups.find(g=>g.pages.some(p=>p[0]===id));
    primaryNav.querySelectorAll('a').forEach((a,i)=>{if(groups[i]===group)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});
    const visiblePages=group.pages.filter(([key])=>!group.auxiliary?.includes(key)||key===id);
    nav.querySelector('.secondary-nav').innerHTML=visiblePages.map(([key,name])=>`<a href="#${key}"${key===id?' aria-current="page"':''}>${navLabels[key]||name}</a>`).join('');
    nav.querySelector('.secondary-nav').hidden=visiblePages.length===1;
    const label=group.pages.find(p=>p[0]===id)[1];
    pageTools.querySelector('span').textContent=group.name+' / '+label;
    pageTools.querySelector('a').hidden=id==='glossary';
    document.title=label+' · Hermes Local Lab';
    // Update sticky chrome before positioning a new page; never scroll through
    // an unrelated document from the previous page's reading position.
    updateChrome();
    if(scroll)document.getElementById(id).scrollIntoView({block:'start',behavior:'instant'});
  };
  panels.forEach(p=>{const heading=p.querySelector('h2');if(heading){heading.id='heading-'+p.id;p.setAttribute('role','region');p.setAttribute('aria-labelledby',heading.id);heading.tabIndex=-1}});
  function followGuideLink(id,detailId){
    const panel=document.getElementById(id),detail=detailId?document.getElementById(detailId):null;
    const validDetail=detail?.tagName==='DETAILS'&&panel?.contains(detail);
    openPanel(id,true,!validDetail);
    if(validDetail){
      for(let parent=detail;parent;parent=parent.parentElement.closest('details'))parent.open=true;
      const summary=detail.querySelector('summary');
      summary.scrollIntoView({block:'start',behavior:'instant'});
      summary.focus({preventScroll:true});
      return;
    }
    panel?.querySelector('h2')?.focus({preventScroll:true});
  }
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href^="#"]');if(!a||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
    const id=a.getAttribute('href').slice(1);if(!panels.some(p=>p.id===id))return;
    e.preventDefault();followGuideLink(id,a.dataset.guideDetail);
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
  const filter=document.createElement('div');filter.className='model-filter';filter.innerHTML='<label>모델 분야<select id="modelCategory"><option value="">연관 기능 포함 전체</option></select></label><label>개발사<select id="modelOrigin"><option value="">국내외 전체</option><option value="kr">국내 모델만</option><option value="global">해외 모델만</option></select></label><span id="modelCount" role="status" aria-live="polite"></span>';
  modelTable.parentNode.before(filter);
  const rows=[...modelTable.tBodies[0].rows],modelSelect=filter.querySelector('#modelCategory'),modelOrigin=filter.querySelector('#modelOrigin');
  rows.forEach(row=>[...row.cells].forEach((cell,i)=>cell.dataset.label=modelTable.tHead.rows[0].cells[i].textContent));
  const fieldNames={LLM:'대화·글쓰기',Image:'이미지',Video:'영상',ASR:'음성 인식',TTS:'음성 합성',OCR:'문자 인식',RAG:'문서 검색'};
  [...new Set(rows.map(r=>r.cells[0].textContent.trim()))].forEach(key=>{const o=document.createElement('option');o.value=key;o.textContent=fieldNames[key]+' · '+key;modelSelect.append(o)});
  function filterModels(){let count=0;rows.forEach(r=>{r.hidden=(!!modelSelect.value&&r.cells[0].textContent.trim()!==modelSelect.value)||(!!modelOrigin.value&&r.dataset.origin!==modelOrigin.value);if(!r.hidden)count++});filter.querySelector('#modelCount').textContent=count?count+'개 실사용 후보 · 설치 경로 확인 / 실기기 검증 전':'해당 조건의 모델이 없습니다. 분야 또는 개발사를 전체로 바꿔보세요.'}
  modelSelect.value='LLM';[modelSelect,modelOrigin].forEach(select=>select.addEventListener('change',filterModels));filterModels();
  document.querySelectorAll('[data-copy-command]').forEach(button=>button.addEventListener('click',async()=>{const code=document.getElementById(button.dataset.copyCommand);try{await navigator.clipboard.writeText(code.textContent);button.textContent='복사됨';}catch{button.textContent='직접 선택해 복사';}setTimeout(()=>button.textContent='명령 복사',2500)}));
  const siteNote=document.createElement('p');siteNote.className='visitor-note';siteNote.textContent='Apple Silicon Mac · 메모리 32GB 구성을 중심으로 한 개인 구축 가이드입니다. 설치 목록은 이 브라우저에만 저장되며 계정 동기화나 실제 설치를 수행하지 않습니다. 모델·가격·지원 환경은 설치 전 공식 출처에서 확인하세요.';
  document.querySelector('.footer').before(siteNote);

  // One search entry, shared across guides and glossary, without adding another menu.
  const topbar=document.querySelector('.topbar');
  const brand=document.querySelector('.brand');
  const home=document.createElement('a');home.href='#start';home.className='home-link';home.textContent='Hermes Local Lab';home.setAttribute('aria-label','Hermes Local Lab 시작하기');brand.replaceChildren(home);
  topbar.querySelector('.meta').textContent='Apple Silicon · 32GB 가이드';
  const searchButton=document.createElement('button');searchButton.type='button';searchButton.className='site-search-button';searchButton.textContent='문서 검색';searchButton.setAttribute('aria-haspopup','dialog');topbar.append(searchButton);
  // Keep the same destinations in a compact, shared masthead.
  topbar.insertBefore(primaryNav,searchButton);
  const dialog=document.createElement('dialog');dialog.className='site-search-dialog';dialog.setAttribute('aria-labelledby','siteSearchTitle');
  dialog.innerHTML='<div class="search-dialog-head"><h2 id="siteSearchTitle">문서 검색</h2><button class="btn" type="button" id="closeSiteSearch">닫기</button></div><label for="siteSearchInput">가이드 또는 용어 찾기</label><input id="siteSearchInput" type="search" placeholder="예: 원격 접속, 받아쓰기, 양자화" autocomplete="off"><p id="siteSearchCount" role="status" aria-live="polite"></p><div id="siteSearchResults"></div><p class="search-help">이 가이드 안에서 검색합니다. Esc로 닫기 · ⌘/Ctrl + K로 열기</p>';
  document.body.append(dialog);
  const siteInput=dialog.querySelector('input'),searchResults=dialog.querySelector('#siteSearchResults');
  const pageIndex=groups.flatMap(g=>g.pages.filter(([id])=>id!=='glossary').map(([id,name])=>({id,name,group:g.name,text:document.getElementById(id).textContent.toLowerCase()})));
  function findSearchMatch(id,query){
    return [...document.getElementById(id).querySelectorAll('p,dd,dt,li,h3,h4,h5,h6,summary,td')].find(node=>!node.closest('.update-decisions')&&node.textContent.toLowerCase().includes(query));
  }
  function searchExcerpt(id,query){
    const text=(query?findSearchMatch(id,query)?.textContent:document.querySelector('#'+id+' .section-head p, #'+id+' .builder-intro')?.textContent)?.replace(/\s+/g,' ').trim()||'';
    const at=query?text.toLowerCase().indexOf(query):0,start=Math.max(0,at-28),end=Math.min(text.length,start+110);
    return (start?'…':'')+text.slice(start,end)+(end<text.length?'…':'');
  }
  function revealSearchMatch(id,query){
    if(!query)return false;
    const panel=document.getElementById(id);
    const match=findSearchMatch(id,query);
    if(!match)return false;
    document.querySelectorAll('.search-match').forEach(node=>node.classList.remove('search-match'));
    const card=match.closest('.outcome-card');
    if(card?.hidden)panel.querySelector('[aria-controls="'+card.id+'"]')?.click();
    if(match.closest('tr')?.hidden&&id==='models'){
      ['modelCategory','modelOrigin'].forEach(key=>{const select=document.getElementById(key);select.value='';select.dispatchEvent(new Event('change'))});
    }
    for(let detail=match.closest('details');detail;detail=detail.parentElement.closest('details'))detail.open=true;
    match.classList.add('search-match');match.tabIndex=-1;
    match.scrollIntoView({block:'start',behavior:'instant'});match.focus({preventScroll:true});
    return true;
  }
  function renderSearch(){
    const q=siteInput.value.trim().toLowerCase();searchResults.replaceChildren();
    const found=q?pageIndex.filter(p=>(p.name+' '+p.text).toLowerCase().includes(q)):pageIndex.filter(p=>['plan','start','models','dictation'].includes(p.id));
    const matchingTerms=q?terms.filter(t=>t.slice(0,4).join(' ').toLowerCase().includes(q)):[];
    const rank=(title,alias='')=>!q?0:title.toLowerCase()===q?6:title.toLowerCase().includes(q)?4:alias.toLowerCase().includes(q)?3:1;
    const matches=[...found.map(p=>({title:p.name,detail:p.group,id:p.id,excerpt:searchExcerpt(p.id,q),rank:rank(p.name)})),...matchingTerms.map(t=>({title:t[0],detail:'용어 · '+t[1],id:'glossary',term:t[0],excerpt:t[3],rank:rank(t[0],t[1])}))].sort((a,b)=>b.rank-a.rank).slice(0,10);
    dialog.querySelector('#siteSearchCount').textContent=q?(matches.length?'검색 결과 '+matches.length+'개'+(found.length+matchingTerms.length>10?' · 상위 10개 표시':''):'검색 결과가 없습니다. 더 짧은 단어나 용어로 다시 찾아보세요.'):'자주 찾는 가이드';
    matches.forEach(m=>{const a=document.createElement('a');a.href='#'+m.id;const strong=document.createElement('strong');strong.textContent=m.title;const small=document.createElement('span');small.textContent=m.detail;a.append(strong,small);if(m.excerpt){const excerpt=document.createElement('p');excerpt.className='search-excerpt';excerpt.textContent=m.excerpt;a.append(excerpt)}a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();e.stopPropagation();searchNavigated=true;dialog.close();if(m.term){input.value=m.term;category.value='';renderTerms()}openPanel(m.id,true,false);if(!m.term&&revealSearchMatch(m.id,q))return;document.getElementById(m.id).scrollIntoView({block:'start',behavior:'instant'});document.querySelector('#'+m.id+' h2')?.focus({preventScroll:true})});searchResults.append(a)});
  }
  let searchReturnFocus,searchNavigated=false;
  function showSearch(){if(dialog.open)return;searchNavigated=false;searchReturnFocus=document.activeElement;renderSearch();dialog.showModal();siteInput.focus()}
  searchButton.addEventListener('click',showSearch);siteInput.addEventListener('input',renderSearch);
  dialog.querySelector('#closeSiteSearch').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();dialog.close()}},true);
  dialog.addEventListener('close',()=>{if(!searchNavigated&&searchReturnFocus?.isConnected)searchReturnFocus.focus({preventScroll:true})});
  document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();showSearch()}});

  // Model recommendations describe fit and licensing, not unmeasured benchmark scores.
  const footer=document.querySelector('.footer');footer.replaceChildren();
  const footerName=document.createElement('span');footerName.textContent='Hermes Local Lab · 독립적인 개인 구축 가이드';
  const footerDate=document.createElement('span');footerDate.textContent='구성 정리 2026.10.05 · 자료 확인일은 항목별 표기';footer.append(footerName,footerDate);
  const utilityLinks=document.createElement('nav');utilityLinks.className='footer-utilities';utilityLinks.setAttribute('aria-label','참고 자료');
  utilityLinks.innerHTML='<a href="#sources">공식 출처·확인 범위</a><a href="#glossary">용어집</a><a href="#macbook">맥북 준비</a>';footer.prepend(utilityLinks);
  const policy=document.createElement('details');policy.className='editorial-detail source-policy';
  policy.innerHTML='<summary>이 가이드의 확인 범위</summary><p>2026.09.23 추가 확인: Qwen3-ASR·TTS·ForcedAligner의 공개 모델과 MLX Audio 구현, Qwen-Image-2.1의 Draw Things 등록·연구용 라이선스·ComfyUI MPS 오류 보고를 확인했습니다. 최신 클라우드 음성·Omni·이미지 발표는 로컬 설치 후보와 구분했습니다. 모델 파일 크기는 RAM 사용량이 아니며, M6 32GB 설치·한국어 품질·처리 속도는 실측하지 않았습니다. 녹음 → 요약 → 음성 활용은 연결 제안이지 구현된 자동화가 아닙니다.</p><p>2026.09.23에는 최근 3개월의 Reddit·Threads 사용기와 Ollama·oMLX·LM Studio·Qwen 공식 자료를 대조했습니다. 실행기 변화, 큰 모델의 조건부 비교, 32GB에서 제외할 가속 엔진, 기존 Windows PC와의 역할 분담을 추가했습니다. 기본 무료 구성은 유지했습니다. 커뮤니티 수치는 자기 보고이며 새 맥미니 실측이 아닙니다. 기존 6개 모델·받아쓰기 앱·가격을 이날 모두 재검증했다는 뜻은 아닙니다.</p><p>2026.09.22에는 Jev의 공식 문서·가격·언어 한계와 Hermes용 커뮤니티 플러그인을 확인했습니다. 무료 로컬 AI와 구분한 선택형 클라우드 기능 안내이며, API 연결·설치·한국어 성능 시험은 하지 않았습니다. 검색·스킬 추천·근거 대조는 도입 제안이고 현재 작동하는 Jev 기능이 아닙니다. 다른 모델·앱 정보까지 이날 모두 재검증한 것은 아닙니다.</p><p>2026.09.15에는 공용 자료실·맥북 백업과 상시 Hermes 작업실을 우선 활용법으로 정리했습니다. Apple·Hermes 공식 기능을 바탕으로 한 구성 제안이며, 실제 백업·복구나 작업 지속을 이 맥미니에서 시험한 결과는 아닙니다. Plex는 참고 용도로만 남겼습니다. 기존 모델·받아쓰기 비교를 모두 재검증했다는 뜻은 아닙니다.</p><p>2026.09.13에는 Superwhisper·Wispr Flow의 공식 Mac 다운로드와 한국 iPhone 앱스토어 링크를 확인하고 설치 후보 저장에 연결했습니다. App Store 링크는 맥용 설치 파일이 아닙니다.</p><p>2026.09.12에는 무료 AI 후보의 모델 카드·라이선스·로컬 실행 범위와 설치 경로, 작업별 활용·기대효과 비교를 보완했습니다. 기대효과는 공식 기능을 바탕으로 한 활용 제안이며 실제 출력이나 생산성 실측이 아닙니다. 나머지 문서·후기 검토일은 2026.09.11입니다. 공식 지원 여부와 이 가이드의 선택 제안은 다릅니다. 다운로드 용량은 최대 메모리 사용량이 아니며, 한국어 정확도·속도는 이 맥미니에서 아직 측정하지 않았습니다.</p><p>모델 표의 0원은 내 기기에서 실행할 때의 모델·추론 사용료입니다. 전기·장비·외부 도구 비용과 라이선스 조건은 별개입니다. 실행 앱의 무료 범위와 네트워크 서비스의 개인용 무료 플랜도 구분합니다. 각 항목의 공식 출처에서 현행 조건을 확인하세요.</p>';
  document.querySelector('#sources .section-head').after(policy);
  const reviewPolicy=document.createElement('p');reviewPolicy.textContent='2026.09.25에는 조코딩·서울리안·에이와 아이 영상 3편의 전체 한국어 자막과 설명을 확인하고 실사용 후기를 보완했습니다. 일부는 자동 자막이며 에이와 아이 영상의 주요 수치 화면을 추가 대조했습니다. 제작자 실험·주장과 이 가이드의 적용 제안을 구분합니다. 프로그램 설치·재현 실험·공개 업로더 전체 소스 검수는 하지 않았습니다. 로컬 AI 동향 보완 2026.09.23의 기존 기록은 유지하며 이번에 모두 재검증한 것은 아닙니다.';
  policy.querySelector('summary').after(reviewPolicy);
  const auditPolicy=document.createElement('p');
  auditPolicy.innerHTML='2026.09.30: 기본 대화 후보 6개의 배포·조건, Ollama·Hermes·oMLX·LM Studio 변경 기록, Gemini TTS와 Qwen 로컬 음성, Jev·Nimble·Tev1의 역할과 조건을 대조했습니다. Handy·Superwhisper·Wispr Flow의 처리 방식, Qwen 이미지 이용 조건, MiniMax H3 구성, Tailscale SSH·Time Machine의 핵심 안내도 확인했습니다. Reddit와 Threads 최신 글은 원문과 공식 자료를 구분했습니다. <a href="#models" data-guide-detail="septemberAudit">분야별 점검표 →</a> · <a href="#reviews" data-guide-detail="septemberCommunity">이번 커뮤니티 확인 기록 →</a>';
  policy.querySelector('summary').after(auditPolicy);
  const octoberPolicy=document.createElement('p');
  octoberPolicy.innerHTML='2026.10.01: 기본 모델 6개와 음성·이미지·검색·보류 후보의 카드·조건·배포 경로를 대조했습니다. FLUX.2 klein·Z-Image와 MiniMax H3의 Draw Things 등록, 국내 모델 조건, Gemma 26B의 형식별 용량을 보완했습니다. OpenAI 9/29 발표와 Google Gemini 4 Argon 9/30 발표는 클라우드·제한 제공으로 분리했습니다. 제품군 이름만 있는 항목, M6 실측, 실제 서비스 연결은 검증 완료로 표시하지 않습니다. 이번 확인은 커뮤니티 후기를 새로 수집한 기록이 아닙니다. <a href="#models" data-guide-detail="octoberAudit">모델 검증 요약</a> · <a href="#models" data-guide-detail="frontierUpdate">새 발표와 내 활용</a>';
  policy.querySelector('summary').after(octoberPolicy);
  const setupPolicy=document.createElement('p');
  setupPolicy.innerHTML='2026.10.05: 새 맥미니의 AI 서버 초기 설정을 6단계로 정리했습니다. Apple 전원·원격 로그인·백업, Ollama 설치·Hermes 연결, OpenClaw·Orca·Paseo·Dots 공식 안내를 확인했습니다. 이전 모델 비교 전체의 확인일을 바꾼 것은 아니며, 실제 맥미니 설치·무인 복구·한국어 성능 시험은 하지 않았습니다. <a href="#start">AI 서버 초기 설정 →</a> · <a href="#architecture" data-guide-detail="optionalAgentTools">선택 도구 안내 →</a>';
  policy.querySelector('summary').after(setupPolicy);
  const history=document.createElement('details');history.className='editorial-detail';history.innerHTML='<summary>날짜별 조사 범위·변경 기록</summary>';
  [...policy.children].filter(node=>node.tagName!=='SUMMARY').forEach(node=>history.append(node));
  const scope=document.createElement('p');scope.textContent='공식 지원·커뮤니티 사용기·이 가이드의 활용 제안을 구분합니다. 모델의 한국어 품질, 속도와 새 맥미니의 무인 운영은 직접 시험 전입니다. 확인일은 항목별로 다르며, 사이트 구성을 정리한 날이 전체 정보의 재검증일은 아닙니다.';
  policy.append(scope,history);
  // Short local outline: no extra top-level menu or sidebar.
  panels.forEach(panel=>{
    panel.querySelector('h2')?.setAttribute('aria-level','1');
    panel.querySelectorAll('h3').forEach(h=>h.setAttribute('aria-level','2'));
    panel.querySelectorAll('h4').forEach(h=>h.setAttribute('aria-level','3'));
    const headings=[...panel.querySelectorAll(':scope > h3, :scope > details[id] > summary')];
    if(headings.length>=2&&panel.id!=='start'){
      const outline=document.createElement('details');outline.className='page-outline';
      const label=document.createElement('summary');label.textContent='바로 찾기 · '+headings.length+'개 항목';outline.append(label);
      const links=document.createElement('nav');links.setAttribute('aria-label','이 페이지에서');outline.append(links);
      headings.forEach(h=>{
        h.tabIndex=-1;h.classList.add('outline-target');
        const b=document.createElement('button');b.type='button';b.textContent=h.tagName==='SUMMARY'?[...h.childNodes].filter(node=>node.nodeType===Node.TEXT_NODE).map(node=>node.textContent).join('').trim():h.textContent;
        b.addEventListener('click',()=>{outline.open=false;if(h.tagName==='SUMMARY')h.parentElement.open=true;h.scrollIntoView({block:'start',behavior:'instant'});h.focus({preventScroll:true})});links.append(b);
      });
      panel.querySelector('.section-head')?.after(outline);
    }
  });
  const nextPages={macbook:['start','AI 서버 초기 설정','준비를 마쳤다면'],start:['workflows','첫 활용법','기본 설정을 마쳤다면'],models:['plan','내 설치 계획','필요한 도구를 골랐다면'],dictation:['workflows','활용 방법','받아쓴 문장을 활용하려면'],workflows:['architecture','Hermes 팀 구성','작업을 역할별로 나누려면'],architecture:['remote','원격 접속','밖에서도 사용하려면'],remote:['plan','내 설치 계획','설정할 도구를 정리하려면'],storage:['start','AI 서버 초기 설정','저장장치를 준비했다면'],reviews:['models','모델 비교','내 기기에 맞게 고르려면'],sources:['plan','내 설치 계획','설치 계획으로 돌아가기']};
  Object.entries(nextPages).forEach(([id,[target,title,reason]])=>{const nav=document.createElement('nav');nav.className='reading-next';nav.setAttribute('aria-label','다음 가이드');const small=document.createElement('span');small.textContent=reason;const a=document.createElement('a');a.href='#'+target;a.textContent=title+' →';nav.append(small,a);document.getElementById(id).append(nav)});
  document.querySelectorAll('th').forEach(th=>th.scope='col');
  document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>document.querySelector('.panel.active h2')?.focus({preventScroll:true})));
  const skip=document.createElement('a');skip.href='#start';skip.className='skip-content';skip.textContent='본문으로 이동';skip.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();document.querySelector('.panel.active h2')?.focus()});document.body.prepend(skip);
  document.querySelectorAll('.table-wrap').forEach(wrap=>{if(wrap.closest('#dictation')||wrap.classList.contains('free-model-wrap'))return;wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label',(wrap.closest('.panel').querySelector('h2')?.textContent||'비교')+' 표, 좁은 화면에서는 좌우 스크롤');const hint=document.createElement('p');hint.className='table-scroll-hint';hint.textContent='표가 잘리면 좌우로 밀어서 확인하세요.';wrap.before(hint)});
  const updateChrome=()=>{
    const masthead=topbar.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--masthead-height',masthead+'px');
    document.documentElement.style.setProperty('--site-chrome-height',(masthead+nav.getBoundingClientRect().height+24)+'px');
  };
  if('ResizeObserver' in window){const observer=new ResizeObserver(updateChrome);observer.observe(topbar);observer.observe(nav)}updateChrome();
  // Decorative wayfinding only: labels, saved plans and routing stay unchanged.
  iconPaths.book='<path d="M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1Zm0 0v15"/>';
  iconPaths.arrow='<path d="M5 12h14m-5-5 5 5-5 5"/>';
  iconPaths.search='<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>';
  const guideMarks={plan:'mini',macbook:'laptop',start:'install',storage:'drive',models:'model',dictation:'mic',workflows:'home',architecture:'team',remote:'terminal',reviews:'video',sources:'link',glossary:'book'};
  const mark=(name,className)=>{
    const node=document.createElement('span');node.className=className;
    node.setAttribute('aria-hidden','true');node.innerHTML=svg(name);
    node.querySelector('svg').setAttribute('focusable','false');return node;
  };
  panels.forEach(panel=>{
    const heading=panel.querySelector('h2');if(!heading)return;
    heading.classList.add('guide-heading');
    heading.prepend(mark(guideMarks[panel.id]||'doc','page-emblem'));
  });
  document.querySelectorAll('.guide-journey a').forEach(link=>{
    const row=document.createElement('span');row.className='journey-top';row.setAttribute('aria-hidden','true');
    row.append(mark(guideMarks[link.hash.slice(1)],'journey-icon'),mark('arrow','journey-arrow'));link.prepend(row);
  });
  home.prepend(mark('mini','site-emblem'));
  searchButton.prepend(mark('search','search-emblem'));
  document.querySelectorAll('.outcome-choice').forEach(button=>{
    const name={writing:'doc',meeting:'mic',knowledge:'book',coding:'code',creative:'image',server:'home'}[button.dataset.outcome];
    button.prepend(mark(name,'outcome-emblem'));
  });
  ['homeShared','homeHermes'].forEach((id,i)=>{
    document.querySelector('#'+id+' .home-priority-label')?.prepend(mark(i?'team':'drive','priority-emblem'));
  });
  openPanel(location.hash.slice(1)||'start',false,false);
})();
