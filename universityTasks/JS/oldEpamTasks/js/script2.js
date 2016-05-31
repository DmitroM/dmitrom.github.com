window.onload = function() {
	var but = document.getElementById('but');
	but.addEventListener( "click" , resultText, false);
	
	function resultText() {
		var text = document.getElementById('textInput').value,
		number1 = /\b(\d+.?(\d+)?)\b/g,
		number2 = /([\/\*\-\+])/g,
		result,
		textPr = document.getElementById('textInput');

		// выделение чисел и операций в// вывод в textarea и в консоль результата
		match = number1.exec(text);
		// textPr.value=textPr.value + " " + match[1];
		// console.log("Нашёл ", match[1], " на ", match.index);

		result = match[1];

		while (match = number2.exec(text)) {
			// textPr.value=textPr.value + " " + match[1];
			// console.log("Нашёл ", match[1], " на ", match.index);

			result += match[1];
			
			match =number1.exec(text);
			// textPr.value=textPr.value + " " + match[1];
			// console.log("Нашёл ", match[1], " на ", match.index);

			result += match[1];
		} 
		
		textPr.value = textPr.value + " " + result + " = " + calculation(result);
	};
	function calculation(str) {
		var rez,
		mas = str.split(/([\/\*\-\+])/g);

		rez = parseFloat(mas[0]);

		for (var i =  1; i < mas.length; i++) {
			switch(mas[i]){
				case "+": rez += parseFloat(mas[i+1]); break;
				case "-": rez -= parseFloat(mas[i+1]); break;
				case "*": rez *= parseFloat(mas[i+1]); break;
				case "/": rez /= parseFloat(mas[i+1]); break;
			}
		}

		return rez;
	};
};
