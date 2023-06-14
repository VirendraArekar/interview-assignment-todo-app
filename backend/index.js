const express  = require('express');
const cors = require('cors');
const helmet = require('helmet');
const multer = require('multer');
const bodyParser = require('body-parser');
const logger = require('./config/logger');
const mongoose = require('./config/mongoose');
const routes = require('./routes')
mongoose.connect();

var dirname = __dirname;
dirname = dirname.replace('src','');
dirname = dirname.replace('config','');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, `${dirname}/public/uploads`);
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});
const upload = multer({ storage });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${dirname}/public`));
const up = upload.fields([{name: "picture"}, {name: "signature"}]);
app.use(up);
app.use(helmet());
app.use(cors());
app.use('/api/v1', routes);


app.listen(process.env.port, () => console.log(`Server running on port ${process.env.port}`));

module.exports = app;
