/* ============================
   Portfolio + Admin Panel
   Хранение: localStorage
   ============================ */

const PASSWORD = "Trent_only9";
const LS_PROJECTS = "portfolio_projects";
const LS_SOCIALS = "portfolio_socials";
const LS_AUTH = "portfolio_auth";

/* ---------- Дефолтные данные ---------- */
const defaultProjects = [
  { title: "EKI Studio", url: "https://eki.my.id" },
  { title: "Ahmed Ragab", url: "https://ahmedragab.netlify.app" },
  { title: "Nova Lab", url: "https://example.com" },
  { title: "Pixel Forge", url: "https://example.com" },
  { title: "Lumen", url: "https://example.com" },
  { title: "Atlas", url: "https://example.com" },
];

const defaultSocials = [
  { name: "GitHub",   url: "https://github.com",   icon: "github" },
  { name: "Twitter",  url: "https://twitter.com",  icon: "twitter" },
  { name: "Telegram", url: "https://t.me",         icon: "telegram" },
  { name: "Email",    url: "mailto:hi@example.com",icon: "email" },
  { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
];

/* ---------- SVG-иконки ---------- */
const ICONS = {
  github:   `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.13c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg>`,
  twitter:  `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  telegram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>`,
  email:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>`,
  link:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 1 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 1 0 7.07 7.07l1.71-1.71"/></svg>`
};

/* ---------- Хранилище ---------- */
const Store = {
  getProjects(){ return JSON.parse(localStorage.getItem(LS_PROJECTS)) || defaultProjects; },
  setProjects(p){ localStorage.setItem(LS_PROJECTS, JSON.stringify(p)); },
  getSocials(){ return JSON.parse(localStorage.getItem(LS_SOCIALS)) || defaultSocials; },
  setSocials(s){ localStorage.setItem(LS_SOCIALS, JSON.stringify(s)); },
};

/* ---------- Цветовые градиенты для плашек ---------- */
const palettes = [
  ["#7c5cff","#c9ff3b"],
  ["#ff6b6b","#feca57"],
  ["#48dbfb","#7c5cff"],
  ["#1dd1a1","#48dbfb"],
  ["#ff9ff3","#7c5cff"],
  ["#feca57","#ff6b6b"],
  ["#54a0ff","#1dd1a1"],
  ["#c9ff3b","#48dbfb"],
];
function hashIdx(str){
  let h = 0;
  for(let i=0;i<str.length;i++) h = (h*31 + str.charCodeAt(i)) >>> 0;
  return h % palettes.length;
}

/* ---------- Рендер проектов ---------- */
function renderProjects(){
  const grid = document.getElementById("projectsGrid");
  const projects = Store.getProjects();
  grid.innerHTML = projects.map(p=>{
    const [c1,c2] = palettes[hashIdx(p.title)];
    return `
      <article class="project-card">
        <div class="project-thumb" style="--bg-color-1:${c1};--bg-color-2:${c2}">
          <div class="project-thumb-text">${escapeHtml(p.title)}</div>
        </div>
        <div class="project-body">
          <h3>${escapeHtml(p.title)}</h3>
          <p>${escapeHtml(p.url)}</p>
          <a class="project-link" href="${escapeAttr(p.url)}" target="_blank" rel="noopener">
            Открыть проект →
          </a>
        </div>
      </article>
    `;
  }).join("");
}

/* ---------- Рендер соцсетей ---------- */
function renderSocials(){
  const socials = Store.getSocials();
  const html = socials.map(s=>{
    const icon = ICONS[s.icon] || ICONS.link;
    return `<a class="social-link" href="${escapeAttr(s.url)}" target="_blank" rel="noopener" title="${escapeAttr(s.name)}">${icon}</a>`;
  }).join("");
  document.getElementById("heroSocials").innerHTML = html;
  document.getElementById("footerSocials").innerHTML = html;
}

/* ---------- Утилиты ---------- */
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function escapeAttr(s){return escapeHtml(s)}

/* ---------- Модалки ---------- */
function openModal(id){ document.getElementById(id).classList.add("show"); }
function closeModal(id){ document.getElementById(id).classList.remove("show"); }
document.querySelectorAll("[data-close]").forEach(b=>{
  b.addEventListener("click",e=>e.target.closest(".modal").classList.remove("show"));
});
document.querySelectorAll(".modal").forEach(m=>{
  m.addEventListener("click",e=>{ if(e.target===m) m.classList.remove("show"); });
});

/* ---------- Открытие админки ---------- */
// Триггеры: 1) клик по невидимой плашке в углу 2) шорткат Ctrl+Shift+A
document.getElementById("adminTrigger").addEventListener("click", showLoginOrAdmin);
document.addEventListener("keydown", e=>{
  if(e.ctrlKey && e.shiftKey && e.key.toLowerCase()==="a"){ e.preventDefault(); showLoginOrAdmin(); }
});
function showLoginOrAdmin(){
  if(sessionStorage.getItem(LS_AUTH)==="1"){
    openAdmin();
  } else {
    openModal("loginModal");
    setTimeout(()=>document.getElementById("passwordInput").focus(),50);
  }
}

/* ---------- Логин ---------- */
const loginBtn = document.getElementById("loginBtn");
const passInput = document.getElementById("passwordInput");
const loginError = document.getElementById("loginError");
loginBtn.addEventListener("click", tryLogin);
passInput.addEventListener("keydown", e=>{ if(e.key==="Enter") tryLogin(); });
function tryLogin(){
  if(passInput.value === PASSWORD){
    sessionStorage.setItem(LS_AUTH,"1");
    passInput.value=""; loginError.textContent="";
    closeModal("loginModal");
    openAdmin();
  } else {
    loginError.textContent = "Неверный пароль";
  }
}
document.getElementById("logoutBtn").addEventListener("click",()=>{
  sessionStorage.removeItem(LS_AUTH);
  closeModal("adminModal");
});

/* ---------- Админ-панель ---------- */
function openAdmin(){
  renderAdminProjects();
  renderAdminSocials();
  openModal("adminModal");
}

// Tabs
document.querySelectorAll(".tab").forEach(t=>{
  t.addEventListener("click",()=>{
    document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(x=>x.classList.remove("active"));
    t.classList.add("active");
    document.querySelector(`.tab-content[data-content="${t.dataset.tab}"]`).classList.add("active");
  });
});

// Projects admin
const adminList = document.getElementById("adminProjectsList");
function renderAdminProjects(){
  const items = Store.getProjects();
  adminList.innerHTML = items.map((p,i)=>`
    <li>
      <input type="text" data-i="${i}" data-f="title" value="${escapeAttr(p.title)}" />
      <input type="url"  data-i="${i}" data-f="url"   value="${escapeAttr(p.url)}" />
      <button class="icon-btn" data-action="save" data-i="${i}" title="Сохранить">✓</button>
      <button class="icon-btn danger" data-action="del" data-i="${i}" title="Удалить">×</button>
    </li>
  `).join("");
}
adminList.addEventListener("click",e=>{
  const btn = e.target.closest("button");
  if(!btn) return;
  const i = +btn.dataset.i;
  const items = Store.getProjects();
  if(btn.dataset.action==="del"){
    items.splice(i,1);
    Store.setProjects(items);
    renderAdminProjects(); renderProjects();
  }
  if(btn.dataset.action==="save"){
    const li = btn.closest("li");
    items[i].title = li.querySelector('[data-f="title"]').value.trim() || "Untitled";
    items[i].url   = li.querySelector('[data-f="url"]').value.trim() || "#";
    Store.setProjects(items);
    renderAdminProjects(); renderProjects();
  }
});
document.getElementById("addProjectBtn").addEventListener("click",()=>{
  const title = document.getElementById("projTitle").value.trim();
  const url = document.getElementById("projUrl").value.trim();
  if(!title || !url) return alert("Заполните оба поля");
  const items = Store.getProjects();
  items.unshift({title,url});
  Store.setProjects(items);
  document.getElementById("projTitle").value="";
  document.getElementById("projUrl").value="";
  renderAdminProjects(); renderProjects();
});

// Socials admin
const adminSoc = document.getElementById("adminSocialsList");
function renderAdminSocials(){
  const items = Store.getSocials();
  adminSoc.innerHTML = items.map((s,i)=>`
    <li>
      <input type="text" data-i="${i}" data-f="name" value="${escapeAttr(s.name)}" placeholder="Название" />
      <input type="url"  data-i="${i}" data-f="url"  value="${escapeAttr(s.url)}"  placeholder="Ссылка" />
      <select data-i="${i}" data-f="icon" class="icon-select">
        ${Object.keys(ICONS).map(k=>`<option value="${k}" ${k===s.icon?"selected":""}>${k}</option>`).join("")}
      </select>
      <button class="icon-btn danger" data-action="delsoc" data-i="${i}">×</button>
    </li>
  `).join("");
  // стиль для select
  adminSoc.querySelectorAll(".icon-select").forEach(sel=>{
    Object.assign(sel.style,{padding:"8px 12px",borderRadius:"8px",background:"var(--bg)",color:"var(--text)",border:"1px solid var(--border)",fontFamily:"inherit",fontSize:"13px"});
  });
}
adminSoc.addEventListener("click",e=>{
  const btn = e.target.closest("button");
  if(!btn) return;
  if(btn.dataset.action==="delsoc"){
    const items = Store.getSocials();
    items.splice(+btn.dataset.i,1);
    Store.setSocials(items);
    renderAdminSocials(); renderSocials();
  }
});
document.getElementById("saveSocialsBtn").addEventListener("click",()=>{
  const items = [];
  adminSoc.querySelectorAll("li").forEach(li=>{
    items.push({
      name: li.querySelector('[data-f="name"]').value.trim() || "Link",
      url:  li.querySelector('[data-f="url"]').value.trim()  || "#",
      icon: li.querySelector('[data-f="icon"]').value
    });
  });
  Store.setSocials(items);
  renderSocials();
  alert("Сохранено");
});

/* ---------- Init ---------- */
renderProjects();
renderSocials();
document.getElementById("year").textContent = new Date().getFullYear();
