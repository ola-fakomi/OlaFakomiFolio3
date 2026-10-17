/**
 * <site-nav active="home|ux-projects|graphics|blog|about|lab">
 * Single source of truth for the site navigation.
 * Change this file once — every page updates automatically.
 */

const NAV_LINKS = [
  { id: 'home',        href: 'index.html',       icon: 'navIcon_Home.svg',       label: 'Home' },
  { id: 'ux-projects', href: 'ux-projects.html',  icon: 'navIcon_UXProjects.svg', label: 'UX Projects' },
  { id: 'graphics',    href: 'graphics.html',     icon: 'navIcon_Graphics.svg',   label: 'Graphics' },
  { id: 'lab',         href: 'lab.html',          icon: 'Iconlab.svg',            label: 'Lab' },
  { id: 'blog',        href: 'blog.html',         icon: 'navIcon_Blog.svg',       label: 'Blogs' },
  { id: 'about',       href: 'about.html',        icon: 'navIcon_About.svg',      label: 'About' },
];

const NAV_CSS = `
  nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 9500; background: transparent;
    padding-top: 20px; padding-bottom: 12px;
  }
  .nav-inner { max-width: 896px; margin: 0 auto; padding: 0; }
  .nav-bar {
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(25,25,25,0.65); border: 1px solid rgba(255,255,255,0.09);
    border-radius: 16px; padding: 5px 5px 5px 8px;
    backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
    box-shadow: 0 4px 24px rgba(0,0,0,0.35);
  }
  .nav-links {
    display: flex; align-items: center; gap: 0;
    list-style: none; margin: 0; padding: 0 8px;
  }
  .nav-links a {
    display: flex; align-items: center; gap: 4px; padding: 4px 4px;
    font-family: 'Unbounded', sans-serif;
    font-size: 11px; font-weight: 300; letter-spacing: 0.02em;
    color: rgba(255,255,255,0.45); text-decoration: none;
    border-radius: 10px; transition: color 0.2s;
  }
  .nav-links a .nav-icon {
    display: flex; align-items: center; justify-content: center;
    width: 0; height: 13px; overflow: hidden; opacity: 0;
    flex-shrink: 0; transition: width 0.2s, opacity 0.2s;
  }
  .nav-links a .nav-icon img {
    width: 13px; height: 13px; flex-shrink: 0; display: block;
    opacity: 0.45; transition: opacity 0.2s;
  }
  .nav-links li.active > a .nav-icon img,
  .nav-links a:hover .nav-icon img { opacity: 1; }
  .nav-links li.active > a .nav-icon,
  .nav-links a:hover .nav-icon { width: 13px; opacity: 1; }
  .nav-links li.active > a { color: #fff; }
  .nav-links a:hover { color: #fff; }
  .nav-cta {
    padding: 13px 22px;
    background: linear-gradient(180deg, #353537 0%, #1f1e1e 100%);
    border: none; color: #fff; font-family: 'Unbounded', sans-serif;
    font-size: 11px; font-weight: 300; letter-spacing: 0.02em;
    border-radius: 12px; text-decoration: none; white-space: nowrap;
    position: relative; overflow: hidden;
    box-shadow: 0 0 4.1px rgba(0,0,0,0.25);
    transition: opacity 0.2s, transform 0.2s; flex-shrink: 0;
  }
  .nav-cta::after {
    content: ''; position: absolute; inset: 0; border-radius: 10px;
    box-shadow: inset -1px -1px 0 rgba(255,255,255,0.03),
                inset 1px 1px 0 rgba(255,255,255,0.08);
    pointer-events: none;
  }
  .nav-cta:hover { opacity: 0.85; transform: translateY(-1px); }
  .nav-toggle {
    display: none; flex-direction: column; gap: 5px;
    background: none; border: none; cursor: pointer; padding: 4px;
  }
  .nav-toggle span {
    display: block; width: 22px; height: 1.5px;
    background: #f0f0f0; border-radius: 2px;
    transition: transform 0.3s, opacity 0.3s;
  }
  .nav-toggle.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .nav-toggle.open span:nth-child(2) { opacity: 0; }
  .nav-toggle.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
  .mobile-menu { display: none; }
  @media (max-width: 860px) {
    .mobile-menu {
      position: fixed; top: 72px; left: 0; right: 0;
      background: rgba(20,20,20,0.98); backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255,255,255,0.07); z-index: 9490;
      padding: 24px 20px 32px;
      transform: translateY(-110%);
      transition: transform 0.35s cubic-bezier(0.32,0,0,1);
      display: flex; flex-direction: column; gap: 4px;
    }
    .mobile-menu.open { transform: translateY(0); }
    .nav-toggle { display: flex; }
    .nav-inner { padding: 0 20px; max-width: 100%; }
    .nav-links { display: none; }
  }
  .mobile-menu a {
    display: block; padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    font-family: 'Unbounded', sans-serif;
    font-size: 11px; font-weight: 300; letter-spacing: 0.02em;
    color: #9a9aaa; text-decoration: none; transition: color 0.2s;
  }
  .mobile-menu a.active { color: #fff; }
  .mobile-menu a:hover { color: #f0f0f0; }
  .mobile-menu a:last-child { border-bottom: none; }
`;

class SiteNav extends HTMLElement {
  connectedCallback() {
    // Inject CSS once per document
    if (!document.getElementById('site-nav-css')) {
      const style = document.createElement('style');
      style.id = 'site-nav-css';
      style.textContent = NAV_CSS;
      document.head.appendChild(style);
    }

    const active = this.getAttribute('active') || '';

    const desktopItems = NAV_LINKS.map(({ id, href, icon, label }) => `
      <li${id === active ? ' class="active"' : ''}>
        <a href="${href}">
          <span class="nav-icon"><img src="images/Icons/${icon}" alt="" /></span>${label}
        </a>
      </li>`).join('');

    const mobileItems = NAV_LINKS.map(({ id, href, label }) =>
      `<a href="${href}"${id === active ? ' class="active"' : ''}>${label}</a>`
    ).join('\n    ');

    this.innerHTML = `
  <nav>
    <div class="nav-inner">
      <div class="nav-bar">
        <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-links">${desktopItems}
        </ul>
        <a href="mailto:olarewajufakomi@gmail.com" class="nav-cta">Let's talk</a>
      </div>
    </div>
  </nav>
  <div class="mobile-menu" id="mobileMenu">
    ${mobileItems}
  </div>`;

    // Behaviour
    const toggle = this.querySelector('#navToggle');
    const menu   = this.querySelector('#mobileMenu');
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        menu.classList.toggle('open');
      });
      menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          toggle.classList.remove('open');
          menu.classList.remove('open');
        });
      });
    }
  }
}

customElements.define('site-nav', SiteNav);
