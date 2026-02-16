# 🔧 TF2 Trade Calculator

Team Fortress 2 거래 시 필요한 화폐 단위 변환 계산기입니다.

정제금속(Refined Metal), 키(Key), 원화(KRW) 간 실시간 변환을 지원합니다.

## 🌐 바로 사용하기

**→ [https://umbrellafig.github.io/tf2-calc/tf2-calculator.html](https://umbrellafig.github.io/tf2-calc/tf2-calculator.html)**

별도 설치 없이 브라우저에서 바로 사용할 수 있습니다.

Notion 페이지에 `/embed` 블록으로 삽입하여 사용할 수도 있습니다.

## 주요 기능

- **양방향 자동 변환** — 정제금속, 키, 원화 중 하나만 입력하면 나머지가 자동 계산됩니다.
- **backpack.tf 연동** — GitHub Actions가 15분마다 키 가격과 ToD Ticket 가격을 자동으로 가져옵니다.
- **빠른 참조** — ToD Ticket, Key 등 자주 쓰는 아이템의 환산 값을 한눈에 확인할 수 있습니다.
- **환율 설정** — 설정 패널에서 키당 원화 가격을 직접 조정할 수 있습니다.

## 구조

```
tf2-calc/
├── tf2-calculator.html          # 계산기 (메인 페이지)
├── config.json                   # 환율 데이터 (GitHub Actions가 자동 갱신)
└── .github/workflows/
    └── update-prices.yml         # backpack.tf 가격 자동 수집 워크플로우
```

## 설정

### backpack.tf API 연동

1. [backpack.tf Developer](https://backpack.tf/developer/apikey/view)에서 API 키를 발급받습니다.
2. GitHub 리포지토리 → Settings → Secrets and variables → Actions에서 `BPTF_API_KEY` 시크릿을 등록합니다.
3. Actions 탭에서 "Update TF2 Prices" 워크플로우를 수동 실행하여 정상 동작을 확인합니다.

### 원화 환율 수정

`config.json`의 `keyPriceKRW` 값을 수정하면 됩니다. 이 값은 GitHub Actions가 덮어쓰지 않습니다.
