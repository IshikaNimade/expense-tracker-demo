import { Box, Card, Typography, Stack } from "@mui/material";
import TransactionList from "./TransactionList";

function DashboardLayout({ dashboardStats }) {
  const { balance, totalIncome, totalExpenses } = dashboardStats;

  const statsData = [
    {
      title: "Current Balance",
      amount: `₹${balance}`,
      bgColor: "#E6E6FA",
    },
    {
      title: "Total Income",
      amount: `₹${totalIncome}`,
      bgColor: "#E6FFF3",
    },
    {
      title: "Total Expenses",
      amount: `₹${totalExpenses}`,
      bgColor: "#FFF3F3",
    },
  ];

  return (
    <Box sx={{ pt: { xs: 7, sm: 0 } }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h2" fontFamily={"-moz-initial"} paddingBottom={6}>
          Dashboard
        </Typography>
      </Stack>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          mb: 4,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {statsData.map((stat) => (
          <Card
            key={stat.title}
            sx={{
              p: 3,
              flex: 1,
              backgroundColor: stat.bgColor,
              boxShadow: "0px 4px 20px rgba(131, 53, 53, 0.1)",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              {stat.title}
            </Typography>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
              {stat.amount}
            </Typography>
          </Card>
        ))}
      </Box>
      <TransactionList />
    </Box>
  );
}

export default DashboardLayout;
