const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const html=read('index.html'),navigation=read('lab-navigation.js');
function detail(id){
  const start=new RegExp('<details\\b[^>]*id="'+id+'"[^>]*>').exec(html);
  assert.ok(start,id);let depth=0;
  for(const tag of html.slice(start.index).matchAll(/<details\b[^>]*>|<\/details>/g)){
    depth+=tag[0].startsWith('</')?-1:1;
    if(!depth)return html.slice(start.index,start.index+tag.index+tag[0].length);
  }
  assert.fail('Unclosed details: '+id);
}
test('install-day guide keeps one free model and makes latest checks time-bounded',()=>{
  assert.ok(html.includes('10/25 설치 준비'));
  assert.ok(html.includes('2026-10-23'));
  const runtime=detail('runtimeUpdate');
  for(const phrase of ['10/25 설치 당일','hermes update','23GB','32GB 첫 서버에서는 보류'])assert.ok(runtime.includes(phrase),phrase);
  assert.equal((html.match(/data-server-done=/g)||[]).length,6);
  assert.equal((html.match(/data-model-pick=/g)||[]).length,6);
});
test('Hermes local alternative is stable-channel aware and avoids duplicate servers',()=>{
  const local=detail('hermesLocalAlternative');
  for(const phrase of ['모든 릴리스 채널','Settings → Providers → Local Models','시작·종료','중복 다운로드·실행','Ollama'])assert.ok(local.includes(phrase),phrase);
  assert.ok(!html.includes('현재 canary 또는'));
  assert.ok(html.includes('data-guide-detail="hermesLocalAlternative"'));
});
test('OpenClaw has exact patched Node floors and no assumed Mac DMG',()=>{
  const claw=detail('setupOpenClaw');
  for(const phrase of ['v2026.10.6','10/22','24.22.1','26.12.1','node --version','Mac DMG 첨부가 확인되지 않아','/v1을 붙이지 않습니다'])assert.ok(claw.includes(phrase),phrase);
  assert.ok(claw.includes('https://docs.openclaw.ai/install'));
});
test('audit distinguishes fresh verification from historical research',()=>{
  const audit=detail('currentAudit');
  for(const phrase of ['2026.10.23','10/21 수집 기록 유지','10/21 조사 유지','이번에 재견적하지 않음'])assert.ok(audit.includes(phrase),phrase);
  assert.ok(navigation.includes('currentScope.cloneNode(true)'));
  assert.ok(navigation.includes('2026.10.21:'));
});
test('table enhancement preserves explicit row headers for screen readers',()=>{
  const line=navigation.split('\n').find(line=>line.includes("querySelectorAll('th')"));
  assert.ok(line);
  const cells=[{scope:'row'},{scope:'col'},{scope:''}].map(cell=>({...cell,hasAttribute(name){return name==='scope'&&Boolean(this.scope)}}));
  vm.runInNewContext(line,{document:{querySelectorAll:selector=>{assert.equal(selector,'th');return cells}}});
  assert.deepEqual(cells.map(cell=>cell.scope),['row','col','col']);
});
