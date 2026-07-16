const PROJECTS_URL = "./projects.json";
const PROJECT_HASH_PREFIX = "#projeto/";
const FILTER_ORDER = ["Design", "Web", "Vídeo + Motion", "Fotografia", "3D"];
const ART_BY_CATEGORY = {
  Design: "identity",
  Web: "web",
  "Vídeo + Motion": "motion",
  Fotografia: "photo",
  "3D": "3d",
  Multimédia: "book"
};

let portfolioData = [];

const projectGrid = document.querySelector("#project-grid");
const filterGroup = document.querySelector(".filters");
const filterStatus = document.querySelector("#filter-status");
const previewArt = document.querySelector("[data-preview-art]");
const previewNumber = document.querySelector("[data-preview-number]");
const previewDiscipline = document.querySelector("[data-preview-discipline]");
const previewNature = document.querySelector("[data-preview-nature]");
const previewYear = document.querySelector("[data-preview-year]");
const previewProof = document.querySelector("[data-preview-proof]");
const previewNote = document.querySelector("[data-preview-note]");
const previewHint = document.querySelector("[data-preview-hint]");
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

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeText(value, fallback) {
  const text = typeof value === "string" || typeof value === "number"
    ? String(value).trim()
    : "";
  return text || fallback;
}

function safeLocalMediaUrl(value) {
  if (typeof value !== "string" || !value.trim()) return "";

  try {
    const resolved = new URL(value.trim(), document.baseURI);
    return resolved.origin === window.location.origin ? value.trim() : "";
  } catch {
    return "";
  }
}

function safeLinkUrl(value) {
  if (typeof value !== "string" || !value.trim()) return "";

  try {
    const resolved = new URL(value.trim(), document.baseURI);
    return ["http:", "https:", "mailto:"].includes(resolved.protocol) ? value.trim() : "";
  } catch {
    return "";
  }
}

function normalizeMedia(media, index = 0) {
  if (typeof media === "string") {
    const src = safeLocalMediaUrl(media);
    if (!src) return null;

    return {
      src,
      alt: "",
      caption: "",
      type: /\.(mp4|webm|ogg)$/i.test(src) ? "video" : "image",
      poster: ""
    };
  }

  if (!media || typeof media !== "object") return null;
  const src = safeLocalMediaUrl(media.src);
  if (!src && index > 0) return null;

  return {
    src,
    alt: safeText(media.alt, ""),
    caption: safeText(media.caption, ""),
    type: media.type === "video" || /\.(mp4|webm|ogg)$/i.test(src) ? "video" : "image",
    poster: safeLocalMediaUrl(media.poster)
  };
}

function normalizeLinks(links) {
  if (Array.isArray(links)) {
    return links
      .map((link) => ({
        label: safeText(link?.label, "Ver ligação"),
        url: safeLinkUrl(link?.url)
      }))
      .filter((link) => link.url);
  }

  if (links && typeof links === "object") {
    return Object.entries(links)
      .map(([label, url]) => ({ label: safeText(label, "Ver ligação"), url: safeLinkUrl(url) }))
      .filter((link) => link.url);
  }

  return [];
}

function categoryFromTags(tags) {
  return FILTER_ORDER.find((category) => (
    tags.some((tag) => tag.toLocaleLowerCase("pt-PT") === category.toLocaleLowerCase("pt-PT"))
  )) || "Multimédia";
}

function hasUnconfirmedContent(project) {
  return [
    project.title,
    project.year,
    project.role,
    project.pitch,
    project.context,
    project.process,
    project.challenges,
    project.outcome
  ].some((value) => value.includes("[A CONFIRMAR"));
}

