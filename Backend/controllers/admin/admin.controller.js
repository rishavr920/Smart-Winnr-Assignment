import { User } from "../../models/User.model.js";
import { Sales } from "../../models/Sales.model.js";

export const dashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    const totalSalesAgg = await Sales.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalSales = totalSalesAgg[0]?.total || 0;

    //fetching all sales for the table
    const sales = await Sales.find().sort({ createdAt: -1 });

    const monthlySales = await Sales.aggregate([
      { $group: { _id: { $month: "$createdAt" }, total: { $sum: "$amount" } } },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalUsers,
      totalSales,
      monthlySales,
      users, 
      sales  
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// To update the role
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    await User.findByIdAndUpdate(id, { role });
    res.json({ message: "Role updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//To Block and unblock the user 
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    await User.findByIdAndUpdate(id, { isActive });
    res.json({ message: "Status updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};