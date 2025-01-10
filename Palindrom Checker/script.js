const checkbutton = document.getElementById('check-btn');
let result = document.getElementById('result');

checkbutton.addEventListener('click', () => { 
  let input = document.getElementById('text-input').value;
  if (input === '') {
    alert('Please input a value');
    return;
  }
  let regex = /[\W_]/g;
  let str = input;
  let cleanstr = str.toLowerCase().replace(regex, '');
  let reversed = cleanstr.split('').reverse().join('');
  if (cleanstr === reversed) {
    result.innerHTML = `${str} is a palindrome`;
  } else {
    result.innerHTML = `${str} is not a palindrome`;
  }
});