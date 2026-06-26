import React from 'react';
import { DiagnosisInput } from '../types';
import { 
  Building2, 
  MapPin, 
  Tag, 
  Calendar, 
  MessageSquare, 
  Gift, 
  Phone, 
  BookOpen, 
  Users, 
  Star, 
  FileText, 
  Sparkles, 
  RotateCcw 
} from 'lucide-react';

interface FormInputProps {
  input: DiagnosisInput;
  setInput: React.Dispatch<React.SetStateAction<DiagnosisInput>>;
  onSubmit: () => void;
  onReset: () => void;
}

export const FormInput: React.FC<FormInputProps> = ({ input, setInput, onSubmit, onReset }) => {
  const handleChange = (field: keyof DiagnosisInput, value: any) => {
    setInput(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleToggle = (field: 'useNaverBooking' | 'useNaverTalkTalk' | 'useNaverCoupon' | 'useSafeNumber') => {
    setInput(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 md:p-8 space-y-8">
      {/* Form Header */}
      <div className="border-b border-slate-100 pb-5">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
          <Sparkles className="w-6 h-6 text-blue-600 animate-pulse" />
          네이버 플레이스 정보 입력
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          현재 등록되어 있는 업체의 세부 설정을 정확히 기입해 주세요.
        </p>
      </div>

      <div className="space-y-6">
        {/* Section 1: 기본 정보 */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            기본 정보 설정
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 업체명 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">업체명 <span className="text-rose-500">*</span></label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="예: 대박 삼겹살 홍대점"
                  value={input.companyName}
                  onChange={e => handleChange('companyName', e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm text-slate-800 transition"
                />
              </div>
            </div>

            {/* 타겟지역 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">타겟지역 <span className="text-rose-500">*</span></label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="예: 마포구 홍대입구역"
                  value={input.targetRegion}
                  onChange={e => handleChange('targetRegion', e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm text-slate-800 transition"
                />
              </div>
            </div>

            {/* 업종 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">업종 <span className="text-rose-500">*</span></label>
              <div className="relative">
                <Tag className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="예: 한식 / 고기집"
                  value={input.category}
                  onChange={e => handleChange('category', e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm text-slate-800 transition"
                />
              </div>
            </div>

            {/* 등록 키워드 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">현재 등록 키워드 (쉼표 구분)</label>
              <div className="relative">
                <Tag className="absolute left-3.5 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="예: 홍대맛집, 삼겹살맛집, 고기집"
                  value={input.keywords}
                  onChange={e => handleChange('keywords', e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm text-slate-800 transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: 플랫폼 연동 여부 */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            핵심 플랫폼 기능 연동 여부
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 네이버 예약 */}
            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between space-y-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${input.useNaverBooking ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">네이버 예약</h4>
                  <p className="text-xs text-slate-400">실시간 유입 확보</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleChange('useNaverBooking', true)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition ${input.useNaverBooking ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-50'}`}
                >
                  사용중
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('useNaverBooking', false)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition ${!input.useNaverBooking ? 'bg-rose-500 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-50'}`}
                >
                  미사용
                </button>
              </div>
            </div>

            {/* 네이버 톡톡 */}
            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between space-y-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${input.useNaverTalkTalk ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">네이버 톡톡</h4>
                  <p className="text-xs text-slate-400">실시간 상담 유입</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleChange('useNaverTalkTalk', true)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition ${input.useNaverTalkTalk ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-50'}`}
                >
                  사용중
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('useNaverTalkTalk', false)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition ${!input.useNaverTalkTalk ? 'bg-rose-500 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-50'}`}
                >
                  미사용
                </button>
              </div>
            </div>

            {/* 네이버 쿠폰 */}
            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between space-y-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${input.useNaverCoupon ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">네이버 쿠폰</h4>
                  <p className="text-xs text-slate-400">신규/재방문 유도</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleChange('useNaverCoupon', true)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition ${input.useNaverCoupon ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-50'}`}
                >
                  사용중
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('useNaverCoupon', false)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition ${!input.useNaverCoupon ? 'bg-rose-500 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-50'}`}
                >
                  미사용
                </button>
              </div>
            </div>

            {/* 안심번호 */}
            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between space-y-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${input.useSafeNumber ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">안심번호</h4>
                  <p className="text-xs text-slate-400">개인정보보호 및 신뢰</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleChange('useSafeNumber', true)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition ${input.useSafeNumber ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-50'}`}
                >
                  사용중
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('useSafeNumber', false)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition ${!input.useSafeNumber ? 'bg-rose-500 text-white shadow-md' : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-50'}`}
                >
                  미사용
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: 평판 지표 (리뷰 수 & 별점) */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            평판 및 신뢰도 지표
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 블로그 리뷰 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                블로그 리뷰 수
              </label>
              <input
                type="number"
                min="0"
                placeholder="예: 42"
                value={input.blogReviewCount === 0 ? '' : input.blogReviewCount}
                onChange={e => handleChange('blogReviewCount', Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm text-slate-800 transition"
              />
            </div>

            {/* 방문자 리뷰 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-500" />
                방문자 리뷰 수
              </label>
              <input
                type="number"
                min="0"
                placeholder="예: 124"
                value={input.visitorReviewCount === 0 ? '' : input.visitorReviewCount}
                onChange={e => handleChange('visitorReviewCount', Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm text-slate-800 transition"
              />
            </div>

            {/* 별점 (선택) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                평점별점 (선택)
              </label>
              <input
                type="text"
                placeholder="예: 4.5"
                value={input.rating || ''}
                onChange={e => handleChange('rating', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm text-slate-800 transition"
              />
            </div>
          </div>
        </div>

        {/* Section 4: 추가 메모 */}
        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
            추가 특이사항 및 메모
          </label>
          <textarea
            rows={3}
            placeholder="예: 주차 상시 가능, 단체 예약석 완비, 리뉴얼한 지 2달 됨 등"
            value={input.additionalMemo}
            onChange={e => handleChange('additionalMemo', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm text-slate-800 transition resize-none"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onReset}
          className="py-3 px-4 rounded-xl border border-slate-200 text-slate-500 font-bold text-sm hover:bg-slate-50 transition duration-200 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          초기화
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="col-span-2 py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-200 hover:shadow-blue-300 transition duration-200 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          AI 진단 시작
        </button>
      </div>
    </div>
  );
};
