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
        console.log(req.user, 'user_getcart');
        // let id = req.user.id;
        let id = 1;
        if (req.user && req.user.id ) id = req.user.id;
        let db = req.app.get('db')
        db.getCart(id).then(cart=>{
            console.log(cart, 'cart from db')
            //string coming from db need to covert to json object
            cart = [{name:"mockdatabase", quantity:"3", price:"4.34"},{name: 'data', quantity: 4, price: "12.34"}]
            res.status(200).send(cart);
        })
        .catch(err=>console.log(err));
    },

    replaceCart: function (req, res, next){
        //object coming back, need to convert to string for db
        const {user_id, cart} = req.body;
        let db = req.app.get('db')
        db.replaceCart([user_id, cart]).then(cart=>{
            console.log(cart);
            res.status(200).send(cart);
        })
        .catch(err=>console.log(err));
    },
  

}