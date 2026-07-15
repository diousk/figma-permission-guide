# Figma Library × Code Connect 權限圖解

以繁體中文整理 Figma Team、Project、Member、Seat、Library、PAT 與 Code Connect CLI 的權限關係。

內容重點：

- 跨 Project／跨 Team 共用 Library component 的正確模型
- Library publish 與 Community 公開發布的差異
- Dev seat 與 Full seat 明確能力比較
- Code Connect template publish 的五道必要條件
- Web、iOS、Android 共用 repo 與 CI/PAT 治理建議
- 官方文件、常見錯誤碼與驗證清單

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

## Validation

```bash
npm test
```

主要內容位於 `app/page.tsx`，視覺樣式位於 `app/globals.css`。
