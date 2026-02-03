import { User } from "../../models/User.model.js";
import { Sales } from "../../models/Sales.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    console.log("admin");
    const totalUsers = await User.countDocuments();  // ✅ Total users

    const totalSalesAgg = await Sales.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } } // ✅ Sum of all sales
    ]);

    const totalSales = totalSalesAgg[0]?.total || 0; // ✅ Default 0 if no sales

    res.status(200).json({
      totalUsers,
      totalSales
    });

  } catch (error) {
    res.status(500).json({ message: error.message }); // ✅ Error handling
  }
};
