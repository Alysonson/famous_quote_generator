const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading, and hide quoteContainer
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading, and show quoteContainer
function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

let apiQuotes = []

// Show New Quote
function newQuote() {
    showLoadingSpinner();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // If Author is blank, add 'Unknown'
    if (quote.author === '') {
        authorText.innerText = 'Unknown';
    } else {
        // Alterando o html dos campos 
        authorText.innerText = quote.author;
    }
    // Reduce font size for long quotes
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = quote.text;
    // Stop Loader, show Quote
    removeLoadingSpinner();
}

// Get Quote From API
async function getQuote() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error) {
        //getQuote();
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Eevent Listeners
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

// On Load
getQuote();