
$("document").ready(function() {
  $("#multTable").validate({
      rules: {
          row_start: {
              required: true,
              digits: true,
              range: [1, parseInt($("#row_end").val())]
          },
          row_end: {
              required: true,
              digits: true,
              range: [parseInt($("#row_start").val()), 12]
          },
          column_start: {
              required: true,
              digits: true,
              range: [1, parseInt($("#column_end").val())]
          },
          column_end: {
              required: true,
              digits: true,
              range: [parseInt($("#column_start").val()), 12]
          }
      }
  });

});

function createTable() {
  // First any previous table is removed.
  deleteTables();

  if(!$("#multTable").valid()) return;

  // Next, the four values for our table are pulled from the form as strings.
  var row_start_string = document.getElementsByName('row_start')[0].value;
  var row_end_string = document.getElementsByName('row_end')[0].value;
  var column_start_string = document.getElementsByName('column_start')[0].value;
  var column_end_string = document.getElementsByName('column_end')[0].value;

  // Now the values are parsed as integers.
  var row_start = parseInt(row_start_string);
  var row_end = parseInt(row_end_string);
  var column_start = parseInt(column_start_string);
  var column_end = parseInt(column_end_string);

  // This check ensures that the user has entered a valid range.
  if(column_end < column_start) column_end = column_start;
  if(row_end < row_start) row_end = row_start;

  // Now the table can be created.
  var table = document.createElement('table');

  // Now each table element will be created in this for loop.
  for (var i = row_start-1; i <= row_end; i++){
      // A basic table row element is created here.
      var tr = document.createElement('tr');

      // Now the elements inside each row will be created.
      for (var j = column_start-1; j <= column_end; j++) {
        // A single table element is created here.
        var td = document.createElement('td');

        // Here, the multiplication is carried through.
        var value = document.createTextNode(''+i*j);

        // If this is the first table entry, it should be an empty block.
        if(j == column_start-1 && i == row_start-1) {
          value = document.createTextNode('');
        }
        // If this is the first row, write in the multiplicands.
        else if(i == row_start-1) {
          value = document.createTextNode(''+j);
        }
        // If this is the first column, write in the multipliers.
        else if(j == column_start-1) {
          value = document.createTextNode(''+i);
        }
        // The value is applied to the table entry.
        td.appendChild(value);

        // The table entry is added to the row element.
        tr.appendChild(td);
      }
      // The row element is added to table.
      table.appendChild(tr);
  }
  // The completed table is written to the body of the document.
  document.body.appendChild(table);
}

function writeError(msg) {
  // Here a basic one cell table is created to display an error message.
  // It is made into a table because the function deleteTables() will
  // remove our error message on the next run.
  var table = document.createElement('table');
  var tr = document.createElement('tr');
  var td = document.createElement('td');
  var value = document.createTextNode(msg);
  td.appendChild(value);
  tr.appendChild(td);
  table.appendChild(tr);
  document.body.appendChild(table);
}

function deleteTables() {
  // Any table elements are pulled from the document.
  var elements = document.getElementsByTagName('table');

  // Each table element is removed inside this for loop.
  for(var i = 0; i < elements.length; i++) {
    elements[i].parentElement.removeChild(elements[i]);
  }
}
