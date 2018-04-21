var markers = {
  square_size: 3,
  border_size: 1,
  orientation_boxes: 4,
  setValues: function() {
    this.total_square_size = this.square_size + this.border_size * 2;
    this.boxes = this.square_size * this.square_size - this.orientation_boxes;
    this.total = Math.pow(2, this.boxes);
    this.binaries = this.getBinaries();
    this.amount = this.total;
  },
  getBinaries: function() {
    var bin_base = '';
    for (var i = 0; i < this.boxes; i++) {
      bin_base += '0';
    }

    var bins = [];
    for (var m = 0; m < this.total; m++) {
      var n = (m).toString(2);
      var bin = bin_base.substr(n.length) + n;
      bins.push(bin);
    }
    return bins;
  },
  generateHTML: function() {

    var html = '';
    for (var b = 0; b < this.amount; b++) {
      //reverse binary for counter
      var counter = 0;
      var current_binary = this.binaries[b].split("").reverse().join("");

      html += '<div class="marker">';
      for (var i = 0; i < this.total_square_size; i++) {
        for (var j = 0; j < this.total_square_size; j++) {
          if (j == 0) {
            html += '<div class="row">';
          }
          if (i < this.border_size || j < this.border_size || i >= this.total_square_size - this.border_size || j >= this.total_square_size - this.border_size) {
            //border
            html += '<span class="box border"></span>';
          } else {
            if ((i <= this.border_size && j <= this.border_size) || (i <= this.border_size && j >= this.total_square_size - this.border_size) || (i >= this.total_square_size - this.border_size && j <= this.border_size) || (i >= this.total_square_size - this.border_size && j >= this.total_square_size - this.border_size)) {
              //orientation
              if (i == this.border_size && j == i) {
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
          if (j == this.total_square_size - 1) {
            html += '</div>';
          }
        }
      }
      html += '</div>';
    }
    return html;
  }
}

function onSubmit(e) {
  if (e.preventDefault) e.preventDefault();

  var html = markers.generateHTML();
  document.getElementById('markers').innerHTML = html;

  return false;
}

function onSelectChange() {
  markers.square_size = parseInt($square.value);
  markers.border_size = parseInt($border.value);
  markers.setValues();
  var value = $amount.value ? parseInt($amount.value) : 1;
  $amount.innerHTML = '';
  for (var i = 0; i < markers.total; i++) {
    var $option = document.createElement("option");
    $option.value = i + 1;
    $option.innerHTML = i + 1;
    $amount.appendChild($option);
  }
  value = value > $amount.childElementCount ? $amount.childElementCount : value;
  $amount.value = value;
  $amount.onchange();
}

function onNumberChange() {
  markers.amount = parseInt($amount.value);
}

var $form;
var $square;
var $border;
var $amount;

(function() {
  $form = document.getElementById('form');
  $square = document.getElementById('square');
  $border = document.getElementById('border');
  $amount = document.getElementById('amount');

  if ($form.attachEvent) {
    $form.attachEvent("submit", onSubmit);
  } else {
    $form.addEventListener("submit", onSubmit);
  }
  $square.onchange = onSelectChange;
  $border.onchange = onSelectChange;
  $amount.onchange = onNumberChange;
  onSelectChange();
})();
