exports.createOrder = async (req, res) => {
  try {
    const { items, shippingData, subtotal, shipping, tax, total } = req.body;

    // Save to database (if using one), here we'll mock
    console.log("Order received:", {
      user: req.user, // from token
      items,
      shippingData,
      subtotal,
      shipping,
      tax,
      total,
    });

    res.status(201).json({ message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to place order" });
  }
};
