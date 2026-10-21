const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const navigation=fs.readFileSync(path.join(__dirname,'..','lab-navigation.js'),'utf8');
function detail(id){
  const start=new RegExp('<details\\b[^>]*id="'+id+'"[^>]*>').exec(html);
  assert.ok(start,id);let depth=0;
  for(const tag of html.slice(start.index).matchAll(/<details\b[^>]*>|<\/details>/g)){
    depth+=tag[0].startsWith('</')?-1:1;
    if(!depth)return html.slice(start.index,start.index+tag.index+tag[0].length);
  }
  assert.fail('Unclosed details: '+id);
}
test('social research has dated originals, primary verification and no benchmark claim',()=>{
  const social=detail('socialFieldNotes');
  assert.equal((social.match(/<article>/g)||[]).length,4);
  for(const phrase of ['10/20–21','실행·성능을 측정한 후기가 아닙니다','설치 목록에 자동 추가하지 않았습니다','발표·소개 글과 내 활용 제안'])assert.ok(social.includes(phrase),phrase);
  for(const url of ['x.com/Krafton_AI/status/2112772568776339709','x.com/Prince_Canuma/status/2112594486597763195','www.threads.com/@manmansa_01/post/Dev1O_YH8Uv','www.threads.com/@luke78511/post/Dev0_NiDQbv'])assert.ok(social.includes(url),url);
  assert.ok(!html.includes('X·Threads 최근 원문 확보 부족'));
  assert.ok(!navigation.includes('X·Threads의 새 근거는 충분히 확인하지 못해'));
});
test('Raon stays a gated preview trial, not a 4B-memory guaranteed starter',()=>{
  const raon=detail('socialRaon');
  for(const phrase of ['28.8B / 활성 4.3B','17.5GB','최대 RAM이 아닙니다','32GB 단독 시험 후보','Apache 2.0','접근 조건','trust_remote_code','샌드박스는 아닙니다','동시 요청 1개','실제 도구 성공 여부는 별도 확인'])assert.ok(raon.includes(phrase),phrase);
  assert.equal((html.match(/data-model-pick=/g)||[]).length,6);
});
test('Phonon is not presented as Korean TTS or uniformly commercially free',()=>{
  const phonon=detail('socialPhonon');
  for(const phrase of ['영어 전용','64.5MB','Apache 2.0','CC BY-NC 4.0','한국어 가중치 공개가 아닙니다','v0.4.0','Qwen3-TTS'])assert.ok(phonon.includes(phrase),phrase);
  assert.ok(detail('geminiTtsUpdate').includes('한국어가 없습니다'));
});
test('optional agents retain cost, access and memory boundaries',()=>{
  const omp=detail('socialOmp'),perplexity=detail('socialPerplexity');
  for(const phrase of ['코딩','MIT','Ollama','클라우드 모델의 요금은 별도','테스트 저장소','MCP','접근 권한 격리가 아닙니다'])assert.ok(omp.includes(phrase),phrase);
  for(const phrase of ['구독','36GB 이상 권장','설치 불가','Fully local','Hybrid Compute','클라우드로 작업을 넘길','메시지 전송 권한'])assert.ok(perplexity.includes(phrase),phrase);
});
test('new information is linked without extra top-level routes or duplicate guides',()=>{
  for(const id of ['socialFieldNotes','socialRaon','socialPhonon','socialOmp','socialPerplexity']){
    assert.equal((html.match(new RegExp('id="'+id+'"','g'))||[]).length,1);
    assert.ok(html.includes('data-guide-detail="'+id+'"'));
  }
  assert.ok(!/<details[^>]*id="recentFieldNotes"[^>]*\sopen/.test(html));
  assert.equal((html.match(/<button\b[^>]*\bdata-tab=/g)||[]).length,11);
});
