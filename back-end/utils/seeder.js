const dotenv = require("dotenv");
dotenv.config({ path: "back-end/config/config.env" });
const Product = require("../models/product");
const connectDatabase = require("../config/database");

const products = require("../data/products");

//setting dot env files

connectDatabase();
const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log(`Product are deleted`);

    const productsWithUserId = products.map((prod) => {
      prod.user = "61a251c7c6c2b046fc0ccbb5";
      return prod;
    });

    await Product.insertMany(productsWithUserId);
    console.log(`All products are added`);
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
