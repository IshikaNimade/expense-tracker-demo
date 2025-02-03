import React, { useState } from "react";
import {
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useTheme } from "@mui/material/styles";
import CustomTextField from "./CustomTextField";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import DetailsIcon from "@mui/icons-material/Details";
import { useExpenses } from "../hooks/useExpenses";

const CustomExpenseActions = ({ exportPDF }) => {
  const theme = useTheme();
  const { createExpense } = useExpenses();

  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = ["Income", "Expense"];

  const handleDialogOpen = () => setOpenDialog(true);

  const handleDialogClose = () => {
    setOpenDialog(false);
    setErrorMessage("");
    setSuccessMessage("");
    setFormData({
      amount: "",
      category: "",
      description: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleExportClick = () => {
    exportPDF();
  };

  const handleAddExpense = async (e) => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    setFormData({ description: "", category: "", amount: "" });

    if (!formData.amount || !formData.category) {
      setLoading(false);
      setErrorMessage("Amount and category are required!");
      return;
    }

    try {
      await createExpense({
        amount: Number(formData.amount),
        category: formData.category,
        description: formData.description || "",
      });

      setSuccessMessage("Expense added successfully!");
      setTimeout(() => {
        setLoading(false);
        handleDialogClose();
      }, 1500);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message || "Failed to add expense.");
    }
  };

  return (
    <>
      <Stack direction={"row"} spacing={2}>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: "white",
            "&:hover": {
              bgcolor: theme.palette.primary.dark,
            },
          }}
          onClick={handleDialogOpen}
        >
          Add Transaction
        </Button>

        <Button
          variant="outlined"
          startIcon={<PictureAsPdfIcon />}
          onClick={handleExportClick}
          sx={{
            flex: 1,
            color: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            "&:hover": {
              borderColor: theme.palette.primary.dark,
              backgroundColor: "rgba(125, 103, 223, 0.04)",
            },
          }}
        >
          Export PDF
        </Button>
      </Stack>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        sx={{
          "& .MuiDialog-paper": {
            width: "600px",
            maxWidth: "100%",
            borderRadius: "12px",
          },
        }}
      >
        <DialogTitle
          variant="h4"
          fontFamily={"-moz-initial"}
          paddingBottom={6}
          sx={{
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
          }}
        >
          Add Transaction
        </DialogTitle>
        <DialogContent>
          <CustomTextField
            label="Amount (in ₹)"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            icon={<CurrencyRupeeIcon />}
          />

          <CustomTextField
            label="Category"
            variant="outlined"
            fullWidth
            select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            icon={<PriceChangeIcon />}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </CustomTextField>

          <CustomTextField
            label="Description (optional)"
            variant="outlined"
            fullWidth
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            icon={<DetailsIcon />}
          />

          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>

          <Button
            onClick={handleAddExpense}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Add"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomExpenseActions;
