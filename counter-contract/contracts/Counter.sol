pragma solidity ^0.5.8;
// Imagine a big integer counter that the whole world could share
contract Counter {

  int value;

  constructor() public{
    value = 0;
  }

  modifier checkIfLessThanCounter(int n){
    require (value >= n, 'Counter can not become negative.');
    _;
  }

  modifier checkIfLessThanZero(int n){
    require (n > 0, 'Value must be greater than zero.');
    _;
  }

  function get() view public returns (int){
    return value;
  }

  function initialize (int n) public {
    value = n;
  }

  function increment (int n) public checkIfLessThanZero(n){
    value = value + n;
  }

  function decrement (int n) public checkIfLessThanZero(n) checkIfLessThanCounter(n){
    value = value - n;
  }
}
