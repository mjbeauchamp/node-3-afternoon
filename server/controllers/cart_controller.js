const swag = require('../models/swag');

module.exports = {
    add: (req, res, next) => {
        const {id} = req.query;
        let { cart } = req.session.user;
        //find index if it's in cart
        const index = cart.findIndex(val => val.id == id);

        if(index === -1){
            const selectedSwag = swag.find(val => val.id == id);
            cart.push(selectedSwag);
            req.session.user.total += selectedSwag.price;
        }
        res.status(200).send( req.session.user );
    },
    delete: (req, res, next) => {
        const {id} = req.query;
        let { cart } = req.session.user;
        const selectedSwag = swag.find(val => val.id == id);
        if(selectedSwag){
            const index = cart.findIndex(val => val.id == id);
            cart.splice(index, 1);
            req.session.user.total -= selectedSwag.price;
        }
        res.status(200).send(req.session.user);
    }, 
    checkout: (req, res, next) => {
        let { user } = req.session;
        user.cart = [];
        user.total = 0;
        res.status(200).send(req.session.user)
    }
}