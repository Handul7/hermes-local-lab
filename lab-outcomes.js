/* Illustrative workflows, not model output or measured productivity claims. */
(() => {
  const cases = [
    {id:'writing',label:'문서·메일',benefit:'초안 작성 줄이기',priority:'먼저 추천',title:'빈 문서 대신, 고칠 초안부터.',
      brief:'반복 보고·메일의 구조를 잡는 수고를 줄일 수 있습니다.',burden:'낮음 · 실행기와 모델 하나',caution:'이름·숫자·날짜는 원문 대조. 발송은 직접 승인하세요.',
      input:'흩어진 메모·짧은 한글 문서',output:'핵심 3줄 + 할 일 목록 + 메일 초안',
      stack:'Qwen3.5 9B 하나부터. 한국어 문체는 A.X·Kanana와 비교하고, 문서 이미지 이해는 Gemma를 대안으로 시험합니다.',
      effect:'반복해서 읽고 문장 구조를 잡는 일을 줄일 여지가 있습니다. 매주 비슷한 보고·메일을 쓴다면 체감하기 쉬운 후보입니다.',
      effort:'낮음 · 실행기와 모델 하나. 처음에는 문서를 직접 넣고 결과를 복사하는 것만으로 충분합니다.',
      check:'이름·숫자·날짜·원문에 없는 주장. 중요한 문서는 원문을 직접 읽고, 메일 발송은 내가 승인합니다.',
      comparison:'문장 한두 개라면 직접 쓰는 편이 간단합니다. 클라우드 AI와는 같은 문서의 수정량을 비교하세요. 로컬이라는 이유만으로 한국어 품질이 더 좋지는 않습니다.',
      success:'다시 쓴 문장 수와 검토까지 걸린 시간',source:'Qwen 공식 모델 카드',url:'https://huggingface.co/Qwen/Qwen3.5-9B',guide:'models',guideLabel:'추천 모델 비교'},
    {id:'meeting',label:'녹음·회의록',benefit:'다시 듣고 타이핑 줄이기',priority:'녹음이 있다면 우선',title:'녹음을, 다시 찾을 수 있는 기록으로.',
      brief:'다시 들으며 받아 적는 일을 줄이고 기록을 검색할 수 있습니다.',burden:'중간 · 전사 도구 + 요약 모델',caution:'녹음 동의를 확인하고, 결정사항·이름은 직접 검토하세요.',
      input:'동의를 받은 회의 녹음·음성 메모',output:'전사문 → 결정사항 + 담당자·기한 초안',
      stack:'Whisper large-v3-turbo로 파일 전사 → Qwen 또는 A.X로 요약. 짧은 말로 입력은 Handy, 긴 녹음은 파일 전사 도구를 사용합니다.',
      effect:'녹음 전체를 반복 재생하며 받아 적는 일을 줄일 수 있습니다. 다만 잡음·동시 발화가 많으면 교정 부담이 커집니다.',
      effort:'중간 · 전사 도구와 LLM을 각각 준비. 32GB에서는 전사를 마친 뒤 요약하는 순서부터 시작합니다.',
      check:'고유명사·금액·실제로 합의한 내용. 원문에 없는 담당자와 기한은 만들지 않고, 녹음 동의와 보관 범위도 확인합니다.',
      comparison:'짧은 메모는 직접 정리하는 편이 빠를 수 있습니다. 로컬은 클라우드 전사로 원본을 보내지 않는 구성이 가능하지만, 화자 구분·공유·자동 요약은 별도 기능입니다.',
      success:'전사 오타·결정사항 누락과 교정 시간',source:'Whisper 기능·한계',url:'https://huggingface.co/openai/whisper-large-v3-turbo',guide:'dictation',guideLabel:'받아쓰기·전사 도구'},
    {id:'knowledge',label:'내 자료 검색',benefit:'찾던 문서 다시 찾기',priority:'자료가 쌓이면',title:'어느 파일이었지? 대신, 근거 문단까지.',
      brief:'파일명을 몰라도 관련 문단과 원본을 찾는 데 도움을 줍니다.',burden:'높음 · 문서 색인·검색 연결 필요',caution:'답변의 출처를 확인하세요. 임베딩 설치만으로 완성되지 않습니다.',
      input:'설명서·보증서·내 메모 등 텍스트 문서',output:'관련 문단 + 원본 위치 + 근거 기반 답변',
      stack:'Qwen3-Embedding 0.6B + 검색·색인 도구 + 주력 LLM. 문서 20개로 먼저 시험하고, 스캔 문서는 별도 문자 추출이 필요합니다.',
      effect:'파일명을 몰라도 의미가 비슷한 자료를 찾는 데 도움이 될 수 있습니다. 같은 자료를 반복해서 찾을 때 초기 정리 비용을 회수하기 쉽습니다.',
      effort:'높음 · 문서 추출·색인·검색 연결과 갱신이 필요. 임베딩 모델만 설치해서는 문서 비서가 완성되지 않습니다.',
      check:'실제로 답을 뒷받침하는 원문인지, 오래된 버전인지. 근거가 없으면 모른다고 답하게 하고 검색에서 놓친 문서도 점검합니다.',
      comparison:'파일이 적고 이름이 명확하면 Finder 검색이 간단합니다. 로컬 검색은 내 자료를 내 저장소에서 다루기 위한 선택이지, 클라우드 문서검색보다 정확하다는 보장은 아닙니다.',
      success:'정답 문서를 찾은 질문 수와 잘못된 출처 수',source:'Qwen 임베딩 공식 용도',url:'https://huggingface.co/Qwen/Qwen3-Embedding-0.6B',guide:'models',guideLabel:'문서검색 모델 비교'},
    {id:'coding',label:'코딩 보조',benefit:'작은 수정부터 검토하기',priority:'테스트할 수 있을 때',title:'로그를 읽고, 작은 수정안을 받기.',
      brief:'오류 설명과 작은 수정·반복 코드의 첫 초안을 보조합니다.',burden:'중간~높음 · 테스트·권한 관리',caution:'변경 내용과 테스트를 검토하고, 삭제·설치를 자동 승인하지 마세요.',
      input:'오류 로그 + 관련 함수·작은 스크립트',output:'원인 후보 + 수정 초안 + 테스트 제안',
      stack:'Qwen 또는 gpt-oss 20B + 기존 Hermes. gpt-oss는 다른 생성 모델을 내리고 시험합니다. 도구 사용은 별도 검증이 필요합니다.',
      effect:'로그 설명·반복 코드·작은 자동화의 첫 초안을 만드는 일을 보조합니다. 큰 저장소 전체를 맡기는 것보다 범위를 좁힐수록 검토하기 쉽습니다.',
      effort:'중간~높음 · 테스트 환경·권한·변경 이력 필요. 설명만 받는 것보다 실제 파일을 수정시키는 구성이 어렵습니다.',
      check:'테스트 결과·의존성·보안·변경 diff. 파일 삭제·설치·외부 전송은 자동 승인하지 않고 별도 작업 폴더에서 시작합니다.',
      comparison:'정해진 규칙의 반복 작업은 스크립트가 더 단순합니다. 복잡한 디버깅에서 품질이 부족하면 전문 도구나 클라우드 후보를 비교하되, 유료 경로로 자동 전환하지 않습니다.',
      success:'테스트 통과와 되돌린 수정 건수',source:'gpt-oss 공식 용도',url:'https://huggingface.co/openai/gpt-oss-20b',guide:'architecture',guideLabel:'Hermes 역할 나누기'},
    {id:'creative',label:'콘텐츠 초안',benefit:'글·이미지 시안 모으기',priority:'정기적으로 만들 때',title:'한 가지 아이디어를, 여러 초안으로.',
      brief:'제목·글 구조·배경 시안을 여러 가지 비교할 수 있습니다.',burden:'글은 낮음 · 이미지는 별도 모델',caution:'사실·권리·이미지 결함을 확인하세요. 완성품 자동 발행은 아닙니다.',
      input:'내 메모·기획 의도·이미지 설명',output:'게시글 초안 / 썸네일 배경 이미지 시안',
      stack:'글은 Qwen, 그림은 Draw Things + FLUX.1 schnell. 서로 다른 작업이며 32GB에서는 무거운 모델을 번갈아 실행합니다.',
      effect:'처음부터 완성품을 만들기보다 제목·글 구조·배경 시안을 비교할 때 유용할 수 있습니다. 자동 발행보다 검토함에 모으는 용도로 시작합니다.',
      effort:'글은 낮음, 이미지는 중간 · 이미지 모델 다운로드와 결과 선별 필요. 추가 GPU 구입 없이 작은 시안부터 시험합니다.',
      check:'내용의 사실성·이미지 결함·입출력 권리. 한글 제목은 편집기로 얹고, 브랜드·인물의 일관된 표현은 별도 검토합니다.',
      comparison:'가끔 만드는 자료는 기존 템플릿이 간편합니다. 로컬 이미지 생성도 대기·재시도·편집 시간이 들며, 클라우드 수준의 영상 제작을 대신하는 구성은 아닙니다.',
      success:'실제로 채택한 초안 수와 재작업 시간',source:'FLUX 공식 용도·한계',url:'https://huggingface.co/black-forest-labs/FLUX.1-schnell',guide:'models',guideLabel:'글·이미지 모델 비교'},
    {id:'server',label:'홈서버·정기 보고',benefit:'맥북을 닫아도 이어가기',priority:'기존 Hermes 다음 단계',title:'내가 기다리지 않아도, 집에서 처리.',
      brief:'맥북과 작업을 분리하고, 모인 변경사항부터 검토할 수 있습니다.',burden:'높음 · 예약·복구·알림 관리',caution:'실패·중복 실행과 외부 도구 요금을 점검하세요. 백업에는 AI가 없어도 됩니다.',
      input:'미리 정한 작업 + 수집한 변경사항·상태 로그',output:'작업 결과 파일 + 요약 보고 + 실패 기록',
      stack:'기존 Hermes + 도구 시험을 통과한 주력 LLM. 밖에서는 Tailscale·SSH·tmux로 접속하며, 예약·수집·알림은 각각 연결합니다.',
      effect:'맥북의 작업 세션과 맥미니의 처리를 분리할 수 있습니다. 여러 사이트·로그를 일일이 확인하는 대신 모인 변경사항부터 검토하는 방식입니다.',
      effort:'높음 · 기기 전원·절전·예약·재시작·실패 알림 관리. 멀티에이전트도 하나의 모델을 공유하고 순차 실행부터 시작합니다.',
      check:'최신 정보를 실제로 수집했는지, 작업이 실패하거나 중복 실행되지 않았는지. 외부 알림은 최소한의 정보만 보내고 자동 복구·삭제는 별도 승인합니다.',
      comparison:'백업·파일 공유·정해진 상태 점검은 LLM 없이도 됩니다. 로컬 추론을 써도 GitHub 수집·메신저·원격 접속에는 네트워크가 필요하고 도구별 비용은 별개입니다.',
      success:'완료·실패를 알아챈 비율과 운영에 쓴 시간',source:'Hermes 로컬 운영 안내',url:'https://hermes-agent.nousresearch.com/docs/guides/local-ollama-setup',guide:'remote',guideLabel:'원격 운영 가이드'}
  ];
  window.LocalLabOutcomes = cases;
  const host = document.getElementById('outcomeExplorer');
  if (!host) return;
  const chooser = host.querySelector('.outcome-choices');
  const examples = host.querySelector('.outcome-examples');
  const buttons = [], cards = [];
  const element = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  cases.forEach((item, index) => {
    const button = element('button', '', 'outcome-choice');
    button.type = 'button'; button.dataset.outcome = item.id;
    button.setAttribute('aria-pressed', String(index === 0));
    button.setAttribute('aria-controls', 'outcome-' + item.id);
    button.append(element('strong', item.label), element('span', item.benefit));
    chooser.append(button); buttons.push(button);
    const card = element('article', '', 'outcome-card');
    card.id = 'outcome-' + item.id; card.hidden = index !== 0;
    card.setAttribute('aria-labelledby', card.id + '-title');
    const title = element('h4', item.title); title.id = card.id + '-title';
    card.append(element('p', item.priority, 'outcome-priority'), title);
    const flow = element('div', '', 'outcome-flow');
    [['내가 넣는 것', item.input], ['받을 수 있는 결과', item.output]].forEach(([label, text]) => {
      const step = element('div'); step.append(element('span', label), element('strong', text)); flow.append(step);
    });
    card.append(flow, element('p', '결과물 예시 · 실제 AI 실행 결과가 아닙니다.', 'outcome-caption'));
    const highlights = element('dl', '', 'outcome-facts outcome-highlights');
    [['기대효과', item.brief], ['시작 부담', item.burden]].forEach(([label, text]) => {
      const fact = element('div'); fact.append(element('dt', label), element('dd', text)); highlights.append(fact);
    });
    card.append(highlights, element('p', item.caution, 'outcome-caution'));
    const more = element('details', '', 'outcome-more');
    more.append(element('summary', '필요한 구성·한계·판단 기준 보기'));
    const facts = element('dl', '', 'outcome-facts');
    [['기대효과', item.effect], ['필요한 구성', item.stack], ['시작 부담', item.effort], ['내가 확인할 일', item.check]].forEach(([label, text]) => {
      const fact = element('div'); fact.append(element('dt', label), element('dd', text)); facts.append(fact);
    });
    more.append(facts);
    const tradeoff = element('p', '', 'outcome-tradeoff'); tradeoff.append(element('strong', '다른 방식과 비교'), element('span', item.comparison));
    const measure = element('p', '', 'outcome-measure'); measure.append(element('strong', '첫 주에 볼 지표'), element('span', item.success));
    const links = element('div', '', 'outcome-links');
    const guide = element('a', item.guideLabel + ' →'); guide.href = '#' + item.guide;
    const source = element('a', item.source + ' ↗'); source.href = item.url;
    const recipeIds={writing:'recipeContent',meeting:'recipeVoice',knowledge:'recipeDocs',creative:'recipeContent',server:'recipeWatch'};
    if(recipeIds[item.id]){const recipe=element('a','이 작업의 실행안 →');recipe.href='#workflows';recipe.dataset.guideDetail=recipeIds[item.id];links.append(recipe);}
    links.append(guide); more.append(tradeoff, measure, source); card.append(more, links); examples.append(card); cards.push(card);
    button.addEventListener('click', () => {
      if (button.getAttribute('aria-pressed') === 'true') return;
      buttons.forEach((other, i) => {other.setAttribute('aria-pressed', String(i === index)); cards[i].hidden = i !== index;});
      host.querySelector('#outcomeStatus').textContent = item.label + ' · 기대효과와 주의점을 표시했습니다.';
    });
  });
})();
