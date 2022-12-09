defmodule ProductivityDashboardWeb.WorkoutController do
  use ProductivityDashboardWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  ###############################################
  #Self Written Elxir Code                      #
  ###############################################


  #Function to take Value from a HTML form and parse it into JSON Data and write it too disk
  def formToJsonFile(Formoutput) do

  end
end
