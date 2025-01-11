const input = document.querySelector('#number');
const button = document.querySelector('#convert-btn');
const output = document.querySelector('#output');

button.addEventListener('click', () => {
    const number = parseInt(input.value);
    const roman = convertToRoman(number);
    output.innerHTML = roman;
});

const convertToRoman = (number) => {
    if (number < 1) {
        return 'Please enter a number greater than or equal to 1';
    } else if (number > 999) {
        return 'Please enter a number less than or equal to 3999';
    } else {
    let roman = '';
    const romanNumList = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    const decimalNumList = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        for (let i = 0; i < decimalNumList.length; i++) {
            while (number >= decimalNumList[i]) {;
            roman += romanNumList[i];
            number -= decimalNumList[i];
            }
        }

    return roman;
    }
}

const checkConditions = (number) => {
}