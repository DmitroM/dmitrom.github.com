function repeatDelText() {
	var text = document.getElementById('textInput').value,
	textPr = document.getElementById('textInput'),
	reg = / /,
	result;

	//удаляем лишние пробелы
	result = text.replace(/  +/, " ");


	mas = text.split(/([\.\?\,\;\:\!\s])/g);
	for (var i = 0; i < mas.length; i++) {
		if (/([\.\?\,\;\:\!\s\n])/g.test(mas[i]) || mas[i] == "") {
			// mas.splice(i,1)
			// i--;	
		} else {

		}
	};



	textPr.value = result;
};