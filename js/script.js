var markers = {
  grid_size: 4,
  border_size: 2,
  orientation_boxes: 4,
  margin: 5,
  size: 30,
  setValues: function() {
    this.total_grid_size = this.grid_size + this.border_size * 2;
    this.boxes = this.grid_size * this.grid_size - this.orientation_boxes;
    this.total = Math.pow(2, this.boxes);
    this.markers = this.getMarkers();
    this.amount = this.total;
    this.box_size = this.size/this.total_grid_size;
  },
  getMarkers: function() {
    var bin_base = '';
    for (var i = 0; i < this.boxes; i++) {
      bin_base += '0';
    }

    var bins = [];
    for (var m = 0; m < this.total; m++) {
      var n = (m).toString(2);
      var bin = bin_base.substr(n.length) + n;
      bins.push({
        value: m,
        binary: bin
      });
    }
    return bins;
  },
  generateHTML: function() {

    var html = '';
    var markers_counter = 0;
    for (var b = 0; b < this.amount; b++) {
      //reverse binary for counter
      var current_marker = this.markers[b];
      var reversed_binary = current_marker.binary.split("").reverse().join("");
      var counter = 0;
      //start marker
      html += '<div  id="marker-' + b + '" class="marker">';
      for (var i = 0; i < this.total_grid_size; i++) {
        for (var j = 0; j < this.total_grid_size; j++) {
          if (j == 0) {
            html += '<div class="row">';
          }
          if (i < this.border_size || j < this.border_size || i >= this.total_grid_size - this.border_size || j >= this.total_grid_size - this.border_size) {
            //border
            html += '<span class="box border"></span>';
          } else {
            if ((i == this.border_size || i == this.grid_size + this.border_size - 1) &&
              (j == this.border_size || j == this.grid_size + this.border_size - 1)) {
              //orientation
              if (i == this.border_size && j == i) {
                html += '<span class="box orientation black"></span>';
              } else {
                html += '<span class="box orientation"></span>';
              }
            } else {
              //message
              if (reversed_binary[counter] == '1') {
                html += '<span class="box message black"></span>';
              } else {
                html += '<span class="box message"></span>';
              }
              counter++;
            }
          }
          if (j == this.total_grid_size - 1) {
            html += '</div>';
          }
        }
      }
      html += '<label for="marker-' + current_marker.value + '">' + current_marker.value + '</label>';
      html += '</div>';
      //end marker

      //page break
      if (markers_counter < 11) {
        markers_counter++;
      } else {
        //html += '<div class="html2pdf__page-break"></div>';
        markers_counter = 0;
      }

    }
    html+= '<style>.marker .box {width: '+this.box_size+'px; height: '+this.box_size+'px;</style>'
    return html;
  }
}

function onSubmit(e) {
  if (e.preventDefault) e.preventDefault();

  var html = markers.generateHTML();
  document.getElementById('markers').innerHTML = html;
  $download.type = "button";
  return false;
}

function onSelectChange(e) {
  markers.grid_size = parseInt($grid.value);
  markers.border_size = parseInt($border.value);
  markers.size = parseInt($size.value);
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

function onNumberChange(e) {
  markers.amount = parseInt($amount.value);
}

function onDownload(e) {
  var element = document.getElementById('markers');
  html2pdf(element, {
    margin: 0,
    filename: 'markers-' + new Date().valueOf() + '.pdf',
    image: {
      type: 'jpeg',
      quality: 1
    },
    html2canvas: {
      dpi: 300,
      letterRendering: true
    },
    jsPDF: {
      unit: 'cm',
      format: 'a4',
      orientation: 'portrait'
    }
  });
}


var $form;
var $grid;
var $border;
var $amount;
var $size;
var $download;

(function() {
  $form = document.getElementById('form');
  $grid = document.getElementById('grid');
  $border = document.getElementById('border');
  $amount = document.getElementById('amount');
  $size = document.getElementById('size');
  $download = document.getElementById('download');

  if ($form.attachEvent) {
    $form.attachEvent("submit", onSubmit);
  } else {
    $form.addEventListener("submit", onSubmit);
  }
  $grid.onchange = onSelectChange;
  $border.onchange = onSelectChange;
  $amount.onchange = onNumberChange;
  $border.onchange = onSelectChange;
  $size.onchange = onSelectChange;
  $download.onclick = onDownload;
  onSelectChange();
})();
