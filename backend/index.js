
const express = require('express')
const app = express()
const InMemoryWorkshop = require("../baseDeDonnees/inMemoryWorkshop")
const path = require("path")
const ejs = require('ejs')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

// set the view engine to ejs
// Si on veut changer les folders, il faudrait modifier ça
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'frontend/ejs'));
app.use(express.static(path.join(__dirname , '..', 'frontend/css')));


app.get('/', function (req, res) {
    InMemoryWorkshop.getWorkshopList()
    .then(workshops => {
        res.render("index", {
            workshops: workshops
        })
    })
})

app.get('/workshop', function (req, res) {
    console.log("get")
    res.render('workshop')
})

app.post('/workshop', function (req, res) {
    const name = req.body.name
    const description = req.body.description
    InMemoryWorkshop.addWorkshop(name, description).then(() => {
        InMemoryWorkshop.getWorkshopList()
        .then(workshops => {
            res.render("index", {
                workshops: workshops
            })
        })
    })
    .catch(e =>res.send(e.message))
})

app.get('/workshop/:name', function (req, res) {
    const workshopName = req.params.name
    InMemoryWorkshop.getWorkshopByName(workshopName)
    .then(workshop => {
        res.render('ejs/workshop', workshop)
    })
    .catch(e =>ejs.send(e.message))
})

app.get('/update-workshop', function (req, res) {
	console.log("je suis ici")
    const workshopId = req.query.update
	console.log(workshopId)
    InMemoryWorkshop.getWorkshopById(workshopId)
    .then(workshop => {
console.log("Dans le then")
        res.render('workshop-update', {workshop:workshop, id:workshopId})
    })
    .catch(e =>ejs.send(e.message))
})


app.post('/remove-workshop', function (req, res) {
    const id = req.body.remove
    InMemoryWorkshop.removeWorkshopById(id)
    .then(() => {
        InMemoryWorkshop.getWorkshopList()
        .then(workshops => {
            res.render("index", {
                workshops: workshops
            })
        })
    })
    .catch(e =>res.send(e.message))
    //res.status(500).send(id)
})

app.post('/update-workshop', function(req, res) {
    const id = req.body.workshopId
    const name = req.body.name
    const description = req.body.description
	InMemoryWorkshop.updateWorkshop(id, name, description)
	    .then(() => {
		InMemoryWorkshop.getWorkshopList()
		.then(workshops => {
		    res.render("index", {
		        workshops: workshops
		    })
		})
	    })
	    .catch(e =>res.send(e.message))
    
})

app.listen(3000, function () {
  console.log('Workshop app listening on port 3000!')
})
