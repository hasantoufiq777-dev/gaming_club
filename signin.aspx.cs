using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Web;
using System.Web.UI;

namespace labproject
{
    public partial class signin : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        protected void btnSignIn_Click(object sender, EventArgs e)
        {
            string connString = ConfigurationManager.ConnectionStrings["KUETDbConnection"].ConnectionString;

            using (SqlConnection conn = new SqlConnection(connString))
            {
                string query = "SELECT IsAdmin FROM Users WHERE Email=@Email AND PasswordHash=@PasswordHash";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@Email", signinEmail.Text);
                    cmd.Parameters.AddWithValue("@PasswordHash", signinPassword.Text);

                    try
                    {
                        conn.Open();
                        object result = cmd.ExecuteScalar();

                        if (result != null)
                        {
                            // Login successful
                            Session["UserEmail"] = signinEmail.Text;
                            Session["IsAuthenticated"] = true;

                            try
                            {
                                if (Convert.ToBoolean(result))
                                {
                                    Session["IsAdmin"] = true;
                                }
                            }
                            catch
                            {
                                // if conversion fails, ignore and continue
                            }

                            bool isAdmin = Session["IsAdmin"] != null && Convert.ToBoolean(Session["IsAdmin"]);
                            SetAuthCookie(signinEmail.Text, isAdmin, chkRememberMe.Checked);
                            SetClientAuthCookie(signinEmail.Text, isAdmin, chkRememberMe.Checked);

                            Response.Redirect("Default.aspx"); // Or wherever you want them to go
                        }
                        else
                        {
                            lblMessage.Text = "Invalid email or password.";
                        }
                    }
                    catch (SqlException ex)
                    {
                        lblMessage.Text = "Error: " + ex.Message;
                    }
                }
            }
        }

        private void SetAuthCookie(string email, bool isAdmin, bool persistent)
        {
            var cookie = new HttpCookie("KGCAuth")
            {
                Path = "/",
                HttpOnly = true,
                Value = string.Join("|", new[] { Uri.EscapeDataString(email ?? string.Empty), isAdmin ? "1" : "0" })
            };

            if (persistent)
            {
                cookie.Expires = DateTime.UtcNow.AddDays(7);
            }

            if (Request.IsSecureConnection)
            {
                cookie.Secure = true;
            }

            Response.Cookies.Add(cookie);
        }

        private void SetClientAuthCookie(string email, bool isAdmin, bool persistent)
        {
            var cookie = new HttpCookie("KGCAuthUI")
            {
                Path = "/",
                HttpOnly = false,
                Value = string.Join("|", new[] { Uri.EscapeDataString(email ?? string.Empty), isAdmin ? "1" : "0" })
            };

            if (persistent)
            {
                cookie.Expires = DateTime.UtcNow.AddDays(7);
            }

            Response.Cookies.Add(cookie);
        }
    }
}
