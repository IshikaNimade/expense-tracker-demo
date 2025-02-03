import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  DialogContentText,
} from "@mui/material";
import { useExpenses } from "../hooks/useExpenses";

const CustomDeleteExpense = ({ transactionId, onCancel }) => {
  const { removeExpense, loading } = useExpenses();

  const handleConfirmDelete = async () => {
    if (!transactionId) return;
    try {
      await removeExpense(transactionId);
      onCancel();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <Dialog open={!!transactionId} onClose={onCancel}>
      <DialogTitle color="secondary">Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this transaction? This action cannot
          be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="error" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleConfirmDelete}
          color="error"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Yes, Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDeleteExpense;
