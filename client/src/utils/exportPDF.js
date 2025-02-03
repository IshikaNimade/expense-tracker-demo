import { jsPDF } from "jspdf";

function exportPDF(transactions) {
  const doc = new jsPDF();

  // Set title
  doc.setFontSize(20);
  doc.setTextColor(30, 114, 189);
  doc.text("SpendWise - Your Personal Expense Tracker", 20, 20);

  // Overview section
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text("Overview", 20, 35);

  // Calculate totals for overview
  const expenses = transactions.filter((t) => t.category === "Expense");
  const incomes = transactions.filter((t) => t.category === "Income");
  const totalExpense = expenses.reduce(
    (sum, t) => sum + parseFloat(t.amount),
    0
  );
  const totalIncome = incomes.reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const balance = totalIncome - totalExpense;

  // Overview boxes
  const boxWidth = 50;
  const boxHeight = 20;
  const boxY = 40;

  // Total Income Box
  doc.setFillColor(220, 230, 240);
  doc.rect(20, boxY, boxWidth, boxHeight, "F");
  doc.setFontSize(10);
  doc.text("Total Income", 22, boxY + 7);
  doc.setFontSize(12);
  doc.text(`RS.${totalIncome}`, 22, boxY + 16);

  // Total Expense Box
  doc.setFillColor(220, 230, 240);
  doc.rect(80, boxY, boxWidth, boxHeight, "F");
  doc.setFontSize(10);
  doc.text("Total Expense", 82, boxY + 7);
  doc.setFontSize(12);
  doc.text(`RS.${totalExpense}`, 82, boxY + 16);

  // Balance Box
  doc.setFillColor(220, 230, 240);
  doc.rect(140, boxY, boxWidth, boxHeight, "F");
  doc.setFontSize(10);
  doc.text("Current Balance", 142, boxY + 7);
  doc.setFontSize(12);
  doc.text(`RS.${balance}`, 142, boxY + 16);

  // Combined Income and Expense Table
  const tableY = boxY + 30;
  doc.setFontSize(14);
  doc.text("Transaction List", 20, tableY);

  // Table Header
  const tableHeaderY = tableY + 5;
  const colWidths = [30, 60, 50, 40];
  let currentX = 20;

  // Set header background color to blue
  doc.setFillColor(30, 114, 189);
  doc.rect(currentX, tableHeaderY, colWidths[0], 8, "F");
  doc.rect(currentX + colWidths[0], tableHeaderY, colWidths[1], 8, "F");
  doc.rect(
    currentX + colWidths[0] + colWidths[1],
    tableHeaderY,
    colWidths[2],
    8,
    "F"
  );
  doc.rect(
    currentX + colWidths[0] + colWidths[1] + colWidths[2],
    tableHeaderY,
    colWidths[3],
    8,
    "F"
  );

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);

  // Header Titles
  doc.text("DATE", currentX + 2, tableHeaderY + 6);
  doc.text("DESCRIPTION", currentX + colWidths[0] + 2, tableHeaderY + 6);
  doc.text(
    "CATEGORY",
    currentX + colWidths[0] + colWidths[1] + 2,
    tableHeaderY + 6
  );
  doc.text(
    "AMOUNT",
    currentX + colWidths[0] + colWidths[1] + colWidths[2] + 2,
    tableHeaderY + 6
  );

  let currentY = tableHeaderY + 8;

  const allTransactions = [...incomes, ...expenses];

  allTransactions.forEach((transaction) => {
    const date = new Date(transaction.createdAt).toLocaleDateString();
    const category = transaction.category;
    const description = transaction.description;
    const amount = `RS.${transaction.amount}`;

    currentX = 20;

    // Date
    doc.rect(currentX, currentY, colWidths[0], 8);
    doc.setTextColor(0, 0, 0);
    doc.text(date, currentX + 2, currentY + 6);

    // Description
    currentX += colWidths[0];
    doc.rect(currentX, currentY, colWidths[1], 8);
    doc.text(description, currentX + 2, currentY + 6);

    // Category
    currentX += colWidths[1];
    doc.rect(currentX, currentY, colWidths[2], 8);
    doc.text(category, currentX + 2, currentY + 6);

    // Amount
    currentX += colWidths[2];
    doc.rect(currentX, currentY, colWidths[3], 8);
    doc.text(amount, currentX + 2, currentY + 6);

    currentY += 8;
  });

  // Save the PDF
  doc.save("spendwise-report.pdf");
}

export default exportPDF;
