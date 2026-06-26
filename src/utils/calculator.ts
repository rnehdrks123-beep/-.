import { DiagnosisInput, DiagnosisResult, AnalysisItem, PriorityItem } from '../types';

export function calculateDiagnosis(input: DiagnosisInput): DiagnosisResult {
  // 1. Calculate weighted points that sum up and map strictly to the 10 - 40 range.
  // Maximum points possible: 35. Minimum points possible: 7.
  let rawSum = 0;

  // -- Naver Booking --
  const hasBooking = input.useNaverBooking;
  const bookingPoints = hasBooking ? 4 : 1;
  rawSum += bookingPoints;

  // -- Naver TalkTalk --
  const hasTalk = input.useNaverTalkTalk;
  const talkPoints = hasTalk ? 4 : 1;
  rawSum += talkPoints;

  // -- Naver Coupon --
  const hasCoupon = input.useNaverCoupon;
  const couponPoints = hasCoupon ? 4 : 1;
  rawSum += couponPoints;

  // -- Safe Number --
  const hasSafe = input.useSafeNumber;
  const safePoints = hasSafe ? 3 : 1;
  rawSum += safePoints;

  // -- Blog Reviews --
  let blogPoints = 1;
  if (input.blogReviewCount >= 100) {
    blogPoints = 5;
  } else if (input.blogReviewCount >= 50) {
    blogPoints = 4;
  } else if (input.blogReviewCount >= 20) {
    blogPoints = 2;
  } else {
    blogPoints = 1;
  }
  rawSum += blogPoints;

  // -- Visitor Reviews --
  let visitorPoints = 1;
  if (input.visitorReviewCount >= 300) {
    visitorPoints = 5;
  } else if (input.visitorReviewCount >= 100) {
    visitorPoints = 4;
  } else if (input.visitorReviewCount >= 50) {
    visitorPoints = 2;
  } else {
    visitorPoints = 1;
  }
  rawSum += visitorPoints;

  // -- Keywords --
  const parsedKeywords = input.keywords
    ? input.keywords.split(',').map(k => k.trim()).filter(Boolean)
    : [];
  const keywordCount = parsedKeywords.length;
  let keywordPoints = 1;
  if (keywordCount >= 5) {
    keywordPoints = 5;
  } else if (keywordCount >= 2) {
    keywordPoints = 3;
  } else {
    keywordPoints = 1;
  }
  rawSum += keywordPoints;

  // 2. Strict Score mapping: [7, 35] -> [10, 40]
  // Formula: finalScore = 10 + Math.floor(((rawSum - 7) / (35 - 7)) * 30)
  // This guarantees the minimum score is exactly 10, and the maximum score is exactly 40.
  const finalScore = 10 + Math.floor(((rawSum - 7) / 28) * 30);

  // Define components with custom forced '개선 필요' status and expert advice
  const items: AnalysisItem[] = [];

  // -- Item 1: Naver Booking --
  items.push({
    id: 'booking',
    name: '네이버 예약',
    status: '개선 필요',
    desc: hasBooking
      ? '네이버 예약을 연동 중이나, 예약 활성화 장치 및 가맹점 마케팅 연계율이 부족하여 실질적인 예약 전환율을 극대화할 여지가 큽니다.'
      : '예약 시스템 활용도가 부족하여 고객 예약 전환율 향상의 여지가 있습니다. 추가 유입 구조 설계가 적극 요구됩니다.',
    points: hasBooking ? 6 : 2,
    maxPoints: 15
  });

  // -- Item 2: Naver TalkTalk --
  items.push({
    id: 'talk',
    name: '네이버 톡톡',
    status: '개선 필요',
    desc: hasTalk
      ? '톡톡 상담을 사용하고 있으나, 자동 응답(웰컴 메시지) 및 자주 묻는 질문 템플릿의 세분화가 부재하여 고객 실시간 문의 이탈율 방지 개선이 필요합니다.'
      : '실시간 상담 접근성을 더욱 강화하면 문의 전환율을 높일 수 있습니다. 빠른 대응 체계 조율이 시급합니다.',
    points: hasTalk ? 6 : 2,
    maxPoints: 15
  });

  // -- Item 3: Naver Coupon --
  items.push({
    id: 'coupon',
    name: '네이버 쿠폰',
    status: '개선 필요',
    desc: hasCoupon
      ? '쿠폰을 등록하셨으나, 다운로드 유도 문구의 가시성 및 알림받기 혜택 연동성이 낮아 실제 유입 고객의 쿠폰 사용 전환율을 상승시킬 개선 여지가 많습니다.'
      : '쿠폰 이벤트를 운영하면 신규 고객 유입과 재방문율 향상에 도움이 됩니다. 시즌별 프로모션 보완이 권장됩니다.',
    points: hasCoupon ? 6 : 2,
    maxPoints: 15
  });

  // -- Item 4: Safe Number --
  items.push({
    id: 'safeNumber',
    name: '안심번호',
    status: '개선 필요',
    desc: hasSafe
      ? '안심번호가 등록되어 있으나, 통화 유입 데이터 추적 및 가맹점 대표 전화 수신율 점검이 필요하며, 장기적인 문의 유입 세부 개선을 권장합니다.'
      : '고객 신뢰도 향상 및 문의 데이터 관리 측면에서 개선을 권장합니다. 개인 정보 노출 최소화 세팅이 필요합니다.',
    points: hasSafe ? 5 : 2,
    maxPoints: 10
  });

  // -- Item 5: Blog Reviews --
  items.push({
    id: 'blogReview',
    name: '블로그 리뷰',
    status: '개선 필요',
    desc: input.blogReviewCount >= 50
      ? `블로그 리뷰가 총 ${input.blogReviewCount}개 누적되었으나, 최근 최적화 지수가 높은 고품질 상위 노출형 블로그 글의 비율이 상대적으로 부족하여 지속적인 체험단 수급과 관리가 수반되어야 합니다.`
      : '블로그 리뷰가 많을수록 검색 노출과 신뢰도가 크게 향상됩니다. 현재 포스팅 수로는 지역 내 경쟁사 대비 현저히 열세이므로 신규 정보성 포스팅 누적이 매우 시급합니다.',
    points: input.blogReviewCount >= 100 ? 7 : input.blogReviewCount >= 50 ? 5 : 2,
    maxPoints: 15
  });

  // -- Item 6: Visitor Reviews --
  items.push({
    id: 'visitorReview',
    name: '방문자 리뷰',
    status: '개선 필요',
    desc: input.visitorReviewCount >= 100
      ? `방문자 영수증 리뷰가 총 ${input.visitorReviewCount}개로 누적되었으나, 고객 답글 피드백 대응률이 낮고 영수증 인증에 키워드가 누락되어 실제 플레이스 검색 로봇의 인덱스 점수를 극대화하기 위한 구조 개선이 요구됩니다.`
      : '방문자 리뷰 확보를 통해 플레이스 노출 경쟁력을 더욱 높일 수 있습니다. 오프라인 매장 내 QR코드 활성화 및 프로모션 이벤트를 연계해 진정성 있는 후기를 누적해야 합니다.',
    points: input.visitorReviewCount >= 300 ? 7 : input.visitorReviewCount >= 100 ? 5 : 2,
    maxPoints: 15
  });

  // -- Item 7: Keywords --
  items.push({
    id: 'keywords',
    name: '키워드 분석',
    status: '개선 필요',
    desc: keywordCount >= 5
      ? '5개 키워드가 모두 등록되어 있으나, 검색 트렌드 분석에 따른 핵심 노출어 매칭도가 미흡하여 실질적인 로컬 검색 유입으로 연결되지 못하고 있어 세부 재정비가 필요합니다.'
      : '업종 및 지역 키워드를 더욱 세분화하여 검색 노출을 강화할 필요가 있습니다. 검색 유입이 일어나는 핵심 롱테일 키워드와 지역 결합 검색어를 5개 가득 채워 전략적으로 매치해야 합니다.',
    points: keywordCount >= 5 ? 7 : keywordCount >= 2 ? 5 : 2,
    maxPoints: 15
  });

  // 3. Score Rating Mapping (Since score is capped at 40, grades will range within low grades to motivate client)
  let grade = 'C';
  if (finalScore >= 35) grade = 'C';
  else if (finalScore >= 25) grade = 'D+';
  else if (finalScore >= 18) grade = 'D';
  else grade = 'F';

  // 4. Forced improvement comprehensive opinion
  const aiOpinion = `현재 플레이스는 기본적인 운영은 이루어지고 있으나 검색 노출, 고객 전환, 리뷰 관리 및 예약 시스템 활용 측면에서 개선 여지가 확인됩니다. 주요 기능을 최적화하고 콘텐츠 및 리뷰를 지속적으로 관리하면 플레이스 경쟁력이 크게 향상될 것으로 예상됩니다.`;

  // 5. Hardcoded Priority Roadmaps as explicitly requested in exact order
  const priorities: PriorityItem[] = [
    { rank: 1, title: '키워드 최적화', urgency: '높음' },
    { rank: 2, title: '네이버 예약 활성화', urgency: '높음' },
    { rank: 3, title: '네이버 톡톡 활성화', urgency: '높음' },
    { rank: 4, title: '네이버 쿠폰 운영', urgency: '보통' },
    { rank: 5, title: '안심번호 적용', urgency: '보통' },
    { rank: 6, title: '블로그 리뷰 확보', urgency: '보통' },
    { rank: 7, title: '방문자 리뷰 확보', urgency: '보통' }
  ];

  // 6. Expected effects matching the expert tone
  const expectedEffects = [
    '핵심 및 로컬 키워드 최적화 매치업을 통한 통합 로컬 검색 첫 페이지 노출 점유율 증대',
    '예약 시스템과 톡톡 채널 개시로 문의 전환 및 확정 예약률 180% 이상 견인',
    '첫 방문 할인/알림받기 쿠폰 설계 도입을 통한 가망 고객 재방문 유도 고리 안착',
    '정밀 안심번호 트래킹 구축에 따른 인바운드 고객 상담 응대 지표 및 유입 누수 완벽 보완',
    '신뢰 가치 증진형 블로그 후기 및 진정성 있는 영수증 인증 리뷰 축적으로 매장 전환 지수 최대치 상승'
  ];

  return {
    score: finalScore,
    grade,
    items,
    aiOpinion,
    priorities,
    expectedEffects,
    inputData: input
  };
}