function normalizeProject(rawProject, sourceIndex) {
  if (!rawProject || typeof rawProject !== "object") return null;

  const slug = safeText(rawProject.slug, "");
  const title = safeText(rawProject.title, "");
  if (!title || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    console.warn(`Projeto ignorado na posição ${sourceIndex + 1}: title ou slug inválido.`);
    return null;
  }

  const tags = Array.isArray(rawProject.tags)
    ? rawProject.tags.map((tag) => safeText(tag, "")).filter(Boolean)
    : [];
  const category = categoryFromTags(tags);
  const cover = normalizeMedia(rawProject.cover) || normalizeMedia({ src: "", alt: "" });
  const gallery = Array.isArray(rawProject.gallery)
    ? rawProject.gallery.map((media, index) => normalizeMedia(media, index + 1)).filter(Boolean)
    : [];

  const project = {
    title,
    slug,
    year: safeText(rawProject.year, "[A CONFIRMAR: ano]"),
    role: safeText(rawProject.role, "[A CONFIRMAR: papel no projeto]"),
    tags,
    cover,
    gallery,
    pitch: safeText(rawProject.pitch, "[A CONFIRMAR: frase curta sobre o projeto]"),
    context: safeText(rawProject.context, "[A CONFIRMAR: contexto e briefing]"),
    process: safeText(rawProject.process, "[A CONFIRMAR: processo]"),
    challenges: safeText(rawProject.challenges, "[A CONFIRMAR: desafios]"),
    outcome: safeText(rawProject.outcome, "[A CONFIRMAR: resultado e aprendizagens]"),
    grade: rawProject.grade == null ? null : safeText(rawProject.grade, ""),
    links: normalizeLinks(rawProject.links),
    featured: rawProject.featured === true,
    draft: rawProject.draft === true,
    category,
    art: ART_BY_CATEGORY[category] || ART_BY_CATEGORY.Multimédia,
    sourceIndex
  };

  project.isUnconfirmed = hasUnconfirmedContent(project);
  return project;
}

function normalizeProjects(rawProjects) {
  const seenSlugs = new Set();
  const validProjects = rawProjects
    .map(normalizeProject)
    .filter((project) => {
      if (!project || seenSlugs.has(project.slug)) {
        if (project) console.warn(`Projeto ignorado: slug duplicado "${project.slug}".`);
        return false;
      }
      seenSlugs.add(project.slug);
      return true;
    });

  const publishedProjects = validProjects
    .filter((project) => !project.draft)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.sourceIndex - b.sourceIndex)
    .map((project, index) => ({ ...project, number: String(index + 1).padStart(2, "0") }));

  return { validCount: validProjects.length, publishedProjects };
}

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

