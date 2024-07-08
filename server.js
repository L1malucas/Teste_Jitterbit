var app = require('./config/express');
const { createOrder, getOrder, getAllOrders, updateOrder, deleteOrder } = require('./app/app.controller');

const PORT = process.env.PORT || 3000;

app.post('/order', createOrder);
app.get('/order/:orderId', getOrder);
app.get('/order/list', getAllOrders);
app.put('/order/:orderId', updateOrder);
app.delete('/order/:orderId', deleteOrder);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
