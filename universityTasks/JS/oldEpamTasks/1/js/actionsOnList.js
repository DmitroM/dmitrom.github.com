window.onload = function() {

	// id и индекс выбранного элемента
	var liId, liIndex,
	// список элементов
	$clickList = document.getElementById('list'),
	// значения элемента списка взятые из форм
	$textLi = document.getElementById('text'),
	$colorLi = document.getElementById('color'),
	$markerLi = document.getElementById('marker'),
	// кнопки
	$createButton = document.getElementById('create'),
	$changeButton = document.getElementById('change'),
	$deleteButton = document.getElementById('delete'),
	// прочее
	countIdNumber = 3,
	countTakeLi = false,
	// ассоциативный массив
	arr = [
		{
			id: "li1",
			marker: "disc",
			color: "black",
			text: "First",
		},
		{
			id: "li2",
			marker: "disc",
			color: "black",
			text: "Second",
		},
		{
			id: "li3",
			marker: "disc",
			color: "black",
			text: "Third",
		}
	];


	/* выбор метки списка */
	function getMarkerLi($markerLi, li) {
		switch($markerLi.value) {
			case"disc": li.marker = "disc"; break;
			case"square": li.marker = "square"; break;
			case"circle": li.marker = "circle"; break;
		};
	};


	/* вывод списка на экран */
	function renderList() {
		var result = [];

		for (var i = 0; i < arr.length; i++) {
			result.push('<li id=' + arr[i].id 
				+ ' type=' + arr[i].marker
				+ ' style=color:' + arr[i].color 
				+ '>' 
				+ arr[i].text
				+ '</li>');
		};

		list.innerHTML = result.join('');
	};


	/* Click li of list	*/
	$clickList.addEventListener("click", function(event) {
		liId = event.target.id;
		for (var i = 0; i < arr.length; i++) {
			countElem = arr[i];
			if (countElem.id == event.target.id) {
				liIndex = i;
				break;
			};			
		};		
		countTakeLi = true;
	}, false);


	/* Create */
	$createButton.addEventListener( "click" , onCreateElement, false);
	function onCreateElement() {
		var li = {
			id: 0,
			marker: '',
			color: '',
			text: ''
		};

		// изменение цвета
		li.color = $colorLi.value;

		// изменение метки
		getMarkerLi($markerLi, li);

		// изменение текста
		li.text = $textLi.value;

		// добавление id
		li.id = idNumber();

		// добавление элемента списка в массив
		arr.push(li);
		// или так:
		//arr[liIndex] = li;

		// вывод на экран
		renderList();
	};
	function idNumber() {
		countIdNumber++;
		return "li" + countIdNumber; 
	};


	/* Change current */
	$changeButton.addEventListener( "click" , onChangeElement, false);
	function onChangeElement() {
		if (countTakeLi == true) {
			var li = {
				id: 0,
				marker: '',
				color: '',
				text: ''
			};

			//изменение цвета
			li.color = $colorLi.value;

			// изменение метки
			getMarkerLi($markerLi, li);

			// изменение текста
			li.text = $textLi.value;

			// добавление id
			li.id = idNumber();

			// изменение элемента массива
			arr[liIndex] = li;

			// вывод на экран
			renderList();

			countTakeLi = false;
		} else {
			alert('Выделите элемента списка!');
		};
	};


	/* Delete current */
	$deleteButton.addEventListener( "click" , onDeleteElement, false);
	function onDeleteElement() {
		if (countTakeLi == true) {
			// удаление из массива
			arr.splice(liIndex, 1);

			// вывод на экран
			renderList();

			countTakeLi = false;
		} else {
			alert('Выделите элемента списка!');
		};
	};


	/* выделение узла */
	var ul = document.querySelector('ul');
	ul.addEventListener("click", function(event) {
		var target = event.target;

		selectSingle(target);
	}, false); 
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