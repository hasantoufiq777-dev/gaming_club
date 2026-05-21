using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.UI;

namespace labproject
{
    public partial class _Default : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            BindActiveMemberCount();
        }

        private void BindActiveMemberCount()
        {
            string connectionString = ConfigurationManager.ConnectionStrings["KUETDbConnection"].ConnectionString;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                string query = "SELECT COUNT(1) FROM Users";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    connection.Open();
                    int activeMembers = Convert.ToInt32(command.ExecuteScalar());
                    activeMembersCount.InnerText = activeMembers.ToString();
                    activeMembersCount.Attributes["data-counter"] = activeMembers.ToString();
                }
            }
        }
    }
}