import { Typography, Stack, useTheme } from "@mui/material";

const CustomAppName = () => {
  const theme = useTheme();
  return (
    <Stack paddingBottom={8} alignItems="center">
      <Typography variant={"h2"} fontFamily={"-moz-initial"} color="primary">
        SpendWise
      </Typography>
      <Typography sx={{ color: theme.palette.ternery.main }}>
        Your Personal Expense Tracker
      </Typography>
    </Stack>
  );
};

export default CustomAppName;
