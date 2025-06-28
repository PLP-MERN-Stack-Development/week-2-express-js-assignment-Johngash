const numbers = [1,2,3,4,5,6,7,8,9,10]

const evenNums = numbers.filter(even => even%2 == 0)

const sum = numbers.reduce((acc, num) => acc + num, 0)
console.log(sum)
