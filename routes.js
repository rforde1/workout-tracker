const app = require("express").Router();
const db = require("./models");


// HTML ROUTES
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/stats", function (req, res) {
    res.sendFile(__dirname + "/public/stats.html");
});

app.get("/exercise", function (req, res) {
    res.sendFile(__dirname + "/public/exercise.html");
});




// API ROUTES
// Finds all workouts
app.get("/api/workouts", function (req, res) {
    db.Workout.find()
    .then(results => {
        res.json(results);
    })
    .catch(err =>{
        res.json(err)
    })
});

// Create workout
app.post("/api/workouts", function (req, res) {
    console.log(req.body);
  db.Workout.create(req.body)
  .then(results => {
      res.json(results);
  })
  .catch(err =>{
      res.json(err)
  });
});

app.put("/api/workouts/:id", function(req, res) {
    db.Workout.findOneAndUpdate(
        {_id: req.params.id},
        {$push:{exercises:req.body}}, (error,response) => {
        if(error){console.log(error)}else{
            res.json(response);
        }
      
    })
    .catch(err =>{
        res.json(err)
    });
});

app.get("/api/workouts/range", function(req,res){
    db.Workout.find({})
    .then(results =>{
        res.json(results);
    })
    .catch(err =>{
        res.json(err)
    })
});

module.exports = app;