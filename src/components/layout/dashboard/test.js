/*String.chartAt(0).toUpperCase() + string.slice(1);

// testing is object is empty 
Object.entries(obj).length === 0 && obj.constructor === Object


const keys = Object.keys(data[0].slice(1));
const modify = data.map(function(content, index, array) {
	if(typeof array[index -1] !== 'undefined') {
		keys.forEach(function(item) {
			content[item] = array[index][item] + array[index -1][item];
		}) 
	  return content;
	} else {
		return content;
	}
}) s*/

const val = { male: 34, female: 34 };

const sum = Object.values(val).reduce((a, b) => a + b);

console.log(sum);
