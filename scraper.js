var rp = require('request-promise');
var cheerio = require('cheerio');
var fs = require('fs');
var url = 'https://en.wikipedia.org/wiki/List_of_Philippine_provinces_by_population';

function save(data) {
  var json_data = "";
  for (x=0;x<data.length;x++){
    var entry = data[x];
    if(entry.length == 0){
      continue;
    } else {
      json_data = json_data + "{\"name\": \"" + entry[1][0] +
        "\",\"population\":" + parseInt(entry[2][0].replace(/,/g,""), 10) +
        ", \"type\": \"province\", \"region\":\"\"},\n"
    }
  }
  fs.writeFile('pop_file.json', json_data, function(err, data){
    if (err) console.log(err);
    console.log("Successfully written to file");
  });
}

rp(url)
.then(function(html){
  var $ = cheerio.load(html);
  var data = [];
  first_table = $('table[class="wikitable sortable"] > tbody', html)[0];
  for(x=0;x<first_table.children.length;x++){
    var table_child = first_table.children[x];
    var cdata = [];
    if(table_child.name == "tr"){
      for(y=0;y<table_child.children.length;y++){
        var table_grandchild = table_child.children[y];
        var gcdata = [];
        if(table_grandchild.name == "td"){
          for(z=0;z<table_grandchild.children.length;z++){
            var table_greatgrandchild = table_grandchild.children[z];
            if (table_greatgrandchild.data && table_greatgrandchild.data != '\n'){
              gcdata.push(table_greatgrandchild.data);
            } else if(table_greatgrandchild.children){
              if (table_greatgrandchild.children[0].data){
                gcdata.push(table_greatgrandchild.children[0].data);
              } else {
                gcdata.push(table_greatgrandchild.children[0].children[0].data);
              }
            }
          }
          cdata.push(gcdata);
        } else {
          continue;
        }
      }
      data.push(cdata);
    } else {
      continue;
    }
  }
  save(data);
})
.catch(function(err){
  console.log(err);
});
