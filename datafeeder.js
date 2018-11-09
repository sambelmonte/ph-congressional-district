var db = require('./db');
var data = require('./tabledata.json');

for(x=0; x<data.length; x++){
  var entry = data[x];
  var query = "INSERT INTO Places (Name, Type, Region, Population, Legislative_Seats)" +
    "VALUES ('" + entry.name + "','" + entry.type + "','" + entry.region +
    "'," + entry.population + "," + entry.legislative_seats + ");"
  db.query(query, function (err, result){
    if (err) console.log(err);
    console.log("Entered "+entry.name);
  });
}

console.log("Done!");
db.end();
