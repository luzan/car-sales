
const loginIndex = (req, res) => {
    res.send('Login Index');
}

const loginPost = (req, res) => {
    console.log(req.body);
    res.send('login post')
}

module.exports = {
    loginIndex
}