const Flavor = require("../models/Flavor");

exports.placeOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    // ✅ Decrease quantity of each product ordered
    for (const item of order.items) {
      await Flavor.findByIdAndUpdate(item._id, {
        $inc: { quantity: -item.quantity }
      });
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Order failed", error });
  }
};
