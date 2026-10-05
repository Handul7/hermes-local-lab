const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const {normalize, progress, keys, storageKey} = require('../lab-server.js');
const html = read('index.html');

test('new visits start with server setup, while old panel URLs remain available', () => {
  assert.match(read('lab-navigation.js'), /pages:\[\['start','AI 서버 초기 설정'\]/);
  assert.match(html, /openPanel\(location.hash.slice\(1\)\|\|'start'/);
  assert.match(read('lab-navigation.js'), /home.href='#start'/);
  for (const id of ['plan','models','macbook','remote','dictation','architecture']) assert.ok(html.includes('id="'+id+'"'));
});
test('six ordered steps have a manual completion control and a pass criterion', () => {
  assert.deepEqual([...html.matchAll(/data-server-step="(.*?)"/g)].map(m=>m[1]), keys);
  assert.deepEqual([...html.matchAll(/data-server-done="(.*?)"/g)].map(m=>m[1]), keys);
  assert.equal((html.match(/class="server-pass"/g)||[]).length,6);
  assert.equal((html.match(/class="server-check" hidden/g)||[]).length,6);
});
test('normalization trusts only explicit booleans on known steps', () => {
  assert.equal(progress(normalize(null)).done,0);
  assert.equal(progress(normalize({device:'yes',power:1,model:true,unknown:true})).done,1);
  assert.equal(progress(normalize({device:true})).next,'power');
  assert.equal(progress(normalize(Object.fromEntries(keys.map(k=>[k,true])))).next,null);
});
function mount(saved, blocked=false) {
  let written=null, route=null, focus=null;
  const elements={};
  for (const id of ['serverContinue','serverProgressText','serverProgressBar','serverSaveHint','serverProgress']) elements[id]={hidden:true,events:{},addEventListener(t,f){this.events[t]=f;}};
  const steps=keys.map(key=>({dataset:{serverStep:key},open:false,status:{},summary:{focus(){focus=key;}},querySelector(q){return q==='summary'?this.summary:this.status;},scrollIntoView(){}}));
  const checks=keys.map(key=>({dataset:{serverDone:key},checked:false,label:{hidden:true},events:{},closest(){return this.label;},addEventListener(t,f){this.events[t]=f;}}));
  const host={querySelectorAll(q){return q==='[data-server-step]'?steps:checks;}};
  const context={document:{getElementById(id){return id==='start'?host:elements[id];},querySelector(){return {focus(){}};}},
    localStorage:{getItem(){if(blocked)throw Error('blocked');return saved;},setItem(k,v){assert.equal(k,storageKey);if(blocked)throw Error('blocked');written=v;}},
    matchMedia:()=>({matches:true}),openPanel:id=>{route=id;}};
  vm.runInNewContext(read('lab-server.js'),context);
  return {elements,steps,checks,get written(){return written;},get route(){return route;},get focus(){return focus;}};
}
test('interactive guide restores, checks, unchecks and advances without auto-completion', () => {
  const page=mount(JSON.stringify({device:true}));
  assert.equal(page.steps[1].open,true);
  assert.equal(page.elements.serverProgressBar.value,1);
  assert.equal(page.elements.serverProgress.hidden,false);
  assert.ok(page.checks.every(c=>c.label.hidden===false));
  page.checks[1].checked=true;page.checks[1].events.change();
  assert.equal(JSON.parse(page.written).power,true);
  page.elements.serverContinue.events.click();assert.equal(page.focus,'model');
  assert.equal(page.elements.serverProgressBar.value,2);
  page.checks[0].checked=false;page.checks[0].events.change();
  page.elements.serverContinue.events.click();assert.equal(page.focus,'device');
});
test('completed guide continues to practical use',()=>{
  const page=mount(JSON.stringify(Object.fromEntries(keys.map(k=>[k,true]))));
  assert.equal(page.elements.serverProgressBar.value,6);
  page.elements.serverContinue.events.click();assert.equal(page.route,'workflows');
});
test('unavailable storage and corrupt data do not break reading or checking',()=>{
  for(const [saved,blocked] of [['{invalid',false],[null,true]]){
    const page=mount(saved,blocked);
    assert.equal(page.elements.serverProgressBar.value,0);
    assert.match(page.elements.serverSaveHint.textContent,/저장하지 못/);
    page.checks[0].checked=true;page.checks[0].events.change();
    assert.equal(page.elements.serverProgressBar.value,1);
  }
});
test('installation boundaries and recovery caveats are explicit',()=>{
  for(const phrase of ['수동 승인','지우기 안내','전체 디스크 접근','11434 포트를 공인 인터넷에 공개하지','완전 무인 재부팅','로그인 전','프롬프트의 금지 문장은 보안 격리가 아닙니다','실제 설치 상태를 자동 감지하지']) assert.ok(html.includes(phrase),phrase);
  assert.match(html,/ollama launch hermes/);
  assert.match(html,/OpenClaw의 Ollama 제공자에는 \/v1을 붙이지/);
  for(const id of ['optionalAgentTools','setupOpenClaw','setupPaseo','setupOrca','setupDots']) assert.ok(html.includes('id="'+id+'"'));
  assert.match(html,/Hermes Agent\(ACP\)/);
  assert.match(html,/Manual/);
});
test('all copy controls and detail shortcuts resolve; local assets exist',()=>{
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length);
  for(const m of html.matchAll(/data-copy-command="([^"]+)"/g)) assert.ok(ids.includes(m[1]),m[1]);
  for(const m of html.matchAll(/(?:src|href)="(lab-[^"?]+)(?:\?[^" ]*)?"/g)) assert.ok(fs.existsSync(path.join(root,m[1])),m[1]);
  for(const source of [html,read('lab-navigation.js')]) for(const m of source.matchAll(/href="#([^"]+)" data-guide-detail="([^"]+)"/g)) {
    const panel=html.match(new RegExp('<section class="panel" id="'+m[1]+'">([\\s\\S]*?)</section>'));
    assert.ok(panel&&panel[1].includes('id="'+m[2]+'"'),m[2]);
  }
});
test('scripts parse; mobile sizing, hidden controls and reduced motion supported',()=>{
  for(const name of ['lab-server.js','lab-navigation.js','lab-planner.js']) new vm.Script(read(name));
  for(const m of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) if(m[1].trim()) new vm.Script(m[1]);
  assert.match(read('lab-server.css'),/@media\(max-width:740px\)/);
  assert.match(read('lab-server.css'),/\[hidden\]\{display:none!important\}/);
  assert.match(read('lab-server.js'),/prefers-reduced-motion/);
  assert.doesNotMatch(read('lab-server.js'),/fetch\(|XMLHttpRequest|exec\(/);
});
