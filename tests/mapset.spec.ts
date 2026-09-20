import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
/*

set => store only unique values and it does not allow duplicates

map => store key value pairs and it allows duplicates

*/


let myset = new Set<number>();

myset.add(10);
myset.add(20);
myset.add(20);

console.log(myset)

// arr[] = {2,3,3,4,4,5,5,6,6,7,7,8,8,9,9}


let arr = [2,3,3,4,4,5,5,6,6,7,7,8,8,9,9]

// let uniqueArr = new Set<number>(arr);


// console.log(uniqueArr)

let uniquenumbers = new Set<number>();

for( let num of arr){
uniquenumbers.add(num);
}

console.log(uniquenumbers)



let myset1 = new Set<number>()

myset1.add(10);
myset1.add(20);
myset1.add(20);

console.log(myset)


myset1.add(40).add(50).add(60);

console.log(myset1)

//has 

myset1.has(20);  //true 
 myset1.has(100);                //false


 myset1.delete(20);  //true

console.log(myset1)

myset1.clear();


// [1,2,3,4,5,5,6,7,8,9]



// map will store key value pairs and it allows duplicates values but not duplicate keys

// <id,value>
// <1, "Ravi">
// <2, "Ram">
// <2, "Ravi">


let userdetails = new Map<number, string>();

userdetails.set(1, "Ravi");
userdetails.set(2, "Ram");
userdetails.set(3, "Ravi"); 










});