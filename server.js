const express=require('express');
const mongoose=require('mongoose');
const app=express();
app.use(express.json());

mongoose.connect('mongodb+srv://dharanitharanit23_db_user:OjllhsMQPKqwNTeN@cluster0.cuh0mlr.mongodb.net/?appName=Cluster0').then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
});

const ProductSchema=new mongoose.Schema({
    name:{type:String,},
    price:{type:Number,},
    description:{type:String,},
    image:{type:String,},

})

const Product=mongoose.model('Product', ProductSchema);





const product=[
    {
        id:1,
        name:'Product 1',
        price:1000
    },
    {
    id:2,
    name:'Product 2',
    price:2000
}
]

app.listen(5000,()=>{
    console.log("server is running on port 5000");
});

app.get('/product',(req,res)=>{
    res.send(product);
});

app.post('/add',(req,res)=>{
    const {id,name,price}=req.body;

    const obj={
    id:id,
    name:name,
    price:price
}

product.push(obj);
res.send(product);
});

app.get('/admin',(req,res)=>{
    res.send('Hello admin');
});


app.post('/addproduct',async(req,res)=>{
    const {name,price,description,image}=req.body;
    const newproduct=new Product({
        name:name,
        price:price,
        description:description,
        image:image
    });
await newproduct.save()
    res.send('Product added successfully');
})

app.get("/getproduct",async(req,res)=>{
try{
    const allproduct=await Product.find();
res.send(allproduct);
}                  
catch(error){
    res.send(error)
}
})

app.get("/getproduct/:id",async(req,res)=>{
    const id=req.params.id;
        const product=await Product.findById(id);
        res.send (product);
})


app.delete("/delproduct/:id",async(req,res)=>{
    const id=req.params.id;
        await Product.findByIdAndDelete(id);
        res.send ("product Deleted successfully");
})






