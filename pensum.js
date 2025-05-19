//array destructuring:  concise way of extracting item out of an array. Example: 
const colors = ["red", "blue", "green"]
const [firstCol, secondCol, thirdCol] = colors
console.log(firstCol)


//spread operator  ... 
// Very fast way of making new copies of array while adding elements. 
//This is crucial in react since things affecting state are immutable. 
//New element example: 
const numbers = [1,2,3]
const newNumbers = [...numbers, 4,5]
console.log(newNumbers)

//Can also be used to concat array
const arr1 = [10,20]
const arr2 = [30,40]
const arrconcat = [...ar1, ...arr2]