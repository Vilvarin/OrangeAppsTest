$(function(){
	$('#pause').bind('click', function(){
		$('.modal_pause').removeClass('hidden');
	});

	$('#cancel').bind('click', function(){
		$('.modal_pause').addClass('hidden');
	});

	$('.tile').bind('click', function(e){
		$(this).toggleClass('empty');

		if(!$(this).hasClass('empty')){
			$(this).html('<div class="shape"></div>');
		}else{
			$(this).empty();
		}

		$('#player-portrait').trigger('user.turn');
	});

	$('#player-portrait').bind('user.turn', function(){
		$(this).animate({
			top: $(this).css('top') - 10
		},
		1000);
	});

	$('#player-pipe').bind('user.turn', function(){
		$(this).css('background-position', '0 10, 0');
	});
});