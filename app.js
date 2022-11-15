const displayError = document.getElementById('results-outer')
const getDefinitions = async () => {
    let urlToFetch = `https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`;
    try {
        const response = await fetch(urlToFetch);
        if(response.ok){
            const jsonResponse = await response.json()
            console.log(jsonResponse)
            renderData(jsonResponse);           
        } else {
            const jsonResponse = await response.json()
            renderNoResults(jsonResponse)
            console.log(jsonResponse.title)           
        }       
    } catch(errors){       
        console.log(errors)
    }
}
searchBtn.addEventListener('click', getDefinitions)