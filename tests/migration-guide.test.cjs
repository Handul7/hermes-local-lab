const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const migration=html.slice(html.indexOf('id="migrationDay"'),html.indexOf('id="serverOverview"'));
test('migration separates private recovery backup from non-overwriting profile transfer',()=>{
  for(const text of ['기존 맥북','새 맥미니','mini-work','--keep 0','.env','전체 대화 이력 보존을 보장하지 않으며','state.db','-wal','-shm','기존 맥북에서 중지한 뒤 맥미니 한 곳에서만','현재 브라우저에만 저장'])assert.ok(migration.includes(text),text);
  const commands=[...migration.matchAll(/<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/g)].map(m=>m[1]);
  assert.equal(commands.length,2);
  assert.ok(commands.every(command=>!/(--force|rm\s|hermes import\s|cp\s)/.test(command)));
  assert.ok(commands.includes('hermes backup --keep 0'));
  assert.ok(html.includes('data-guide-detail="migrationDay"'));
});
test('new candidates keep language, license and channel limits visible',()=>{
  const news=html.slice(html.indexOf('id="novemberModels"'),html.indexOf('id="novemberModels"')+5000);
  for(const text of ['LFM3-1.7B','LFM3-Audio-2B','영어만','LFM Open License 1.0','27B·약 18GB','첫날은'])assert.ok(news.includes(text),text);
  assert.ok(html.includes('0.7.4.dev1은 개발판'));
  assert.ok(html.includes('Mac Desktop DMG 번들을 갱신하지 않았습니다'));
  assert.equal((html.match(/data-model-pick=/g)||[]).length,6);
  assert.equal((html.match(/data-server-done=/g)||[]).length,6);
});
