count1 = 10;
// makeCounter is closed
function makeCounter() {
    let count1 = 0;
    function counter(){
        count1++;
        return count1;
    }
    return counter;
}

// counter is not closed
function counter(){
    let count1 = 5;
    function innerCounter(){
        return count1++;
    }
    return innerCounter;
}
let doCount = makeCounter();

console.log(`doCount has it's own count`)
console.log(doCount());
console.log(doCount());


console.log("counter overwrite the variable count.");
let counterLocal = counter();
console.log(counterLocal());
console.log(counterLocal());
console.log(counterLocal());

// counter using global variable
function counterGlobal(){
    function innerCounter(){
        return count1++;
    }
    return innerCounter;
}

console.log("counter globally the variable count.");
let counterGlobally = counterGlobal();
console.log(counterGlobally());
console.log(counterGlobally());
console.log(counterGlobally());


