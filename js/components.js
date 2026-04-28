const navLinks = [
  { href: 'index.html', label: 'Home' },
  { href: 'about.html', label: 'About' },
  { href: 'members.html', label: 'Members' },
  { href: 'events.html', label: 'Events' },
  { href: 'gallery.html', label: 'Gallery' },
  { href: 'contact.html', label: 'Contact' },
  { href: 'achievements.html', label: 'Achievement' },
  { href: 'signin.html', label: 'Sign In', auth: true }
];

function getCurrentPage() {
  const file = window.location.pathname.split('/').pop();
  return file || 'index.html';
}

function renderHeader() {
  const headerHost = document.getElementById('site-header');
  if (!headerHost) return;

  const current = getCurrentPage();
  const linksMarkup = navLinks
    .map((item) => {
      const active = item.href === current ? 'active' : '';
      const authClass = item.auth ? 'nav-auth-link' : '';
      const primaryClass = item.primary ? 'nav-auth-primary' : '';
      return `<li><a class="nav-link ${authClass} ${primaryClass} ${active}" href="${item.href}">${item.label}</a></li>`;
    })
    .join('');

  headerHost.innerHTML = `
    <header class="site-header">
      <div class="container nav">
        <a class="brand" href="index.html" aria-label="KUET Gaming Club Home">
          <span class="brand-logo">KGC</span>
          <span>KUET Gaming Club</span>
        </a>
        <ul class="nav-links" id="nav-links">
          ${linksMarkup}
        </ul>
        <div class="nav-controls">
          <div class="profile-wrap">
            <button id="profile-btn" class="profile-btn" aria-label="Open profile" aria-expanded="false">
              <span class="profile-sticker">NH</span>
            </button>
            <div id="profile-menu" class="profile-menu" hidden>
              <div class="profile-head">
                <div class="profile-avatar">NH</div>
                <div>
                  <h4>Nibir Hasan</h4>
                </div>
              </div>
            </div>
          </div>
          <button id="menu-btn" class="menu-btn" aria-label="Open menu">☰</button>
        </div>
      </div>
    </header>
  `;
}

function renderFooter() {
  const footerHost = document.getElementById('site-footer');
  if (!footerHost) return;

  footerHost.innerHTML = `
    <footer class="footer">
      <div class="container footer-grid">
        <div>
          <h4>KUET Gaming Club</h4>
          <p>Play. Compete. Dominate. Building a thriving esports and gaming community on campus.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <p><a href="about.html">About Us</a></p>
          <p><a href="events.html">Tournaments</a></p>
          <p><a href="contact.html">Contact Us</a></p>
          <p><a href="signup.html">Join Us</a></p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>KUET Campus, Khulna</p>
          <p>Email: kuetgc@example.com</p>
          <p>Discord: KUETGC Hub</p>
        </div>
      </div>
    </footer>
  `;
}

renderHeader();
renderFooter();