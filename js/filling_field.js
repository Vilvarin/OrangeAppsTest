$(function(){
	for(var y = 0; y < 9; y ++){
		$('.game-field').append('<div class="str" id="str_' + y + '"></div>');

		for(var x = 0; x < 9; x ++){
			var _class = '';
	
			switch(x){
				case 0: _class = 'shape_blue';   break;
				case 1: _class = 'shape_violet'; break;
				case 2: _class = 'shape_red';    break;
				case 3: _class = 'shape_yellow'; break;
				case 4: _class = 'shape_green';  break;
				case 5: _class = 'shape_violet'; break;
				case 6: _class = 'shape_red';    break;
				case 7: _class = 'shape_yellow'; break;
				case 8: _class = 'shape_green';  break;
			}
	
			var html = '<div class="tile" id="x-' + x + '_y-' + y + '"><div class="shape ' + _class + '"></div></div>';
			$('.game-field #str_' + y).append(html);
		}
	}

	$('#player-counter').text(0);
	$('#enemy-counter').text(12345);
});