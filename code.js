//
// this is just a stub for a function you need to implement
//
function getStats(txt) {
	//characters is just the length of the text.
	let nChars = txt.length;
	//For words, looking only for alphanumeric
	//includes underscore character
	//g allows for all matches to be found
	//i allows for it to be non case sensitive
	//gmi together allows for the above and multi-lined searching
	//w looks for word characters
	//d looks for digits
	//nWords
	let alphanumeric = txt.match(/[\w\d]+/gmi);
	let nWords = alphanumeric ? alphanumeric.length : 0;
	//For finding lines, we will look for the new line character and split according to the number
	//nLines
	let nLines = txt.split('\n').length;
	//nNonEmptyLines
	let nonEmpty = txt.match(/^\s*\S+/gmi);
	let nNonEmptyLines = nonEmpty ? nonEmpty.length : 0;
	//maxLineLength
	let lineSeparate = txt.split('\n');
	let result = lineSeparate[0];
	let maxLineLength = result.length;
	for( let i = 0; i < nLines; i++)
	{
		if(maxLineLength < lineSeparate[i].length){
			maxLineLength = lineSeparate[i].length;
		}
	}
	//averageWordLength
	let wordArray = alphanumeric[0];
	let wordAverage = wordArray.length;
	for( let i = 1; i < nWords; i++)
	{
		wordAverage += alphanumeric[i].length;
	}
	let averageWordLength = wordAverage / nWords;
	
	//palindromes
	let palindromes = [];
	let bin = {};
	let counter2 = 1;
	let words = [];
	
	for(let j = 0; j < nWords; j++){
		let removeSpecials = alphanumeric[j].toLowerCase().replace(/[^a-zA-Z0-9]+/g, '');
		let reversal = removeSpecials.split('').reverse().join('');
		if(removeSpecials === reversal){
			if(removeSpecials.length > 1 ){	
				let currentWord2 = alphanumeric[j];
				if(alphanumeric[j+1] === currentWord2){
				 counter2++;
				}
				if(!bin[currentWord2]){
					bin[currentWord2] = true;
					words.push({word2: currentWord2, count2: counter2});
				}					
			}
		}
	}
	
	words = words.slice(0, nWords).sort(function(a, b){
		return a.counter - b.counter;
	});
	
	for(p = 0; p < words.length; p++){
		palindromes.push(words[p].word2);
		palindromes.toString();
	}
	
	//longestWords - need to adjust
	let longestWords = [];
	let alphabetical = removeDuplicates(alphanumeric);
	console.log(alphabetical);
	alphabetical.sort(function(a, b){
		return b.length - a.length || a.localeCompare(b);
	});
	longestWords = alphabetical.splice(0, 10);
	
	
	
	//mostFrequentWords - edit for words
	let mostFrequentWords = [];
	let copy = alphanumeric.slice(0);
	let test = [];

	for (let s = 0; s < nWords; s++){
		let counter = 0; 
		for(let z = 0; z < copy.length; z++){
			if(alphanumeric[s] == copy[z]){
				counter++;
				delete copy[z];
			}
		}
		
		if (counter > 0){
			let bun = new Object();
			bun.original = alphanumeric[s];
			bun.count = counter;
			test.push(bun);		
		}
	}
	test = test.sort(function (a,b) { return b.count-a.count || a.localeCompare(b);});
	test = test.splice(0,10); 
	for(i=0; i<test.length; i++){
		mostFrequentWords.push(test[i].original + "(" + test[i].count + ")");
	}
	
    return {
        nChars,
        nWords,
        nLines,
        nNonEmptyLines,
		maxLineLength,
        averageWordLength,
        palindromes,
        longestWords,
        mostFrequentWords
    };
}

function removeDuplicates(someArray){
	let newArray = [];
	if(someArray.length > 0){
		newArray.push(someArray[0]);
		for(y = 1; y < someArray.length; y++){
			let duplicate = false;
			for(q = 0; q < newArray.length; q++){
				if(someArray[y] == newArray[q]){
					duplicate = true;
					break;
				}
			}
			if (!duplicate){
			newArray.push(someArray[y]);
			}
		}
	}
	return newArray;
}