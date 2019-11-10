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
        price = Math.floor(price);
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
        console.log(' ln 48 api getCart');
        let id = 1;//delete '=1' for production
        if (req.user && req.user.id ) id = req.user.id;
        let db = req.app.get('db')
        if (id){
            db.getCart(id).then(cart=>{
                console.log(cart, 'cart from db')
                if (cart.length <= 0) {
                    console.log('sending mock cart');
                    cart = '[{"name":"mockdatabase", "quantity":3, "price": 4},{"name": "data", "quantity": 4, "price": 12}]';
                }

                //cart going forward needs to be an array
                res.status(200).send(JSON.parse(cart));
            })
            .catch(err=>console.log);
        }
        else console.log('no req.user.id found - line 62, api.js')
    },

    replaceCart: function (req, res, next){
        //object coming back, need to convert to string for db
        // console.log('ln 64 api replaceCart')
        const {user_id, cart} = req.body;
        if(!user_id){
            throw('user_id error in replaceCart.api.js');
            user_id
        }
        if(!cart)throw('no cart in replaceCart.api.js')
        let db = req.app.get('db')
        db.replaceCart([user_id, cart]).then(cart=>{
            console.log(cart);
            res.status(200).send(cart);
        })
        .catch(err=>console.log(err));

    },


}