function coverMarkup(project, decorative = true) {
  const src = project.cover?.src;
  if (!src) return artworkMarkup(project.art);

  const alt = decorative ? "" : safeText(project.cover.alt, `Imagem do projeto ${project.title}`);
  return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="${decorative ? "lazy" : "eager"}" decoding="async" style="display:block;width:100%;height:100%;object-fit:cover;">`;
}

function projectRow(project) {
  const status = project.isUnconfirmed ? "Em curadoria" : "Publicado";
  return `
    <article class="project-row reveal" data-project-row="${escapeHtml(project.slug)}">
      <button class="project-button" type="button" data-project="${escapeHtml(project.slug)}" aria-haspopup="dialog" aria-controls="project-dialog" aria-label="Abrir ficha editorial: ${escapeHtml(project.title)}">
        <span class="project-number">${escapeHtml(project.number)}</span>
        <span class="project-info">
          <span class="project-title">${escapeHtml(project.title)}</span>
          <span class="project-discipline">${escapeHtml(project.category)}</span>
        </span>
        <span class="project-status">${status}</span>
        <span class="project-arrow" aria-hidden="true">→</span>
        <span class="project-mobile-art project-art ${projectArtClass(project)}" aria-hidden="true">${coverMarkup(project)}</span>
      </button>
    </article>
  `;
}

function visibleProjects(filter = activeFilter) {
  return filter === "Todos"
    ? portfolioData
    : portfolioData.filter((project) => project.category === filter);
}

function renderFilters() {
  const categories = [...new Set(portfolioData.map((project) => project.category))]
    .sort((a, b) => {
      const aIndex = FILTER_ORDER.indexOf(a);
      const bIndex = FILTER_ORDER.indexOf(b);
      return (aIndex < 0 ? FILTER_ORDER.length : aIndex) - (bIndex < 0 ? FILTER_ORDER.length : bIndex);
    });
  const filters = ["Todos", ...categories];

  if (!filters.includes(activeFilter)) activeFilter = "Todos";
  filterGroup.innerHTML = filters.map((filter) => `
    <button type="button" class="filter${filter === activeFilter ? " is-active" : ""}" data-filter="${escapeHtml(filter)}" aria-pressed="${filter === activeFilter}">${escapeHtml(filter)}</button>
  `).join("");
}

function renderEmptyProjects(message) {
  projectGrid.innerHTML = `
    <article class="project-row reveal is-visible">
      <div class="project-button">
        <span class="project-number">—</span>
        <span class="project-info">
          <span class="project-title">Arquivo em atualização</span>
          <span class="project-discipline">${escapeHtml(message)}</span>
        </span>
      </div>
    </article>
  `;
  filterStatus.textContent = message;
  previewArt.className = "preview-art art-book";
  previewArt.innerHTML = artworkMarkup("book");
  previewNumber.textContent = "—";
  previewDiscipline.textContent = "Arquivo";
  previewNature.textContent = "Em atualização";
  previewYear.textContent = "—";
  previewProof.textContent = "Arquivo sem projetos";
  previewNote.textContent = "adiciona em projects.json ↗";
  previewHint.textContent = "Segue o guia para publicares o primeiro projeto.";
  projectPreview.setAttribute("aria-label", message);
}

function renderProjects(filter = activeFilter) {
  const projects = visibleProjects(filter);
  if (!projects.length) {
    renderEmptyProjects(filter === "Todos"
      ? "Ainda não existem projetos publicados."
      : `Ainda não existem projetos publicados na categoria ${filter}.`);
    return;
  }

  projectGrid.innerHTML = projects.map(projectRow).join("");
  filterStatus.textContent = `${projects.length} ${projects.length === 1 ? "projeto apresentado" : "projetos apresentados"} na categoria ${filter}.`;
  registerReveals(projectGrid.querySelectorAll(".reveal"));
  updatePreview(projects[0], true);
}

function setActiveRow(projectSlug) {
  projectGrid.querySelectorAll("[data-project-row]").forEach((row) => {
    row.classList.toggle("is-active", row.dataset.projectRow === projectSlug);
  });
}

function updatePreview(project, immediate = false) {
  if (!project || activePreviewId === project.slug) {
    setActiveRow(project?.slug);
    return;
  }

  activePreviewId = project.slug;
  setActiveRow(project.slug);

  const applyPreview = () => {
    previewArt.className = `preview-art ${projectArtClass(project)}`;
    previewArt.innerHTML = coverMarkup(project);
    previewNumber.textContent = project.number;
    previewDiscipline.textContent = project.category;
    previewNature.textContent = project.isUnconfirmed ? "Em preparação" : "Publicado";
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

function galleryMarkup(project, sectionNumber) {
  if (!project.gallery.length) return "";

  const items = project.gallery.map((media, index) => {
    const caption = media.caption
      ? `<figcaption>${escapeHtml(media.caption)}</figcaption>`
      : "";

    if (media.type === "video") {
      const poster = media.poster ? ` poster="${escapeHtml(media.poster)}"` : "";
      return `
        <figure>
          <video controls preload="metadata"${poster} style="display:block;width:100%;height:auto;">
            <source src="${escapeHtml(media.src)}">
            O teu navegador não consegue reproduzir este vídeo.
          </video>
          ${caption}
        </figure>
      `;
    }

    const alt = safeText(media.alt, `Imagem ${index + 1} do projeto ${project.title}`);
    return `
      <figure>
        <img src="${escapeHtml(media.src)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async">
        ${caption}
      </figure>
    `;
  }).join("");

  return `
    <section class="case-section">
      <h3>${String(sectionNumber).padStart(2, "0")} / Galeria</h3>
      ${items}
    </section>
  `;
}

function linksMarkup(project, sectionNumber) {
  if (!project.links.length) return "";

  return `
    <section class="case-section">
      <h3>${String(sectionNumber).padStart(2, "0")} / Ligações</h3>
      <div class="hero-actions">
        ${project.links.map((link) => {
          const external = /^https?:/i.test(link.url);
          return `<a class="button" href="${escapeHtml(link.url)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${escapeHtml(link.label)} <span aria-hidden="true">↗</span></a>`;
        }).join("")}
      </div>
    </section>
  `;
}

function projectNavigationMarkup(project, sectionNumber) {
  const projects = visibleProjects(activeFilter);
  const index = projects.findIndex((item) => item.slug === project.slug);
  if (index < 0 || projects.length < 2) return "";

  const previous = projects[index - 1];
  const next = projects[index + 1];
  return `
    <section class="case-section">
      <h3>${String(sectionNumber).padStart(2, "0")} / Continuar a explorar</h3>
      <div class="hero-actions" aria-label="Navegação entre projetos">
        ${previous ? `<button class="button" type="button" data-project-nav="${escapeHtml(previous.slug)}"><span aria-hidden="true">←</span> ${escapeHtml(previous.title)}</button>` : ""}
        ${next ? `<button class="button" type="button" data-project-nav="${escapeHtml(next.slug)}">${escapeHtml(next.title)} <span aria-hidden="true">→</span></button>` : ""}
      </div>
    </section>
  `;
}

function caseStudyMarkup(project) {
  const tags = project.tags.length ? project.tags.join(" · ") : "[A CONFIRMAR: competências e ferramentas]";
  const status = project.isUnconfirmed ? "Em curadoria" : "Publicado";
  const visualIsDecorative = !project.cover?.src;
  let nextSectionNumber = 6;
  const gallery = galleryMarkup(project, nextSectionNumber);
  if (gallery) nextSectionNumber += 1;
  const links = linksMarkup(project, nextSectionNumber);
  if (links) nextSectionNumber += 1;
  const projectNavigation = projectNavigationMarkup(project, nextSectionNumber);

  // The grade stays in the data model but is intentionally hidden by default.
  return `
    <section class="case-hero">
      <div class="case-heading">
        <span class="case-label">Arquivo Minez · ficha editorial</span>
        <h2 id="dialog-title" tabindex="-1">${escapeHtml(project.title)}</h2>
        <p>${escapeHtml(project.pitch)}</p>
      </div>
      <div class="case-visual"${visualIsDecorative ? ' aria-hidden="true"' : ""}>
        <div class="project-art ${projectArtClass(project)}">${coverMarkup(project, visualIsDecorative)}</div>
      </div>
    </section>

    <div class="case-meta">
      <div><small>Área</small><strong>${escapeHtml(project.category)}</strong></div>
      <div><small>O meu papel</small><strong>${escapeHtml(project.role)}</strong></div>
      <div><small>Estado</small><strong>${status}</strong></div>
      <div><small>Ano</small><strong>${escapeHtml(project.year)}</strong></div>
    </div>

    <div class="case-body">
      <aside><p>${status === "Publicado" ? "Caso<br>publicado." : "Em<br>curadoria."}</p></aside>
      <div class="case-sections">
        <section class="case-section">
          <h3>01 / Contexto</h3>
          <p>${escapeHtml(project.context)}</p>
        </section>
        <section class="case-section">
          <h3>02 / O meu papel</h3>
          <p>${escapeHtml(project.role)}</p>
          <p><strong>Competências e ferramentas:</strong> ${escapeHtml(tags)}</p>
        </section>
        <section class="case-section">
          <h3>03 / Processo</h3>
          <p>${escapeHtml(project.process)}</p>
        </section>
        <section class="case-section">
          <h3>04 / Desafios</h3>
          <p>${escapeHtml(project.challenges)}</p>
        </section>
        <section class="case-section">
          <h3>05 / Resultado e aprendizagens</h3>
          <p>${escapeHtml(project.outcome)}</p>
        </section>
        ${gallery}
        ${links}
        ${projectNavigation}
      </div>
    </div>
  `;
}

function findProject(projectSlug) {
  return portfolioData.find((project) => project.slug === projectSlug);
}

function projectSlugFromHash() {
  if (!window.location.hash.startsWith(PROJECT_HASH_PREFIX)) return "";

  try {
    return decodeURIComponent(window.location.hash.slice(PROJECT_HASH_PREFIX.length));
  } catch {
    return "";
  }
}

function replaceHash(hash) {
  window.history.replaceState(null, "", hash);
}

function updateProjectHash(projectSlug, replace = false) {
  const hash = `${PROJECT_HASH_PREFIX}${encodeURIComponent(projectSlug)}`;
  const state = { minezProjectOverlay: true };
  window.history[replace ? "replaceState" : "pushState"](state, "", hash);
}

function showProjectInDialog(project, focusTitle = false) {
  if (!project) return;
  dialogContent.innerHTML = caseStudyMarkup(project);
  dialog.scrollTop = 0;
  updatePreview(project, true);

  if (focusTitle) {
    window.requestAnimationFrame(() => dialogContent.querySelector("#dialog-title")?.focus());
  }
}

function openProject(projectSlug, trigger, updateHash = true) {
  const project = findProject(projectSlug);
  if (!project) return;

  lastDialogTrigger = trigger || document.activeElement;
  showProjectInDialog(project);
  if (updateHash) updateProjectHash(project.slug);
  document.body.classList.add("dialog-open");

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }

  window.requestAnimationFrame(() => dialogClose.focus());
}

function closeProject(updateHash = true) {
  const shouldReturnThroughHistory = updateHash
    && window.location.hash.startsWith(PROJECT_HASH_PREFIX)
    && window.history.state?.minezProjectOverlay === true;

  if (updateHash && !shouldReturnThroughHistory) replaceHash("#trabalho");

  if (dialog.open && typeof dialog.close === "function") {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
    handleDialogClosed();
  }

  if (shouldReturnThroughHistory) window.history.back();
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

function renderProjectLoadError(error) {
  console.error("Não foi possível carregar projects.json.", error);
  portfolioData = [];
  renderFilters();
  renderEmptyProjects("Não foi possível carregar os projetos. Confirma o ficheiro projects.json e abre o site através de um servidor local.");
}

function syncDialogWithHash() {
  const projectSlug = projectSlugFromHash();
  if (!projectSlug) {
    if (dialog.open) closeProject(false);
    return;
  }

  const project = findProject(projectSlug);
  if (!project) {
    replaceHash("#trabalho");
    if (dialog.open) closeProject(false);
    showToast("Este projeto não está publicado ou não existe.");
    return;
  }

  if (dialog.open) {
    showProjectInDialog(project, true);
  } else {
    openProject(project.slug, null, false);
  }
}

async function loadProjects() {
  try {
    const response = await fetch(PROJECTS_URL, { cache: "no-cache" });
    if (!response.ok) throw new Error(`Pedido falhou com o estado ${response.status}.`);

    const rawProjects = await response.json();
    if (!Array.isArray(rawProjects)) throw new TypeError("projects.json tem de conter uma lista de projetos.");

    const { validCount, publishedProjects } = normalizeProjects(rawProjects);
    if (rawProjects.length && !validCount) {
      throw new TypeError("projects.json não contém projetos válidos.");
    }

    portfolioData = publishedProjects;
    renderFilters();
    renderProjects();
    syncDialogWithHash();
  } catch (error) {
    renderProjectLoadError(error);
  }
}

filterGroup?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;

  const applyFilter = () => {
    activeFilter = button.dataset.filter;
    activePreviewId = null;
    filterGroup.querySelectorAll("[data-filter]").forEach((filter) => {
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
  updatePreview(findProject(button.dataset.project));
});

projectGrid.addEventListener("focusin", (event) => {
  const button = event.target.closest("[data-project]");
  if (!button) return;
  updatePreview(findProject(button.dataset.project));
});

projectGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-project]");
  if (!button) return;
  openProject(button.dataset.project, button);
});

dialogClose.addEventListener("click", () => closeProject());
dialog.addEventListener("close", handleDialogClosed);
dialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeProject();
});
dialog.addEventListener("click", (event) => {
  const navigationButton = event.target.closest("[data-project-nav]");
  if (navigationButton) {
    const project = findProject(navigationButton.dataset.projectNav);
    showProjectInDialog(project, true);
    if (project) updateProjectHash(project.slug, true);
    return;
  }

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

window.addEventListener("hashchange", syncDialogWithHash);
window.addEventListener("popstate", syncDialogWithHash);

reducedMotionQuery.addEventListener?.("change", (event) => {
  reducedMotion = event.matches;
});

registerReveals(document.querySelectorAll(".reveal"));
setupNavObserver();
updateScrollUI();
loadProjects();
