const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());
const products = JSON.parse(fs.readFileSync('./data/products.json','utf-8'));

app.get('/api/v1/products',(req,res)=>{
    res.status(200).json({
        status: 'success',
        results: products.length,
        data: {
            products
        }
    });
});

app.get('/api/v1/products/:id',(req,res)=>{
console.log(req.params);
const {id} = req.params;

const singleProduct = products.find(product => product.id === Number(id));
if(!singleProduct){
    return res.status(404).json({
        status: 'fail',
        message: 'Product not found'
    });
}

res.status(200).json({
    status: 'success',
    data: {
        product: singleProduct
    }
});
// const id = req.params.id;
// const product = products.find(p => p.id === id);

});

app.post('/api/v1/products',(req,res)=>{
console.log(req.body);
const body = req.body;
const newId = products.at(-1).id + 1;
const newproduct={id: newId,...body};
products.push(newproduct);
fs.writeFileSync('./data/products.json',JSON.stringify(products), err =>{
    if(err){
        return res.status(500).json({
            status: 'error',
            message: 'Could not save product'
        });
    }
res.status(201).json({

});
    res.status(201).json({
        status: 'success',  

        data: {
            product: 'New Product'
        }
    });
});
});





app.listen(5000,()=>{
    console.log('Server is running on port 5000');
});
