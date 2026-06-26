export interface DiagnosisInput {
  companyName: string;
  targetRegion: string;
  category: string;
  keywords: string;
  useNaverBooking: boolean;
  useNaverTalkTalk: boolean;
  useNaverCoupon: boolean;
  useSafeNumber: boolean;
  blogReviewCount: number;
  visitorReviewCount: number;
  rating?: string;
  additionalMemo: string;
}

export interface AnalysisItem {
  id: string;
  name: string;
  status: '양호' | '보통' | '개선 필요';
  desc: string;
  points: number;
  maxPoints: number;
}

export interface PriorityItem {
  rank: number;
  title: string;
  urgency: '높음' | '보통' | '낮음';
}

export interface DiagnosisResult {
  score: number;
  grade: string;
  items: AnalysisItem[];
  aiOpinion: string;
  priorities: PriorityItem[];
  expectedEffects: string[];
  inputData: DiagnosisInput;
}
