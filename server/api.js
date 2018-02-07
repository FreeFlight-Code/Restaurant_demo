module.exports = {

    allProducts: function (req, res, next){
        let db = req.app.get('db')
        db.allProducts().then(allProducts=>{
            res.status(200).send(allProducts)
        })
    },

    product: function (req, res, next){
        let { productId } = req.params.id;
        let db = req.app.get('db')
        db.product(productId).then(product=>{
            res.status(200).send(product)
        })
    },

    addProduct: function (req, res, next){
        let { name, description, price } = req.body;
        let db = req.app.get('db')
        db.product([name, description, price]).then(product=>{
            res.status(200).send(product)
        })
    },

    editProduct: function (req, res, next){
        let { id, name, description, price } = req.body;
        let db = req.app.get('db')
        db.editProduct([id, name, description, price]).then(product=>{
            res.status(200).send(true)
        }).catch((err)=>{
            res.status(400).send(err)
        })
    },

    deleteProduct: function (req, res, next){
        let id = req.params.id;
        let db = req.app.get('db')
        db.product(id).then(_=>{
            res.status(200).send(true)
        }).catch((err)=>{
            res.status(400).send(err)
        })
    },



}