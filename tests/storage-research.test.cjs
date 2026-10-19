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
  for (const phrase of ['USB를 두 컴퓨터에 동시에 연결하는 방식은 아닙니다', 'APFS로 포맷해도 Windows에서 SMB로 접근', 'Windows 전체 시스템 복구 이미지가 아닙니다', 'RAID는 백업이 아닙니다', '복사하세요', '에이전트에는 백업 삭제 권한을 주지 않고']) assert.ok(storage.includes(phrase), phrase);
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

test('owned storage and conditional alternatives preserve capacity and backup gaps', () => {
  const storage = panel('storage');
  const readme = fs.readFileSync(path.join(__dirname, '..', 'README.md'), 'utf8');
  for (const doc of [storage, readme]) {
    for (const phrase of ['512GB', '1TB·2TB', '3TB·4TB', '디스크 이동과 외장 장치 구매는 미확정', '실기기 검증', '초기화·데이터 이동']) assert.ok(doc.includes(phrase), phrase);
    assert.doesNotMatch(doc, /HDD A는 Mac Time Machine|HDD B는 Windows 파일 이력/);
  }
  for (const phrase of ['추가 비용 0원', 'Windows NVMe 3TB·HDD 4TB', 'Windows HDD는 0TB', 'Windows NVMe는 2TB', '옮기면 1TB만', 'Time Machine 백업은 미해결', '일반 Windows SMB 공유는 Time Machine 지원 대상으로 간주하지 않습니다', 'SATA DAS에 NVMe를 직접 꽂을 수 없습니다', 'PC 가동이 필요', '같은 물리 디스크의 다른 파티션', '파일 복원', '문서 검증']) assert.ok(storage.includes(phrase), phrase);
});
