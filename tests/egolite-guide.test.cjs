const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
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
test('ego lite is an optional browser, not an extra starter model or agent',()=>{
  const ego=detail('setupEgolite');
  for(const phrase of ['로컬 LLM이나 모델 실행기가 아닙니다','기본 구축 다음','현재 무료 다운로드','MIT 라이선스','API 비용은 별도','OpenCode + Qwen3.8 27B·64K','Space 하나'])assert.ok(ego.includes(phrase),phrase);
  assert.ok(detail('optionalAgentTools').includes('id="setupEgolite"'));
  assert.ok(!/<details[^>]*id="setupEgolite"[^>]*\sopen/.test(html));
  assert.equal((html.match(/data-model-pick=/g)||[]).length,6);
  assert.equal((html.match(/data-server-done=/g)||[]).length,6);
});
test('ego install is sourced, preserves skills and offers a non-destructive probe',()=>{
  const install=detail('egoliteInstall');
  for(const phrase of ['Apple Silicon','Windows x64','Linux는 로드맵','~/.agents/skills/ego-browser','~/.hermes/skills/ego-browser','기존 스킬을 백업','command -v ego-browser','ego-browser skill','로그인·다운로드·게시·개인 파일 접근은 하지 말고'])assert.ok(install.includes(phrase),phrase);
  assert.ok(install.includes('https://lite.ego.app/document/en/docs/hermes-agent'));
  assert.ok(!install.includes('npx skills add'));
  assert.ok(!install.includes('hermes --tui --yolo'));
});
test('ego privacy does not equate task spaces or local files with safe offline processing',()=>{
  const privacy=detail('egolitePrivacy');
  for(const phrase of ['로컬 브라우저 ≠ 모든 데이터가 로컬 처리','보안 샌드박스가 아닙니다','수동 승인','Full access','quarantine','보안 경고를 자동 우회하지','https://www.egolite.ai/privacy'])assert.ok(privacy.includes(phrase),phrase);
});
test('ego versions and published benchmarks are not presented as local execution tests',()=>{
  const verification=detail('egoliteVerification');
  for(const phrase of ['v2.1.0','0.6.0.15','0.6.0.20','HTTP 헤더','설치 파일 실행·서명 검증','headless 브라우저가 아닙니다','30분','M6·Qwen 9B 실측이 아닙니다','실제 제어·M6 성능 시험은 하지 않았습니다'])assert.ok(verification.includes(phrase),phrase);
});
test('ego is reachable from setup, workflows, audit and glossary without a new route',()=>{
  for(const id of ['start','workflows','sources']){
    const section=html.match(new RegExp('<section class="panel" id="'+id+'">([\\s\\S]*?)</section>'));
    assert.ok(section?.[1].includes('data-guide-detail="setupEgolite"'),id);
  }
  assert.ok(navigation.includes("['ego(lite)','에고라이트 · Ego Lite · ego-browser'"));
  assert.equal((html.match(/<button\b[^>]*\bdata-tab=/g)||[]).length,11);
  for(const id of ['egoliteCheckCmd','egoliteReadPrompt'])assert.ok(html.includes('data-copy-command="'+id+'"'));
});
test('copy feedback restores the original label after success and failure',async()=>{
  const vm=require('node:vm');
  const start=navigation.indexOf("  document.querySelectorAll('[data-copy-command]')");
  const end=navigation.indexOf('  const siteNote=',start);
  assert.ok(start>=0&&end>start);
  for(const fails of [false,true]){
    let click,restore,copied;
    const button={textContent:'시험 요청 복사',dataset:{copyCommand:'test'},addEventListener:(_,fn)=>{click=fn;}};
    vm.runInNewContext(navigation.slice(start,end),{
      document:{querySelectorAll:()=>[button],getElementById:()=>({textContent:'read only'})},
      navigator:{clipboard:{writeText:async value=>{if(fails)throw Error('denied');copied=value;}}},
      setTimeout:fn=>{restore=fn;return 1;},clearTimeout:()=>{}
    });
    await click();
    assert.equal(button.textContent,fails?'직접 선택해 복사':'복사됨');
    if(!fails)assert.equal(copied,'read only');
    await click();
    restore();
    assert.equal(button.textContent,'시험 요청 복사');
  }
});
