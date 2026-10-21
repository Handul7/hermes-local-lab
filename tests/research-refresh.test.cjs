const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const html=read('index.html'),navigation=read('lab-navigation.js'),models=read('lab-models.js');
function detail(id){
  const match=new RegExp('<details\\b[^>]*id="'+id+'"[^>]*>').exec(html);
  assert.ok(match,id);let depth=0;
  for(const tag of html.slice(match.index).matchAll(/<details\b[^>]*>|<\/details>/g)){
    depth+=tag[0].startsWith('</')?-1:1;
    if(!depth)return html.slice(match.index,match.index+tag.index+tag[0].length);
  }
  assert.fail('Unclosed details: '+id);
}
test('current runtime advice is dated, sourced, stable-only and memory-qualified',()=>{
  const runtime=detail('runtimeUpdate');
  for(const version of ['0.40.6','0.22.2','0.7.1','0.4.26','1.1.8'])assert.ok(runtime.includes(version),version);
  for(const phrase of ['2026.10.21','GGUF','모든 GGUF가 되는 것은 아닙니다','메모리 보호','백업','localhost:11434/v1','localhost:8000/v1'])assert.ok(runtime.includes(phrase),phrase);
  assert.ok(detail('octoberSetupAudit').includes('이전 기록'));
  assert.ok(detail('localWatchlist').includes('36GB'));
  assert.ok(navigation.includes('자료 점검 2026.10.21'));
});
test('Qwen download sizes agree across comparison and interactive installer',()=>{
  const sizing='7.6GB(MLX) / 6.6GB(GGUF Q4_K_M)';
  assert.ok(html.includes(sizing));assert.ok(models.includes(sizing));
  assert.ok(models.includes('ollama run qwen3.5:9b'));
  assert.equal((html.match(/data-model-pick=/g)||[]).length,6);
});
test('new research distinguishes public measurements, self-reports and inaccessible evidence',()=>{
  const recent=detail('recentFieldNotes');
  for(const phrase of ['HDZucht/Mac-Mini-M6-LLM-benchmarks','독일어·영어','작은 표본','설명·챕터만 확인','자막 전문은 확보하지 못했습니다','64GB','성공 사례가 아닙니다','X·Threads','제휴 링크'])assert.ok(recent.includes(phrase),phrase);
  assert.ok(!detail('reviewArchive').includes('recentFieldNotes'));
  assert.ok(!/<details[^>]*id="octoberFieldNotes"[^>]*\sopen/.test(html));
});
test('local decision models do not imply authorization or free cloud inference',()=>{
  const decisions=detail('localDecisionModels');
  for(const phrase of ['Clef Flash 9B','Apache 2.0','32GB','한국어','승인','Tev1','confidence'])assert.ok(decisions.includes(phrase),phrase);
  assert.ok(html.includes('jev-latest → 1.13.0'));
  assert.ok(html.includes('jev-preview → 1.14.0'));
  assert.ok(html.includes('서버'));
  assert.ok(navigation.includes("['Clef Flash'"));
  assert.ok(navigation.includes("['TTFT'"));
});
test('full audit keeps hardware, historical prices and unmeasured claims explicit',()=>{
  const audit=detail('currentAudit');
  assert.equal((audit.match(/scope="row"/g)||[]).length,8);
  for(const phrase of ['10/5 당시','이번에 재견적하지 않음','실용성은 미검증','9개','X·Threads'])assert.ok(audit.includes(phrase),phrase);
  assert.ok(detail('activeStorage').includes('Thunderbolt 4'));
  assert.ok(detail('activeStorage').includes('2.5GbE'));
});
