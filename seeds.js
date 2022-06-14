//Import the mongoose module
const mongoose = require('mongoose');
// import model
const Car = require('./models/carSchema')
//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/cars';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("MongoDB Connected!");
})
.catch((err) => {
    console.log("MongoDB Connection Error!!");
    console.log(err);
});

const carsSeed = [
    {
        title: 'Used 2021 Tesla Model Y Long Range',
        status: 'used',
        year: '2021',
        make: 'Tesla',
        distance: 13954,
        model: 'Model Y',
        price: 71995,
        bodyStyle: 'Sedan',
        imageUrl: ['https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1634205604/autoexpress/2021/10/Tesla%20Model%20Y%202021-4.jpg']
    },
    {
        title: 'Used 2020 Ford EcoSport SE',
        status: 'used',
        year: '2020',
        make: 'Ford',
        distance: 12397,
        model: 'EcoSport',
        price: 23899,
        bodyStyle: 'SUV',
        imageUrl: ['https://www.cnet.com/a/img/resize/1f28dede9d7c2239607463537db1fc1feba51814/hub/2018/04/27/212e1c38-d0a2-41e8-a724-dc878a30fa8c/ogi1-001-2018-ford-ecosport-review.jpg?auto=webp&fit=crop&height=675&width=1200']
    },
    {
        title: 'Used 2020 BMW X3 M Base (A8)',
        status: 'used',
        year: '2020',
        make: 'BMW',
        distance: 11663,
        model: 'X3 M',
        price: 67832,
        bodyStyle: 'SUV',
        imageUrl: ['https://s3.us-east-2.amazonaws.com/dealer-inspire-vps-vehicle-images/110007841/5UXTY9C07L9B89978/bb6cb76d2682d6f5e5f6619ec51063cb.jpg']
    },
    {
        title: '2022 Audi e-tron Premium Plus',
        status: 'new',
        year: '2022',
        make: 'Audi',
        distance: 1,
        model: 'e-tron',
        price: 80630,
        bodyStyle: 'SUV',
        imageUrl: ['https://www.autotrader.com/wp-content/uploads/2021/05/2021-audi-e-tron-premium-front-left-side-e1639075042759.jpg']
    },

]

Car.insertMany(carsSeed)
.then((res) => console.log(res))
.catch((err) => console.log(err));