/* Curated 32GB candidates. Download size is not runtime RAM. No installation is performed. */
(() => {
  const models = [
    {id:'qwen9b',name:'Qwen3.5 9B',runtime:'ollama',tags:['agent','code','docs','meeting'],agent:true,command:'ollama run qwen3.5:9b',url:'https://ollama.com/library/qwen3.5:9b',size:'6.6GB / Q4_K_M',role:'일반 대화·한국어 문서 요약. Hermes의 실제 도구 호출은 별도 시험합니다.'},
    {id:'gemma12b',name:'Gemma 4 12B',runtime:'ollama',tags:['agent','docs','image'],agent:true,command:'ollama run gemma4:12b',url:'https://ollama.com/library/gemma4:12b',size:'7.6GB / Q4_K_M',role:'문서 이미지·화면 캡처 이해와 글쓰기. Qwen 대신 비교할 후보입니다.'},
    {id:'ministral8b',name:'Ministral 3 8B',runtime:'ollama',tags:['agent','docs','code'],agent:true,command:'ollama run ministral-3:8b',url:'https://ollama.com/library/ministral-3:8b',size:'6.0GB / Q4_K_M',role:'다국어 문서·JSON 출력·도구 사용 비교. 필수 추가 설치는 아닙니다.'},
    {id:'gptoss20b',name:'gpt-oss 20B',runtime:'ollama',tags:['agent','code'],agent:true,command:'ollama run gpt-oss:20b',url:'https://ollama.com/library/gpt-oss:20b',size:'14GB / MXFP4',role:'작업 계획·추론·Hermes 메인 비교. 다른 생성 모델을 내리고 단독 실행부터 시작합니다.'},
    {id:'ax7b',name:'A.X 4.0 Light 7B',runtime:'ollama',tags:['docs','meeting'],agent:false,command:'ollama run hf.co/mykor/A.X-4.0-Light-gguf:Q4_K_M',url:'https://huggingface.co/mykor/A.X-4.0-Light-gguf',size:'4.44GB / Q4_K_M · 커뮤니티 변환',role:'한국어 회의록·문장 다듬기 보조. 공식 문맥 16K이므로 Hermes 메인으로 바로 지정하지 않습니다.'},
    {id:'kanana8b',name:'Kanana 1.5 8B',runtime:'lmstudio',tags:['docs','meeting'],agent:false,command:'parkjw/kanana-1.5-8b-instruct-2505-Q4_K_M-GGUF',url:'https://huggingface.co/parkjw/kanana-1.5-8b-instruct-2505-Q4_K_M-GGUF',size:'4.92GB / Q4_K_M · 커뮤니티 변환',role:'한국어 공지문·문장 교정 비교. 기본 문맥 32K이며 128K 확장을 가정하지 않습니다.'}
  ];
  window.LocalLabModels = models;
  const select = document.getElementById('starterModel');
  if (!select) return;
  document.getElementById('models').classList.add('model-pick-ready');
  const command = document.getElementById('freeModelCommand');
  const copy = document.getElementById('copyModelInstall');
  const status = document.getElementById('modelInstallStatus');
  const inputs = [...document.querySelectorAll('[data-model-check]')];
  const checkStatus = document.getElementById('modelCheckStatus');
  const storageKey = 'hermesModelChecksV1';
  let records = {}, copyTimer;
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
      models.forEach(model => {
        records[model.id] = {};
        inputs.forEach(input => {records[model.id][input.dataset.modelCheck] = saved[model.id]?.[input.dataset.modelCheck] === true;});
      });
    }
  } catch {}
  const selected = () => models.find(model => model.id === select.value) || models[0];
  function renderChecks() {
    const model = selected();
    document.getElementById('modelCheckTitle').textContent = model.name + ' · 직접 확인';
    inputs.forEach(input => {
      const applicable = input.dataset.modelCheck !== 'tools' || model.agent;
      input.disabled = !applicable;
      input.closest('label').hidden = !applicable;
      input.checked = applicable && records[model.id]?.[input.dataset.modelCheck] === true;
    });
    const active = inputs.filter(input => !input.disabled);
    checkStatus.textContent = active.filter(input => input.checked).length + ' / ' + active.length + '개 직접 확인 · 사용자 기록이며 자동 검증 결과가 아닙니다.' + (model.agent ? '' : ' 문서 보조 후보는 Hermes 도구 항목을 제외합니다.');
  }
  function render() {
    const model = selected(), gui = model.runtime === 'lmstudio';
    command.textContent = model.command;
    document.getElementById('modelInstallHint').textContent = model.size + '. ' + model.role;
    document.getElementById('modelInstallNote').textContent = gui
      ? '터미널 명령이 아닙니다. LM Studio의 모델 검색에 이 저장소 이름을 붙여넣고 Q4_K_M GGUF를 내려받으세요.'
      : 'Ollama를 실행한 뒤 터미널에 입력합니다. 최초 다운로드에는 인터넷이 필요하며 대화 종료는 /bye입니다.';
    document.getElementById('modelInstallSource').href = model.url;
    clearTimeout(copyTimer);
    copy.textContent = gui ? '검색어 복사' : '명령 복사';
    status.textContent = '';
    renderChecks();
  }
  function saveChecks() {
    try { localStorage.setItem(storageKey, JSON.stringify(records)); return true; }
    catch { return false; }
  }
  select.addEventListener('change', render);
  document.querySelectorAll('[data-model-pick]').forEach(button => button.addEventListener('click', () => {
    if (!models.some(model => model.id === button.dataset.modelPick)) return;
    for (let detail = select.closest('details'); detail; detail = detail.parentElement.closest('details')) detail.open = true;
    select.value = button.dataset.modelPick;
    render();
    document.getElementById('modelInstaller').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    select.focus({preventScroll:true});
  }));
  copy.addEventListener('click', async () => {
    const model = selected(), value = command.textContent;
    try {
      await navigator.clipboard.writeText(value);
      if (selected().id !== model.id) return;
      status.textContent = model.runtime === 'lmstudio' ? 'LM Studio 검색어를 복사했습니다.' : '설치 명령을 복사했습니다. 아직 실행하지 않았습니다.';
      copy.textContent = '복사됨';
    } catch {
      if (selected().id !== model.id) return;
      status.textContent = '클립보드에 접근할 수 없습니다. 위 내용을 직접 선택해 복사하세요.';
    }
    copyTimer = setTimeout(() => {copy.textContent = selected().runtime === 'lmstudio' ? '검색어 복사' : '명령 복사';}, 2000);
  });
  document.getElementById('addSelectedModel').addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('lab:add-model', {detail:{id:selected().id}}));
  });
  inputs.forEach(input => input.addEventListener('change', () => {
    if (input.disabled) return;
    const id = selected().id;
    records[id] = records[id] || {};
    records[id][input.dataset.modelCheck] = input.checked;
    const saved = saveChecks();
    renderChecks();
    if (!saved) checkStatus.textContent += ' 저장할 수 없어 현재 화면에만 반영했습니다.';
  }));
  document.getElementById('resetModelChecks').addEventListener('click', () => {
    records[selected().id] = {};
    const saved = saveChecks();
    renderChecks();
    if (!saved) checkStatus.textContent += ' 저장 공간에 접근할 수 없어 새로고침 시 이전 기록이 남을 수 있습니다.';
  });
  render();
})();
