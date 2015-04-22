var line1 = new fabric.Line([0,0,200,0], {"stroke":"#000000", "strokeWidth":1,hasBorders:false,hasControls:false,hasRotatingPoint:false,selectable:false});
var line2 = new fabric.Line([199,0,200,399], {"stroke":"#000000", "strokeWidth":1,hasBorders:false,hasControls:false,hasRotatingPoint:false,selectable:false});
var line3 = new fabric.Line([0,0,0,400], {"stroke":"#000000", "strokeWidth":1,hasBorders:false,hasControls:false,hasRotatingPoint:false,selectable:false});
var line4 = new fabric.Line([0,400,200,399], {"stroke":"#000000", "strokeWidth":1,hasBorders:false,hasControls:false,hasRotatingPoint:false,selectable:false});
var canvas;
var font_color ='#000000';
function init_canvas(canvas_id){
	
	
	canvas = new fabric.Canvas(canvas_id, {
	  hoverCursor: 'pointer',
	  selection: true,
	  selectionBorderColor:'blue'
	});
	canvas.on({
		 'object:moving': function(e) {		  	
		    e.target.opacity = 0.5;
		  },
		  'object:modified': function(e) {		  	
		    e.target.opacity = 1;
		  },
		 'object:selected':onObjectSelected,
		 'selection:cleared':onSelectedCleared
	 });
	$("#drawingArea").hover(
	        function() { 	        	
	        	 canvas.add(line1);
		         canvas.add(line2);
		         canvas.add(line3);
		         canvas.add(line4); 
		         canvas.renderAll();
	        },
	        function() {	        	
	        	 canvas.remove(line1);
		         canvas.remove(line2);
		         canvas.remove(line3);
		         canvas.remove(line4);
		         canvas.renderAll();
	        }
	    );
}

function onObjectSelected(e) {	 
	var selectedObject = e.target;
	$("#text-string").val("");
	selectedObject.hasRotatingPoint = true
	if (selectedObject && selectedObject.type === 'text') {

		$("#text-string").val(selectedObject.getText());
		$('#colorselector').colorselector('setColor', selectedObject.fill);
		//$('#texteditor').slideDown();
	}
	else if (selectedObject && selectedObject.type === 'image'){
		//$('#texteditor').slideUp();
	}
}

function onSelectedCleared(e){
	 //$("#texteditor").css('display', 'none');
	 $("#text-string").val("");
	 //$("#imageeditor").css('display', 'none');
}

function add_text_to_canvas(canvas) {
	var text = $("#text-string").val();
    var textSample = new fabric.Text(text, {
      left: fabric.util.getRandomInt(0, 200),
      top: fabric.util.getRandomInt(0, 400),
      fontFamily: 'helvetica',
      angle: 0,
      fill: font_color,
      scaleX: 0.5,
      scaleY: 0.5,
      fontWeight: '',
		  hasRotatingPoint:true
    });		    
    canvas.add(textSample);	
    canvas.item(canvas.item.length-1).hasRotatingPoint = true;    
    //$("#texteditor").css('display', 'block');
    //$("#imageeditor").css('display', 'block');
};

function text_edit_key_up(canvas){	  		
	var activeObject = canvas.getActiveObject();
  if (activeObject && activeObject.type === 'text') {
	  activeObject.text = this.value;
	  canvas.renderAll();
  }
};




  
