defmodule ProductivityDashboardWeb.WorkoutController do
  use ProductivityDashboardWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
