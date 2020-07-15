const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

//  Initialize mongooseDB

mongoose.connect('mongodb://localhost/react-online-store-db', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

const Product = mongoose.model(
	/*model('name of collection/table', 'list of fields/columns') */
	'products',
	new mongoose.Schema({
		_id: { type: String, default: shortid.generate } /*shortid is creating an ID */,
		title: String,
		description: String,
		image: String,
		price: Number,
		availableSizes: [String],
	})
);

app.get('/api/products', async (req, res) => {
	const products = await Product.find(
		{}
	); /*find has {} to set no condition. It will return all products. Find is a promise */
	res.send(products);
});

app.post('/api/products', async (req, res) => {
	const newProduct = new Product(req.body); /*We are filling req.body with data of the new product */
	const savedProduct = await newProduct.save(); /*Saving product to database */
	res.send(savedProduct);
});

app.delete('/api/products/:id', async (req, res) => {
	const deletedProduct = await Product.findById(req.params.id); /*params.id === :id */
	res.send(deletedProduct);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('serve at http://localhost: 5000'));
