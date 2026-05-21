<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="signup.aspx.cs" Inherits="labproject.signup" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KUET Gaming Club | Join Us</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body data-theme="dark" data-page="signup">
    <form id="form1" runat="server">

    <div id="site-header"></div>

    <main>
      <section class="page-hero container">
        <h1 class="reveal">Join Us</h1>
        <p class="reveal">Create your profile to join tournaments, teams, and club announcements.</p>
      </section>

      <section class="section" style="padding-top: 1.2rem;">
        <div class="container auth-shell">
          <div class="form card auth-card reveal">
            <h2>Create Account</h2>
            <p>Register once to unlock all KUET Gaming Club programs.</p>
            <div>
              <label for="signupName">Full Name</label>
              <asp:TextBox class="input" id="signupName" runat="server" placeholder="Enter your full name"></asp:TextBox>
            </div>
            <div>
              <label for="signupEmail">Email</label>
              <asp:TextBox class="input" id="signupEmail" runat="server" TextMode="Email" placeholder="you@example.com"></asp:TextBox>
            </div>
            <div>
              <label for="signupPassword">Password</label>
              <asp:TextBox class="input" id="signupPassword" runat="server" TextMode="Password" placeholder="Create a password"></asp:TextBox>
            </div>
            <asp:Label ID="lblMessage" runat="server" ForeColor="Red"></asp:Label>
            <br/>
            <asp:Button class="btn btn-primary neon" ID="btnSignUp" runat="server" Text="Sign Up" OnClick="btnSignUp_Click" />
            <p class="auth-helper">Already have an account? <a href="signin.aspx">Sign in</a>.</p>
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
