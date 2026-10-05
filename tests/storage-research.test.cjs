const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const panel = id => html.match(new RegExp('<section class="panel" id="'+id+'">([\\s\\S]*?)</section>'))[1];

test('DAS sleep advice is enclosure-specific and is not conflated with Mac sleep', () => {
  const storage = panel('storage');
  for (const phrase of ['맥미니 잠자기와 별개', '자동 절전 해제 방법은 확인하지 못했습니다', 'DAS 펌웨어 절전까지 끈다고 보장할 수 없습니다', 'NAS도 절전합니다', '꺼내기 경고·볼륨 소실·복사 오류']) assert.ok(storage.includes(phrase), phrase);
});
test('shared storage has one USB host and explicit backup and filesystem boundaries', () => {
  const storage = panel('storage');
  for (const phrase of ['USB를 두 컴퓨터에 동시에 연결하는 방식은 아닙니다', 'APFS로 포맷해도 Windows에서 SMB로 접근', 'HDD A는 Mac Time Machine', 'HDD B는 Windows 파일 이력', 'Windows 전체 시스템 복구 이미지가 아닙니다', 'RAID는 백업이 아닙니다', '복사하세요', '에이전트에는 백업 삭제 권한을 주지 않고']) assert.ok(storage.includes(phrase), phrase);
});
test('budget choices are conditional and active model storage remains separate', () => {
  const storage = panel('storage');
  for (const phrase of ['249,000원', '318,000원', '30만 원 미만 조건에서는 제외', '293,000–316,000원', 'RAM 1GB·1GbE', '519,000원', '581,000원', 'SSD 구입비는 DAS 예산과 별도', '2베이에 HDD 2개를 넣으면 SSD 자리는 없습니다']) assert.ok(storage.includes(phrase), phrase);
  assert.equal((storage.match(/<details class="editorial-detail"/g) || []).length, 4);
});
test('GPU support is linked to the exact card and workloads are qualified', () => {
  const workflows = panel('workflows');
  for (const phrase of ['Sapphire NITRO+ RX 7900 GRE', 'Ollama 공식 Windows·Linux 지원 목록', 'https://docs.ollama.com/gpu', 'https://docs.comfy.org/installation/manual_install', '별도 확인', '실측']) assert.ok(workflows.includes(phrase), phrase);
});
test('research links keep evidence coverage and multiple device generations explicit', () => {
  const reviews = panel('reviews');
  for (const id of ['yoTY2B4YiHw', '_h68btUnHRM', 'n5sY4fXcxkk', '7ugFOo8e8H4']) assert.ok(reviews.includes(id), id);
  for (const phrase of ['octoberFieldNotes', '자동 자막', 'M4', 'M6', 'Threads', 'Reddit']) assert.ok(reviews.includes(phrase), phrase);
});
