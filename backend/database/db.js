const mongoose = require("mongoose");

const uri =
  "mongodb+srv://e_commerce_1:e_commerce_1@cluster0.byi8jhj.mongodb.net/?retryWrites=true&w=majority";

const connection = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDb bağlantısı başarılı"))
    .catch((err) => console.log("Bağlantı hatası: ", err));
};

module.exports = connection;
