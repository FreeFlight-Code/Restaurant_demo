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
        // console.log(req.user)
        // let id = req.user.id;
        let id = 1;
        let db = req.app.get('db')
        db.getCart(id).then(cart=>{
            console.log(cart);
            cart = [{name:"mockdatabase", quantity:"3", price:"4.34"},{name: 'data', quantity: 4, price: "12.34"}]
            // res.status(200).send(JSON.parse(cart))
            res.status(200).send(cart);
        })
    },

    updateCart: function (req, res, next){
        console.log('update cart is all jacked up..........');
        // let string = JSON.stringify(res.body);
        let db = req.app.get('db')
        db.getCart([]).then( res =>{
            if (res.status && res.data) {
                res.status(200).send(res.data)
            }
        }).then(()=>{
            console.log('db error... sending mock data')
            res.status(201).send([
                {name: 'simulated', quantity: 2, price: "2.3"},
                {name: 'backend', quantity: 4, price: "12.34"},
                {name: 'data', quantity: 6, price: "22.34"},
                {name: 'hot dog', quantity: 1, price: "24"},
                {name: 'oil caster', quantity: 5, price: "32.34"},
            ])
        })
        .catch(err=>res.status(400).send(err))
    },
  

}