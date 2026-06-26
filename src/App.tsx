import { useState } from 'react';
import { DiagnosisInput, DiagnosisResult } from './types';
import { calculateDiagnosis } from './utils/calculator';
import { FormInput } from './components/FormInput';
import { ReportCard } from './components/ReportCard';
import { Sparkles, FileCode, CheckCircle } from 'lucide-react';

const defaultInput: DiagnosisInput = {
  companyName: '대박 삼겹살 홍대점',
  targetRegion: '마포구 홍대입구역',
  category: '한식 / 고기집',
  keywords: '홍대 맛집, 홍대 삼겹살, 신촌 고기집, 홍대입구역 맛집',
  useNaverBooking: true,
  useNaverTalkTalk: false,
  useNaverCoupon: false,
  useSafeNumber: true,
  blogReviewCount: 45,
  visitorReviewCount: 124,
  rating: '4.5',
  additionalMemo: '주차 상시 가능, 단체석 완비, 리뉴얼한 지 얼마 안 됨.'
};

const emptyInput: DiagnosisInput = {
  companyName: '',
  targetRegion: '',
  category: '',
  keywords: '',
  useNaverBooking: false,
  useNaverTalkTalk: false,
  useNaverCoupon: false,
  useSafeNumber: false,
  blogReviewCount: 0,
  visitorReviewCount: 0,
  rating: '',
  additionalMemo: ''
};

