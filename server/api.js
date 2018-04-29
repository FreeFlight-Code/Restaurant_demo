module.exports = {
//read all products
    allProducts: function (req, res, next){
        let db = req.app.get('db')
        db.allProducts().then(allProducts=>{
            res.status(200).send(allProducts)
        })
    },
//create product
    addProduct: function (req, res, next){
        let { name, description, price } = req.body;
        let db = req.app.get('db')
        db.addProduct([name, description, price]).then(product=>{
            console.log('product added to database');
            res.status(200).send(true);
        })
    },
//read product
    product: function (req, res, next){
        let  productId  = req.params.id;
        let db = req.app.get('db')
        db.product(productId).then(product=>{
            res.status(200).send(product)
        })
    },
//update product
    editProduct: function (req, res, next){
        let { id, name, description, price } = req.body;
        let db = req.app.get('db')
        db.editProduct([id, name, description, price]).then(product=>{
            res.status(200).send(true)
        }).catch((err)=>{
            res.status(400).send(err)
        })
    },
//delete product
    deleteProduct: function (req, res, next){
        let id = req.params.id;
        let db = req.app.get('db')
        db.deleteProduct(id).then(_=>{
            res.status(200).send(true)
        }).catch((err)=>{
            res.status(400).send(err)
        })
    },
    getCart: function (req, res, next){
        let id = req.params.id;
        let db = req.app.get('db')
        db.getCart(id).then( res =>{
            res.status(200).send(res.data)
        }).catch((err)=>{
            res.status(400).send(err)
        })
    },
    updateCart: function (req, res, next){
        let string = JSON.stringify(res.body);
        let db = req.app.get('db')
        db.getCart(string).then( res =>{
            // res.status(200).send(res.data)
            res.status(200).send(true)
        }).catch((err)=>{
            res.status(400).send(err)
        })
    },
  

}