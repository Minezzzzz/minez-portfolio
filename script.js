const portfolioData = [
  {
    id: "projeto-destaque",
    number: "01",
    category: "Design",
    title: "Seleção principal — em curadoria",
    discipline: "Projeto em destaque",
    nature: "Em preparação",
    year: "2026",
    role: "Função a definir",
    tools: "Ferramentas a definir",
    art: "book",
    summary: "Esta primeira posição fica reservada ao trabalho que melhor representa a direção que queres seguir.",
    briefing: "Substitui este texto por um resumo claro do problema: quem fez o pedido, para que público, com que objetivo e dentro de que limitações.",
    contribution: "Explica exatamente o que fizeste. Se o projeto foi de grupo, separa a tua contribuição do trabalho da equipa e inclui os créditos.",
    process: "Mostra duas a quatro decisões que mudaram o resultado: pesquisa, esboços, testes, storyboard, protótipo, direção visual ou iterações.",
    result: "Apresenta o resultado final em contexto e acrescenta apenas evidência real: feedback, testes, desempenho, alcance ou cumprimento dos objetivos.",
    learning: "Fecha com uma reflexão curta sobre o que aprendeste, o que melhorarias e como este trabalho influenciou o projeto seguinte."
  },
  {
    id: "identidade-visual",
    number: "02",
    category: "Design",
    title: "Identidade visual — em curadoria",
    discipline: "Identidade & design gráfico",
    nature: "Académico / pessoal",
    year: "2026",
    role: "Direção visual a definir",
    tools: "Ferramentas a definir",
    art: "identity",
    summary: "Reserva este caso para uma identidade aplicada como sistema, e não apenas para um logótipo isolado.",
    briefing: "Identifica a organização, evento ou produto, o seu público e a perceção que a identidade precisa de criar.",
    contribution: "Distingue conceito, logótipo, tipografia, paleta, composição, direção de arte e aplicações que produziste.",
    process: "Mostra território visual, ideias rejeitadas, construção do sistema e testes em diferentes escalas e suportes.",
    result: "Inclui as aplicações mais relevantes: cartaz, editorial, sinalética, redes sociais, embalagem ou motion.",
    learning: "Regista o que tornou o sistema coerente e onde seria necessário aprofundar a implementação."
  },
  {
    id: "experiencia-web",
    number: "03",
    category: "Web",
    title: "Experiência web — em curadoria",
    discipline: "Web design & front-end",
    nature: "Pessoal / cliente",
    year: "2026",
    role: "UX, UI e código a definir",
    tools: "HTML · CSS · JavaScript",
    art: "web",
    summary: "Usa este espaço para uma experiência web funcional, responsiva e acessível.",
    briefing: "Resume o problema, as tarefas principais do utilizador e as restrições de conteúdo, tecnologia e prazo.",
    contribution: "Indica se fizeste pesquisa, arquitetura, wireframes, interface, protótipo, desenvolvimento ou testes.",
    process: "Mostra o percurso entre grelha, sistema visual, componentes, estados responsivos e iterações após testes.",
    result: "Liga ao site e ao código quando existirem. Acrescenta resultados reais de acessibilidade, desempenho ou testes.",
    learning: "Explica uma decisão técnica ou de experiência que voltarias a aplicar noutro projeto."
  },
  {
    id: "video-motion",
    number: "04",
    category: "Vídeo + Motion",
    title: "Vídeo ou motion — em curadoria",
    discipline: "Vídeo & motion",
    nature: "Académico / pessoal",
    year: "2026",
    role: "Conceito e animação a definir",
    tools: "Ferramentas a definir",
    art: "motion",
    summary: "Apresenta uma peça curta onde ritmo, composição, som e movimento trabalham em conjunto.",
    briefing: "Define formato, duração, plataforma, público e mensagem antes de mostrares os frames finais.",
    contribution: "Indica o teu papel em conceito, guião, storyboard, design, animação, edição, som e finalização.",
    process: "Inclui storyboard, styleframes e duas ou três decisões de timing, transição ou linguagem de movimento.",
    result: "Mostra a peça com poster, legendas e controlos. Identifica música, som e restantes créditos.",
    learning: "Reflete sobre legibilidade, ritmo e o que os testes sem som revelaram."
  },
  {
    id: "serie-fotografica",
    number: "05",
    category: "Fotografia",
    title: "Série fotográfica — em curadoria",
    discipline: "Fotografia & pós-produção",
    nature: "Pessoal / editorial",
    year: "2026",
    role: "Direção e fotografia a definir",
    tools: "Ferramentas a definir",
    art: "photo",
    summary: "Escolhe uma série curta com conceito e sequência, em vez de fotografias soltas sem contexto.",
    briefing: "Apresenta o tema, a intenção narrativa, a abordagem visual e as condições de produção.",
    contribution: "Explica direção de arte, produção, iluminação, captação, seleção, cor e paginação que realizaste.",
    process: "Mostra contactos, escolhas de sequência e como tratamento, enquadramento e luz servem a ideia.",
    result: "Publica 10–15 imagens fortes numa sequência deliberada e, se fizer sentido, uma pequena zine.",
    learning: "Regista o que aprendeste sobre seleção, consistência e edição de uma narrativa fotográfica."
  },
  {
    id: "estudo-3d",
    number: "06",
    category: "3D",
    title: "Estudo 3D — em curadoria",
    discipline: "3D & imagem digital",
    nature: "Académico / pessoal",
    year: "2026",
    role: "3D e direção de arte a definir",
    tools: "Ferramentas a definir",
    art: "3d",
    summary: "Usa este caso para mostrar forma, materiais, iluminação e composição, incluindo o trabalho antes do render final.",
    briefing: "Define o objeto, a referência visual, o contexto de comunicação e os formatos finais.",
    contribution: "Especifica modelação, UV, texturas, materiais, iluminação, animação, render e pós-produção.",
    process: "Inclui referências, wireframe, clay render, testes de material e uma decisão importante de luz.",
    result: "Apresenta imagens finais, um loop curto ou peças de campanha, sem esconder os créditos de recursos externos.",
    learning: "Explica o que melhorarias na topologia, nos materiais, na otimização ou na direção de arte."
  }
];

