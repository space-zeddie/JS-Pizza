/**
 * Created by chaika on 09.02.16.
 */
exports.mainPage = function(req, res) {
    res.render('mainPage', {
        pageTitle: 'Menu'
    });
};

exports.orderPage = function(req, res) {
    res.render('order', {
        pageTitle: 'Order'
    });
};