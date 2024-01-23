let express = require("express")
let app = express()
let cors = require("cors")
let bodyParser = require("body-parser")
const mongoose = require("mongoose")
const { Schema } = require("mongoose")
app.use(cors())
app.use(bodyParser.json())
require('dotenv').config()
let port = process.env.PORT

const ProductsSchema = new Schema({
    name: String,
    image: String,
    price: Number
  
});
const Products = mongoose.model("Products",ProductsSchema)

app.get("/api/products",async(req,res)=>{
    let products = await Products.find()
    if(products.length>0){
        res.send(products)
    }else{
        res.send("Data not found")
    }
})
app.get("/api/products/:id",async(req,res)=>{
    let { id } = req.params
    let findedProduct = await Products.findById(id)
    if(findedProduct){
        res.send(findedProduct)
    }else{
        res.send("Data not found")
    }
})
app.delete("/api/products/:id",async(req,res)=>{
    let { id } = req.params
    let deletetedProduct = await Products.findByIdAndDelete(id)
    if(deletetedProduct){
        res.send(deletetedProduct)
    }else{
        res.send("Data not found")
    }
})
app.post("/api/products",async(req,res)=>{
    let { name, image, price } = req.body
    let newData={}
    if(name){
        newData.name=name
    }
    if(image){
        newData.image=image
    }
    if(price){
        newData.price=price
    }
    let newProduct = new Products(newData)

    let savedProduct = await newProduct.save()
    res.send(savedProduct)

})





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

mongoose.connect(process.env.DB_CONNETCION_KEY.replace("<password>",process.env.DB_PASSWORD))
.then(() => console.log('Mongo hazirdir!'));