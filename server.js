const app = require(__dirname+'/src/app.js');
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('started at port '+port);
});
