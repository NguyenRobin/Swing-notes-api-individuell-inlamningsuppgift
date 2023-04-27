const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

const userRoute = require('./router/user');
const noteRoute = require('./router/note');
const swaggerRoute = require('./router/swagger');
app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/notes', noteRoute);
app.use('/api/docs', swaggerRoute);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
