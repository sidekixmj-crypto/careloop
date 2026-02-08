# 🚀 CareLoop Vercel 배포 가이드

이 문서는 CareLoop 애플리케이션을 Vercel에 배포하는 방법을 단계별로 설명합니다.

## 📋 사전 요구사항

### 1. 필수 계정
- [Vercel 계정](https://vercel.com/signup) (GitHub, GitLab, 또는 Bitbucket과 연동)
- [Anthropic API 키](https://console.anthropic.com/)

### 2. 환경 변수
배포 시 다음 환경 변수가 **필수**입니다:
- `ANTHROPIC_API_KEY`: Claude API 키 (Anthropic Console에서 발급)

---

## 🎯 방법 1: Vercel 웹 대시보드로 배포 (권장)

가장 쉽고 빠른 방법입니다.

### 단계 1: GitHub에 코드 푸시
```bash
git add .
git commit -m "feat: Ready for Vercel deployment"
git push origin main
```

### 단계 2: Vercel에서 프로젝트 임포트
1. [Vercel 대시보드](https://vercel.com/dashboard)에 로그인
2. **"Add New Project"** 클릭
3. GitHub 저장소를 임포트
4. **"Import"** 클릭

### 단계 3: 환경 변수 설정
1. **"Configure Project"** 화면에서 **"Environment Variables"** 섹션으로 이동
2. 다음 환경 변수를 추가:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: 여러분의 Claude API 키
   - **Environments**: Production, Preview, Development 모두 선택
3. **"Add"** 클릭

### 단계 4: 배포
1. **"Deploy"** 버튼 클릭
2. 배포가 완료되면 고유한 URL이 생성됩니다 (예: `https://your-project.vercel.app`)

---

## 💻 방법 2: Vercel CLI로 배포

터미널에서 직접 배포하는 방법입니다.

### 단계 1: Vercel CLI 설치
```bash
npm install -g vercel
```

### 단계 2: Vercel 로그인
```bash
vercel login
```
- 이메일 주소를 입력하고 확인 이메일의 링크를 클릭하여 인증합니다.

### 단계 3: 환경 변수 설정 (최초 1회)
```bash
# Production 환경에 API 키 추가
vercel env add ANTHROPIC_API_KEY production

# Preview 환경에 API 키 추가
vercel env add ANTHROPIC_API_KEY preview

# Development 환경에 API 키 추가
vercel env add ANTHROPIC_API_KEY development
```
- 각 명령어 실행 후 API 키 값을 입력하라는 프롬프트가 나타납니다.

### 단계 4: 프로젝트 배포
```bash
# 프로젝트 루트 디렉토리에서 실행
cd C:\Users\mjkim\my-app

# 첫 배포 (프로젝트 설정)
vercel

# 또는 프로덕션 배포
vercel --prod
```

#### 첫 배포 시 질문들:
- **Set up and deploy "..."?** → `Y` (Yes)
- **Which scope do you want to deploy to?** → 본인의 Vercel 계정 선택
- **Link to existing project?** → `N` (No, 새 프로젝트 생성)
- **What's your project's name?** → `careloop` (또는 원하는 이름)
- **In which directory is your code located?** → `./` (Enter)

---

## 🔄 재배포 (업데이트)

### 방법 1: Git Push로 자동 배포
```bash
git add .
git commit -m "update: 변경사항 설명"
git push origin main
```
- Vercel이 자동으로 배포를 시작합니다.

### 방법 2: Vercel CLI로 재배포
```bash
vercel --prod
```

---

## 🔍 배포 확인

### 1. 배포 상태 확인
```bash
vercel ls
```

### 2. 배포 로그 확인
```bash
vercel logs <deployment-url>
```

### 3. 프로젝트 대시보드
- [Vercel 대시보드](https://vercel.com/dashboard)에서 프로젝트 클릭
- **Deployments** 탭에서 배포 기록 확인
- **Settings** → **Environment Variables**에서 환경 변수 관리

---

## 🌐 배포 후 테스트

배포가 완료되면 다음을 확인하세요:

### 1. 메인 페이지 접속
```
https://your-project.vercel.app
```

### 2. AI 채팅 API 테스트
```bash
curl -X POST https://your-project.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "안녕하세요"}]}'
```

---

## 🛠️ 문제 해결

### API 키 오류
만약 "ANTHROPIC_API_KEY가 설정되지 않았습니다" 오류가 발생하면:

1. **Vercel 대시보드** → **프로젝트** → **Settings** → **Environment Variables**
2. `ANTHROPIC_API_KEY`가 올바르게 설정되어 있는지 확인
3. 환경 변수 추가/수정 후 **Redeploy** 필요

### 환경 변수 재설정 (CLI)
```bash
# 기존 환경 변수 삭제
vercel env rm ANTHROPIC_API_KEY production

# 새 환경 변수 추가
vercel env add ANTHROPIC_API_KEY production

# 재배포
vercel --prod
```

### 빌드 오류
```bash
# 로컬에서 빌드 테스트
npm run build

# 빌드 성공하면 재배포
vercel --prod
```

---

## 📊 도메인 연결 (선택사항)

### 커스텀 도메인 추가
1. **Vercel 대시보드** → **프로젝트** → **Settings** → **Domains**
2. 도메인 입력 (예: `careloop.com`)
3. DNS 설정 안내를 따라 설정

---

## 🔒 보안 팁

1. **환경 변수 관리**
   - `.env.local` 파일은 절대 Git에 커밋하지 마세요
   - `.gitignore`에 `.env*.local`이 포함되어 있는지 확인

2. **API 키 보호**
   - Anthropic API 키는 서버 사이드에서만 사용됩니다
   - 클라이언트 사이드에 노출되지 않도록 주의

3. **프로젝트 접근 권한**
   - Vercel 프로젝트 설정에서 팀원 접근 권한 관리

---

## 📚 추가 리소스

- [Vercel 공식 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [Anthropic API 문서](https://docs.anthropic.com/)

---

## 🎉 축하합니다!

CareLoop가 이제 전 세계에서 접근 가능합니다! 🌍

배포 URL: `https://your-project.vercel.app`
