"use strict";

$(function(){
	//скрытие-показ модального окна
	$('#pause').bind('click', function(){
		$('.modal_pause').removeClass('hidden');
	});

	$('#cancel').bind('click', function(){
		$('.modal_pause').addClass('hidden');
	});

	//эффекты при клике на игровое поле
	$('.tile').bind('click', function(e){
		var color = next_color_3.className.match(/shape_\w+/);
		toggleShape(color, this);
		changeWaterLevel(10);
		changeScore(5);
	});
});

//Добавляет или убирает фишку с поля.
//Color(string) - css класс цвета фишки
//Context(object, string) - объект jQuery с которым работаем
function toggleShape(color, context){
	$(context).toggleClass('empty');

	if(!$(context).hasClass('empty')){
		$(context).html('<div class="shape ' + color + '"></div>');
		changeNextColor();
	}else{
		$(context).empty();
	};
};

//повышает или понижает уровень воды и поршня. Принимает значение в процентах.
function changeWaterLevel(water){
	//ограничители в пикселях для воды и поршня
	var maxWater = 50;
	var minWater = 490;
	var maxPawl = 30;
	var minPawl = 448;

	//округляется до целого, чтобы не было дробного значения пикселей
	//и из процентов переводится в пиксели
	water = Math.floor(water * (minWater - maxWater)/100);

	//Добавляем воду
	$('#player-water').css('background-position', function(index, currentPos){
		var pos = currentPos.split(' ');
		var posY = Number(pos[1].replace('px',''));

		if(water > 0 && posY > maxWater){
			posY -= water;
		}
		else if(water < 0 && posY < minWater){
			posY += water;
		}
		else{
			return currentPos;
		}

		//выход за рамки
		if(posY < maxWater){
			posY = maxWater;
		}
		else if(posY > minWater){
			posY = minWater;
		}

		return '50% ' + posY + 'px';	
	});

	//Меняем положение поршня
	$('#player-portrait').css('top', function(index, current){
		var top = Number(current.replace('px', ''));

		if(water > 0 && top > maxPawl){
			top -= water;
		}
		else if(water < 0 && top < minPawl){
			top += water;
		}
		else{
			return current;
		}

		if(top < maxPawl){
			top = maxPawl;
		}
		else if(top > minPawl){
			top = minPawl;
		}

		return String(top) + 'px';
	});
};

//добавляет или отнимает очки
function changeScore(points){
	var currentPoints = parseInt($('#player-counter').text());
	$('#player-counter').text(currentPoints + points);
};

//меняет следующий цвет
function changeNextColor(){
	var regExp = new RegExp(/shape_\w+/);

	var color_1 = next_color_1.className.match(regExp);
	var color_2 = next_color_2.className.match(regExp);
	var color_3 = next_color_3.className.match(regExp);

	$('#next_color_1').removeClass(color_1[0]).addClass(randomShape());
	$('#next_color_2').removeClass(color_2[0]).addClass(color_1[0]);
	$('#next_color_3').removeClass(color_3[0]).addClass(color_2[0]);
};

//возвращает css-класс случайного цвета фишки
function randomShape(){
	var rand = Math.floor(Math.random() * 5);

	switch(rand){
		case 0: return 'shape_blue';  
		case 1: return 'shape_violet';
		case 2: return 'shape_red';   
		case 3: return 'shape_yellow';
		case 4: return 'shape_green'; 
	};

	throw new Error('Ошибка рандомизатора');
};