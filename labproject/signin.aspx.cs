using System;
using System.Configuration;
using System.Data.SqlClient;
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
                string query = "SELECT COUNT(1) FROM Users WHERE Email=@Email AND PasswordHash=@PasswordHash";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@Email", signinEmail.Text);
                    cmd.Parameters.AddWithValue("@PasswordHash", signinPassword.Text);

                    try
                    {
                        conn.Open();
                        int count = Convert.ToInt32(cmd.ExecuteScalar());

                        if (count == 1)
                        {
                            // Login successful
                            Session["UserEmail"] = signinEmail.Text;
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
    }
}
