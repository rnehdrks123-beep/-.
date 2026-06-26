import { DiagnosisResult } from '../types';

export function downloadDiagnosisPNG(result: DiagnosisResult) {
  // Create high-res canvas (2x scaled for high-density display export)
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 1850; // Increased height to make sure all elements fit beautifully
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background Fill (Premium soft grey/white canvas)
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 1. Draw HEADER CARD (Minimal, premium layout mirroring Apple/Toss styles)
  // Subtle gradient on top header
  const headerGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  headerGrad.addColorStop(0, '#1E3A8A'); // Navy Point
  headerGrad.addColorStop(1, '#2563EB'); // Blue Point
  ctx.fillStyle = headerGrad;
  ctx.fillRect(0, 0, canvas.width, 240);

  // Header Typography
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = '600 15px "Pretendard Variable", "Pretendard", "SUIT Variable", "SUIT", sans-serif';
  ctx.fillText('DY PLACE AI REPORT', 60, 65);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 38px "Pretendard Variable", "Pretendard", "SUIT Variable", "SUIT", sans-serif';
  ctx.fillText('네이버 플레이스 AI 진단 리포트', 60, 125);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '500 16px "Pretendard Variable", "Pretendard", "SUIT Variable", "SUIT", sans-serif';
  ctx.fillText('네이버 로컬 알고리즘 및 유입 전환 설계 중심의 프리미엄 영업 진단서', 60, 175);

  // 2. Draw CIRCULAR SCORE RING (Top-Right inside Header)
  const circleX = 1010;
  const circleY = 120;
  const circleRadius = 70;

  // Background Ring
  ctx.beginPath();
  ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.stroke();

  // Active Arc
  const scorePct = result.score / 100;
  ctx.beginPath();
  ctx.arc(circleX, circleY, circleRadius, -0.5 * Math.PI, (2 * scorePct - 0.5) * Math.PI);
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#FFFFFF';
  ctx.stroke();

  // Score Text (Capped at 40 max, bold text size 52~64px equivalent in canvas px)
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 52px "Pretendard Variable", "Pretendard", "SUIT Variable", "SUIT", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(result.score), circleX, circleY - 10);

  // Score Label
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '600 13px "Pretendard Variable", "Pretendard", "SUIT Variable", "SUIT", sans-serif';
  ctx.fillText('SCORE', circleX, circleY + 28);

  // Grade Badge (Below circle)
  const badgeX = 1010;
  const badgeY = 210;
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  roundRect(ctx, badgeX - 60, badgeY - 14, 120, 28, 14, true, false);
  
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 14px "Pretendard Variable", "Pretendard", "SUIT Variable", "SUIT", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`종합 등급: ${result.grade}`, badgeX, badgeY);

  // Reset alignment
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';

  // 3. Draw BUSINESS PROFILE CARD
  const profileY = 270;
  ctx.fillStyle = '#FFFFFF';
  // Rounded Box with drop shadow
  ctx.shadowColor = 'rgba(30, 58, 138, 0.04)';
  ctx.shadowBlur = 16;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 6;
  roundRect(ctx, 60, profileY, 1080, 140, 20, true, false);
  ctx.shadowColor = 'transparent'; // Reset shadow

  // Left Border Line accent (Navy)
  ctx.fillStyle = '#1E3A8A';
  roundRect(ctx, 60, profileY, 6, 140, { tl: 20, bl: 20, tr: 0, br: 0 }, true, false);

  // Labels & Data
  const dataLeft1 = 110;
  const dataLeft2 = 620;
  
  ctx.fillStyle = '#64748B';
  ctx.font = '600 14px "Pretendard Variable", "Pretendard", "SUIT Variable", "SUIT", sans-serif';
  ctx.fillText('🏢 업체명', dataLeft1, profileY + 45);
  ctx.fillText('🏷️ 업종분류', dataLeft1, profileY + 95);
  ctx.fillText('📍 타겟지역', dataLeft2, profileY + 45);
  ctx.fillText('🔍 핵심 키워드', dataLeft2, profileY + 95);

  ctx.fillStyle = '#1E3A8A';
  ctx.font = '700 18px "Pretendard Variable", "Pretendard", "SUIT Variable", "SUIT", sans-serif';
  ctx.fillText(result.inputData.companyName, dataLeft1 + 100, profileY + 45);
  ctx.fillText(result.inputData.category || '미지정', dataLeft1 + 100, profileY + 95);
  ctx.fillText(result.inputData.targetRegion || '전국', dataLeft2 + 110, profileY + 45);

  // Truncate keyword display if too long
  let keywordText = result.inputData.keywords || '등록 키워드 없음';
  if (keywordText.length > 36) keywordText = keywordText.substring(0, 34) + '...';
  ctx.font = '500 16px "Pretendard Variable", "Pretendard", "SUIT Variable", "SUIT", sans-serif';
  ctx.fillStyle = '#334155';
  ctx.fillText(keywordText, dataLeft2 + 110, profileY + 95);

  // 4. Draw DIAGNOSIS ITEMS (Two Columns, Forced "개선 필요")
  const gridY = 470;
  const colWidth = 525;
  const rowHeight = 110; // Slightly taller for cleaner layout
  const gapX = 30;
  const gapY = 16;

  ctx.fillStyle = '#1E3A8A';
  ctx.font = '700 20px "Pretendard Variable", "Pretendard", "SUIT Variable", "SUIT", sans-serif';
  ctx.fillText('🔴 7대 핵심 항목 진단 결과 (영영적 보완 필수 상태)', 60, gridY - 15);

  result.items.forEach((item, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const itemX = 60 + col * (colWidth + gapX);
    const itemY = gridY + row * (rowHeight + gapY);

    // Card Box
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.02)';
    ctx.shadowBlur = 10;
    roundRect(ctx, itemX, itemY, colWidth, rowHeight, 18, true, false);
    ctx.shadowColor = 'transparent';

    // Outer border very light
    ctx.strokeStyle = '#F1F5F9';
    ctx.lineWidth = 1.5;
    roundRect(ctx, itemX, itemY, colWidth, rowHeight, 18, false, true);

    // Status Pill: Always "🔴 개선 필요"
    ctx.fillStyle = '#FEF2F2'; // Soft red background
    roundRect(ctx, itemX + 18, itemY + 22, 100, 30, 8, true, false);
    
    ctx.fillStyle = '#EF4444'; // Red color
    ctx.font = '700 13px "Pretendard Variable", "Pretendard", "SUIT Variable", "SUIT", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🔴 개선 필요', itemX + 68, itemY + 37);

    // Reset layout
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';

    // Item Title
    ctx.fillStyle = '#0F172A';
    ctx.font = '700 16px "Pretendard Variable", "Pretendard", "SUIT Variable", "SUIT", sans-serif';
    ctx.fillText(item.name, itemX + 135, itemY + 38);

    // Item Desc wrapped professionally
    ctx.fillStyle = '#475569';
    ctx.font = '500 13px "Pretendard Variable", "Pretendard", "SUIT Variable", "SUIT", sans-serif';
    
    // Draw wrapped description text for smaller card block
    const textX = itemX + 18;
    const textY = itemY + 70;
    let descLines = [];
    let currentLine = '';
    const words = item.desc.split(' ');
    
    // Simple wrap logic by length to avoid canvas overflow
    for (let char of item.desc) {
      if (ctx.measureText(currentLine + char).width > colWidth - 50) {
        descLines.push(currentLine);
        currentLine = char;
      } else {
        currentLine += char;
      }
    }
    descLines.push(currentLine);
    
    // Draw first 2 lines
    ctx.fillText(descLines[0] || '', textX, textY);
    if (descLines[1]) {
      ctx.fillText(descLines[1].length > 36 ? descLines[1].substring(0, 34) + '...' : descLines[1], textX, textY + 18);
    }
  });

  // 5. Draw AI COMPREHENSIVE OPINION (Bottom Box)
  const opinionY = 960;
  ctx.fillStyle = '#1E3A8A';
  ctx.font = '700 20px "Pretendard Variable", "Pretendard", "SUIT Variable", "SUIT", sans-serif';
  ctx.fillText('💬 AI 플레이스 정밀 진단 종합 의견', 60, opinionY - 15);

  // Premium Background Card for Opinion
  ctx.fillStyle = '#F0F4FF'; // Navy/Blue soft tint
  roundRect(ctx, 60, opinionY, 1080, 150, 20, true, false);

  // Left Stripe
  ctx.fillStyle = '#1E3A8A';
  roundRect(ctx, 60, opinionY, 6, 150, { tl: 20, bl: 20, tr: 0, br: 0 }, true, false);

  // Draw paragraph text wrapped
  ctx.fillStyle = '#1E293B';
  ctx.font = '500 15px "Pretendard Variable", "Pretendard", "SUIT Variable", "SUIT", sans-serif';
  wrapKoreanText(ctx, result.aiOpinion, 90, opinionY + 45, 1020, 26);

  // 6. Draw ACTION STRATEGY (Improvement priorities & Expected effects)
  const actionY = 1170;
  const actionCardHeight = 490; // Expanded to easily accommodate all 7 items
  
  // Left Column: Improvement Priority
  const halfColWidth = 525;
  ctx.fillStyle = '#1E3A8A';
  ctx.font = '700 20px "Pretendard Variable", "Pretendard", "SUIT Variable", "SUIT", sans-serif';
  ctx.fillText('🚀 우선 권장 개선 핵심 과제', 60, actionY - 15);

  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.01)';
  ctx.shadowBlur = 10;
  roundRect(ctx, 60, actionY, halfColWidth, actionCardHeight, 20, true, false);
  ctx.shadowColor = 'transparent';

  // Draw very thin border
  ctx.strokeStyle = '#F1F5F9';
  ctx.lineWidth = 1.5;
  roundRect(ctx, 60, actionY, halfColWidth, actionCardHeight, 20, false, true);

  result.priorities.forEach((priority, index) => {
    // Gap modified to 62px to fit 7 items perfectly in 490px card
    const py = actionY + 25 + index * 62;

    // Rank Circle Badge (Navy)
    ctx.fillStyle = '#1E3A8A';
    ctx.beginPath();
    ctx.arc(95, py + 14, 14, 0, 2 * Math.PI);
    ctx.fill();

    // Rank text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 13px "Pretendard Variable", "Pretendard", "SUIT Variable", "SUIT", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(priority.rank), 95, py + 14);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';

    // Title text
    ctx.fillStyle = '#0F172A';
    ctx.font = '700 14.5px "Pretendard Variable", "Pretendard", "SUIT Variable", "SUIT", sans-serif';
    ctx.fillText(priority.title, 130, py + 20);
  });

  // Right Column: Expected Effects
  ctx.fillStyle = '#1E3A8A';
  ctx.font = '700 20px "Pretendard Variable", "Pretendard", "SUIT Variable", "SUIT", sans-serif';
  ctx.fillText('📈 개선 완료 후 핵심 기대 효과', 60 + halfColWidth + gapX, actionY - 15);

  ctx.fillStyle = '#FFFFFF';
  roundRect(ctx, 60 + halfColWidth + gapX, actionY, halfColWidth, actionCardHeight, 20, true, false);
  roundRect(ctx, 60 + halfColWidth + gapX, actionY, halfColWidth, actionCardHeight, 20, false, true);

  result.expectedEffects.forEach((effect, index) => {
    const ey = actionY + 30 + index * 85;

    // Check Icon Indicator Dot (Navy/Blue theme)
    ctx.strokeStyle = '#2563EB';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(60 + halfColWidth + gapX + 35, ey + 15, 7, 0, 2 * Math.PI);
    ctx.stroke();

    // Check dot fill
    ctx.fillStyle = '#2563EB';
    ctx.beginPath();
    ctx.arc(60 + halfColWidth + gapX + 35, ey + 15, 3, 0, 2 * Math.PI);
    ctx.fill();

    // Effect Text (2 lines support if wrapped)
    ctx.fillStyle = '#1E293B';
    ctx.font = '600 14px "Pretendard Variable", "Pretendard", "SUIT Variable", "SUIT", sans-serif';

    const textX = 60 + halfColWidth + gapX + 60;
    const textY = ey + 12;
    
    let words = effect.split(' ');
    let line = '';
    let effectLines = [];
    for (let char of effect) {
      if (ctx.measureText(line + char).width > halfColWidth - 85) {
        effectLines.push(line);
        line = char;
      } else {
        line += char;
      }
    }
    effectLines.push(line);

    ctx.fillText(effectLines[0] || '', textX, textY);
    if (effectLines[1]) {
      ctx.fillText(effectLines[1], textX, textY + 20);
    }
  });

  // 7. DRAW FOOTER
  ctx.fillStyle = '#E2E8F0';
  ctx.fillRect(60, 1740, 1080, 1.5);

  ctx.fillStyle = '#64748B';
  ctx.font = '600 13px "Pretendard Variable", "Pretendard", "SUIT Variable", "SUIT", sans-serif';
  ctx.fillText('DY PLACE AI REPORT ㆍ COGNITIVE SEO ARCHITECTURE', 60, 1785);

  ctx.textAlign = 'right';
  ctx.fillText(`진단 일자: ${new Date().toLocaleDateString('ko-KR')} | 컨설턴트 검증 완료`, 1140, 1785);

  // Trigger browser download of PNG
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `${result.inputData.companyName}_플레이스_AI진단리포트.png`;
  link.href = dataURL;
  link.click();
}

// Sub helper to wrap Korean letters
function wrapKoreanText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  let line = '';
  let currentY = y;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const testLine = line + char;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth) {
      ctx.fillText(line, x, currentY);
      line = char;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
  return currentY;
}

// Sub helper to draw round corner rectangles in canvas
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: any,
  fill: boolean,
  stroke: boolean
) {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  } else {
    const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
    for (const side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side as keyof typeof defaultRadius];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}
