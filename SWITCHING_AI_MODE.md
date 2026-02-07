# AI 모드 전환 가이드

CareLoop은 **목업 AI**와 **실제 Claude API** 두 가지 모드를 지원합니다.

## 🔄 현재 모드: 목업 AI (Mock AI)

- API 키 불필요
- 키워드 기반 미리 정의된 응답
- 즉시 사용 가능

## 모드별 비교

| 항목 | 목업 AI (현재) | Claude API |
|------|---------------|------------|
| **설정** | 불필요 | API 키 필요 |
| **비용** | 무료 | 사용량 기반 과금 |
| **응답 품질** | 제한적 | 높은 품질 |
| **응답 속도** | 1초 (고정) | 2-5초 |
| **대화 컨텍스트** | 없음 | 있음 (최근 10개) |
| **맞춤형 응답** | 불가 | 가능 |

---

## 🚀 Claude API로 전환하기

### 방법 1: API 키만 설정 (권장)

1. **API 키 발급**
   - https://console.anthropic.com 접속
   - 회원가입 후 API Keys 메뉴에서 키 생성

2. **환경 변수 설정**
   ```env
   # .env.local 파일에 추가
   ANTHROPIC_API_KEY=sk-ant-api03-your_actual_key_here
   ```

3. **코드 수정**
   `src/app/chat/page.tsx` 파일을 열어서:

   **변경 전 (목업 AI):**
   ```typescript
   import { getMockAIResponse } from '@/lib/mockAI';

   const handleSendMessage = async (content: string) => {
     // ... 사용자 메시지 처리 ...

     // 목업 AI 응답
     setIsTyping(true);
     setTimeout(() => {
       const aiResponse = getMockAIResponse(content);
       // ... AI 메시지 추가 ...
     }, 1000);
   };
   ```

   **변경 후 (Claude API):**
   ```typescript
   // getMockAIResponse import 삭제

   const handleSendMessage = async (content: string) => {
     // ... 사용자 메시지 처리 ...

     setIsTyping(true);
     try {
       const conversationHistory = [...messages, userMessage]
         .slice(-10)
         .map(msg => ({
           role: msg.role,
           content: msg.content,
         }));

       const response = await fetch('/api/chat', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ messages: conversationHistory }),
       });

       if (!response.ok) {
         throw new Error('API 호출 실패');
       }

       const data = await response.json();
       const aiMessage: ChatMessageType = {
         id: (Date.now() + 1).toString(),
         role: 'assistant',
         content: data.message,
         timestamp: new Date().toISOString(),
       };

       setMessages((prev) => [...prev, aiMessage]);
       saveChatMessage(aiMessage);
     } catch (error: any) {
       console.error('AI 응답 오류:', error);
       // 오류 처리...
     } finally {
       setIsTyping(false);
     }
   };
   ```

4. **서버 재시작**
   ```bash
   # Ctrl+C로 서버 중지
   npm run dev
   ```

### 방법 2: 환경 변수로 자동 전환 (고급)

코드를 수정하여 환경 변수로 모드 전환:

```typescript
// .env.local
USE_CLAUDE_API=true  # true면 Claude API, false면 목업

// src/app/chat/page.tsx
const useClaude = process.env.NEXT_PUBLIC_USE_CLAUDE_API === 'true';

const handleSendMessage = async (content: string) => {
  // ... 사용자 메시지 ...

  setIsTyping(true);

  if (useClaude) {
    // Claude API 호출
    try {
      const response = await fetch('/api/chat', { /* ... */ });
      // ...
    } catch (error) {
      // ...
    } finally {
      setIsTyping(false);
    }
  } else {
    // 목업 AI
    setTimeout(() => {
      const aiResponse = getMockAIResponse(content);
      // ...
      setIsTyping(false);
    }, 1000);
  }
};
```

---

## 🔙 목업 AI로 되돌리기

현재는 이미 목업 AI 모드입니다. Claude API로 전환한 후 다시 되돌리려면:

1. **API 호출 코드 제거**
2. **목업 함수 import 추가**
   ```typescript
   import { getMockAIResponse } from '@/lib/mockAI';
   ```
3. **setTimeout으로 목업 응답 사용**

---

## 📝 목업 AI 응답 커스터마이징

목업 모드에서 응답을 수정하려면 `src/lib/mockAI.ts` 파일을 편집하세요.

### 새로운 키워드 패턴 추가

```typescript
// src/lib/mockAI.ts

export const getMockAIResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();

  // 새로운 패턴 추가
  if (lowerMessage.includes('식사') || lowerMessage.includes('밥')) {
    return "식사는 규칙적인 시간에 제공하는 것이 좋습니다...";
  }

  if (lowerMessage.includes('수면') || lowerMessage.includes('잠')) {
    return "수면 패턴이 불규칙해질 수 있습니다...";
  }

  // 기존 패턴들...
};
```

### 응답 추가/수정

```typescript
const responses = [
  "기존 응답 1...",
  "기존 응답 2...",
  "새로운 응답 추가...",  // 여기에 추가
];
```

---

## 🎯 권장 사용 시나리오

### 목업 AI 사용 (현재)
- ✅ 프로토타입 테스트
- ✅ UI/UX 개발
- ✅ 데모 시연
- ✅ API 키 없이 개발

### Claude API 사용
- ✅ 실제 사용자 테스트
- ✅ 프로덕션 배포
- ✅ 고품질 응답 필요
- ✅ 대화 컨텍스트 필요

---

## 💡 팁

1. **개발 단계**: 목업 AI로 빠르게 개발
2. **테스트 단계**: Claude API로 전환하여 실제 응답 품질 확인
3. **배포 전**: 비용 예측 후 Claude API 사용
4. **하이브리드**: 환경 변수로 모드 전환 가능하게 구성

---

**현재 상태**: ✅ 목업 AI 모드 활성화
**전환 필요 시**: 위 가이드 참고 또는 `CLAUDE_API_SETUP.md` 확인
