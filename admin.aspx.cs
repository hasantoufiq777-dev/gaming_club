using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Web.UI;

namespace labproject
{
    public partial class admin : Page
    {
        private string ConnectionString => ConfigurationManager.ConnectionStrings["KUETDbConnection"].ConnectionString;

        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsAdminAuthenticated())
            {
                loginPanel.Visible = false;
                dashboardPanel.Visible = true;

                if (!IsPostBack)
                {
                    BindUsers();
                }
            }
            else
            {
                loginPanel.Visible = true;
                dashboardPanel.Visible = false;
            }
        }

        protected void btnAdminLogin_Click(object sender, EventArgs e)
        {
            var email = txtAdminEmail.Text.Trim();
            var password = txtAdminPassword.Text;

            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                string query = "SELECT COUNT(1) FROM Users WHERE Email=@Email AND PasswordHash=@PasswordHash AND IsAdmin=1";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@Email", email);
                    cmd.Parameters.AddWithValue("@PasswordHash", password);

                    try
                    {
                        conn.Open();
                        int count = Convert.ToInt32(cmd.ExecuteScalar());
                        if (count == 1)
                        {
                            Session["IsAdmin"] = true;
                            Session["AdminEmail"] = email;
                            Response.Redirect("admin.aspx");
                            return;
                        }
                    }
                    catch (SqlException)
                    {
                        // database error; show invalid credentials below to avoid leaking details
                    }
                }
            }

            lblMessage.Text = "Invalid admin credentials.";
            lblMessage.ForeColor = System.Drawing.Color.Red;
        }

        protected void btnCreateUser_Click(object sender, EventArgs e)
        {
            if (!IsAdminAuthenticated())
            {
                return;
            }

            if (string.IsNullOrWhiteSpace(txtNewFullName.Text) || string.IsNullOrWhiteSpace(txtNewEmail.Text) || string.IsNullOrWhiteSpace(txtNewPassword.Text))
            {
                lblMessage.Text = "Please fill in all user fields before creating an account.";
                lblMessage.ForeColor = System.Drawing.Color.Red;
                return;
            }

            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {

                string query = "INSERT INTO Users (FullName, Email, PasswordHash) VALUES (@FullName, @Email, @PasswordHash)";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@FullName", txtNewFullName.Text.Trim());
                    cmd.Parameters.AddWithValue("@Email", txtNewEmail.Text.Trim());
                    cmd.Parameters.AddWithValue("@PasswordHash", txtNewPassword.Text);

                    try
                    {
                        conn.Open();
                        cmd.ExecuteNonQuery();

                        lblMessage.Text = "User created successfully.";
                        lblMessage.ForeColor = System.Drawing.Color.LightGreen;
                        txtNewFullName.Text = string.Empty;
                        txtNewEmail.Text = string.Empty;
                        txtNewPassword.Text = string.Empty;
                        BindUsers();
                    }
                    catch (SqlException ex)
                    {
                        lblMessage.Text = "Error: " + ex.Message;
                        lblMessage.ForeColor = System.Drawing.Color.Red;
                    }
                }
            }
        }

        protected void btnRefresh_Click(object sender, EventArgs e)
        {
            if (IsAdminAuthenticated())
            {
                BindUsers();
                lblMessage.Text = "User list refreshed.";
                lblMessage.ForeColor = System.Drawing.Color.LightGreen;
            }
        }

        protected void btnLogout_Click(object sender, EventArgs e)
        {
            Session.Remove("IsAdmin");
            Session.Remove("AdminEmail");
            ClearAuthCookie();
            Response.Redirect("admin.aspx");
        }

        protected void rptUsers_ItemCommand(object source, System.Web.UI.WebControls.RepeaterCommandEventArgs e)
        {
            if (!IsAdminAuthenticated() || !string.Equals(e.CommandName, "DeleteUser", StringComparison.OrdinalIgnoreCase))
            {
                return;
            }

            string email = Convert.ToString(e.CommandArgument);

            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                string query = "DELETE FROM Users WHERE Email=@Email";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@Email", email);

                    try
                    {
                        conn.Open();
                        int rowsAffected = cmd.ExecuteNonQuery();

                        lblMessage.Text = rowsAffected > 0 ? "User deleted successfully." : "No matching user was found.";
                        lblMessage.ForeColor = rowsAffected > 0 ? System.Drawing.Color.LightGreen : System.Drawing.Color.Gold;
                        BindUsers();
                    }
                    catch (SqlException ex)
                    {
                        lblMessage.Text = "Error: " + ex.Message;
                        lblMessage.ForeColor = System.Drawing.Color.Red;
                    }
                }
            }
        }

        private bool IsAdminAuthenticated()
        {
            return Session["IsAdmin"] != null && Convert.ToBoolean(Session["IsAdmin"]);
        }

        private void ClearAuthCookie()
        {
            var cookie = new HttpCookie("KGCAuth")
            {
                Expires = DateTime.UtcNow.AddDays(-1)
            };
            Response.Cookies.Add(cookie);
        }

        private void BindUsers()
        {
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                string query = "SELECT FullName, Email FROM Users ORDER BY FullName";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    conn.Open();

                    using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
                    {
                        DataTable usersTable = new DataTable();
                        adapter.Fill(usersTable);

                        rptUsers.DataSource = usersTable;
                        rptUsers.DataBind();
                        rptUsers.Visible = usersTable.Rows.Count > 0;
                        pnlEmptyUsers.Visible = usersTable.Rows.Count == 0;
                    }
                }
            }
        }

    }
}