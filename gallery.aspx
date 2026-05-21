<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="gallery.aspx.cs" Inherits="labproject.gallery" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KUET Gaming Club | Gallery</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body data-theme="dark" data-page="gallery">
    <form id="form1" runat="server"></form>

    <div id="site-header"></div>

    <main>
      <section class="page-hero container">
        <h1 class="reveal">Gallery</h1>
        <p class="reveal">Snapshots from tournaments, watch parties, and community events.</p>
      </section>

      <section class="section">
        <div class="container gallery-grid">
          <figure class="gallery-item reveal">
            <img src="assets/images/finalmathcrowd.jpg" alt="Final match crowd" />
            <figcaption class="gallery-caption">Final Match Crowd</figcaption>
          </figure>
          <figure class="gallery-item reveal">
            <img src="assets/images/lansetp.jpg" alt="LAN setup" />
            <figcaption class="gallery-caption">LAN Setup for Competitive Play</figcaption>
          </figure>
          <figure class="gallery-item reveal">
            <img src="assets/images/casting%20booth.jpg" alt="Casting booth" />
            <figcaption class="gallery-caption">Live Casting Booth</figcaption>
          </figure>
          <figure class="gallery-item reveal">
            <img src="assets/images/commeet.jpg" alt="Community meetup" />
            <figcaption class="gallery-caption">Community Meetup Session</figcaption>
          </figure>
          <figure class="gallery-item reveal">
            <img src="assets/images/inter-university%20cup.jpg" alt="Inter-university cup" />
            <figcaption class="gallery-caption">Inter-University Cup Action</figcaption>
          </figure>
          <figure class="gallery-item reveal">
            <img src="assets/images/prize%20ceremony.jpg" alt="Prize ceremony" />
            <figcaption class="gallery-caption">Prize Ceremony Celebration</figcaption>
          </figure>
          <figure class="gallery-item reveal">
            <img src="assets/images/team strategy brief.webp" alt="Team strategy brief" />
            <figcaption class="gallery-caption">Team Strategy Briefing</figcaption>
          </figure>
          <figure class="gallery-item reveal">
            <img src="assets/images/worksession.jpg" alt="Work session" />
            <figcaption class="gallery-caption">Club Work Session</figcaption>
          </figure>
        </div>
      </section>
    </main>

    <div id="site-footer"></div>

    <script src="js/components.js"></script>
    <script src="js/main.js"></script>
  </body>
</html>
