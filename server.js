const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const footballersRouter = require('./routes/footballers');
const { swaggerSpec, swaggerUi } = require('./swagger');
const app = express();
const port = 3000;

const morgan = require('morgan');

morgan.token('date', (req, res) => {
    const d = new Date();
    return d.toLocaleString();
    })

app.use(morgan('[:date] :method :url :status'))


dotenv.config();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use('/api/footballers', footballersRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/api/footballers`);
});