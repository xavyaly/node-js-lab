const [, , num1, num2, operation] = process.argv;

const x = parseFloat(num1);
const y = parseFloat(num2);

let result;
switch(operation) {
    case 'add':
        result = x + y;
        break;
    case 'sub':
        result = x - y;
        break;
    case 'mul':
        result = x * y;
        break;
    case 'div':
        result = x / y;
        break;
    default:
        result = 'Invalid operation';
}

console.log('Result:', result)


// Execution
// $ node calculator.js 1 2 add
// Result: 3
// $ node calculator.js 1 2 sub
// Result: -1
// $ node calculator.js 1 2 div
// Result: 0.5
// $ node calculator.js 1 2 mul
// Result: 2
// $ node calculator.js 1 2 
// Result: Invalid operation