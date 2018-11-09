// philippines pass: pilipinas
// get name
// compute population
// generate results

var db = require('./db');
var config = require('./config.json');

db.query("SELECT * FROM Places ORDER BY Population DESC", function(err, results, fields){
  if (err) console.log(err)
  else {
    var underrepresented = [];
    for(x=0; x<results.length; x++){
      entry = results[x];
      computed_seats = Math.floor(entry.Population/250000);
      deficit_seats = computed_seats - entry.Legislative_Seats;
      if (deficit_seats > 0){
        underrepresented.push({
          name: entry.Name,
          total_seats: entry.Legislative_Seats,
          missing_seats: deficit_seats
        });
      }
    }
    console.log(underrepresented);
    db.end();
  }
});
