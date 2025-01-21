const userinput = document.getElementById('user-input');
const button = document.getElementById('check-btn');
const clear = document.getElementById('clear-btn');
const result = document.getElementById('results-div');

button.addEventListener('click', () => {
    let str = userinput.value;
    let splitStr = str.split(/[\s\-\(\)]+/);
    let joinedStr = splitStr.join("");

    let parathatheseMatch1 = str.match(/\(/g);
    let parathatheseMatch2 = str.match(/\)/g);

    if (parathatheseMatch1 !== null && parathatheseMatch2 === null ||
        parathatheseMatch1 === null && parathatheseMatch2 !== null) {
        result.innerHTML = `Invalid US number: ${str}`;
        return;
    }

    console.log(splitStr);
    console.log(joinedStr);

    if (str === "") {
        alert(`Please provide a phone number`);
        return;
    }

    // Regular expression for phone number validation
    const phoneRegex = /^(?:\+?1\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

    if (phoneRegex.test(str)) {
        result.innerHTML = `Valid US number: ${str}`;
    } else {
        result.innerHTML = `Invalid US number: ${str}`;
    }
});

clear.addEventListener('click', () => {
    userinput.value = '';
    result.innerHTML = '';
});
