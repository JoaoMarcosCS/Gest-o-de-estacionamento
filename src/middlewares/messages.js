const { parse } = require('date-fns');

exports.messagesGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.cars = req.session.cars;
    const formater = Intl.DateTimeFormat(undefined, {
        dateStyle: "full",
        timeStyle: "short",
    });

    // console.log(`Array que tem o session com os cars:\n ${req.session.cars}`);
    // req.session.cars.forEach(car => {
    //     console.log(`Tipo do car.entradaTime da sessão: ${typeof(car.entradaTime)}: ${car.entradaTime}`);
    // })
    // res.locals.cars.forEach(car => {
    //     console.log(`Tipo do car.entradaTime do locals renderizado: ${typeof(car.entradaTime)}: ${car.entradaTime}`);
    //     // const data = new Date(car.entradaTime);
    //     // console.log(`Tipo do data do locals renderizado: ${typeof(data)}: ${data}`);
    // });

    next();
};