const projectGrid = document.querySelector("#project-grid");
const filterStatus = document.querySelector("#filter-status");
const previewArt = document.querySelector("[data-preview-art]");
const previewNumber = document.querySelector("[data-preview-number]");
const previewDiscipline = document.querySelector("[data-preview-discipline]");
const previewNature = document.querySelector("[data-preview-nature]");
const previewYear = document.querySelector("[data-preview-year]");
const projectPreview = document.querySelector("#project-preview");
const dialog = document.querySelector("#project-dialog");
const dialogContent = document.querySelector("#dialog-content");
const dialogClose = document.querySelector(".dialog-close");
const menuToggle = document.querySelector(".menu-toggle");
const menuLabel = document.querySelector(".menu-label");
const mainNav = document.querySelector("#main-nav");
const siteHeader = document.querySelector("[data-header]");
const progressBar = document.querySelector(".scroll-progress span");
const chapterLabel = document.querySelector("[data-chapter]");
const pageMain = document.querySelector("main");
const pageFooter = document.querySelector(".site-footer");
const labSection = document.querySelector(".lab");
const labToggle = document.querySelector(".lab-toggle");
const labToggleLabel = labToggle?.querySelector("span");
const labExtras = [...document.querySelectorAll(".lab-extra")];
const toast = document.querySelector("#toast");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let reducedMotion = reducedMotionQuery.matches;

let activeFilter = "Todos";
let activePreviewId = null;
let lastDialogTrigger = null;
let toastTimer = null;
let revealObserver = null;
let previewTimer = null;
let menuFocusTimer = null;
let scrollTicking = false;

function artworkMarkup(type) {
  const artworks = {
    book: '<div class="proof-composition"></div>',
    identity: '<div class="identity-board"></div>',
    web: '<div class="browser-mock"></div>',
    motion: '<div class="motion-shape"></div>',
    photo: '<div class="photo-frame"></div>',
    "3d": '<div class="object-3d"></div>'
  };

  return artworks[type] || artworks.book;
}

function projectArtClass(project) {
  return `art-${project.art}`;
}

