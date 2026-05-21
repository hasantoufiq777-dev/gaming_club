<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="labproject._Default" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KUET Gaming Club | Home</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body data-theme="dark" data-page="home">
    <form id="form1" runat="server"></form>

    <div id="site-header"></div>

    <main>
      <section class="hero">
        <div class="container hero-heading-row">
          <div class="hero-heading marquee" aria-hidden="true">
            <span class="hero-heading-text" data-slider-caption>Start your journey</span>
          </div>
        </div>
        <div class="container hero-grid">
          <div class="hero-copy reveal">
            <div class="hero-overlay-fade"></div>
            <iframe class="hero-animation-frame" src="assets/animations/kgc_gaming_logo_animation_v2.html" title="KUET Gaming Club animated logo" loading="eager" scrolling="no"></iframe>
            <div class="hero-cta">
              <a href="signup.aspx" class="btn btn-primary neon">Join Now</a>
              <a href="events.aspx" class="btn btn-secondary">Explore Events</a>
            </div>
          </div>

          <div class="slider reveal" data-slider>
            <div class="slide active" style="background-image: url('assets/images/valorant1.jpg')">
              <div class="slide-content">
                <h3>VALORANT OPS</h3>
                <p>Tactical precision. Team synergy. Clutch moments.</p>
              </div>
            </div>
            <div class="slide" style="background-image: url('assets/images/fifa2.jpg')">
              <div class="slide-content">
                <h3>FIFA RIVAL ARENA</h3>
                <p>Fast feet, smart passes, and high-stakes finals.</p>
              </div>
            </div>
            <div class="slide" style="background-image: url('assets/images/pubg1.jpg')">
              <div class="slide-content">
                <h3>PUBG DROP ZONE</h3>
                <p>Squad up. Loot smart. Conquer the final circle.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <h2 class="section-title reveal">Featured Games</h2>
          <p class="section-copy reveal">
            Our competitive ecosystem spans tactical shooters, sports simulations, and battle royale championships.
          </p>

          <div class="cards" style="margin-top: 1.2rem;">
            <article class="card feature-game reveal">
              <img src="assets/images/valorent.jpg" alt="Valorant tournament poster" class="feature-game-image" />
              <div class="feature-game-overlay">
                <h3>Valorant</h3>
                <p>Agent synergy, map control, and team communication in ranked and custom tournaments.</p>
              </div>
            </article>
            <article class="card feature-game reveal">
              <img src="assets/images/fifa.webp" alt="FIFA tournament poster" class="feature-game-image" />
              <div class="feature-game-overlay">
                <h3>FIFA</h3>
                <p>1v1 and team-based e-football events where strategy and mechanics decide the champions.</p>
              </div>
            </article>
            <article class="card feature-game reveal">
              <img src="assets/images/pubg.jpg" alt="PUBG tournament poster" class="feature-game-image" />
              <div class="feature-game-overlay">
                <h3>PUBG</h3>
                <p>Battle royale lobbies and scrims focused on looting paths, rotations, and survival tactics.</p>
              </div>
            </article>
          </div>

          <div class="stats reveal">
            <article class="stat">
              <div class="stat-value" id="activeMembersCount" runat="server" data-counter="0">0</div>
              <div class="stat-label">Active Members</div>
            </article>
            <article class="stat">
              <div class="stat-value" data-counter="32">0</div>
              <div class="stat-label">Tournaments Hosted</div>
            </article>
            <article class="stat">
              <div class="stat-value" data-counter="12">0</div>
              <div class="stat-label">Partner Communities</div>
            </article>
          </div>
        </div>
      </section>
    </main>

    <div id="site-footer"></div>

    <script src="js/components.js"></script>
    <script src="js/main.js"></script>
  </body>
</html>