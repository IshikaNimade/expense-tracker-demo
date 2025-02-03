import { useState, useRef } from "react";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import CustomExpenseActions from "../components/CustomExpenseActions";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CustomDeleteExpense from "../components/CustomDeleteExpense";
import exportPDF from "../utils/exportPDF";
import { useExpenses } from "../hooks/useExpenses";

function TransactionList() {
  const { expenses } = useExpenses();
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const tableRef = useRef(null);

  const formattedDate = (dateString) => {
    return new Date(dateString)
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(",", "")
      .replace("/", "-")
      .replace("/", "-");
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        bgcolor: "#fff",
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Transaction List
          </Typography>
          <CustomExpenseActions exportPDF={() => exportPDF(expenses)} />
        </Box>

        <Divider sx={{ marginTop: "2rem", marginBottom: "2rem" }} />

        <Table sx={{ minWidth: 650 }} ref={tableRef} id="transaction-table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: "#A3AED0",
                  fontWeight: "bold",
                  border: "none",
                  fontSize: "0.9rem",
                }}
              >
                DISCRIPTION
              </TableCell>
              <TableCell
                sx={{
                  color: "#A3AED0",
                  fontWeight: "bold",
                  border: "none",
                  fontSize: "0.9rem",
                }}
              >
                CATEGORY
              </TableCell>
              <TableCell
                sx={{
                  color: "#A3AED0",
                  fontWeight: "bold",
                  border: "none",
                  fontSize: "0.9rem",
                }}
              >
                DATE
              </TableCell>
              <TableCell
                sx={{
                  color: "#A3AED0",
                  fontWeight: "bold",
                  border: "none",
                  fontSize: "0.9rem",
                }}
              >
                AMOUNT (INR)
              </TableCell>
              <TableCell
                sx={{
                  color: "#A3AED0",
                  fontWeight: "bold",
                  border: "none",
                  fontSize: "0.9rem",
                }}
              >
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses && expenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ border: "none" }}>
                  <Typography sx={{ color: "#A3AED0", fontWeight: "medium" }}>
                    No data present
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              expenses.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell sx={{ border: "none" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        sx={{
                          width: 34,
                          height: 34,
                          bgcolor:
                            transaction.category === "Income"
                              ? "#05CD99"
                              : "#FF0000",
                        }}
                      >
                        <CurrencyExchangeIcon sx={{ color: "white" }} />
                      </Avatar>
                      <Typography
                        sx={{ color: "#2B3674", fontWeight: "medium" }}
                      >
                        {transaction.description}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <Chip
                      label={transaction.category}
                      size="small"
                      sx={{
                        backgroundColor:
                          transaction.category === "Income"
                            ? "#E6FFF3"
                            : "#FFF3F3",
                        color:
                          transaction.category === "Income"
                            ? "#05CD99"
                            : "#FF0000",
                        fontWeight: "medium",
                        borderRadius: 1,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "#A3AED0", border: "none" }}>
                    {formattedDate(transaction.createdAt)}
                  </TableCell>
                  <TableCell
                    sx={{
                      color:
                        transaction.category === "Income"
                          ? "#05CD99"
                          : "#FF0000",
                      fontWeight: "medium",
                      border: "none",
                    }}
                  >
                    ₹{Math.abs(transaction.amount).toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <IconButton
                      color="error"
                      onClick={() => setTransactionToDelete(transaction.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>

      <CustomDeleteExpense
        transactionId={transactionToDelete}
        onCancel={() => setTransactionToDelete(null)}
      />
    </Card>
  );
}

export default TransactionList;
