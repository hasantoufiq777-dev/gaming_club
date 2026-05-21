<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="events.aspx.cs" Inherits="labproject.events" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KUET Gaming Club | Events</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body data-theme="dark" data-page="events">
    <form id="form1" runat="server"></form>

    <div id="site-header"></div>

    <main>
      <section class="page-hero container">
        <h1 class="reveal">Events &amp; Tournaments</h1>
        <p class="reveal">Explore upcoming competitions and training events by your favorite game.</p>
      </section>

      <section class="section">
        <div class="container">
          <div id="event-filters" class="filter-bar reveal"></div>
          <div id="events-list" class="cards"></div>
        </div>
      </section>
    </main>

    <div id="site-footer"></div>

    <script src="js/components.js"></script>
    <script src="js/main.js"></script>
    <script src="js/events.js"></script>
  </body>
</html>
