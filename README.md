# CareLoop - 치매 돌봄 AI 케어 도우미

치매 돌봄 보호자를 위한 모바일 퍼스트 웹 애플리케이션입니다.

## 주요 기능

- **온보딩**: 3단계 소개 슬라이드와 보호자 정보 입력
- **감정 기록**: 6가지 감정 선택 및 메모 작성
- **AI 상담**: 치매 돌봄 관련 AI 챗봇 상담
- **기록 관리**: 감정 변화 차트 및 전체 기록 조회
- **마이페이지**: 프로필 정보 및 통계 확인

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Claude 3.5 Sonnet (Anthropic API)
- **Storage**: localStorage (프로토타입)

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. Claude API 키 설정

`.env.local` 파일에 Anthropic API 키를 설정하세요:

```env
ANTHROPIC_API_KEY=your_api_key_here
```

API 키 발급 방법: https://console.anthropic.com/settings/keys

> 📖 자세한 설정 가이드는 `CLAUDE_API_SETUP.md` 참고

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하세요.

### 3. 프로덕션 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
my-app/
├── src/
│   ├── app/                    # Next.js App Router 페이지
│   │   ├── page.tsx           # 메인 홈
│   │   ├── onboarding/        # 온보딩 페이지
│   │   ├── chat/              # AI 상담 페이지
│   │   ├── records/           # 감정 기록 페이지
│   │   └── mypage/            # 마이페이지
│   ├── components/            # React 컴포넌트
│   │   ├── layout/            # 레이아웃 컴포넌트
│   │   ├── onboarding/        # 온보딩 컴포넌트
│   │   ├── home/              # 홈 컴포넌트
│   │   ├── chat/              # 채팅 컴포넌트
│   │   └── records/           # 기록 컴포넌트
│   └── lib/                   # 유틸리티 및 타입
│       ├── types.ts           # TypeScript 타입 정의
│       ├── storage.ts         # localStorage 유틸리티
│       └── mockAI.ts          # AI 응답 목업
```

## 사용 방법

### 1. 온보딩

첫 방문 시 온보딩 페이지가 표시됩니다:
- 3개의 소개 슬라이드 확인
- 닉네임, 환자와의 관계, 돌봄 기간, 동거 여부 입력

### 2. 감정 기록

홈 페이지에서:
- 6개의 감정 이모지 중 하나 선택
- 선택적으로 메모 작성
- 저장하면 기록 페이지에서 확인 가능

### 3. AI 상담

AI 상담 페이지에서:
- 고민이나 질문 입력
- AI가 공감과 조언을 제공
- 채팅 히스토리 자동 저장

### 4. 기록 확인

기록 페이지에서:
- 최근 7일 감정 변화 차트
- 전체 기록 리스트 (최신순)
- 통계 정보 확인

### 5. 마이페이지

- 프로필 정보 확인
- 기록 통계 확인
- 로그아웃 (모든 데이터 삭제)

## 데이터 저장

이 프로토타입은 **localStorage**를 사용합니다:
- 브라우저에 데이터가 저장됩니다
- 로그아웃하면 모든 데이터가 삭제됩니다
- 다른 기기나 브라우저에서는 데이터가 동기화되지 않습니다

## 반응형 디자인

모바일 퍼스트 디자인으로 다양한 화면 크기를 지원합니다:
- 모바일: 375px+
- 태블릿: 768px+
- 데스크톱: 1024px+

## 향후 개선 사항

- [ ] 실제 AI API 연동 (Claude API, OpenAI 등)
- [ ] 백엔드 서버 및 데이터베이스 연동
- [ ] 사용자 인증 시스템
- [ ] 더 풍부한 감정 분석 및 인사이트
- [ ] 푸시 알림 기능
- [ ] PWA 지원

## 라이센스

MIT License
