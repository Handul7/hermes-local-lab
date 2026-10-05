(() => {
  const keys = ['device', 'power', 'model', 'hermes', 'remote', 'verify'];
  const storageKey = 'hermesServerSetupV1';
  function normalize(value) {
    const result = {};
    for (const key of keys) result[key] = value?.[key] === true;
    return result;
  }
  function progress(state) {
    return {done: keys.filter(key => state[key] === true).length, next: keys.find(key => state[key] !== true) || null};
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = {normalize, progress, keys, storageKey};
  if (typeof document === 'undefined') return;
  const host = document.getElementById('start');
  if (!host) return;
  let state = normalize(null), canSave = true;
  try { state = normalize(JSON.parse(localStorage.getItem(storageKey) || 'null')); } catch { canSave = false; }
  const steps = [...host.querySelectorAll('[data-server-step]')];
  const checks = [...host.querySelectorAll('[data-server-done]')];
  const button = document.getElementById('serverContinue');
  function render() {
    const current = progress(state);
    document.getElementById('serverProgressText').textContent = current.done + ' / 6단계 확인' + (current.next ? '' : ' · 기본 설정 완료');
    document.getElementById('serverProgressBar').value = current.done;
    document.getElementById('serverSaveHint').textContent = canSave ? '이 브라우저에만 저장 · 실제 설치 상태를 자동 감지하지 않습니다.' : '진행 상태를 저장하지 못했습니다. 이 화면에서는 체크할 수 있지만 새로고침하면 사라질 수 있어요.';
    button.textContent = current.next ? (current.done ? '다음 미완료 단계 열기' : '첫 단계 시작') : '첫 활용법 보기';
    checks.forEach(input => { input.checked = state[input.dataset.serverDone]; });
    steps.forEach(step => {
      const done = state[step.dataset.serverStep];
      step.dataset.complete = String(done);
      step.querySelector('.server-step-status').textContent = done ? '확인 완료' : '확인 전';
    });
  }
  checks.forEach(input => {
    input.closest('.server-check').hidden = false;
    input.addEventListener('change', () => {
      state[input.dataset.serverDone] = input.checked;
      try { localStorage.setItem(storageKey, JSON.stringify(state)); canSave = true; } catch { canSave = false; }
      render();
    });
  });
  button.addEventListener('click', () => {
    const next = progress(state).next;
    if (!next) { openPanel('workflows'); document.querySelector('#workflows h2')?.focus({preventScroll:true}); return; }
    steps.forEach(step => { step.open = step.dataset.serverStep === next; });
    const target = steps.find(step => step.dataset.serverStep === next);
    target.querySelector('summary').focus({preventScroll:true});
    target.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  });
  // Restoring progress never marks a step complete or changes any machine settings.
  const next = progress(state).next;
  steps.forEach(step => { step.open = step.dataset.serverStep === next; });
  document.getElementById('serverProgress').hidden = false;
  render();
})();
