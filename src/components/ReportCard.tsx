import React, { useState, useEffect } from 'react';
import { DiagnosisResult } from '../types';
import { downloadDiagnosisPNG } from '../utils/canvasRenderer';
import { 
  FileDown, 
  Image, 
  Sparkles, 
  CheckCircle2, 
  Calendar,
  MessageSquare,
  Gift,
  Phone,
  BookOpen,
  Users,
  Tag,
  Info
} from 'lucide-react';

interface ReportCardProps {
  result: DiagnosisResult | null;
}

export const ReportCard: React.FC<ReportCardProps> = ({ result }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  // Score count-up timer when a new result comes in
  useEffect(() => {
    if (!result) return;
    setAnimatedScore(0);
    let start = 0;
    const end = result.score;
    if (end === 0) return;
    
    const duration = 800; // 0.8s
    const increment = Math.max(1, Math.floor(end / 40));
    const stepTime = duration / (end / increment);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedScore(end);
        clearInterval(timer);
      } else {
        setAnimatedScore(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [result]);

  if (!result) {
    return (
      <div className="bg-[#FFFFFF] border border-slate-100 rounded-[24px] p-12 text-center h-full flex flex-col items-center justify-center space-y-6 shadow-sm animate-slide-up-fade">
        <div className="w-16 h-16 rounded-[18px] bg-blue-50 text-[#2563EB] flex items-center justify-center shadow-inner">
          <Sparkles className="w-8 h-8 text-[#2563EB] animate-pulse" />
        </div>
        <div className="max-w-md space-y-2">
          <h3 className="text-[20px] font-bold text-slate-900 tracking-tight">플레이스 AI 정밀 진단 준비 완료</h3>
          <p className="text-slate-500 text-[15px] leading-[1.6]">
            좌측 입력창에 업체 세부 정보를 입력하고 <b className="text-[#2563EB] font-bold">[AI 진단 시작]</b> 버튼을 탭하면, 프리미엄 컨설팅 보고서가 즉각 완성됩니다.
          </p>
        </div>
      </div>
    );
  }

  // Get matching icons for items
  const getItemIcon = (id: string) => {
    const cls = "w-5 h-5 text-[#1E3A8A]";
    switch (id) {
      case 'booking': return <Calendar className={cls} />;
      case 'talk': return <MessageSquare className={cls} />;
      case 'coupon': return <Gift className={cls} />;
      case 'safeNumber': return <Phone className={cls} />;
      case 'blogReview': return <BookOpen className={cls} />;
      case 'visitorReview': return <Users className={cls} />;
      case 'keywords': return <Tag className={cls} />;
      default: return <Info className={cls} />;
    }
  };

  // Circular gauge setup
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const handlePDFExport = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-slide-up-fade">
      {/* EXPORT CONTROL PANEL (No Print) */}
      <div className="bg-[#1E3A8A] text-white rounded-[24px] p-6 flex flex-col sm:flex-row items-center justify-between gap-6 no-print shadow-md border border-blue-900/10">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-[18px] bg-[#2563EB]/20 text-blue-300">
            <Sparkles className="w-6 h-6 text-blue-400 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-[16px] text-white">실시간 AI 분석 컨설팅 보고서 완성</h4>
            <p className="text-[13px] text-blue-200">고해상도 이미지 다운로드 또는 인쇄용 PDF 파일로 즉시 저장하세요.</p>
          </div>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={() => downloadDiagnosisPNG(result)}
            className="flex-1 sm:flex-none py-3 px-5 rounded-[14px] bg-[#FFFFFF] hover:bg-slate-50 text-[#1E3A8A] font-bold text-[14px] flex items-center justify-center gap-2 border border-slate-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Image className="w-4 h-4 text-[#2563EB]" />
            PNG 저장
          </button>
          <button
            onClick={handlePDFExport}
            className="flex-1 sm:flex-none py-3 px-5 rounded-[14px] bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-lg shadow-blue-950/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <FileDown className="w-4 h-4" />
            PDF 보고서 저장
          </button>
        </div>
      </div>

      {/* RENDERABLE REPORT PANEL */}
      <div id="report-card" className="print-container bg-white border border-slate-100 rounded-[24px] shadow-sm overflow-hidden p-8 md:p-10 space-y-10 relative">
        
        {/* REPORT HEADER SECTION */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-slate-100">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1E3A8A] tracking-[0.05em] uppercase">
              DY PLACE AI REPORT
            </span>
            <h1 className="text-[34px] md:text-[38px] font-bold text-slate-900 tracking-tight leading-tight">
              네이버 플레이스 AI 진단 리포트
            </h1>
            <p className="text-[15px] text-slate-500 font-medium leading-[1.6]">
              네이버 로컬 지수 극대화 및 가망 고객 이탈 방지용 영업 리스크 특화 진단 보고서
            </p>
          </div>

          {/* CIRCULAR GAUGE COMPONENT */}
          <div className="flex items-center gap-6 bg-slate-50/50 p-5 rounded-[20px] border border-slate-100 self-stretch lg:self-auto justify-center">
            {/* SVG Progress Arc */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="56"
                  cy="56"
                  r={radius}
                  className="stroke-slate-100 fill-transparent"
                  strokeWidth="8"
                />
                {/* Active Arc */}
                <circle
                  cx="56"
                  cy="56"
                  r={radius}
                  className="stroke-[#EF4444] fill-transparent transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              {/* Center Text */}
              <div className="absolute flex flex-col items-center justify-center text-center">
                {/* Score size: 52~64px */}
                <span className="text-[52px] font-bold text-[#1E3A8A] tracking-tighter leading-none">
                  {animatedScore}
                </span>
                <span className="text-[11px] font-semibold text-slate-400 tracking-wider">SCORE</span>
              </div>
            </div>

            {/* Rating Grade Display */}
            <div className="space-y-1.5">
              <span className="text-[12px] text-slate-400 block font-semibold leading-none">종합 평가 등급</span>
              <div className="flex items-baseline gap-2">
                <span className="text-[32px] font-bold text-[#EF4444] leading-none">
                  {result.grade}
                </span>
                <span className="text-rose-500 text-[13px] font-bold leading-none">
                  개선 요망
                </span>
              </div>
              <span className="text-[11px] text-slate-400 block leading-tight">
                (가망 고객 이탈 지표 극대화 분석)
              </span>
            </div>
          </div>
        </div>

        {/* BUSINESS SNAPSHOT DETAILS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-[20px] bg-slate-50/70 border border-slate-100">
          <div className="space-y-1">
            <span className="text-[12px] text-slate-400 font-semibold block">🏢 업체명</span>
            <span className="text-[15px] font-bold text-slate-800">{result.inputData.companyName}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[12px] text-slate-400 font-semibold block">📍 타겟 지역</span>
            <span className="text-[15px] font-bold text-slate-800">{result.inputData.targetRegion || '미정'}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[12px] text-slate-400 font-semibold block">🏷️ 업종분류</span>
            <span className="text-[15px] font-bold text-slate-800">{result.inputData.category}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[12px] text-slate-400 font-semibold block">🔍 키워드 수</span>
            <span className="text-[15px] font-bold text-[#1E3A8A]">
              {result.inputData.keywords ? result.inputData.keywords.split(',').length : 0}개 등록됨
            </span>
          </div>
        </div>

        {/* MAIN ANALYSIS CARDS */}
        <div className="space-y-6">
          <h3 className="text-[20px] md:text-[22px] font-bold text-slate-900 flex items-center gap-2.5">
            <span className="w-1.5 h-5 bg-[#2563EB] rounded-full"></span>
            네이버 플레이스 7대 핵심 부문별 정밀 분석
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {result.items.map(item => {
              return (
                <div key={item.id} className="p-6 rounded-[20px] border border-slate-100 bg-white shadow-sm flex flex-col justify-between gap-4 transition-all hover:shadow-md hover:border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-[14px] bg-slate-50 border border-slate-100 shrink-0">
                      {getItemIcon(item.id)}
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <h4 className="text-[16px] font-bold text-slate-900">{item.name}</h4>
                        <span className="px-2.5 py-0.5 rounded-[6px] text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-100">
                          🔴 개선 필요
                        </span>
                      </div>
                      <p className="text-[14px] text-slate-500 font-medium leading-[1.6]">{item.desc}</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-50 flex justify-between items-center text-[12px] text-slate-400 font-medium">
                    <span>영업 전환 SEO 배점 지표</span>
                    <span className="text-[13px] font-semibold text-[#1E3A8A]">
                      {item.points} / {item.maxPoints}점
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI COMPREHENSIVE OPINION (BOTTOM OPINION CARD) */}
        <div className="p-6 md:p-8 rounded-[24px] bg-[#1E3A8A]/5 border border-[#1E3A8A]/10 space-y-4 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-48 h-48 bg-[#2563EB]/5 rounded-full blur-3xl pointer-events-none"></div>
          <h3 className="text-[16px] font-bold text-[#1E3A8A] flex items-center gap-2 uppercase tracking-wider">
            <Sparkles className="w-5 h-5 text-[#2563EB]" />
            종합 진단 의견
          </h3>
          <p className="text-slate-700 text-[15px] md:text-[16px] font-medium leading-[1.75] whitespace-pre-line">
            {result.aiOpinion}
          </p>
        </div>

        {/* IMPROVEMENT PRIORITIES & EXPECTED EFFECTS Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          
          {/* Left: PRIORITIES */}
          <div className="space-y-5">
            <h4 className="text-[20px] font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-1.5 h-5 bg-rose-500 rounded-full"></span>
              우선 권장 개선 과제
            </h4>
            <div className="border border-slate-100 rounded-[20px] bg-white p-6 space-y-4 shadow-sm">
              {result.priorities.map(p => (
                <div key={p.rank} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#1E3A8A] flex items-center justify-center text-[12px] font-bold text-white shrink-0 mt-0.5">
                    {p.rank}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[15px] text-slate-800 font-bold leading-relaxed">{p.title}</p>
                      <span className="inline-block px-2 py-0.5 rounded-[4px] text-[10px] font-bold leading-none bg-rose-50 text-rose-500">
                        필수 개선
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: EXPECTED EFFECTS */}
          <div className="space-y-5">
            <h4 className="text-[20px] font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-1.5 h-5 bg-emerald-500 rounded-full"></span>
              개선 완료 후 기대 효과
            </h4>
            <div className="border border-slate-100 rounded-[20px] bg-white p-6 space-y-4.5 shadow-sm">
              {result.expectedEffects.map((effect, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-[14px] text-slate-700 font-medium leading-[1.6]">{effect}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* REPORT FOOTER */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[13px] font-medium">
          <div className="uppercase tracking-wider text-slate-500 font-semibold">
            DY PLACE AI ANALYTICS ㆍ PROFESSIONAL DIAGNOSTICS REPORT
          </div>
          <div className="flex items-center gap-2">
            <span>분석 일자: {new Date().toLocaleDateString('ko-KR')}</span>
            <span className="text-slate-300">|</span>
            <span className="text-blue-600 font-bold">컨설턴트 검증됨</span>
          </div>
        </div>

      </div>
    </div>
  );
};
