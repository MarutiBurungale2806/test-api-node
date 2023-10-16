const { default: mongoose } = require("mongoose")
const mongoConnection = {
    mongoURI: 'mongodb://localhost:27017/test-api',
    secretOrKey: 'your-secret-key',
  };
  
mongoose
  .connect(mongoConnection.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));