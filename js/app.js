	// create the module and name it DMS_app
	var DMS_app = angular.module('DrawMyShirt', ['drahak.hotkeys','ngRoute','ui.bootstrap']);
	// configure our routes
	DMS_app.config(function($routeProvider) {
		$routeProvider
			// route for the home page
			.when('/', {
				templateUrl : 'partials/home.html',
				controller  : 'mainController'
			})
			// route for the draw page
			.when('/drawshirt', {
				templateUrl : 'partials/drawshirt.html',
				controller  : 'drawshirtController'
			})
			// route for the about page
			.when('/about', {
				templateUrl : 'partials/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'partials/contact.html',
				controller  : 'contactController'
			});
		});

	// create the controller and inject Angular's $scope
	DMS_app.controller('mainController', function($scope) {
		$scope.navgationItems = [
		{href:'#/',label:'Home'},
		{href:'#drawshirt',label:'Draw Shirt'},
		{href:'#about',label:'About'},
		{href:'#contact',label:'Contact'}];
	});

	DMS_app.controller('drawshirtController', function($scope) {

	$scope.fonts_liste = ['Arial',
	'Helvetica',
	'MyriadPro',
	'Delicious',
	'Verdana',
	'Georgia',
	'Courier',
	'ComicSansMS',
	'Impact',
	'Monaco',
	'Optima',
	'Hoefler',
	'Text Plaster',
	'Engagement'];

	$scope.shirt_color=[
	{title:'White',bg_color:'#ffffff'},
	{title:'Dark Heather',bg_color:'#616161'},
	{title:'Gray',bg_color:'#f0f0f0'},
	{title:'Black',bg_color:'#222222'},
	{title:'"Heather Orange',bg_color:'#fc8d74'},
	{title:'Heather Dark Chocolate',bg_color:'#432d26'},
	{title:'Salmon',bg_color:'#eead91'},
	{title:'Chesnut',bg_color:'#806355'},
	{title:'Dark Chocolate',bg_color:'#382d21'},
	{title:'Citrus Yellow',bg_color:'#faef93'},
	{title:'Sky',bg_color:'#a5def8'},
	{title:'Heather Navy',bg_color:'#3469b7'},
	];
	$(function(){
      $('#customize-spinner').spinner('changed',function(e, newVal, oldVal){
        $('#old-val').text(oldVal);
        $('#new-val').text(newVal);
      });
    });

	init_canvas('myCanvas');
	$scope.change_shirt_color=function(shirt_color){
		document.getElementById("shirtDiv").style.backgroundColor = shirt_color;
	};
	$('#colorselector').colorselector({
		callback: function (value, color, title) {
			var activeObject = canvas.getActiveObject();
			font_color = color;
			if (activeObject && activeObject.type === 'text') {
				activeObject.fill = color;

				canvas.renderAll();
			}
		}
	});

	$("#text-string").keyup(function(){	  		
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			activeObject.text = this.value;
			canvas.renderAll();
		}
	});

	$scope.setFont = function(font){
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			activeObject.fontFamily = font;
			canvas.renderAll();
		}
	};

	$scope.add_text = function(){
		add_text_to_canvas(canvas);
	};

	$scope.text_strike = function() {		  
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			activeObject.textDecoration = (activeObject.textDecoration == 'line-through' ? '' : 'line-through');
			canvas.renderAll();
		}
	};

	$scope.text_underline =function() {		  
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			activeObject.textDecoration = (activeObject.textDecoration == 'underline' ? '' : 'underline');
			canvas.renderAll();
		}
	};

	$scope.text_bold =function () {		  
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			activeObject.fontWeight = (activeObject.fontWeight == 'bold' ? '' : 'bold');		    
			canvas.renderAll();
		}
	};

	$scope.text_italic=function() {		 
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			activeObject.fontStyle = (activeObject.fontStyle == 'italic' ? '' : 'italic');		    
			canvas.renderAll();
		}
	};

	$scope.text_strike=function() {		  
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			activeObject.textDecoration = (activeObject.textDecoration == 'line-through' ? '' : 'line-through');
			canvas.renderAll();
		}
	};



	$scope.text_align=function(position) {	
		alert(position);	  
		var activeObject = canvas.getActiveObject();
		if (activeObject && activeObject.type === 'text') {
			activeObject.textAlign = position;
			canvas.renderAll();
		}
	};

	$scope.edit_key_up = function(){
		text_edit_key_up(canvas);
	};

	
	$scope.delete_selected=function(){
		canvas.remove(canvas.getActiveObject());
	};


	$scope.down_url = '';
	$scope.download = function(){

		canvas.deactivateAll();
		canvas.forEachObject(function(o){
			if(o.get("title") == "||Watermark||"){
				canvas.bringToFront(o);
			}
		});
		$scope.down_url=canvas.toDataURL('png');

	};

});

	DMS_app.controller('aboutController', function($scope) {
		console.log('about page');
	});

	DMS_app.controller('contactController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});

	DMS_app.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

		$scope.items = [
		{itm_name:'item1',itm_src:'./img/svg/vector.svg'},
		{itm_name:'item2',itm_src:'./img/svg/zeimusu-Crossed-swords.svg'},
		{itm_name:'item3',itm_src:'./img/svg/tripleflower.svg'},
		{itm_name:'item4',itm_src:'./img/svg/heartsymbol2.svg'},
		{itm_name:'item5',itm_src:'./img/svg/BeatingValentine.svg'}
		];
		$scope.action = function(e) {
			e.preventDefault();
			console.log('Hotkey works', e);
		};
		$scope.open = function (size) {

			var modalInstance = $modal.open({
				templateUrl: 'myModalContent.html',
				controller: 'ModalInstanceCtrl',
				size: size,
				resolve: {
					items: function () {
						return $scope.items;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};
	});


	DMS_app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
		$scope.draw_svg_from_url=function(url){
			DrawSvgToCanvas(url,canvas);
		};
		$scope.items = items;
		$scope.selected = {
			item: $scope.items[0].itm_src
		};

		$scope.ok = function () {
			$modalInstance.close($scope.selected.item);
			$scope.draw_svg_from_url($scope.selected.item.itm_src);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	});


	