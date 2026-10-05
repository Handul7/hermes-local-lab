const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const html=read('index.html'),navigation=read('lab-navigation.js');
function detail(id){
  const first=new RegExp('<details\\b[^>]*id="'+id+'"[^>]*>').exec(html);
  assert.ok(first,id);let depth=0;
  for(const tag of html.slice(first.index).matchAll(/<details\b[^>]*>|<\/details>/g)){
    depth+=tag[0].startsWith('</')?-1:1;
    if(!depth)return html.slice(first.index,first.index+tag.index+tag[0].length);
  }
  assert.fail('Unclosed details: '+id);
}
test('four navigation groups expose nine everyday destinations and preserve twelve routes',()=>{
  const literal=navigation.match(/const groups = (\[[\s\S]*?\n  \]);/)[1];
  const groups=vm.runInNewContext(literal);
  assert.equal(groups.length,4);
  assert.equal(groups.flatMap(g=>g.pages).length,12);
  assert.equal(groups.flatMap(g=>g.pages.filter(([id])=>!g.auxiliary?.includes(id))).length,9);
  for(const route of ['sources','glossary','macbook'])assert.ok(navigation.includes('href="#'+route+'"'));
});
test('server setup is the single progress checklist; planner keeps its saved-tool state',()=>{
  assert.equal((html.match(/data-server-done=/g)||[]).length,6);
  assert.ok(!html.includes('data-task='));
  assert.ok(!html.includes('localStorage.removeItem'));
  const planner=read('lab-planner.js');
  assert.ok(planner.includes("localStorage.getItem('hermesInteractivePlan')"));
  assert.ok(planner.includes("openPanel('start')"));
  assert.ok(!planner.includes('setup-details'));
});
test('model topic groups preserve all dated deep-link destinations',()=>{
  const expected={runtimeChoices:['octoberSetupAudit','runtimeUpdate'],modelNews:['imageModelUpdate','geminiTtsUpdate','qwenMediaUpdate','localOnlyCheck'],modelLimits:['largerModelTrial','localWatchlist'],modelArchive:['octoberAudit','frontierUpdate','septemberAudit']};
  for(const [group,children]of Object.entries(expected))for(const id of children)assert.ok(detail(group).includes('id="'+id+'"'),group+' / '+id);
});
test('historical reviews are folded, while current cases and workflow adoption stay separate',()=>{
  const archive=detail('reviewArchive');
  for(const id of ['reviewJocoding','reviewSeoulian','reviewAi','reviewMeasurements','septemberCommunity','agentBenchmark'])assert.ok(archive.includes('id="'+id+'"'));
  assert.ok(!archive.includes('octoberFieldNotes'));
  assert.ok(!archive.includes('review-adoption'));
  assert.ok(detail('researchWorkflow').includes('review-adoption'));
  assert.ok(!/<details[^>]*id="reviewArchive"[^>]*\sopen/.test(html));
});
test('search includes escaped text previews and can open nested results',()=>{
  assert.ok(navigation.includes('excerpt.textContent=m.excerpt'));
  assert.ok(navigation.includes('detail=detail.parentElement.closest(\'details\')'));
  assert.ok(navigation.includes(":scope > details[id] > summary"));
  assert.ok(navigation.includes("b.type='button'"));
});
