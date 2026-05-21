using System;
using System.Configuration; // For getting connection string
using System.Data.SqlClient; // For SQL Database connection
using System.Web.UI;

namespace labproject
{
    public partial class signup : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        protected void btnSignUp_Click(object sender, EventArgs e)
        {
            // 1. Get the connection string from Web.config
            string connString = ConfigurationManager.ConnectionStrings["KUETDbConnection"].ConnectionString;

            // 2. Open a connection to the database
            using (SqlConnection conn = new SqlConnection(connString))
            {
                // 3. Write your SQL Insert Query
                string query = "INSERT INTO Users (FullName, Email, PasswordHash) VALUES (@FullName, @Email, @PasswordHash)";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    // 4. Bind the parameters (Prevents SQL Injection!)
                    cmd.Parameters.AddWithValue("@FullName", signupName.Text);
                    cmd.Parameters.AddWithValue("@Email", signupEmail.Text);
                    cmd.Parameters.AddWithValue("@PasswordHash", signupPassword.Text); // In a real app, hash this!

                    try
                    {
                        conn.Open();
                        cmd.ExecuteNonQuery(); // 5. Execute the query
                        
                        // Success! Redirect to signin page or show a message
                        Response.Redirect("signin.aspx");
                    }
                    catch (SqlException ex)
                    {
                        // Show error (e.g., if email already exists)
                        lblMessage.Text = "Error: " + ex.Message;
                    }
                }
            }
        }
    }
}
