window.onload = function() {
	// Click li of list
	var liId, liIndex;
	var clickList = document.getElementById('list');
	clickList.addEventListener("click", function(elem) {
		liId = elem.target.id;
		var liLineList = new lineList(elem.target);
		for (var i = 0; i < listMas.lengthMas(); i++) {
			countElem = listMas.getElemMas(i);
			if (countElem.id == liLineList.id) {
				liIndex = i;
				break;
			};			
		};
	}, false);


	// class
	function lineList(li) {
		if (arguments.length == 1) {
			this.id = li.id;
			this.marker = li.className;
			this.color = li.style.color;
			this.text = li.innerHTML;
		};
	};
	lineList.prototype.print = function() {
		console.log("id:", this.id);
		console.log("marker:", this.marker);
		console.log("color:", this.color);
		console.log("text:", this.text);
	};
	lineList.prototype.getDomElem = function() {
		elem = document.createElement('li');
		elem.id = this.id;
		elem.style.color = this.color;
		elem.className = this.marker
		elem.innerHTML = this.text;
		return elem;
	};


	// Array li of list
	var listMas = (function (count) {
		var mas = [];
		for (var i = 0; i < clickList.children.length; i++) {
			var li = new lineList(clickList.children[i]);
			mas[i] = li;
		};

		return {
			addElemMas: function(values) {
				mas.push(values);		
			},
			getElemMas: function(index) {
				return mas[index];
			},
			lengthMas: function() {
				return mas.length;
			},
			delElemMas: function(index) {
				var count = mas.length;
				if (count-1 != index) {
					for (var i = index; i < count-1; i++) {
						mas[i]=mas[i+1];
					};
				};
				mas.length = count-1;
			},
			setElemMas: function(index, values) {
				mas[index] = values;
			},
			printElemMas: function() {
				for (var i = 0; i < clickList.children.length; i++) {
					console.log(i+1, " : ", mas[i]);
				};
				console.log("______________________");
			}
		}
	}());


	// Create
	var create = document.getElementById('create');
	create.addEventListener( "click" , newList, false);
	function newList() {
		var li = new lineList(),
		textLi = document.getElementById('textLi'),
		colorLi = document.getElementById('colorLi'),
		markerLi = document.getElementById('markerLi');

		// изменение цвета
		li.color = colorLi.value;

		// изменение метки
		if(markerLi.value == 2) {
			li.marker = "markerLiSquare";
		} else {
			if(markerLi.value == 3) {
				li.marker = "markerLiCircle";
			}
		}

		// изменение текста
		li.text = textLi.value;

		// добавление id
		li.id = idNumber();

		// вывод на экран
		clickList.appendChild(li.getDomElem());

		// добавление элемента списка в массив
		listMas.addElemMas(li);
	};
	var count = 3;
	function idNumber() {
		count++;
		return "li"+count; 
	};


	// Change current
	var change = document.getElementById('change');
	change.addEventListener( "click" , changeList, false);
	function changeList() {
		var li = listMas.getElemMas(liIndex),
		textLi = document.getElementById('textLi'),
		colorLi = document.getElementById('colorLi'),
		markerLi = document.getElementById('markerLi');

		//изменение цвета
		li.color = colorLi.value;

		// изменение метки
		if(markerLi.value == 2) {
			li.marker = "markerLiSquare";
		} else {
			if(markerLi.value == 3) {
				li.marker = "markerLiCircle";
			}
		}

		// изменение текста
		li.text = textLi.value;

		// изменение элемента массива
		listMas.setElemMas(liIndex, li);

		// вывод на экран
		document.getElementById(liId).remove();
		list.insertBefore(li.getDomElem(), list.children[liIndex]);
	};


	// Delete current
	var del = document.getElementById('del');
	del.addEventListener( "click" , delList, false);
	function delList() {
		var li = document.getElementById(liId);

		li.remove();

		// удаление из массива
		listMas.delElemMas(liIndex);
	};


	// выделение узла
	var ul = document.querySelector('ul');
	ul.onclick = function(event) {
		var target = event.target;

		selectSingle(target);
	};
	ul.onmousedown = function() {
		return false;
	};
	function deselectAll() {
		for (var i = 0; i < ul.children.length; i++) {
			ul.children[i].classList.remove('selected');
		}
	};
	function selectSingle(li) {
		deselectAll();
		li.classList.add('selected');
	};
};