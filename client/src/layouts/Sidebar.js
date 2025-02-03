import {
  Box,
  Typography,
  Drawer,
  Card,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CustomAppName from "../components/CustomAppName";
import CustomAvatar from "../components/CustomAvatar";
import CustomLogout from "../components/CustomLogout";

function Sidebar({ dashboardStats }) {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const balance = dashboardStats?.balance ?? 0;
  const totalIncome = dashboardStats?.totalIncome ?? 0;
  const totalExpenses = dashboardStats?.totalExpenses ?? 0;

  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: 3,
      }}
    >
      <CustomAppName />
      <CustomAvatar />
      <Card
        sx={{
          p: 2,
          mb: 3,
          bgcolor: theme.palette.primary.main,
          color: "white",
          borderRadius: 2,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          zIndex: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <TrendingUpIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle2">Current Balance</Typography>
        </Box>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
          ₹{balance !== null && balance !== undefined ? balance : "N/A"}
        </Typography>
        <Typography variant="body2" sx={{ color: "#A3AED0" }}>
          Total Income : ₹{totalIncome !== null ? totalIncome : "N/A"}
        </Typography>
        <Typography variant="body2" sx={{ color: "#A3AED0" }}>
          Total Expense : ₹{totalExpenses !== null ? totalExpenses : "N/A"}
        </Typography>
      </Card>
      <CustomLogout />
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: isSmUp ? 180 : 0 }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 400,
            border: "none",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default Sidebar;
