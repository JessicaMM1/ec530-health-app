const app = require('express')();
const PORT = 8080;

app.listen(
	PORT,
	() => console.log('alive on http://localhost:${PORT}')
)

app.get('/users', (req, res) => {
	res.status(200).send({
		name: 'rhett',
		type: 'patient'
	})
});

app.post('/users/:id', (req, res) => {
	const {id} = req.params;
	const {name} = req.body;

})
