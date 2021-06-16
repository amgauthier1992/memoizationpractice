function addTo80(n){
  console.log('this calculation hypothetically takes a long time')
  return n + 80;
}

// addTo80(5)
// addTo80(5)
// addTo80(5)

//Is there a way that we can improve the above function by caching the answer so that we dont need to perform the long calculation over and over for the same subproblem? YES

//create an object that we can use to access the n if its already in the hash table. Access as we know is O(1) and is fast here. Ideally we dont want to 

let cache = {}
function memoizedAddTo80(n){
  //if the property n exists in our cache object
  if(n in cache){
    //just return the value at cache.n
    return cache[n];
    //otherwise assign the value of n + 80 to cache.n and then return that value
  } else {
    console.log('this calculation hypothetically takes a long time')
    cache[n] = n + 80
    return cache[n];
  }
}

// console.log('1', memoizedAddTo80(5))
// console.log('2', memoizedAddTo80(5))

//Here for our 2nd fn call, we see that the console.log for the long calculation is not
//triggered. This is because our if condition was met, so we were able to simply retrieve
//that cached value as opposed to running our calculation. Even though its 80 + 5, we are
//hypothetically suggesting that the calculation is a long one that we want to avoid repeating.


//We can improve our function further by removing our cache object from the global scope. Its best practice to do this so we dont pollute the global namespace etc.

// !! The problem with this is that every time we run the function, our cache object will be reset to an empty object and our console.log for the calculation will trigger each time unlike when our cache was a global variable. That means the return value will not be memoized and saved inside our cache. We need to use a concept called closure in JS.

function revisedMemoAddTo80(){
  let cache = {}
  //our top level function returns the child function below
  return function(n){
    if(n in cache){
      //just return the value at cache.n
      return cache[n];
      //otherwise assign the value of n + 80 to cache.n and then return that value
    } else {
      console.log('this calculation hypothetically takes a long time')
      cache[n] = n + 80
      return cache[n];
    }
  }
}

const memoized = revisedMemoAddTo80();

// console.log('1', revisedAddTo80(5))
// console.log('2', revisedAddTo80(5))

console.log('1', memoized(5))
console.log('2', memoized(5))


//we can also improve our fibonacci recursive solution to utilize memoization and improve time complexity from O (2^n) to O(n)

//Time Complexity- O(2 ^ n)
//Space Complexity- O(n) (stack size)

let calculations = 0

function fibonacci(n){
  calculations++;
  if(n < 2){
    return n
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

fibonacci(5)

//**see below**/

//Time Complexity- O(n)
//Space Complexity- we had to add a hash table for the cache, which increased our space complexity

function fibonacciMaster(){
  let cache = {};
  return function fib(n){
    // calculations++;
    if(n in cache){
      return cache[n];
    } else {
      if(n < 2){
        return n;
      } else {
        cache[n] = fib(n - 1) + fib(n - 2)
        return cache[n];
      }
    }
  }
}

const fasterfib = fibonacciMaster();
//this is how the above line gets translated as a function expression

// const fasterfib = function fib(n){
//   if(n in cache){
//     return cache[n];
//   } else {
//      if(n < 2){
//        return n;
//      } else {
//         cache[n] = fib(n - 1) + fib(n - 2)
//         return cache[n];
//        }
//     }
//   }

console.log('fast', fasterfib(10)) //19 calculations
console.log('slow', fibonacci(10)) //192 calculations
console.log('We did ' + calculations + ' calculations');

//bottom up approach iteration

function fibonacciMaster2(n){
  //create an array which is our starting sequence
  let answer = [0, 1]
  for (let i = 2; i <= n; i++){
    answer.push(answer[i - 2] + answer[i - 1])
  }
  //return the last value in our sequence from the answer array
  return answer.pop();
}

fibonacciMaster2(5)
