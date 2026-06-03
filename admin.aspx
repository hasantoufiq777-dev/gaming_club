<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="admin.aspx.cs" Inherits="labproject.admin" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KUET Gaming Club | Admin</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body data-theme="dark" data-page="admin">
    <form id="form1" runat="server">

    <div id="site-header"></div>

    <main>
      <section class="page-hero container admin-hero">
        <p class="eyebrow">Management Area</p>
        <h1 class="reveal">Admin Control Room</h1>
        <p class="reveal">Log in to manage club users from the database, add new members, and remove accounts when needed.</p>
      </section>

      <section class="section" style="padding-top: 1.2rem;">
        <div class="container admin-shell">
          <asp:Label ID="lblMessage" runat="server" Font-Bold="true"></asp:Label>

          <asp:Panel ID="loginPanel" runat="server" CssClass="card auth-card reveal">
            <div class="admin-panel-title">
              <h2>Admin Login</h2>
              <span class="admin-badge">Restricted Access</span>
            </div>
            <p>Use the configured admin credentials to open the dashboard.</p>
            <div class="form" style="max-width: none; margin: 0;">
              <div>
                <label for="txtAdminEmail">Email</label>
                <asp:TextBox class="input" ID="txtAdminEmail" runat="server" TextMode="Email" placeholder="admin@example.com"></asp:TextBox>
              </div>
              <div>
                <label for="txtAdminPassword">Password</label>
                <asp:TextBox class="input" ID="txtAdminPassword" runat="server" TextMode="Password" placeholder="Enter admin password"></asp:TextBox>
              </div>
              <asp:Button class="btn btn-primary neon" ID="btnAdminLogin" runat="server" Text="Login as Admin" OnClick="btnAdminLogin_Click" />
            </div>
          </asp:Panel>

          <asp:Panel ID="dashboardPanel" runat="server" Visible="false" CssClass="admin-panel">
            <div class="card admin-panel">
              <div class="admin-toolbar">
                <div>
                  <div class="admin-badge">Authenticated</div>
                  <h2 class="section-title" style="margin-bottom: 0;">Club User Manager</h2>
                </div>
                <div class="admin-actions">
                  <asp:Button class="btn btn-ghost" ID="btnRefresh" runat="server" Text="Refresh" OnClick="btnRefresh_Click" />
                  <asp:Button class="btn btn-danger" ID="btnLogout" runat="server" Text="Logout" OnClick="btnLogout_Click" />
                </div>
              </div>
              <p class="section-copy">Create a new club account or remove an existing one directly from the database.</p>
            </div>

            <div class="admin-grid">
              <div class="card admin-panel">
                <div class="admin-panel-title">
                  <h3>Create User</h3>
                </div>
                <div class="form" style="max-width: none; margin: 0;">
                  <div>
                    <label for="txtNewFullName">Full Name</label>
                    <asp:TextBox class="input" ID="txtNewFullName" runat="server" placeholder="Member full name"></asp:TextBox>
                  </div>
                  <div>
                    <label for="txtNewEmail">Email</label>
                    <asp:TextBox class="input" ID="txtNewEmail" runat="server" TextMode="Email" placeholder="member@example.com"></asp:TextBox>
                  </div>
                  <div>
                    <label for="txtNewPassword">Password</label>
                    <asp:TextBox class="input" ID="txtNewPassword" runat="server" TextMode="Password" placeholder="Temporary password"></asp:TextBox>
                  </div>
                  <asp:Button class="btn btn-primary neon" ID="btnCreateUser" runat="server" Text="Create User" OnClick="btnCreateUser_Click" />
                </div>
              </div>

              <div class="card admin-panel">
                <div class="admin-panel-title">
                  <h3>Current Users</h3>
                </div>
                <div class="admin-table-wrap">
                  <asp:HiddenField ID="hfEditName" runat="server" ClientIDMode="Static" />
                  <asp:Repeater ID="rptUsers" runat="server" OnItemCommand="rptUsers_ItemCommand">
                    <HeaderTemplate>
                      <table class="admin-table">
                        <thead>
                          <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                    </HeaderTemplate>
                    <ItemTemplate>
                          <tr>
                            <td><%# Eval("FullName") %></td>
                            <td><%# Eval("Email") %></td>
                            <td>Stored in DB</td>
                            <td>
                              <asp:Button class="btn btn-ghost" ID="btnEditUser" runat="server" Text="Edit" CommandName="EditUser" CommandArgument='<%# Eval("Email") %>' OnClientClick="return promptEditUser(this);" />
                              <asp:Button class="btn btn-danger" ID="btnDeleteUser" runat="server" Text="Delete" CommandName="DeleteUser" CommandArgument='<%# Eval("Email") %>' OnClientClick="return confirm('Delete this user?');" />
                            </td>
                          </tr>
                    </ItemTemplate>
                    <FooterTemplate>
                        </tbody>
                      </table>
                    </FooterTemplate>
                  </asp:Repeater>
                  <asp:Panel ID="pnlEmptyUsers" runat="server" CssClass="admin-empty" Visible="false">
                    No club users found in the database.
                  </asp:Panel>
                </div>
              </div>
            </div>
          </asp:Panel>
        </div>
      </section>
    </main>

    <div id="site-footer"></div>
    </form>

    <script src="js/components.js"></script>
    <script src="js/main.js"></script>
    <script>
      function promptEditUser(btn) {
        try {
          var row = btn && btn.closest ? btn.closest('tr') : null;
          var fullName = '';
          if (row && row.cells && row.cells.length > 0) {
            fullName = row.cells[0].innerText || row.cells[0].textContent || '';
            fullName = fullName.trim();
          }
          var newName = prompt('Edit full name', fullName || '');
          if (newName === null) return false; // cancelled
          var hf = document.getElementById('hfEditName');
          if (hf) hf.value = newName;
          return true; // allow postback
        } catch (e) {
          return false;
        }
      }
    </script>
  </body>
</html>