function projectRow(project) {
  return `
    <article class="project-row reveal" data-project-row="${project.id}">
      <button class="project-button" type="button" data-project="${project.id}" aria-haspopup="dialog" aria-controls="project-dialog" aria-label="Abrir ficha editorial: ${project.title}">
        <span class="project-number">${project.number}</span>
        <span class="project-info">
          <span class="project-title">${project.title}</span>
          <span class="project-discipline">${project.discipline}</span>
        </span>
        <span class="project-status">Em curadoria</span>
        <span class="project-arrow" aria-hidden="true">→</span>
        <span class="project-mobile-art project-art ${projectArtClass(project)}" aria-hidden="true">${artworkMarkup(project.art)}</span>
      </button>
    </article>
  `;
}

function visibleProjects(filter = activeFilter) {
  return filter === "Todos"
    ? portfolioData
    : portfolioData.filter((project) => project.category === filter);
}

function renderProjects(filter = activeFilter) {
  const projects = visibleProjects(filter);
  projectGrid.innerHTML = projects.map(projectRow).join("");
  filterStatus.textContent = `${projects.length} ${projects.length === 1 ? "projeto apresentado" : "projetos apresentados"} na categoria ${filter}.`;
  registerReveals(projectGrid.querySelectorAll(".reveal"));

  if (projects[0]) {
    updatePreview(projects[0], true);
  }
}

function setActiveRow(projectId) {
  projectGrid.querySelectorAll("[data-project-row]").forEach((row) => {
    row.classList.toggle("is-active", row.dataset.projectRow === projectId);
  });
}

function updatePreview(project, immediate = false) {
  if (!project || activePreviewId === project.id) {
    setActiveRow(project?.id);
    return;
  }

  activePreviewId = project.id;
  setActiveRow(project.id);

  const applyPreview = () => {
    previewArt.className = `preview-art ${projectArtClass(project)}`;
    previewArt.innerHTML = artworkMarkup(project.art);
    previewNumber.textContent = project.number;
    previewDiscipline.textContent = project.discipline;
    previewNature.textContent = project.nature;
    previewYear.textContent = project.year;
    projectPreview.setAttribute("aria-label", `Pré-visualização de ${project.title}`);
    requestAnimationFrame(() => previewArt.classList.remove("is-changing"));
  };

  window.clearTimeout(previewTimer);
  if (immediate || reducedMotion) {
    applyPreview();
    return;
  }

  previewArt.classList.add("is-changing");
  previewTimer = window.setTimeout(applyPreview, 150);
}

function caseStudyMarkup(project) {
  return `
    <section class="case-hero">
      <div class="case-heading">
        <span class="case-label">Arquivo Minez · ficha editorial</span>
        <h2 id="dialog-title">${project.title}</h2>
        <p>${project.summary}</p>
      </div>
      <div class="case-visual" aria-hidden="true">
        <div class="project-art ${projectArtClass(project)}">${artworkMarkup(project.art)}</div>
      </div>
    </section>

    <div class="case-meta">
      <div><small>Área</small><strong>${project.discipline}</strong></div>
      <div><small>Natureza</small><strong>${project.nature}</strong></div>
      <div><small>Estado</small><strong>Em curadoria</strong></div>
      <div><small>Ano</small><strong>${project.year}</strong></div>
    </div>

    <div class="case-body">
      <aside><p>Em<br>curadoria.</p></aside>
      <div class="case-sections">
        <section class="case-section">
          <h3>01 / O lugar deste projeto</h3>
          <p>${project.summary}</p>
        </section>
        <section class="case-section">
          <h3>02 / Próxima edição</h3>
          <p>O estudo completo será publicado quando a seleção visual, o processo e os créditos estiverem prontos. Assim, o arquivo cresce sem confundir trabalho em curso com trabalho final.</p>
          <div class="case-progress" aria-label="Etapas editoriais do projeto">
            <span class="is-current">Seleção</span><span>Documentação</span><span>Publicação</span>
          </div>
        </section>
      </div>
    </div>
  `;
}

function openProject(projectId, trigger) {
  const project = portfolioData.find((item) => item.id === projectId);
  if (!project) return;

  lastDialogTrigger = trigger || document.activeElement;
  dialogContent.innerHTML = caseStudyMarkup(project);
  document.body.classList.add("dialog-open");

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }

  dialog.scrollTop = 0;
  window.requestAnimationFrame(() => dialogClose.focus());
}

function closeProject() {
  if (dialog.open && typeof dialog.close === "function") {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
    handleDialogClosed();
  }
}

function handleDialogClosed() {
  document.body.classList.remove("dialog-open");
  if (lastDialogTrigger) {
    lastDialogTrigger.focus();
    lastDialogTrigger = null;
  }
}