export default function App() {
  const [input, setInput] = useState<DiagnosisInput>(defaultInput);
  // Pre-calculate on load for instant high-value premium visual presentation
  const [result, setResult] = useState<DiagnosisResult | null>(calculateDiagnosis(defaultInput));
  const [isCopiedHtml, setIsCopiedHtml] = useState(false);

  const handleDiagnose = () => {
    if (!input.companyName.trim()) {
      alert('업체명을 기입해 주세요!');
      return;
    }
    if (!input.targetRegion.trim()) {
      alert('타겟지역을 기입해 주세요!');
      return;
    }
    if (!input.category.trim()) {
      alert('업종을 기입해 주세요!');
      return;
    }
    const calculation = calculateDiagnosis(input);
    setResult(calculation);
    
    // Smooth scroll to the result on mobile devices
    setTimeout(() => {
      document.getElementById('report-card')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleReset = () => {
    setInput(emptyInput);
    setResult(null);
  };

  // Standalone index.html Generator function to fully satisfy their single-file request
  const handleDownloadStandaloneHTML = () => {
    const ds = "$"; // Smart escape identifier to avoid nested template literal interpolation errors
    const htmlCode = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>네이버 플레이스 AI 진단 리포트 (오프라인/단일파일)</title>
  <style>
    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css');
    @import url('https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/variable/SUIT-Variable.css');

    /* Premium Palette CSS Styling - Apple + Toss style */
    * { 
      box-sizing: border-box; 
      margin: 0; 
      padding: 0; 
    }
    body { 
      background-color: #F8FAFC; 
      color: #0F172A; 
      padding: 40px 20px; 
      font-family: "Pretendard Variable", "Pretendard", "SUIT Variable", "SUIT", "Apple SD Gothic Neo", sans-serif;
      letter-spacing: -0.02em;
      line-height: 1.6;
    }
    .container { 
      max-width: 1280px; 
      margin: 0 auto; 
      display: grid; 
      grid-template-columns: 1fr; 
      gap: 32px; 
    }
    @media (min-width: 1024px) {
      .container { grid-template-columns: 420px 1fr; }
    }
    
    /* Headers & Components */
    .header-banner { 
      background: linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%); 
      color: #FFFFFF; 
      padding: 40px; 
      border-radius: 24px; 
      margin-bottom: 32px; 
      box-shadow: 0 10px 30px -10px rgba(30, 58, 138, 0.15); 
    }
    .header-banner .sup-title {
      font-size: 12px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.85);
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 8px;
      display: block;
    }
    .header-banner h1 { 
      font-size: 34px; 
      font-weight: 700; 
      margin-bottom: 12px; 
      letter-spacing: -0.02em; 
      line-height: 1.2;
    }
    .header-banner p { 
      font-size: 15px; 
      color: rgba(255, 255, 255, 0.7); 
    }
    
    .card { 
      background-color: #FFFFFF; 
      border: 1px solid #F1F5F9; 
      border-radius: 24px; 
      padding: 30px; 
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.02); 
    }
    .card-title { 
      font-size: 20px; 
      font-weight: 700; 
      border-bottom: 1px solid #F1F5F9; 
      padding-bottom: 16px; 
      margin-bottom: 24px; 
      display: flex; 
      align-items: center; 
      gap: 10px; 
      color: #0F172A;
    }
    
    /* Inputs */
    .form-group { margin-bottom: 20px; }
    .form-group label { display: block; font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 8px; }
    .form-control { 
      width: 100%; 
      padding: 12px 16px; 
      border: 1px solid #E2E8F0; 
      border-radius: 12px; 
      font-size: 14.5px; 
      color: #334155; 
      transition: all 0.2s; 
      font-family: inherit;
    }
    .form-control:focus { outline: none; border-color: #2563EB; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
    
    /* Switch Buttons */
    .switch-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 5px; }
    .btn-switch { 
      padding: 10px; 
      border: 1px solid #E2E8F0; 
      border-radius: 10px; 
      font-size: 13px; 
      font-weight: 600; 
      background: #FFFFFF; 
      color: #64748B; 
      cursor: pointer; 
      text-align: center; 
      font-family: inherit;
      transition: all 0.2s;
    }
    .btn-switch.active { background-color: #1E3A8A; color: #FFFFFF; border-color: #1E3A8A; }
    .btn-switch.active-no { background-color: #EF4444; color: #FFFFFF; border-color: #EF4444; }
    
    /* Submit Buttons */
    .btn-submit { 
      display: block; 
      width: 100%; 
      padding: 14px; 
      background-color: #2563EB; 
      color: #FFFFFF; 
      border: none; 
      border-radius: 14px; 
      font-size: 15px; 
      font-weight: 700; 
      cursor: pointer; 
      text-align: center; 
      margin-top: 24px; 
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15); 
      font-family: inherit;
      transition: all 0.2s;
    }
    .btn-submit:hover { background-color: #1D4ED8; transform: translateY(-1px); }
    .btn-reset { 
      display: block; 
      width: 100%; 
      padding: 12px; 
      background-color: transparent; 
      color: #64748B; 
      border: 1px solid #E2E8F0; 
      border-radius: 14px; 
      font-size: 14px; 
      font-weight: 600; 
      cursor: pointer; 
      text-align: center; 
      margin-top: 12px; 
      font-family: inherit;
      transition: all 0.2s;
    }
    .btn-reset:hover { background-color: #F8FAFC; }
    
    /* Gauge and Report Style */
    .report-header { 
      display: flex; 
      flex-direction: column; 
      gap: 24px; 
      border-bottom: 1px solid #F1F5F9; 
      padding-bottom: 24px; 
      margin-bottom: 30px; 
    }
    @media (min-width: 768px) {
      .report-header { flex-direction: row; justify-content: space-between; align-items: center; }
    }
    
    .gauge-wrapper { 
      display: flex; 
      align-items: center; 
      gap: 20px; 
      background: #F8FAFC; 
      padding: 20px; 
      border-radius: 20px; 
      border: 1px solid #F1F5F9; 
    }
    .gauge-ring { position: relative; width: 110px; height: 110px; }
    .gauge-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; }
    .gauge-score { font-size: 52px; font-weight: 700; color: #1E3A8A; line-height: 1; }
    
    .rating-badge { 
      display: inline-block; 
      padding: 4px 10px; 
      background-color: #EF4444; 
      color: #FFFFFF; 
      border-radius: 6px; 
      font-size: 11px; 
      font-weight: 700; 
    }
    .profile-grid { 
      display: grid; 
      grid-template-columns: repeat(2, 1fr); 
      gap: 20px; 
      background-color: #F8FAFC; 
      padding: 20px; 
      border-radius: 20px; 
      margin-bottom: 30px; 
      border: 1px solid #F1F5F9; 
    }
    .profile-item span { display: block; }
    .profile-label { font-size: 12px; font-weight: 600; color: #94A3B8; margin-bottom: 4px; }
    .profile-val { font-size: 15px; font-weight: 700; color: #334155; }
    
    /* Result Grid */
    .result-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 30px; }
    @media (min-width: 640px) {
      .result-grid { grid-template-columns: repeat(2, 1fr); }
    }
    .result-item-card { 
      border: 1px solid #F1F5F9; 
      background: #FFFFFF; 
      padding: 20px; 
      border-radius: 18px; 
      display: flex; 
      flex-direction: column;
      justify-content: space-between; 
      gap: 16px;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.01); 
      transition: all 0.2s;
    }
    .result-item-card:hover {
      border-color: #E2E8F0;
      box-shadow: 0 6px 16px rgba(15, 23, 42, 0.03);
    }
    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
    }
    .badge-status { 
      padding: 3px 10px; 
      border-radius: 6px; 
      font-size: 11px; 
      font-weight: 700; 
      white-space: nowrap;
      border: 1px solid #FEE2E2;
      background: #FEF2F2; 
      color: #EF4444; 
    }
    .card-desc {
      font-size: 14px;
      color: #64748B;
      font-weight: 500;
      line-height: 1.6;
    }
    .card-bottom {
      border-top: 1px solid #F8FAFC;
      padding-top: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #94A3B8;
      font-weight: 500;
    }
    .card-points {
      font-weight: 700;
      color: #1E3A8A;
      font-size: 13px;
    }
    
    /* AI Opinion Block */
    .opinion-box { 
      background: rgba(30, 58, 138, 0.03); 
      border: 1px solid rgba(30, 58, 138, 0.08);
      border-radius: 20px; 
      padding: 24px; 
      font-size: 15px; 
      font-weight: 500; 
      color: #334155; 
      line-height: 1.75; 
      margin-bottom: 30px; 
    }
    .opinion-title { 
      font-size: 12px; 
      font-weight: 700; 
      color: #1E3A8A; 
      text-transform: uppercase; 
      margin-bottom: 8px; 
      letter-spacing: 0.05em;
    }
    
    /* Dual lists */
    .lists-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
    @media (min-width: 768px) {
      .lists-grid { grid-template-columns: repeat(2, 1fr); }
    }
    .list-box {
      border: 1px solid #F1F5F9;
      border-radius: 20px;
      padding: 24px;
      background: #FFFFFF;
    }
    .list-box h4 { 
      font-size: 16px; 
      font-weight: 700; 
      margin-bottom: 16px; 
      color: #0F172A; 
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .list-items { 
      list-style: none;
      font-size: 14px; 
      font-weight: 500; 
      color: #475569; 
    }
    .list-items li { 
      margin-bottom: 12px; 
      line-height: 1.6; 
      position: relative;
      padding-left: 28px;
    }
    .list-items.numbered li::before {
      content: attr(data-rank);
      position: absolute;
      left: 0;
      top: 2px;
      width: 20px;
      height: 20px;
      background: #1E3A8A;
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 700;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .list-items.checked li::before {
      content: "✓";
      position: absolute;
      left: 0;
      top: 2px;
      width: 20px;
      height: 20px;
      background: #ECFDF5;
      color: #10B981;
      font-size: 11px;
      font-weight: 700;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    /* Exports panel */
    .export-panel { 
      background: #1E3A8A; 
      color: #FFFFFF; 
      padding: 20px 24px; 
      border-radius: 24px; 
      display: flex; 
      flex-direction: column;
      gap: 16px;
      justify-content: space-between; 
      align-items: center; 
      margin-bottom: 30px; 
    }
    @media (min-width: 640px) {
      .export-panel { flex-direction: row; }
    }
    .btn-export { 
      padding: 10px 18px; 
      background-color: #2563EB; 
      border: none; 
      border-radius: 12px; 
      color: #FFFFFF; 
      font-size: 13px; 
      font-weight: 700; 
      cursor: pointer; 
      font-family: inherit;
      transition: all 0.2s;
    }
    .btn-export:hover { background-color: #1D4ED8; }
    
    /* Print Layout Styling */
    @media print {
      body { background-color: #FFFFFF !important; padding: 0 !important; }
      .no-print { display: none !important; }
      .report-card-print { border: none !important; box-shadow: none !important; width: 210mm; height: 297mm; padding: 10mm; }
    }
  </style>
</head>
<body>

  <div class="header-banner no-print">
    <span class="sup-title">DY PLACE AI REPORT</span>
    <h1>네이버 플레이스 AI 진단 시스템</h1>
    <p>네이버 로컬 알고리즘 최적화 지수 판독 및 가망 고객 이탈 방지용 프리미엄 진단 리포트</p>
  </div>

  <div class="container">
    <!-- INPUT FORM CARD -->
    <div class="card no-print">
      <div class="card-title">🏢 플레이스 정보 입력</div>
      
      <div class="form-group">
        <label>업체명 *</label>
        <input type="text" id="companyName" class="form-control" value="대박 삼겹살 홍대점">
      </div>

      <div class="form-group">
        <label>타겟지역 *</label>
        <input type="text" id="targetRegion" class="form-control" value="마포구 홍대입구역">
      </div>

      <div class="form-group">
        <label>업종 *</label>
        <input type="text" id="category" class="form-control" value="한식 / 고기집">
      </div>

      <div class="form-group">
        <label>등록 키워드 (쉼표 구분)</label>
        <input type="text" id="keywords" class="form-control" value="홍대 맛집, 홍대 삼겹살, 신촌 고기집, 홍대입구역 맛집">
      </div>

      <div class="form-group">
        <label>네이버 예약</label>
        <div class="switch-grid">
          <button type="button" id="useBooking_yes" class="btn-switch active" onclick="setSwitch('booking', true)">사용중</button>
          <button type="button" id="useBooking_no" class="btn-switch" onclick="setSwitch('booking', false)">미사용</button>
        </div>
      </div>

      <div class="form-group">
        <label>네이버 톡톡</label>
        <div class="switch-grid">
          <button type="button" id="useTalkTalk_yes" class="btn-switch" onclick="setSwitch('talk', true)">사용중</button>
          <button type="button" id="useTalkTalk_no" class="btn-switch active" onclick="setSwitch('talk', false)">미사용</button>
        </div>
      </div>

      <div class="form-group">
        <label>네이버 쿠폰</label>
        <div class="switch-grid">
          <button type="button" id="useCoupon_yes" class="btn-switch" onclick="setSwitch('coupon', true)">사용중</button>
          <button type="button" id="useCoupon_no" class="btn-switch active" onclick="setSwitch('coupon', false)">미사용</button>
        </div>
      </div>

      <div class="form-group">
        <label>안심번호</label>
        <div class="switch-grid">
          <button type="button" id="useSafe_yes" class="btn-switch active" onclick="setSwitch('safe', true)">사용중</button>
          <button type="button" id="useSafe_no" class="btn-switch" onclick="setSwitch('safe', false)">미사용</button>
        </div>
      </div>

      <div class="form-group" style="display:grid; grid-template-columns: repeat(3, 1fr); gap:12px;">
        <div>
          <label>블로그 리뷰 수</label>
          <input type="number" id="blogCount" class="form-control" value="45">
        </div>
        <div>
          <label>방문자 리뷰 수</label>
          <input type="number" id="visitorCount" class="form-control" value="124">
        </div>
        <div>
          <label>평점 별점</label>
          <input type="text" id="ratingVal" class="form-control" value="4.5">
        </div>
      </div>

      <button type="button" class="btn-submit" onclick="runAnalysis()">AI 진단 시작</button>
      <button type="button" class="btn-reset" onclick="resetForm()">초기화</button>
    </div>

    <!-- PREVIEW & DOWNLOAD CARD -->
    <div>
      <div class="export-panel no-print">
        <div style="font-size:14px;">
          <strong>AI 분석 보고서 발행 완료</strong><br>
          <span style="color:rgba(255,255,255,0.7); font-size:12px;">PDF 보고서 저장 기능을 지원합니다.</span>
        </div>
        <div style="display:flex; gap:10px;">
          <button class="btn-export" onclick="window.print()">PDF 보고서 저장</button>
        </div>
      </div>

      <div id="printReport" class="card report-card-print">
        <div class="report-header">
          <div>
            <span class="rating-badge" style="background:#1E3A8A; font-size:10px; margin-bottom:8px; text-transform: uppercase;">DY PLACE AI REPORT</span>
            <h2 style="font-size: 34px; font-weight: 700; color: #0F172A; tracking-tight: -0.02em;">네이버 플레이스 AI 진단 리포트</h2>
            <p style="font-size: 15px; color: #64748B; font-weight:500;">네이버 로컬 지수 극대화 및 가망 고객 이탈 방지용 영업 리스크 특화 진단 보고서</p>
          </div>
          
          <div class="gauge-wrapper">
            <div class="gauge-ring">
              <svg width="110" height="110" style="transform: rotate(-90deg);">
                <circle cx="55" cy="55" r="48" stroke="#F1F5F9" stroke-width="8" fill="transparent"/>
                <circle id="progressArc" cx="55" cy="55" r="48" stroke="#EF4444" stroke-width="8" fill="transparent" stroke-dasharray="301.6" stroke-dashoffset="180" stroke-linecap="round"/>
              </svg>
              <div class="gauge-text">
                <div id="gaugeScoreText" class="gauge-score">29</div>
              </div>
            </div>
            <div>
              <span style="font-size:12px; font-weight:600; color:#94A3B8; block;">종합 평가</span>
              <div id="gradeText" style="font-size:24px; font-weight:700; color:#EF4444;">D+ 등급</div>
            </div>
          </div>
        </div>

        <div class="profile-grid">
          <div class="profile-item"><span class="profile-label">🏢 업체명</span><span id="pCompany" class="profile-val">대박 삼겹살 홍대점</span></div>
          <div class="profile-item"><span class="profile-label">📍 타겟지역</span><span id="pRegion" class="profile-val">마포구 홍대입구역</span></div>
          <div class="profile-item"><span class="profile-label">🏷️ 업종</span><span id="pCategory" class="profile-val">한식 / 고기집</span></div>
          <div class="profile-item"><span class="profile-label">⭐ 평점</span><span id="pRating" class="profile-val">★ 4.5</span></div>
        </div>

        <h3 style="font-size:20px; font-weight:700; margin-bottom:16px; color:#0F172A;">🔴 7대 핵심 부문별 정밀 분석</h3>
        <div id="itemsGrid" class="result-grid">
          <!-- Populated by JS -->
        </div>

        <div class="opinion-box">
          <div class="opinion-title">💬 종합 진단 의견</div>
          <div id="opinionText">
            현재 플레이스는 기본적인 운영은 이루어지고 있으나 검색 노출, 고객 전환, 리뷰 관리 및 예약 시스템 활용 측면에서 개선 여지가 확인됩니다. 주요 기능을 최적화하고 콘텐츠 및 리뷰를 지속적으로 관리하면 플레이스 경쟁력이 크게 향상될 것으로 예상됩니다.
          </div>
        </div>

        <div class="lists-grid">
          <div class="list-box">
            <h4>🚀 우선 권장 개선 과제</h4>
            <ol id="priorityList" class="list-items numbered">
              <!-- Populated by JS -->
            </ol>
          </div>
          <div class="list-box">
            <h4>📈 개선 완료 후 기대 효과</h4>
            <ul id="effectsList" class="list-items checked">
              <!-- Populated by JS -->
            </ul>
          </div>
        </div>

        <div style="margin-top: 40px; border-top: 1px solid #F1F5F9; padding-top: 20px; display:flex; justify-content:space-between; font-size:12px; color:#94A3B8; font-weight:600; text-transform:uppercase;">
          <div>DY PLACE AI ANALYTICS ㆍ PROFESSIONAL DIAGNOSTICS REPORT</div>
          <div id="reportDate">발행일자: 2026. 06. 26</div>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Config state
    let state = {
      booking: true,
      talk: false,
      coupon: false,
      safe: true
    };

    function setSwitch(type, val) {
      state[type] = val;
      const yesBtn = document.getElementById('use' + type.charAt(0).toUpperCase() + type.slice(1) + '_yes');
      const noBtn = document.getElementById('use' + type.charAt(0).toUpperCase() + type.slice(1) + '_no');
      
      if(val) {
        yesBtn.classList.add('active');
        noBtn.classList.remove('active');
      } else {
        yesBtn.classList.remove('active');
        noBtn.classList.add('active-no');
      }
    }

    function resetForm() {
      document.getElementById('companyName').value = '';
      document.getElementById('targetRegion').value = '';
      document.getElementById('category').value = '';
      document.getElementById('keywords').value = '';
      document.getElementById('blogCount').value = 0;
      document.getElementById('visitorCount').value = 0;
      document.getElementById('ratingVal').value = '';
      setSwitch('booking', false);
      setSwitch('talk', false);
      setSwitch('coupon', false);
      setSwitch('safe', false);
    }

    function runAnalysis() {
      const company = document.getElementById('companyName').value || '미정 업체';
      const region = document.getElementById('targetRegion').value || '전국';
      const category = document.getElementById('category').value || '미기입';
      const keywords = document.getElementById('keywords').value || '';
      const blogReviews = parseInt(document.getElementById('blogCount').value) || 0;
      const visitorReviews = parseInt(document.getElementById('visitorCount').value) || 0;
      const rating = document.getElementById('ratingVal').value;

      // Points calculation strictly restricted to [10, 40]
      let rawSum = 0;
      const hasBooking = state.booking;
      rawSum += hasBooking ? 4 : 1;

      const hasTalk = state.talk;
      rawSum += hasTalk ? 4 : 1;

      const hasCoupon = state.coupon;
      rawSum += hasCoupon ? 4 : 1;

      const hasSafe = state.safe;
      rawSum += hasSafe ? 3 : 1;

      let blogPoints = 1;
      if (blogReviews >= 100) blogPoints = 5;
      else if (blogReviews >= 50) blogPoints = 4;
      else if (blogReviews >= 20) blogPoints = 2;
      rawSum += blogPoints;

      let visitorPoints = 1;
      if (visitorReviews >= 300) visitorPoints = 5;
      else if (visitorReviews >= 100) visitorPoints = 4;
      else if (visitorReviews >= 50) visitorPoints = 2;
      rawSum += visitorPoints;

      const keywordArr = keywords.split(',').map(k => k.trim()).filter(Boolean);
      let keywordPoints = 1;
      if (keywordArr.length >= 5) keywordPoints = 5;
      else if (keywordArr.length >= 2) keywordPoints = 3;
      rawSum += keywordPoints;

      // Score mapping: [7, 35] -> [10, 40]
      const score = 10 + Math.floor(((rawSum - 7) / 28) * 30);

      // Setup list of analysis items with expert descriptions
      const items = [
        {
          name: '네이버 예약',
          desc: hasBooking
            ? '네이버 예약을 연동 중이나, 예약 활성화 장치 및 가맹점 마케팅 연계율이 부족하여 실질적인 예약 전환율을 극대화할 여지가 큽니다.'
            : '예약 시스템 활용도가 부족하여 고객 예약 전환율 향상의 여지가 있습니다. 추가 유입 구조 설계가 적극 요구됩니다.',
          points: hasBooking ? 6 : 2,
          max: 15
        },
        {
          name: '네이버 톡톡',
          desc: hasTalk
            ? '톡톡 상담을 사용하고 있으나, 자동 응답(웰컴 메시지) 및 자주 묻는 질문 템플릿의 세분화가 부재하여 고객 실시간 문의 이탈율 방지 개선이 필요합니다.'
            : '실시간 상담 접근성을 더욱 강화하면 문의 전환율을 높일 수 있습니다. 빠른 대응 체계 조율이 시급합니다.',
          points: hasTalk ? 6 : 2,
          max: 15
        },
        {
          name: '네이버 쿠폰',
          desc: hasCoupon
            ? '쿠폰을 등록하셨으나, 다운로드 유도 문구의 가시성 및 알림받기 혜택 연동성이 낮아 실제 유입 고객의 쿠폰 사용 전환율을 상승시킬 개선 여지가 많습니다.'
            : '쿠폰 이벤트를 운영하면 신규 고객 유입과 재방문율 향상에 도움이 됩니다. 시즌별 프로모션 보완이 권장됩니다.',
          points: hasCoupon ? 6 : 2,
          max: 15
        },
        {
          name: '안심번호',
          desc: hasSafe
            ? '안심번호가 등록되어 있으나, 통화 유입 데이터 추적 및 가맹점 대표 전화 수신율 점검이 필요하며, 장기적인 문의 유입 세부 개선을 권장합니다.'
            : '고객 신뢰도 향상 및 문의 데이터 관리 측면에서 개선을 권장합니다. 개인 정보 노출 최소화 세팅이 필요합니다.',
          points: hasSafe ? 5 : 2,
          max: 10
        },
        {
          name: '블로그 리뷰',
          desc: blogReviews >= 50
            ? '블로그 리뷰가 총 ' + blogReviews + '개 누적되었으나, 최근 최적화 지수가 높은 고품질 상위 노출형 블로그 글의 비율이 상대적으로 부족하여 지속적인 체험단 수급과 관리가 수반되어야 합니다.'
            : '블로그 리뷰가 많을수록 검색 노출과 신뢰도가 크게 향상됩니다. 현재 포스팅 수로는 지역 내 경쟁사 대비 현저히 열세이므로 신규 정보성 포스팅 누적이 매우 시급합니다.',
          points: blogReviews >= 100 ? 7 : blogReviews >= 50 ? 5 : 2,
          max: 15
        },
        {
          name: '방문자 리뷰',
          desc: visitorReviews >= 100
            ? '방문자 영수증 리뷰가 총 ' + visitorReviews + '개로 누적되었으나, 고객 답글 피드백 대응률이 낮고 영수증 인증에 키워드가 누락되어 실제 플레이스 검색 로봇의 인덱스 점수를 극대화하기 위한 구조 개선이 요구됩니다.'
            : '방문자 리뷰 확보를 통해 플레이스 노출 경쟁력을 더욱 높일 수 있습니다. 오프라인 매장 내 QR코드 활성화 및 프로모션 이벤트를 연계해 진정성 있는 후기를 누적해야 합니다.',
          points: visitorReviews >= 300 ? 7 : visitorReviews >= 100 ? 5 : 2,
          max: 15
        },
        {
          name: '키워드 분석',
          desc: keywordArr.length >= 5
            ? '5개 키워드가 모두 등록되어 있으나, 검색 트렌드 분석에 따른 핵심 노출어 매칭도가 미흡하여 실질적인 로컬 검색 유입으로 연결되지 못하고 있어 세부 재정비가 필요합니다.'
            : '업종 및 지역 키워드를 더욱 세분화하여 검색 노출을 강화할 필요가 있습니다. 검색 유입이 일어나는 핵심 롱테일 키워드와 지역 결합 검색어를 5개 가득 채워 전략적으로 매치해야 합니다.',
          points: keywordArr.length >= 5 ? 7 : keywordArr.length >= 2 ? 5 : 2,
          max: 15
        }
      ];

      // Update Top Profile
      document.getElementById('pCompany').innerText = company;
      document.getElementById('pRegion').innerText = region;
      document.getElementById('pCategory').innerText = category;
      document.getElementById('pRating').innerText = rating ? '★ ' + rating : '평가 없음';

      // Score display
      document.getElementById('gaugeScoreText').innerText = score;
      let grade = 'D';
      if (score >= 35) grade = 'C';
      else if (score >= 25) grade = 'D+';
      else if (score >= 18) grade = 'D';
      else grade = 'F';

      document.getElementById('gradeText').innerText = grade + ' 등급';

      // Circular arc
      const circ = 2 * Math.PI * 48;
      const offset = circ - (score / 100) * circ;
      const progressArc = document.getElementById('progressArc');
      progressArc.style.strokeDashoffset = offset;

      // Render 부문 리스트 (Always '개선 필요')
      const grid = document.getElementById('itemsGrid');
      grid.innerHTML = '';
      items.forEach(it => {
        grid.innerHTML += \`
          <div class="result-item-card">
            <div class="card-top">
              <strong style="font-size:15px; color:#0F172A;">\${ds}{it.name}</strong>
              <span class="badge-status">🔴 개선 필요</span>
            </div>
            <div class="card-desc">\${ds}{it.desc}</div>
            <div class="card-bottom">
              <span>영업 전환 SEO 지표</span>
              <span class="card-points">\${ds}{it.points} / \${ds}{it.max}점</span>
            </div>
          </div>
        \`;
      });

      // AI Opinion Text
      document.getElementById('opinionText').innerText = "현재 플레이스는 기본적인 운영은 이루어지고 있으나 검색 노출, 고객 전환, 리뷰 관리 및 예약 시스템 활용 측면에서 개선 여지가 확인됩니다. 주요 기능을 최적화하고 콘텐츠 및 리뷰를 지속적으로 관리하면 플레이스 경쟁력이 크게 향상될 것으로 예상됩니다.";

      // Priorities (Strict Order)
      const priorities = [
        '키워드 최적화',
        '네이버 예약 활성화',
        '네이버 톡톡 활성화',
        '네이버 쿠폰 운영',
        '안심번호 적용',
        '블로그 리뷰 확보',
        '방문자 리뷰 확보'
      ];
      
      const pList = document.getElementById('priorityList');
      pList.innerHTML = '';
      priorities.forEach((p, idx) => {
        pList.innerHTML += \`<li data-rank="\${ds}{idx + 1}">\${ds}{p}</li>\`;
      });

      // Expected Effects
      const effects = [
        '핵심 및 로컬 키워드 최적화 매치업을 통한 통합 로컬 검색 첫 페이지 노출 점유율 증대',
        '예약 시스템과 톡톡 채널 개시로 문의 전환 및 확정 예약률 180% 이상 견인',
        '첫 방문 할인/알림받기 쿠폰 설계 도입을 통한 가망 고객 재방문 유도 고리 안착',
        '정밀 안심번호 트래킹 구축에 따른 인바운드 고객 상담 응대 지표 및 유입 누수 완벽 보완',
        '신뢰 가치 증진형 블로그 후기 및 진정성 있는 영수증 인증 리뷰 축적으로 매장 전환 지수 최대치 상승'
      ];

      const eList = document.getElementById('effectsList');
      eList.innerHTML = '';
      effects.forEach(e => {
        eList.innerHTML += \`<li>\${ds}{e}</li>\`;
      });

      document.getElementById('reportDate').innerText = '발행일자: ' + new Date().toLocaleDateString('ko-KR');
    }

    // Init run
    runAnalysis();
  </script>
</body>
</html>`;

    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${input.companyName || '플레이스'}_AI_진단리포트_단일파일.html`;
    link.click();

    setIsCopiedHtml(true);
    setTimeout(() => setIsCopiedHtml(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800">
      {/* GLOBAL BANNER HEADER (No Print) */}
      <header className="no-print bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white shadow-lg relative overflow-hidden">
        {/* Dynamic ambient shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-[#1E3A8A] text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md shadow-sm">
                DY PLACE AI REPORT
              </span>
              <span className="text-blue-100 text-[13px] font-semibold">플레이스 영업 특화 정밀 진단 솔루션</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              네이버 플레이스 AI 진단 리포트 생성기
            </h1>
            <p className="text-[14px] text-blue-100 leading-relaxed">
              가망 고객 이탈을 방지하고 최적 노출 기틀을 마련하는 컨설팅 전용 전문가 도구입니다.
            </p>
          </div>

          <div className="flex gap-3 shrink-0 self-stretch md:self-auto">
            <button
              onClick={handleDownloadStandaloneHTML}
              className={`flex-1 md:flex-none py-3.5 px-6 rounded-xl bg-[#FFFFFF] hover:bg-slate-50 text-[#1E3A8A] text-xs font-bold flex items-center justify-center gap-2.5 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${isCopiedHtml ? 'text-emerald-600 border-emerald-500/50' : ''}`}
            >
              {isCopiedHtml ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  다운로드 완료!
                </>
              ) : (
                <>
                  <FileCode className="w-4 h-4 text-[#2563EB]" />
                  단일 index.html 다운로드
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* CORE WORKSPACE SECTION */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Panel (No Print) */}
          <div className="no-print lg:col-span-5 xl:col-span-4 lg:sticky lg:top-8">
            <FormInput
              input={input}
              setInput={setInput}
              onSubmit={handleDiagnose}
              onReset={handleReset}
            />
          </div>

          {/* Right Column: Dynamic Report Preview */}
          <div className="lg:col-span-7 xl:col-span-8">
            <ReportCard result={result} />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="no-print border-t border-slate-200/60 py-8 bg-white text-center text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-bold text-slate-500 tracking-wider">
            DY PLACE AI ANALYTICS ㆍ COGNITIVE MARKETING PLATFORM
          </p>
          <p>© 2026 AI Studio. All rights reserved. 본 진단 리포트는 마케팅 영업 전용 컨설팅을 위해 특화된 자체 알고리즘을 사용합니다.</p>
        </div>
      </footer>
    </div>
  );
}
