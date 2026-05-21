<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="signin.aspx.cs" Inherits="labproject.signin" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KUET Gaming Club | Sign In</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body data-theme="dark" data-page="signin">
    <form id="form1" runat="server">

    <div id="site-header"></div>

    <main>
      <section class="page-hero container">
        <h1 class="reveal">Sign In</h1>
        <p class="reveal">Access your club dashboard, event registrations, and team updates.</p>
      </section>

      <section class="section" style="padding-top: 1.2rem;">
        <div class="container auth-shell">
          <div class="form card auth-card reveal">
            <h2>Welcome Back</h2>
            <p>Use your club account credentials to continue.</p>
            <div>
              <label for="signinEmail">Email</label>
              <asp:TextBox class="input" id="signinEmail" runat="server" TextMode="Email" placeholder="you@example.com"></asp:TextBox>
            </div>
            <div>
              <label for="signinPassword">Password</label>
              <asp:TextBox class="input" id="signinPassword" runat="server" TextMode="Password" placeholder="Enter your password"></asp:TextBox>
            </div>
            <asp:Label ID="lblMessage" runat="server" ForeColor="Red"></asp:Label>
            <br/>
            <asp:Button class="btn btn-primary neon" ID="btnSignIn" runat="server" Text="Sign In" OnClick="btnSignIn_Click" />
            <p class="auth-helper">New member? <a href="signup.aspx">Create an account</a>.</p>
          </div>
        </div>
      </section>
    </main>

    <div id="site-footer"></div>
    </form>

    <script src="js/components.js"></script>
    <script src="js/main.js"></script>
  </body>
</html>
