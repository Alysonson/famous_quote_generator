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

// Show New Quote
function newQuote() {
    showLoadingSpinner()
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    console.log(quote);
    try {
        // console.log(data);
        // If Author is blank, add 'Unknown'
        if (quote.author === '') {
            authorText.innerText = 'Unknown'
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
    } catch(error) {
        // console.log('whooops, no quote', error);
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
newQuote();