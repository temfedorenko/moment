"use strict";

const time = document.querySelector(".time");

console.log(time);

const date = new Date();
const currentTime = date.toLocaleTimeString();

console.log(currentTime);
console.log(Date.now());

time.textContent = currentTime;
