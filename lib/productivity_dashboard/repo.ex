defmodule ProductivityDashboard.Repo do
  use Ecto.Repo,
    otp_app: :productivity_dashboard,
    adapter: Ecto.Adapters.Postgres
end
