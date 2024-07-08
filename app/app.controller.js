const { sql, poolPromise } = require('../config/database');

async function createOrder(req, res) {
  try {
    const { orderId, value, creationDate, items } = req.body;
    const pool = await poolPromise;
    const request = pool.request();

    await request
      .input('orderId', sql.Int, orderId)
      .input('value', sql.Decimal(10, 2), value)
      .input('creationDate', sql.DateTime, new Date(creationDate))
      .query('INSERT INTO Orders (orderId, value, creationDate) VALUES (@orderId, @value, @creationDate)');

    for (const item of items) {
      await request
        .input('orderId', sql.Int, orderId)
        .input('productId', sql.Int, item.productId)
        .input('quantity', sql.Int, item.quantity)
        .input('price', sql.Decimal(10, 2), item.price)
        .query('INSERT INTO Items (orderId, productId, quantity, price) VALUES (@orderId, @productId, @quantity, @price)');
    }

    res.status(201).json({ message: 'Order created successfully' });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
}

async function getOrder(req, res) {
  const { orderId } = req.params;
  try {
    const pool = await poolPromise;
    const request = pool.request();

    const result = await request
      .input('orderId', sql.Int, orderId)
      .query('SELECT * FROM Orders WHERE orderId = @orderId');

    const order = result.recordset[0];

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const itemsResult = await request
      .input('orderId', sql.Int, orderId)
      .query('SELECT * FROM Items WHERE orderId = @orderId');

    const items = itemsResult.recordset;
    order.items = items;

    res.status(200).json(order);
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
}

async function getAllOrders(_req, res) {
  try {
    const pool = await poolPromise;
    const request = pool.request();

    const result = await request.query('SELECT * FROM Orders');
    const orders = result.recordset;

    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}

async function updateOrder(req, res) {
  const { orderId } = req.params;
  const { value, creationDate, items } = req.body;

  try {
    const pool = await poolPromise;
    const request = pool.request();

    await request
      .input('orderId', sql.Int, orderId)
      .input('value', sql.Decimal(10, 2), value)
      .input('creationDate', sql.DateTime, new Date(creationDate))
      .query('UPDATE Orders SET value = @value, creationDate = @creationDate WHERE orderId = @orderId');

    await request
      .input('orderId', sql.Int, orderId)
      .query('DELETE FROM Items WHERE orderId = @orderId');

    for (const item of items) {
      await request
        .input('orderId', sql.Int, orderId)
        .input('productId', sql.Int, item.productId)
        .input('quantity', sql.Int, item.quantity)
        .input('price', sql.Decimal(10, 2), item.price)
        .query('INSERT INTO Items (orderId, productId, quantity, price) VALUES (@orderId, @productId, @quantity, @price)');
    }

    res.status(200).json({ message: 'Order updated successfully' });
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ error: 'Failed to update order' });
  }
}

async function deleteOrder(req, res) {
  const { orderId } = req.params;

  try {
    const pool = await poolPromise;
    const request = pool.request();

    await request
      .input('orderId', sql.Int, orderId)
      .query('DELETE FROM Items WHERE orderId = @orderId');

    await request
      .input('orderId', sql.Int, orderId)
      .query('DELETE FROM Orders WHERE orderId = @orderId');

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).json({ error: 'Failed to delete order' });
  }
}

module.exports = {
  createOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
};
