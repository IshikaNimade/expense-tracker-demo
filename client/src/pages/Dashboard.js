import { Box, Typography, CircularProgress } from "@mui/material";
import Sidebar from "../layouts/Sidebar";
import DashboardLayout from "../layouts/DashboardLayout";
import { useExpenses } from "../hooks/useExpenses";

function Dashboard() {
  const { dashboardStats, loading } = useExpenses();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
        <Typography sx={{ marginLeft: 2 }}>Loading data...</Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar dashboardStats={dashboardStats} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { sm: "240px" },
          p: { xs: 2, sm: 4 },
          width: { xs: "100%", sm: `calc(100% - 240px)` },
        }}
      >
        <DashboardLayout dashboardStats={dashboardStats} />
      </Box>
    </Box>
  );
}

export default Dashboard;
