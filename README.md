# 실시간 뉴스 검색 기반 챗봇 서비스

## Newchats

> **네이버 뉴스 검색 API**를 활용하여 최신 뉴스를 수집하고, RAG(Relevance-Augmented Generation) 파이프라인을 통해 답변 정확도를 높인 **실시간 뉴스 기반 챗봇** 프로젝트입니다.

---

### 프로젝트 구성원
- **권해림**
- **김서린**
- **신현학**
- **이두호**

---

## 프로젝트 소개

**Newchats**는 다음과 같은 흐름으로 동작합니다:

1. **실시간 뉴스 수집**  
   네이버 뉴스 검색 API를 활용해 원하는 키워드의 최신 뉴스 기사를 수집합니다.
   
   네이버 뉴스 키워드 검색 실패 시 구글 검색을 통해 뉴스 기사를 수집합니다.

2. **데이터 전처리 및 RAG 파이프라인**  
   수집된 뉴스 기사 데이터를 RAG 모델에 적용하기 위한 형태로 전처리하고, 파인튜닝 또는 모델 구성에 활용합니다.

3. **챗봇 서비스**  
   사용자가 입력한 질문을 분석하고, RAG 모델이 최신 뉴스를 참고하여 실제 상황에 맞는 답변을 제공합니다.

---

## 디렉토리 구조

```bash
Newchats/
├── backend/
│   └── ...      # API 서버 및 RAG 관련 모델 코드
├── frontend/
│   └── ...      # 프론트엔드(웹 UI) 코드
└── docs/
    ├── 발표자료
    ├── 보고서
    └── 실행동영상
```

---

## 주요 기능

- **실시간 뉴스 검색**  
  원하는 키워드로 최신 뉴스를 검색하고, 그 결과를 챗봇에게 전달

- **RAG(Relevance-Augmented Generation) 파이프라인**  
  뉴스 기사와 같은 최신 정보를 모델이 참조하도록 구성하여, 답변의 정확도와 신뢰도 향상

- **유연한 확장성**  
  다른 뉴스 소스나 문서, 데이터베이스 연동 등을 간편하게 추가하고 확장 가능

---

## 배포 링크

1. 백엔드 api 서버 주소

    https://backend-gwangju2-newchats.fly.dev

2. 웹페이지 주소

    https://localhost:1234
---

## 로컬 실행 방법

아래는 로컬 개발 환경에서 프로젝트를 실행하는 단계별 가이드입니다.

1. **프로젝트 클론 받기**  
   ```bash
   git clone https://github.com/your-repo/newchats.git
   cd newchats
   ```

2. **백엔드 설정**
   - `backend` 디렉토리로 이동 후 필요한 패키지 설치  
     ```bash
     cd backend
     pip install -r requirements.txt
     ```
   - 환경 변수 설정 (예: `.env` 파일 또는 터미널에서 직접 설정)  
     ```bash
     export SERP_API_KEY=YOUR_SERP_API_KEY
     export UPSTAGE_API_KEY=YOUR_UPSTAGE_API_KEY
     export OPENAI_API_KEY=YOUR_OPENAI_API_KEY
     export NAVER_CLIENT_ID=YOUR_CLIENT_ID
     export NAVER_CLIENT_SECRET=YOUR_CLIENT_SECRET
     ```
   - 서버 실행  
     ```bash
     python main.py
     ```

3. **프론트엔드 설정**
   - `frontend` 디렉토리로 이동 후 필요한 패키지 설치  
     ```bash
     cd ../frontend
     npm install
     ```
   - 개발 서버 실행  
     ```bash
     npm run dev
     ```
   - 브라우저에서 `http://localhost:1234`으로 접속하여 서비스 확인

---

## 기여 방법

1. **이슈 작성**: 버그 또는 개선 사항에 대해 새로운 이슈를 열거나, 기존 이슈를 확인해주세요.  
2. **브랜치 생성**: 기능 구현이나 버그 수정을 진행할 별도의 브랜치를 생성합니다.  
3. **Pull Request**: 작업이 완료되면 PR을 열어 팀원들과 리뷰 및 병합 과정을 진행합니다.

---

## 라이선스


---

