const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const userRoute = require('./router/user');
app.use(express.json());

app.use('/api/user', userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
