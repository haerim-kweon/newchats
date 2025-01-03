<a href="https://ssafy-2024-ai.vercel.app/" target="_blank">
   <img src="./img/example.png" width="100%"> 
</a>


<br/>
<br/>

# 1. Project Overview (프로젝트 개요)
- 프로젝트 이름: NewChats
- 프로젝트 설명: AI를 활용한 뉴스 요약 챗봇
- 개발 기간 : 2024.12.30 - 2025.01.02
- 프로젝트 소개 
  - 사용자의 질문에 대해 네이버 및 구글의 최신 정보를 검색하고, 가장 관련성 높은 정보를 기반으로 AI가 답변을 생성
  - 검색과 AI 생성 모델을 결합한 RAG 기반 어시스턴트


<br/>
<br/>

# 2. Team Members (팀원 및 팀 소개)
| 신현학 | 권해림 | 김서린 | 이두호 |
|:------:|:------:|:------:|:------:|
| 팀장 | 팀원 | 팀원 | 팀원 |
| [GitHub](https://github.com/Carpediem324) | [GitHub](https://github.com/haerim-kweon) | [GitHub](https://github.com/Kim0330) | [GitHub](https://github.com/dlencie) |

<br/>
<br/>

# 3. Key Features (주요 기능)
- **챗봇**:
  - 사용자가 입력한 질문을 분석하고, RAG 모델이 최신 뉴스를 참고하여 실제 상황에 맞는 답변을 제공합니다.
- **실시간 검색**:
  - 사용자가 입력한 질문을 분석하고, RAG 모델이 최신 뉴스를 참고하여 실제 상황에 맞는 답변을 제공합니다.
- **데이터 전처리 및 RAG 파이프라인** :
  - 수집된 뉴스 기사 데이터를 RAG 모델에 적용하기 위한 형태로 전처리하고, 파인튜닝 또는 모델 구성에 활용합니다.
 
  
  

<br/>
<br/>


# 4. Technology Stack (기술 스택)
## 4.1 Language
|  |  |  |
|-----------------|-----------------|-----------------|
| Backend | Python  |  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white"/>| 
| Frontend | Javascript    |    <img src="https://img.shields.io/badge/Javascript-EE4C2C?style=for-the-badge&logo=Javascript&logoColor=white"/>|

<br/>
<br/>

## 4.2 API
|  |  |
|-----------------|-----------------|
| OpenAI Assistant    |     |
| Naver OpenAPI   |  - 사용자 메세지에서 추출된 키워드로 실시간 뉴스 검색   |
| Google SerpAPI    | - 검색 엔진에서 웹 데이터 수집 <br/> - 사용자 질문 기반으로 질의를 재구성하여 API 호출  |
| Upstage API    |  - AI 모델 호출 및 임베딩 생성  <br/> - 검색어 추출, 질의 확장, 벡터화 등|

<br/>
<br/>

## 4.3 Release
|  |  |  |  |
|-----------------|-----------------|-----------------|-----------------|
| Backend | Fly.io    |  <img src="https://img.shields.io/badge/flydotio-24175B?style=for-the-badge&logo=flydotio&logoColor=white"/> | https://backend-gwangju2-newchats.fly.dev |
| Frontend | vercel  |  <img src="https://img.shields.io/badge/vercel-cccccc?style=for-the-badge&logo=vercel&logoColor=white"/> | https://ssafy-2024-ai.vercel.app/ |


<br/>
<br/>


## 5. 디렉토리 구조
```
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

## 6. 로컬 실행 방법

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
     python app.py
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
