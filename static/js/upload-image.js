/*jslint browser: true, white: true, eqeq: true, plusplus: true, sloppy: true, vars: true*/
/*global $, console, alert, FormData, FileReader*/


function noPreview() {
  $('#image-preview-div').css("display", "none");
  $('#preview-img').attr('src', 'noimage');
}

function changeCategory(file){
  $.ajax({
    url: 'product_data',
    type: "post",
    data: file,
    processData: false,
    contentType: false,
    success: function(data){
      console.log(data);
      product_data = JSON.parse(data);
      category = checkCategory(product_data);
      $('#product_categorie option[value='+category+']').attr("selected", "selected");
    },
    error:function(data){
      // TODO
    }
  });
}

function checkCategory(product_data){
  var category = {"top":["t-shirts","one-piece","shirts","outer"],
                  "bottom":["pants","skirt"],
                  "shoes":["shoes","sandals","sports shoes"],
                  "etc":["tote bag","hat","glasses","watch","swimming suit","backpack","baggage","underwear panty","underwear bra"]
                 };
  try {
    product_class = product_data["result"]["objects"][0]["class"];
  }
  catch (e) {
   console.log(e); // pass exception object to error handler
   return "etc"
  }

  if (category["top"].indexOf(product_class) != -1){
    return "top";
  }
  else if (category["bottom"].indexOf(product_class) != -1){
    return "bottom";
  }
  else if (category["shoes"].indexOf(product_class) != -1){
    return "shoes";
  }
  else {
    return "etc";
  }
}

function selectImage(e) {
  // $('#main-image').css("color", "green");
  $('#image-preview-div').css("display", "block");
  $('#preview-img').attr('src', this.result);
  // console.log(this.result);
}

$(document).ready(function (e) {
  $('#main-image').change(function() {
    var file = this.files[0];
    var match = ["image/jpeg", "image/png", "image/jpg"];

    if ( !( (file.type == match[0]) || (file.type == match[1]) || (file.type == match[2]) ) )
    {
      noPreview();
      // $('#message').html('<div class="alert alert-warning" role="alert">Unvalid image format. Allowed formats: JPG, JPEG, PNG.</div>');
      return false;
    }

    var reader = new FileReader();
    reader.onload = selectImage;
    reader.readAsDataURL(file);

    changeCategory(file);
  });
});
