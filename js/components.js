const navLinks = [
  { href: '/', label: 'Home' },
  { href: 'About.aspx', label: 'About' },
  { href: 'members.aspx', label: 'Members' },
  { href: 'events.aspx', label: 'Events' },
  { href: 'gallery.aspx', label: 'Gallery' },
  { href: 'Contact.aspx', label: 'Contact' },
  { href: 'achievement.aspx', label: 'Achievement' },
  { href: 'admin.aspx', label: 'Admin', auth: true, primary: true },
  { href: 'signin.aspx', label: 'Sign In', auth: true }
];

function getCurrentPage() {
  const file = window.location.pathname.split('/').pop();
  return file || '/';
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
        <a class="brand" href="/" aria-label="KUET Gaming Club Home">
          <span class="brand-logo">KGC</span>
          <span>KUET Gaming Club</span>
        </a>
        <ul class="nav-links" id="nav-links">
          ${linksMarkup}
        </ul>
        <div class="nav-controls">
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
          <p><a href="About.aspx">About Us</a></p>
          <p><a href="events.aspx">Tournaments</a></p>
          <p><a href="Contact.aspx">Contact Us</a></p>
          <p><a href="admin.aspx">Admin Portal</a></p>
          <p><a href="signup.aspx">Join Us</a></p>
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