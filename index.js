const assert = require('assert');
const Immutable = require('immutable');

const sum = (ns) => ns.reduce((subtotal, n) => subtotal + n, 0);

const helper = (solutions, candidate, goal, debug = false) => {
  const candidateCount = candidate.count();
  assert(candidateCount > 0);
  assert(candidate.every(n => n > 0));
  assert(goal > 0);

  debug && console.log(`Passed sanity checks for ${candidate}`);

  const candidateSum = sum(candidate);

  if( candidateSum === goal ) {
    debug && console.log( 'Found a solution -- terminate');
    return solutions.add(candidate);
  }

  if( candidateCount > 1 && candidateSum > goal ) {
    debug && console.log('Not a solution, sum still greater than goal, check our subsets');
    const subsets = Immutable.Range(0, candidateCount).map(n => candidate.delete(n));
    return subsets.flatMap(candidate => helper(solutions, candidate, goal, debug));
  }

  debug && console.log('Not a solution, nothing  more to check -- terminate');
  return solutions;
}

const subsetsum = (ns, goal, debug = false) => helper(Immutable.Set(), Immutable.List(ns), goal, debug).toSet();

console.log(subsetsum([1,3,4,5,7,9,11,100], 10, false));
