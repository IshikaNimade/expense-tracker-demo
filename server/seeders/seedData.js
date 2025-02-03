const { User, Expense } = require("../models");
const bcrypt = require("bcryptjs");

const seedData = async () => {
  await User.sync({ force: true }); // Reset table
  await Expense.sync({ force: true });

  const hashedPassword = await bcrypt.hash("password123", 10);
  const user = await User.create({
    name: "John Doe",
    email: "john@example.com",
    password: hashedPassword,
  });

  await Expense.bulkCreate([
    {
      amount: 1000,
      category: "Income",
      description: "Salary",
      userId: user.id,
    },
    {
      amount: 500,
      category: "Expense",
      description: "Groceries",
      userId: user.id,
    },
  ]);

  console.log("Database seeded!");
  process.exit();
};

seedData();
