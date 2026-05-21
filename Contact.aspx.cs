using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.UI;

namespace labproject
{
    public partial class Contact : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        protected void btnSendMessage_Click(object sender, EventArgs e)
        {
            string connString = ConfigurationManager.ConnectionStrings["KUETDbConnection"].ConnectionString;

            using (SqlConnection conn = new SqlConnection(connString))
            {
                string query = "INSERT INTO Contacts (FullName, Email, MessageText) VALUES (@FullName, @Email, @MessageText)";

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@FullName", contactName.Text);
                    cmd.Parameters.AddWithValue("@Email", contactEmail.Text);
                    cmd.Parameters.AddWithValue("@MessageText", contactMessage.Text);

                    try
                    {
                        conn.Open();
                        cmd.ExecuteNonQuery();
                        
                        lblContactMessage.ForeColor = System.Drawing.Color.Green;
                        lblContactMessage.Text = "Thanks. Your message has been sent successfully.";
                        
                        // Clear form
                        contactName.Text = "";
                        contactEmail.Text = "";
                        contactMessage.Text = "";
                    }
                    catch (SqlException ex)
                    {
                        lblContactMessage.ForeColor = System.Drawing.Color.Red;
                        lblContactMessage.Text = "Error: " + ex.Message;
                    }
                }
            }
        }
    }
}