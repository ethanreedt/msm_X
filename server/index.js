const app = require('./src/app');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let db_uri = 'mongodb://127.0.0.1:27017/msm';
mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(
    () => { console.log('Database is connected'); },
    (err) => { console.log('Can not connect to the database: ' + err); }
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));