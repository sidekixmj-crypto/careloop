# Claude API 설정 가이드

## 🎉 Claude API 연동 완료!

CareLoop이 이제 실제 Claude AI를 사용합니다. 아래 단계를 따라 API 키를 설정하세요.

## 📝 설정 단계

### 1. Anthropic API Key 발급

1. **Anthropic Console 접속**
   - https://console.anthropic.com 방문
   - 계정이 없다면 회원가입 (GitHub, Google 계정으로 가능)

2. **API Key 생성**
   - 로그인 후 Settings → API Keys 메뉴로 이동
   - "Create Key" 버튼 클릭
   - Key 이름 입력 (예: "CareLoop Development")
   - 생성된 API Key 복사 (한 번만 표시되므로 안전하게 보관!)

3. **크레딧 확인**
   - 새 계정은 무료 크레딧 제공 (제한적)
   - 프로덕션 사용을 위해서는 결제 정보 등록 필요
   - Settings → Billing에서 확인 가능

### 2. 환경 변수 설정

프로젝트 루트의 `.env.local` 파일을 편집:

```bash
# .env.local 파일 열기
# Windows: notepad .env.local
# Mac/Linux: nano .env.local 또는 code .env.local
```

API Key를 입력:

```env
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

⚠️ **중요**:
- `your_api_key_here`를 실제 API 키로 교체하세요
- API 키는 절대 Git에 커밋하지 마세요 (.gitignore에 포함됨)
- API 키는 타인과 공유하지 마세요

### 3. 개발 서버 재시작

환경 변수가 변경되었으므로 서버를 재시작해야 합니다:

```bash
# 기존 서버 중지 (Ctrl+C)
# 서버 재시작
npm run dev
```

### 4. 테스트

1. 브라우저에서 http://localhost:3000 접속
2. AI 상담 탭으로 이동
3. 메시지 입력 (예: "안녕하세요")
4. Claude의 실제 응답 확인!

## 🔧 변경된 사항

### 1. 새로운 파일
- `src/app/api/chat/route.ts` - Claude API 호출 서버 엔드포인트
- `.env.local` - API 키 저장 (Git에 업로드 안 됨)
- `.env.example` - 환경 변수 템플릿

### 2. 수정된 파일
- `src/app/chat/page.tsx` - API 호출로 변경
- `package.json` - @anthropic-ai/sdk 추가

### 3. 삭제된 기능
- ~~`getMockAIResponse()` 사용~~ → Claude API로 대체

## 💡 Claude API 특징

### 사용 중인 모델
- **claude-3-5-sonnet-20241022**
- 최신 Sonnet 4.5 모델
- 빠른 응답 속도 + 높은 품질
- 비용 효율적

### 프롬프트 구성
시스템 프롬프트에 다음이 포함됨:
- 치매 돌봄 보호자 상담사 역할
- 공감과 실천 가능한 조언 제공
- 한국의 치매 지원 시스템 안내
- 따뜻하고 격려하는 어조

### 대화 컨텍스트
- 최근 10개 메시지 히스토리 전송
- 연속된 대화 가능
- localStorage에 전체 히스토리 저장

## 💰 비용 정보

### Claude 3.5 Sonnet 요금 (2026년 기준)
- Input: $3 / million tokens
- Output: $15 / million tokens

### 예상 사용량
- 평균 대화: ~500 tokens (input + output)
- 100회 대화: 약 $1 미만
- 월 1,000회 대화: 약 $10 미만

### 무료 크레딧
- 새 계정: 제한적 무료 크레딧 제공
- 테스트 및 개발에 충분
- 프로덕션: 결제 정보 등록 필요

## 🐛 문제 해결

### "ANTHROPIC_API_KEY가 설정되지 않았습니다"
- `.env.local` 파일 확인
- API 키가 올바르게 입력되었는지 확인
- 개발 서버 재시작 (환경 변수 변경 시 필수)

### "API 호출에 실패했습니다"
- API 키가 유효한지 확인
- 크레딧 잔액 확인
- 네트워크 연결 확인
- Console에서 오류 로그 확인 (F12 → Console)

### "401 Unauthorized" 오류
- API 키가 잘못되었거나 만료됨
- Anthropic Console에서 새 키 생성

### "429 Too Many Requests" 오류
- Rate limit 초과
- 잠시 기다린 후 재시도
- 프로덕션에서는 rate limiting 구현 필요

### 응답이 너무 느림
- 정상입니다! Claude API는 보통 2-5초 소요
- 네트워크 상태에 따라 다름
- 스트리밍 응답으로 개선 가능 (고급 기능)

## 🚀 추가 개선 아이디어

### 1. 스트리밍 응답
실시간으로 응답을 보여주기 (ChatGPT처럼):
```typescript
// API route에서 스트리밍 활성화
const stream = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  stream: true,
  // ...
});
```

### 2. 대화 요약
긴 대화 히스토리를 요약하여 토큰 절약:
```typescript
// 10개 이상 메시지 시 요약 API 호출
if (messages.length > 20) {
  const summary = await summarizeConversation(messages.slice(0, -10));
  // 요약 + 최근 10개만 전송
}
```

### 3. 감정 분석
사용자 메시지의 감정 자동 분석:
```typescript
// 메시지 전송 시 감정도 자동 기록
const emotion = await analyzeEmotion(userMessage);
saveEmotionRecord({ emotion, ... });
```

### 4. 캐싱 (고급)
동일한 질문에 대한 응답 캐싱으로 비용 절감

### 5. 다중 언어 지원
영어, 일본어 등 다른 언어로도 상담 가능

## 📚 참고 자료

- [Anthropic API Documentation](https://docs.anthropic.com/)
- [Claude Models](https://docs.anthropic.com/claude/docs/models-overview)
- [API Pricing](https://www.anthropic.com/pricing)
- [Best Practices](https://docs.anthropic.com/claude/docs/best-practices)

## ⚠️ 보안 주의사항

1. **API 키 보호**
   - `.env.local` 파일은 Git에 커밋 금지
   - API 키를 코드에 직접 작성 금지
   - 프로덕션 배포 시 환경 변수로 설정

2. **Rate Limiting**
   - 프로덕션에서는 사용자별 요청 제한 구현
   - 악의적 사용 방지

3. **입력 검증**
   - 사용자 입력 검증 및 필터링
   - 너무 긴 메시지 제한 (max_tokens)

4. **에러 처리**
   - API 오류 시 적절한 사용자 메시지
   - 민감한 오류 정보는 로그에만 기록

---

**설정 완료 후 실제 AI와 대화를 즐기세요! 🎉**

문제가 있으면 위 문제 해결 섹션을 참고하거나 이슈를 등록해주세요.
