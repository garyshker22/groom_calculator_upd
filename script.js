const firstName = document.getElementById("firstname");  // element with id firstname
const startingBid = document.getElementById("startingbid"); // element with id startingbid
const education = document.getElementById("education"); // element with id education
const networth = document.getElementById("networth"); // element with id education
const skills = document.getElementsByClassName("skills"); // HTMLCollection (like an array of elements, but not an actual array)
const age = document.getElementsByName("age");
const gossips = document.getElementsByClassName("gossips");
const button = document.getElementById("submit");
const love_letter = document.getElementById("love_letter");

const calculate = () => {
    let name = firstName.value; // name of the groom
    let price = Number(startingBid.value); // turns your starting bid string into number
    let letter = love_letter.value;
    if (name != "")  { 

        price = getNewPrice(getNewPrice(price, education), networth);  // function composition 

        price = getCheckboxValuesFilterReduce(document.getElementsByClassName("skills"), price);
        price = getRadioValue(document.getElementsByName("age"), price);
        price = getCheckboxValuesForLoop(document.getElementsByClassName("gossips"), price);

        let person = {
            groom_name: name,
            groom_price: price,
            groom_loveLetter: letter
        }
        document.getElementById("result").innerHTML = `The price for ${person.groom_name} is ${person.groom_price}. Your love letter is ${person.groom_loveLetter}`;
    }
    else {
        alert("Name and starting bid cannot be empty");
    }
}

const getNewPrice = (price, criteria) => {
    return price * Number(criteria.value);
}

const getCheckboxValuesForLoop = (html_collection, price) => { 
	for (let i=0; i < html_collection.length; i++) {  
		if (html_collection[i].checked && Number.isInteger(Number(html_collection[i].value))) {
			price = price - Number(html_collection[i].value)
		}
		else if (html_collection[i].checked && !Number.isInteger(html_collection[i].value)) {
			price = price * Number(html_collection[i].value)
		}
	}
	return price;
}

const getCheckboxValuesFilterReduce = (html_collection, price) => { 
    let list = Array.from(html_collection).filter(filteration) 
    let result = list.reduce(reducer, price)
    return result;
}

const reducer = (accumulator, item) => {
    return accumulator + Number(item.value);
}
const filteration = (item) => {
    return item.checked;
}

const getRadioValue = (node_list, price) => {  
    node_list.forEach(item => {
        if (item.checked) {
            price = price * Number(item.value)
        }
    })
    return price;
}

button.addEventListener("click", calculate)


