const sources = [
  {
    title: "Code Connect｜Introduction",
    note: "適用方案與 Seat、CLI／UI 的定位",
    href: "https://developers.figma.com/docs/code-connect/",
  },
  {
    title: "Getting started with Code Connect CLI",
    note: "PAT scopes 與 publish 指令",
    href: "https://developers.figma.com/docs/code-connect/quickstart-guide/",
  },
  {
    title: "Figma MCP｜code-connect-setup.md",
    note: "published component、edit access 與錯誤碼",
    href: "https://github.com/figma/mcp-server-guide/blob/main/skills/figma-generate-library/references/code-connect-setup.md",
  },
  {
    title: "Share libraries in an organization",
    note: "Team／Organization 分享範圍與 Guest 規則",
    href: "https://help.figma.com/hc/en-us/articles/360040529593-Share-libraries-in-an-organization",
  },
  {
    title: "Dev Mode for admins",
    note: "Full、Dev、Collab、View 的明確能力",
    href: "https://help.figma.com/hc/en-us/articles/19813618057623-Dev-Mode-for-admins",
  },
  {
    title: "Manage seats in Figma",
    note: "Admin → People → Seat type",
    href: "https://help.figma.com/hc/en-us/articles/360039960434-Manage-seats-in-Figma",
  },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function Arrow({ label }: { label?: string }) {
  return (
    <div className="arrow" aria-hidden="true">
      {label && <span>{label}</span>}
      <b>→</b>
    </div>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <span className="check">✓</span>
      <span>{children}</span>
    </li>
  );
}

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="回到頁首">
          <span className="brand-mark">CC</span>
          <span>Figma 權限圖解</span>
        </a>
        <nav aria-label="章節導覽">
          <a href="#model">心智模型</a>
          <a href="#permissions">權限</a>
          <a href="#governance">治理</a>
          <a href="#checklist">檢查表</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Figma Library × Code Connect</p>
          <h1>
            先把 <em>Seat、檔案權限、Library、PAT</em> 分開看
          </h1>
          <p className="lede">
            這份指南把 Team、Project、Member、Dev／Full seat 與 Code Connect CLI
            的交互關係，整理成可以直接拿去對齊設計、Web、iOS、Android 與管理員的版本。
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#permissions">直接看發布條件</a>
            <a className="button secondary" href="#governance">看建議治理方式</a>
          </div>
          <p className="updated">依官方文件整理 · 更新於 2026-07-15</p>
        </div>
        <div className="hero-art">
          <img
            src={`${basePath}/permission-flow.png`}
            alt="手繪風格的 Figma Library、Code Connect 與 Web、iOS、Android 程式碼關係圖"
            width={1680}
            height={941}
          />
          <span className="tape tape-a" />
          <span className="tape tape-b" />
        </div>
      </section>

      <section className="quick-truths" aria-label="三個最重要的結論">
        <article>
          <span>01</span>
          <h2>Code Connect 綁元件</h2>
          <p>Mapping 綁在 Library source file 裡的特定 published main component，不是綁 Team 或 Project。</p>
        </article>
        <article>
          <span>02</span>
          <h2>Seat ≠ File permission</h2>
          <p>Seat 決定產品能力；Can view／Can edit 決定帳號能否操作那一份特定檔案。</p>
        </article>
        <article>
          <span>03</span>
          <h2>PAT 不會升權</h2>
          <p>Code Connect: Write 只允許 API 做 mapping 寫入，不會繞過帳號原本的檔案權限。</p>
        </article>
      </section>

      <section className="section" id="model">
        <div className="section-heading">
          <p className="kicker violet">01 · 心智模型</p>
          <h2>元件放一份，其他 Project 都引用同一個來源</h2>
          <p>Project 是檔案容器與權限邊界；Library 決定可重用的設計資產；Code Connect 決定這些資產對應哪一份 production code。</p>
        </div>

        <div className="hierarchy-card">
          <div className="hierarchy-path" aria-label="Figma 資源階層">
            <div className="stack-card org"><small>範圍</small><b>Organization</b><span>Company</span></div>
            <Arrow />
            <div className="stack-card team"><small>成員邊界</small><b>Team</b><span>Design System</span></div>
            <Arrow />
            <div className="stack-card project"><small>檔案容器</small><b>Project</b><span>Core Components</span></div>
            <Arrow />
            <div className="stack-card file"><small>單一來源</small><b>Library file</b><span>UI Components</span></div>
          </div>

          <div className="flow-title">真正的關聯在這裡</div>
          <div className="connection-flow">
            <div className="flow-card published">
              <span className="flow-icon">◇</span>
              <div><small>Library file 內</small><b>Published component</b><p>例如 Button main component</p></div>
            </div>
            <Arrow label="node URL / ID" />
            <div className="flow-card mapping">
              <span className="flow-icon">↔</span>
              <div><small>Code Connect</small><b>Mapping / template</b><p>properties → production snippet</p></div>
            </div>
            <Arrow label="framework label" />
            <div className="code-stack" aria-label="Production code 平台">
              <span>Web · React</span>
              <span>iOS · SwiftUI</span>
              <span>Android · Compose</span>
            </div>
          </div>

          <div className="reuse-grid">
            <div className="reuse-source"><b>同一個 Library source</b><span>Button / TextField / Dialog</span></div>
            <div className="branch-arrows" aria-hidden="true"><span>↙</span><span>↓</span><span>↘</span></div>
            <div className="reuse-targets">
              <div><b>Web Project</b><span>Library instances</span></div>
              <div><b>iOS Project</b><span>Library instances</span></div>
              <div><b>Android Project</b><span>Library instances</span></div>
            </div>
          </div>
          <aside className="note"><b>不要複製 main component 到各 Project。</b>複製後會變成新的 node 與新的來源，Library 更新與既有 mapping 都不再是同一條關係。</aside>
        </div>
      </section>

      <section className="section paper-section" id="library">
        <div className="section-heading split-heading">
          <div>
            <p className="kicker coral">02 · Library 發布</p>
            <h2>你是對 file 執行 Publish，內容是被選中的 assets</h2>
          </div>
          <div className="plain-language">
            <b>一句話版本</b>
            <p>第一次 Publish：這個 file 成為 Library，被選中的 components 成為 published assets。之後新增元件，要再 Publish library changes。</p>
          </div>
        </div>

        <div className="publish-flow">
          <article><span>1</span><b>普通 Figma file</b><p>先建立 main components、styles、variables。</p></article>
          <Arrow />
          <article><span>2</span><b>Publish library</b><p>在 Publish 視窗選擇這次要包含的 assets。</p></article>
          <Arrow />
          <article><span>3</span><b>內部可重用</b><p>指定範圍的其他 files 可從 Assets 使用 instance。</p></article>
        </div>

        <div className="scope-grid">
          <article className="scope-card safe">
            <p className="label">內部發布</p>
            <h3>Team / Organization / Workspace</h3>
            <p>Library 仍留在原 Team／Project，只是讓指定範圍的人能在 Figma 內使用。不是公開網站。</p>
            <ul><Check>Team：只限該 Team 的直接成員</Check><Check>Organization：跨 Team 的組織成員</Check><Check>Workspace：Enterprise 的額外範圍</Check></ul>
          </article>
          <article className="scope-card public">
            <p className="label">公開發布</p>
            <h3>Publish to Community</h3>
            <p>這是另一個完全不同的操作。只有明確發布到 Community，外部 Figma 使用者才會看到或複製。</p>
            <div className="warning">Publish library ≠ Publish to Community</div>
          </article>
        </div>
      </section>

      <section className="section" id="permissions">
        <div className="section-heading">
          <p className="kicker teal">03 · 發布權限</p>
          <h2>CLI publish template 要同時通過五道檢查</h2>
          <p>這不是任一條件「擇一」；五項缺一就可能失敗。</p>
        </div>

        <div className="gate-grid">
          <article><span className="gate-num">1</span><small>Plan</small><b>Organization 或 Enterprise</b><p>Code Connect 的方案條件。</p></article>
          <article><span className="gate-num">2</span><small>Seat</small><b>Dev 或 Full</b><p>兩者皆可使用 Code Connect。</p></article>
          <article><span className="gate-num">3</span><small>Asset</small><b>Component 已發布</b><p>必須是 Library 中的 published component／set。</p></article>
          <article className="critical"><span className="gate-num">4</span><small>File ACL</small><b>Library file：Can edit</b><p>要給 main component 所在 source file，不是只給使用端 Product file。</p></article>
          <article className="critical"><span className="gate-num">5</span><small>PAT scopes</small><b>File content: Read<br />Code Connect: Write</b><p>兩個 scope 都要有。</p></article>
        </div>

        <div className="formula">
          <span>有效 publish 權限</span>
          <b>=</b>
          <code>Seat</code><b>∩</b><code>Published asset</code><b>∩</b><code>File Can edit</code><b>∩</b><code>PAT scopes</code>
        </div>
        <div className="correction">
          <b>容易搞錯的因果：</b>
          <p>Can edit 不是「產生 Code Connect: Write PAT」的前置條件；但真正執行 publish 時，PAT scope 與帳號對 Library source file 的 Can edit 必須同時存在。官方 MCP setup 對 <code>CODE_CONNECT_INSUFFICIENT_PERMISSIONS</code> 的定義就是「No edit access」。</p>
        </div>
      </section>

      <section className="section compare-section" id="seats">
        <div className="section-heading">
          <p className="kicker mustard">04 · Seat 比較</p>
          <h2>Dev vs Full：明確寫「能」與「不能」</h2>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>能力</th><th>Dev seat</th><th>Full seat</th></tr></thead>
            <tbody>
              <tr><td>完整使用 Dev Mode</td><td className="yes">可以</td><td className="yes">可以</td></tr>
              <tr><td>使用 Code Connect</td><td className="yes">可以</td><td className="yes">可以</td></tr>
              <tr><td>查看／留言 Figma Design file</td><td className="yes">可以</td><td className="yes">可以</td></tr>
              <tr><td>編輯 Figma Design canvas</td><td className="no">不可以</td><td><b>可以</b>，仍需 file Can edit</td></tr>
              <tr><td>建立／修改 component、variable、style</td><td className="no">不可以</td><td><b>可以</b>，仍需 file Can edit</td></tr>
              <tr><td>發布／更新 Figma Library 設計資產</td><td className="no">不可以</td><td><b>可以</b>，需 source file Can edit</td></tr>
              <tr><td>CLI publish Code Connect template</td><td><b>可以</b>，需五道條件</td><td><b>可以</b>，需五道條件</td></tr>
            </tbody>
          </table>
        </div>
        <div className="seat-find">
          <div><span>本人確認</span><b>Avatar → Settings → Account → 該 Organization → Seat type</b></div>
          <div><span>管理員確認</span><b>Admin → People → 搜尋帳號 → Seat type</b></div>
        </div>
        <p className="micro-note">同一個 email 在不同 Organization 可能擁有不同 seat；請確認 Library file 所屬 Organization 內的 seat。</p>
      </section>

      <section className="section paper-section" id="access">
        <div className="section-heading">
          <p className="kicker violet">05 · Team、Project、Member</p>
          <h2>權限大致向下繼承，但 Library access 有自己的分享範圍</h2>
        </div>
        <div className="inheritance">
          <div><b>Team permission</b><span>成員與預設存取</span></div><Arrow />
          <div><b>Project permission</b><span>可覆寫 Team 預設</span></div><Arrow />
          <div><b>File permission</b><span>可再單獨分享／覆寫</span></div>
        </div>
        <div className="rules-grid">
          <article><span className="rule-mark">A</span><h3>同 Team、不同 Project</h3><p>Team-level Library 可行，前提是使用者是該 Team 的直接成員。</p></article>
          <article><span className="rule-mark">B</span><h3>跨 Team 使用</h3><p>把 Library 分享給 Organization；Team admin 可把它設成該 Team 的 default library。</p></article>
          <article><span className="rule-mark">C</span><h3>只被邀到 Project／File</h3><p>不等於成為 Team 直接成員，也不保證能使用 Team-only Library。</p></article>
          <article><span className="rule-mark">D</span><h3>Guest</h3><p>不會自動取得組織 Library；通常要直接邀請到 Library source file。</p></article>
        </div>
      </section>

      <section className="section" id="governance">
        <div className="section-heading">
          <p className="kicker coral">06 · 建議治理</p>
          <h2>讓人共用 repo，讓 CI 使用 PAT；不要讓人彼此傳 PAT</h2>
          <p>Web、iOS、Android 可以分工維護 template，但 publish 憑證只留在受保護的 CI secret。</p>
        </div>

        <div className="governance-flow">
          <div className="repo-card">
            <div className="card-head"><span>internal / design-system-code-connect</span><b>main</b></div>
            <div className="folder"><b>web/</b><span>Web team review</span></div>
            <div className="folder"><b>ios/</b><span>iOS team review</span></div>
            <div className="folder"><b>android/</b><span>Android team review</span></div>
          </div>
          <Arrow label="PR → merge" />
          <div className="ci-card">
            <span className="lock">●</span>
            <small>Protected CI</small>
            <b>figma connect publish</b>
            <p>PAT 只存在 secret store</p>
          </div>
          <Arrow label="authorized write" />
          <div className="figma-card"><small>Figma</small><b>Core Library</b><p>少數發布帳號<br />持續 Can edit</p></div>
        </div>

        <div className="governance-notes">
          <article><h3>沒有專用 service account／沒有預算</h3><p>可暫時指定一位穩定的現有 Full-seat Design System owner 產生 PAT，交由一至兩位管理員放入 CI secret。這是折衷，不是理想的長期身分模型。</p></article>
          <article><h3>「設定時一定有人看過 PAT」怎麼辦？</h3><p>確實如此。把知情範圍縮到 token owner 與 CI secret 管理員；設定完成後其他工程師只提交 PR，不接觸 token。設定 expiration、輪替、離職交接與撤銷流程。</p></article>
          <article><h3>為什麼不讓 App／Web 各自分享 PAT？</h3><p>共用個人憑證難以追蹤、撤銷與交接。若組織必須拆開，也應是各自的 CI secret 與各自受控的發布帳號，而不是在聊天工具傳 token。</p></article>
        </div>
      </section>

      <section className="section checklist-section" id="checklist">
        <div className="section-heading light">
          <p className="kicker mustard">07 · Deterministic checklist</p>
          <h2>照這份順序檢查，最快知道卡在哪裡</h2>
        </div>
        <div className="checklist-layout">
          <ol className="steps">
            <li><span>1</span><div><b>確認方案</b><p>Library 所屬 Organization 是 Organization／Enterprise。</p></div></li>
            <li><span>2</span><div><b>確認 seat</b><p>發布帳號在該 Organization 是 Dev 或 Full。</p></div></li>
            <li><span>3</span><div><b>確認 published component</b><p>能從其他 file 的 Assets／Library 找到並插入該特定 component。</p></div></li>
            <li><span>4</span><div><b>確認 source file ACL</b><p>發布帳號對 main component 所在 Library file 是 Can edit。</p></div></li>
            <li><span>5</span><div><b>確認 PAT scopes</b><p>File content: Read + Code Connect: Write，且尚未過期。</p></div></li>
            <li><span>6</span><div><b>先 dry run</b><p><code>npx figma connect publish --dry-run --exit-on-unreadable-files</code></p></div></li>
            <li><span>7</span><div><b>發布後驗收</b><p>Dev Mode 選取 instance，或用 MCP 讀取 mapping，確認 framework label 與 snippet。</p></div></li>
          </ol>
          <div className="errors">
            <h3>常見錯誤 → 直接原因</h3>
            <dl>
              <div><dt>INSUFFICIENT_PERMISSIONS</dt><dd>沒有 Library source file 的 edit access。</dd></div>
              <div><dt>ASSET_NOT_FOUND</dt><dd>目標 component 尚未發布、node URL 錯誤，或不是 main component。</dd></div>
              <div><dt>NO_LIBRARY_FOUND</dt><dd>該 file 尚未被發布為 Figma Library。</dd></div>
              <div><dt>403 Invalid scope(s)</dt><dd>PAT 缺少 File content: Read 或 Code Connect: Write。</dd></div>
              <div><dt>MAPPING_ALREADY_EXISTS</dt><dd>相同 node／label 已有 mapping；先確認 source of truth。</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section sources" id="sources">
        <div className="section-heading">
          <p className="kicker teal">官方來源</p>
          <h2>可回頭核對的文件</h2>
          <p>權限與產品方案可能變動；正式導入前，請再核對以下官方文件。</p>
        </div>
        <div className="source-grid">
          {sources.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noreferrer">
              <span>↗</span><b>{source.title}</b><p>{source.note}</p>
            </a>
          ))}
        </div>
      </section>

      <footer>
        <div><b>核心原則</b><p>Library 決定元件在哪些 Figma files 被使用；Code Connect 決定該 published component 對應哪個 production code。</p></div>
        <a href="#top">回到頁首 ↑</a>
      </footer>
    </main>
  );
}
