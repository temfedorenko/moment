const getQuotesData = () => {
  const quote = document.querySelector('.quote');
  const author = document.querySelector('.author');
  const quoteChanger = document.querySelector('.change-quote');

  const quoteImage = new Image();
  quoteImage.src = './img/loading-buffering.gif';
  quoteImage.style.cssText = 'width: 24px; height: 24px;';

  async function getQuotes() {
    quote.insertAdjacentElement('afterbegin', quoteImage);
    await fetch('https://type.fit/api/quotes', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        const quoteNumber = Math.round(Math.random() * 1643);
        quote.textContent = data[quoteNumber].text;
        author.textContent = data[quoteNumber].author;
      })
      .catch(() => {
        quote.textContent = 'Server error, please, try later';
      });
  }

  getQuotes();

  quoteChanger.addEventListener('click', () => {
    quote.textContent = '';
    author.textContent = '';
    getQuotes();
  });
};

export default getQuotesData;
