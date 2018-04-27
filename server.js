let express = require('express');
let app = express();
let products = [
   {
       id: 1,
       name: 'A'
   },
   {
        id: 2,
        name: 'B'
    },
    {
        id: 3,
        name: 'C'
    }
];
app.get('/',function(req,res){
    res.send('Hello API');
})
app.get('/products', function(req, res){
    res.send(products);
})
app.get('/products/:id', function(req, res){
    console.log(req.params);
    let products = products.find(function(products){
        return products.id === Number(req.params.id)
    });
    res.send(products);
});


app.listen(3000,function(){
    console.log('API app started')
})