function setMenu(open, restoreFocus = false) {
  window.clearTimeout(menuFocusTimer);
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuLabel.textContent = open ? "Fechar" : "Menu";
  pageMain.inert = open;
  pageFooter.inert = open;

  if (open) {
    menuFocusTimer = window.setTimeout(() => mainNav.querySelector("a")?.focus(), reducedMotion ? 0 : 300);
  } else if (restoreFocus) {
    menuToggle.focus();
  }
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3600);
}

function registerReveals(elements) {
  const items = [...elements];
  if (!items.length) return;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -4%" });
  }

  items.forEach((item) => revealObserver.observe(item));
}

function updateScrollUI() {
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0;
  progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 10);
  scrollTicking = false;
}

function setupNavObserver() {
  if (!("IntersectionObserver" in window)) return;
  const navLinks = [...mainNav.querySelectorAll("a")];
  const targets = ["inicio", "trabalho", "perfil", "lab", "contacto"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const chapters = {
    inicio: "00 / Início",
    trabalho: "01 / Projetos",
    perfil: "02 / Sobre",
    lab: "03 / Laboratório",
    contacto: "04 / Contacto"
  };

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;

    if (chapterLabel) {
      chapterLabel.textContent = chapters[visible.target.id] || chapters.inicio;
    }

    navLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${visible.target.id}`;
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-30% 0px -58%", threshold: [0, 0.1, 0.25] });

  targets.forEach((target) => observer.observe(target));
}

document.querySelector(".filters")?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;

  const applyFilter = () => {
    activeFilter = button.dataset.filter;
    activePreviewId = null;
    document.querySelectorAll("[data-filter]").forEach((filter) => {
      const selected = filter === button;
      filter.classList.toggle("is-active", selected);
      filter.setAttribute("aria-pressed", String(selected));
    });
    renderProjects(activeFilter);
  };

  if (!reducedMotion && typeof document.startViewTransition === "function") {
    document.startViewTransition(applyFilter);
  } else {
    applyFilter();
  }

  if (window.innerWidth <= 840) {
    button.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest", inline: "center" });
  }
});

projectGrid.addEventListener("pointerover", (event) => {
  const button = event.target.closest("[data-project]");
  if (!button) return;
  updatePreview(portfolioData.find((project) => project.id === button.dataset.project));
});

projectGrid.addEventListener("focusin", (event) => {
  const button = event.target.closest("[data-project]");
  if (!button) return;
  updatePreview(portfolioData.find((project) => project.id === button.dataset.project));
});

projectGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-project]");
  if (!button) return;
  openProject(button.dataset.project, button);
});

dialogClose.addEventListener("click", closeProject);
dialog.addEventListener("close", handleDialogClosed);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeProject();
});

dialog.addEventListener("keydown", (event) => {
  if (event.key !== "Tab") return;

  const focusable = [...dialog.querySelectorAll("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])")]
    .filter((element) => !element.hidden);
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const leavingStart = event.shiftKey && document.activeElement === first;
  const leavingEnd = !event.shiftKey && document.activeElement === last;

  if (leavingStart || leavingEnd) {
    event.preventDefault();
    (leavingStart ? last : first).focus();
  }
});

menuToggle.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});

mainNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (document.body.classList.contains("menu-open")) {
    setMenu(false, true);
  }
});

labToggle?.addEventListener("click", () => {
  const opening = labToggle.getAttribute("aria-expanded") !== "true";
  labToggle.setAttribute("aria-expanded", String(opening));
  labSection.classList.toggle("is-expanded", opening);
  labToggleLabel.textContent = opening ? "Ver menos" : "Ver todos os estudos";
  labExtras.forEach((card) => {
    card.hidden = !opening;
    if (opening) card.classList.add("is-visible");
  });
});

window.addEventListener("scroll", () => {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(updateScrollUI);
}, { passive: true });

window.addEventListener("resize", () => {
  if (window.innerWidth > 840 && document.body.classList.contains("menu-open")) {
    setMenu(false);
  }
});

reducedMotionQuery.addEventListener?.("change", (event) => {
  reducedMotion = event.matches;
});

renderProjects();
registerReveals(document.querySelectorAll(".reveal"));
setupNavObserver();
updateScrollUI();
