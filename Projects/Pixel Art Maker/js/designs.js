$(document).ready(function () {

  // Initial page-load effect
  $("#walkthrough").fadeIn(1000).removeClass("hidden");

  // Button event listeners
  $("#button-1, #button-2, #button-3").click(initialButtons);
  $("#button-3").click(pixyCanvas);
  $("#submit-1, #submit-2").click(submitButtons);
  $("#start-over-1, #start-over-2, #start-over-3, #start-over-4").click(startOverButtons);
  $("#canvasRefresh").click(clearCanvas);
  $("#begin").click(function() {
    showBody();
    $("#begin").animate({
            opacity: '0.1',
            width: '250px'
    });
  });
  $("#save").click(save);
  $("#save-2").click(save);

  // button to show the body after intro blurb
  function showBody() {
    $("#walkthrough").slideUp(300).addClass("hidden");
    $(".container").fadeIn();
  }
const buttonOne = $("#button-1");
  // The aside 2D, 3D, and Paint selection function called by event listeners above
  function initialButtons() {
    if ($(this).attr("id") == "button-1") {
      $("#button-pane").hide();
      $("#two-d-grid").show();
      $("#two-d-palette").show(300);
      $("#variable-restart-1").show(300);
    } else if ($(this).attr("id") == "button-2") {
      $("#button-pane").hide();
      $("#three-d-palette").show(300);
      $("#three-d-canvas").show(300);
      $("#variable-restart-2").show(300);
    } else if ($(this).attr("id") == "button-3") {
      pixyCanvas();
      $("#button-pane").hide();
      $(".controls").show(300);
      $(".main").show();
      $("#canvas").show();
      $("#variable-restart-3").show(300);
      $("#canvas-div").fadeIn();
      $("#save-2").show(300);
    }
  }

  // 2D palette function for button and input field behaviors, including yellow warning indicators when input values haven't been entered by users
  function submitButtons() {
    if ($(this).attr("id") == "submit-1") {
      if (($(".text-input-1").val().length < 1) && ($(".text-input-2").val().length < 1)) {
        $(".text-input-1").removeClass("white").addClass("warning");
        $(".text-input-2").removeClass("white").addClass("warning");
      } else if ($(".text-input-1").val().length < 1) {
        $(".text-input-1").addClass("warning");
      } else if ($(".text-input-2").val().length < 1) {
          $(".text-input-2").addClass("warning");
      } else {
          $(".text-input-1, .text-input-2").addClass("white").removeClass("warning");
          $("#refresh").show(200);
          $("#save").show(200);
      }
    }
  }

  // function for start over button behaviors...can probably be simplified quite a bit!
  function startOverButtons() {
    if ($(this).attr("id") == "start-over-1") {
      $("#two-d-palette").hide(300);
      $("#button-pane").show(300);
      $("#two-d-grid").hide(300);
      $("#variable-restart-1").hide(300);
      $("#two-d-grid").html("<table></table>");
      $(".text-input-1").val(" ");
      $(".text-input-2").val(" ");
      $(".pick-a-color-1").val(" ");
      $(".text-input-1, .text-input-2").removeClass("warning");
      $("#refresh").hide(300);
      $("#submit-1").show(300);
      $("#save").hide(300);
    } else if ($(this).attr("id") == "start-over-2") {
      $("#three-d-palette").hide();
      $("#button-pane").show();
      $("#three-d-canvas").hide();
      $("#canvas-div").hide();
      $("#variable-restart-2").hide();
      $("#submit-2").prop("disabled", false).css("opacity", "1");
    } else if ($(this).attr("id") == "start-over-3") {
      $("#button-pane").show(300);
      $(".controls").hide(300);
      $("#two-d-grid").hide();
      $("#canvas-div").hide(300);
      $("#variable-restart-3").hide(300);
      $("#save-2").hide(300);
      clearCanvas();
    }
  }

  // function to clear the Pixy Paint canvas of its drawn contents
  function clearCanvas() {
    let canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  //////////////////////////// 2D Grid construction //////////////////////

  // Portions of the following code come from Jina Chan's Pixel Art Maker 2.0 at https://codepen.io/jinachan/pen/wmxXLm?editors=1010
  // Borrowed for the sake of conciseness and adapted to suit my specific project, which contains unique code and features. Note that the reason Jina's code worked perfectly wasn't because it was more functional, but rather because it executed concision better than my previously working code.

  // Thanks for the awesome work, Jina!

  // Constant variables for color palette, entry fields, the 2D canvas area, and the refresh/clear functionality
  const colorPicker = $(".pick-a-color-1");
  const sizePicker = $("#two-d-palette");
  const pixelCanvas = $("#two-d-grid");
  const clearGrid = $("#refresh");

  // Track whether mouse is down for click-and-drag painting
  let isMouseDown = false;
  document.body.onmousedown = function() {
      isMouseDown = true;
  };
  document.body.onmouseup = function() {
      isMouseDown = false;
  };

  // The actual grid constructor, based on user inputs; note that this application doesn't utilize the jQuery-provided addRows or addCells methods. I tried several approaches but couldn't quite get the math down.
  function makeGrid() {
    pixelCanvas.children().remove();
    let maxRows = $(".text-input-2").val();
    let maxCols = $(".text-input-1").val();
    let tableString = " ";
    for (let r = 0; r < maxRows; r++) {
      tableString += "<tr>";
      for (let c = 0; c < maxCols; c++) {
        tableString += "<td></td>";
      }
      tableString += "</tr>";
    }
    pixelCanvas.append(tableString);
  }

  // event listener for the makeGrid() function (above)
  sizePicker.submit(function(event) {
    event.preventDefault();
    makeGrid();
  });

  // Event listener for #refresh button / clears the grid of contents while keeping col and rows intact
  clearGrid.click(function(event) {
    event.preventDefault();
    // For each <td> set color to page's default background color, giving the illusion of a cleared cell
    $("td").each(function() {
        $(this).css("background-color", "#FBF4EE");
    });
  });

  // disables righ-click context menu to allow for right-click "eraser" functionality
  $("table").on("contextmenu", function() {
      return false;
  });

  // Adds right-click "eraser" functionality by clearing the cell of its current color
  $("table").on("mousedown", "td", function(e) {
    if (e.which === 3) {
      $(this).css("background-color", "");
    }
  });

  // Event listener over entire canvas area used to color cells based on user palette selection
  pixelCanvas.on("click", "td", function() {
    $(this).css("background-color", colorPicker.val());
  });

  // Event listener that enables user to click and drag mouse to color multiple cells
  pixelCanvas.on("mouseenter", "td", function() {
    if (isMouseDown) {
      $(this).css("background-color", colorPicker.val());
    }
  });

 // The following function adapted from https://codepen.io/vasudevapitta/pen/wmYKgp?editors=0010 via Vasudeva Pitta's work on Udacit GwG Pixel Art Maker challenge course final project. Thanks, Vasudeva!

// Save-as event listener that converts 2D Grid or Pixy Paint into a PDF
 function save() {
   if ($(this).attr("id") == "save") {
      html2canvas($(pixelCanvas), {
          onrendered: function (canvas) {
              let imgData = canvas.toDataURL(
                  'image/png');
              let doc = new jsPDF('p', 'mm');
              doc.addImage(imgData, 'PNG', 100, 100);
              doc.save('my-2d-art.pdf');
              }
          });
        } else if ($(this).attr("id") == "save-2") {
            html2canvas($(canvas), {
              onrendered: function (canvas) {
                let imgData = canvas.toDataURL(
                  'image/png');
                let doc = new jsPDF('p', 'mm');
                doc.addImage(imgData, "PNG", 100, 100);
                doc.save("my-pixy-canvas.pdf");
                }
            });
          }
        }

  ////////////////////////////////////////////////////////////////////////////////

  // canvas paint script

  // Courtesy of Josh Parrett's Codepen at https://codepen.io/JTParrett/pen/hpixf
  // Adapted, in part, to rely more heavily on jQuery, as well as a couple of bug fixes

  function pixyCanvas(){
    let canvas = $('canvas')[0].getContext('2d'),
    click = false;
    $(window).mousedown(function(){
      click = true;
    });
    $(window).mouseup(function(){
      click = false;
    });
    $('canvas').mousedown(function(e){
      draw(e.pageX, e.pageY);
    });
    $('canvas').mouseup(function(e){
      draw(e.pageX, e.pageY);
    });
    $('canvas').mousemove(function(e){
      if(click){
        draw(e.pageX, e.pageY);
      }
    });
    function draw(xPos, yPos){
      canvas.beginPath();
      canvas.fillStyle = $('.color-panel').val();
      canvas.arc(xPos - $('canvas').offset().left, yPos - $('canvas').offset().top, $('.slider').val(), 0, 2 * Math.PI);
      canvas.fill();
      canvas.closePath();
    }
  }
});
