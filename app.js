const getDefinitions = async () => {
    let urlToFetch = `https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`;
    try {
        const response = await fetch(urlToFetch);
        if(response.ok){
            const jsonResponse = await response.json()
            console.log(jsonResponse)
            renderData(jsonResponse);           
        }

    } catch(errors){
        console.log(errors)
        // resultsDiv.innerHTML = `<p>Sorry, nothing found </p>`
    }

}
searchBtn.addEventListener('click', getDefinitions)