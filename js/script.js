const square_size = 3;
const border_size = 1;
const orientation_boxes = 4;
const total_square_size = square_size + border_size * 2;
const boxes = square_size * square_size - orientation_boxes; // 4 = orientation boxes
const total_markers = Math.pow(2, boxes);

//binaries
var binary_base = '';
for (var i = 0; i < boxes; i++) {
  binary_base += '0';
}

var binaries = [];
for (var m = 0; m < total_markers; m++) {
  var n = (m).toString(2);
  var binary = binary_base.substr(n.length) + n;
  binaries.push(binary)
}

var html = '';

for (var b = 0; b < binaries.length; b++) {
  //reverse binary for counter
  var counter = 0;
  var current_binary = binaries[b].split("").reverse().join("");

  html += '<div class="marker">';
  for (var i = 0; i < total_square_size; i++) {
    for (var j = 0; j < total_square_size; j++) {
      if (j == 0) {
        html += '<div class="row">';
      }
      if (i < border_size || j < border_size || i >= total_square_size - border_size || j >= total_square_size - border_size) {
        //border
        html += '<span class="box border"></span>';
      } else {
        if ((i <= border_size && j <= border_size) || (i <= border_size && j >= total_square_size - border_size) || (i >= total_square_size - border_size && j <= border_size) || (i >= total_square_size - border_size && j >= total_square_size - border_size)) {
          //orientation
          if (i == border_size && j == i) {
            html += '<span class="box orientation"></span>';
          } else {
            html += '<span class="box orientation"></span>';
          }
        } else {
          //message
          if (current_binary[counter] == '1') {
            html += '<span class="box message"></span>';
          } else {
            html += '<span class="box"></span>';
          }
          counter++;
        }
      }
      if (j == total_square_size - 1) {
        html += '</div>';
      }
    }
  }
  html += '</div>';

}

document.getElementById('markers').innerHTML = html;
