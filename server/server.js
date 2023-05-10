const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require("./models/productModel");

app.get("/", (req, res) => {
  res.send("Hello node");
});
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.get("/blog", (req, res) => {
  res.send("Hello node");
});

app.get("/products", async (req,res)=> {

    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.get("/products/:id", async (req,res)=> {

    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


app.post("/products",async (req, res) => {
 try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
 } catch (error) {
    console.log(error.message);
    res.status(500).json({message:error.message})
 }
});

app.listen(3000, () => {
  console.log(`Node is running on port 3000`);
});

//update a product


app.put("/products/:id", async (req,res)=> {

    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body)
if (!product) {
return res.status(404).json({message:(`Cannot find a product ${id}`)})
}
const updateProduct = await Product.findById(id);
res.status(200).json(updateProduct)
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//delete 
app.delete("/products/:id", async (req,res)=> {

    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
if (!product) {
return res.status(404).json({message:(`Cannot find a product ${id}`)})
}

res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


mongoose
  .connect(
    ``
  )
  .then(() => {
    console.log("MongoDb connect");
  })
  .catch((error) => {
    console.log(error);
  });
