const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + '.pdf');
	}
});

const upload = multer({storage});

const PORT = 8000;

app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.send('hello');
});

app.post('/uploads', upload.single('file'), (req, res) => {
	console.log('file uploads is calling');
	console.log(req.file);
	console.log(req.body);
	fs.writeFile('out.pdf', req.body.file, err => {
		if (err) {
			res.status(500).send('fail');
		} else {
			res.send('it is ok');
		}
	})
	// res.send('file has been uploaded');
});

app.listen(PORT, () => {
	console.log('server has been started');
});