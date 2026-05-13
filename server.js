const express = require("express");

const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

const users = [];
let products = [];

app.get("/", (req, res) => {
    res.send("Backend Server is Running Successfully!");
});

app.post("/signup", (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const userExists = users.find((user) => user.email === email);

    if (userExists) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email,
        password
    };

    users.push(newUser);

    res.status(201).json({
        message: "Signup successful",
        user: newUser
    });
});
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const user = users.find((user) => user.email === email);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    if (user.password !== password) {
        return res.status(400).json({
            message: "Invalid password"
        });
    }

    res.status(200).json({
        message: "Login successful",
        user
    });
});
app.post("/products", (req, res) => {

    const { productName, price, warranty, category, purchaseDate } = req.body;

    if (!productName || !price || !warranty || !category) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const newProduct = {
        id: products.length + 1,
        productName,
        price,
        purchaseDate,
        warranty,
        category
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });
});
app.get("/products", (req, res) => {

    res.status(200).json({
        message: "Products fetched successfully",
        products
    });
});
app.put("/products/:id", (req, res) => {

    const productId = parseInt(req.params.id);

    const { productName, price, warranty, category } = req.body;

    const product = products.find((p) => p.id === productId);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    if (productName) {
        product.productName = productName;
    }

    if (price) {
        product.price = price;
    }

    if (warranty) {
        product.warranty = warranty;
    }

    res.status(200).json({
        message: "Product updated successfully",
        product
    });
});
app.delete("/products/:id", (req, res) => {

    const productId = parseInt(req.params.id);

    const productIndex = products.findIndex(
        (p) => p.id === productId
    );

    if (productIndex === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const deletedProduct = products.splice(productIndex, 1);

    res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct[0]
    });
});
app.listen(5000, () => {
    console.log("Server started on port 5000");
});