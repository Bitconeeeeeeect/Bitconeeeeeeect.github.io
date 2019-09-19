//Parse XLSX with Node to create JSON output
//using node module js-xlsx
var XLSX = require('xlsx');
var workbook = XLSX.readFile('Postal Codes.xlsx');
var sheet_name_list = workbook.SheetNames;
sheet_name_list.forEach(function(y){
  var worksheet = workbook.Sheets[y];
  var headers = {};
  var data = [];
  for(z in worksheet) {
    if(z[0] === '!') continue;
    var counter = 0;
    for (var i = 0; i < z.length; i++){
      if (!isNaN(z[i])){
        counter = i;
        break;
      }
    };
    var col = z.substring(0, counter);
    var row = parseInt(z.substring(counter));
    var value = worksheet[z].v;

    if(row == 1 && value){
      headers[col] = value;
      continue;
    }
    if(!data[row]) data[row] = {};
    data[row][headers[col]] = value;
  }

  data.shift();
  data.shift();

  // to double-check conversion
  //console.log(data);
  //stringify JSON
  stringifiedJSON = JSON.stringify(data);

  // check if postal code exists in the dataset
  var codeExists = function(stringifiedJSON, code, property){
    parsedJSON = JSON.parse(stringifiedJSON);
    for(var i = 0; i < parsedJSON.length; i += 1){
      if(parsedJSON[i].POST_CODE === code){
        return (typeof parsedJSON[i][property] !== 'undefined')
      }
    }
    // if not, return false (no highlights on calendar)
    return false;
  }

  // check with input string
  console.log(codeExists(stringifiedJSON, document.getElementById('PostalCode'), 'FRIDAY'));
  //codeExists(stringifiedJSON, document.getElementById('PostalCode'), 'SUNDAY' );
  //codeExists(stringifiedJSON, document.getElementById('PostalCode'), 'MONDAY' );
  //codeExists(stringifiedJSON, document.getElementById('PostalCode'), 'TUESDAY' );
  //codeExists(stringifiedJSON, document.getElementById('PostalCode'), 'WEDNESDAY' );
  //codeExists(stringifiedJSON, document.getElementById('PostalCode'), 'THURSDAY' );
  //codeExists(stringifiedJSON, document.getElementById('PostalCode'), 'FRIDAY' );
  //codeExists(stringifiedJSON, document.getElementById('PostalCode'), 'SATURDAY' );
  //codeExists(stringifiedJSON, document.getElementById('PostalCode'), 'SUNDAY' );

  // if yes, return true (yes calendar with highlighted days)
});
