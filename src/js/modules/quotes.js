import { language } from "./translator.js";

const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const quoteChanger = document.querySelector(".change-quote");

const quoteImage = new Image();
quoteImage.src = "./img/loading-buffering.gif";
quoteImage.style.cssText = "width: 24px; height: 24px;";

export function getQuotes() {
  quote.textContent = "";
  author.textContent = "";
  quote.insertAdjacentElement("afterbegin", quoteImage);

  const url =
    language === "en" ? "https://type.fit/api/quotes" : "./quotes.json";
  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      const quoteNumber = Math.floor(Math.random() * data.length);
      quote.textContent = data[quoteNumber].text;
      author.textContent = data[quoteNumber].author;
    })
    .catch(() => {
      quote.textContent = "Server error, please, try later";
    });
}

export function refreshQuote() {
  quote.textContent = "";
  author.textContent = "";
  getQuotes();
}

quoteChanger.addEventListener("click", refreshQuote);
