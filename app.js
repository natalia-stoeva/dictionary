//get html elements
const input = document.getElementById('inputField');
const searchBtn = document.getElementById('searchBtn');
const wordQueryDiv = document.getElementById('word');
const resultsDiv = document.getElementById('results');

const renderData = (data) => {
    const word = data[0].word
    const phonetics = data[0].phonetic;
    const audio = data[0].phonetics[0].audio
    const meanings = data[0].meanings
    // console.log(typeof(meanings))    
    wordQueryDiv.innerHTML = `<p>${word} <span>${phonetics}</span></p>`

    for(let x of meanings){
        for(let y of x.definitions){
            const partOfSpeech =  `<span>${x.partOfSpeech}</span>`;
            const definitionListItem = y.definition;
            const ul = document.createElement('ul')
            const li = document.createElement('li')
            const exampleP = document.createElement("p")
            li.innerHTML = partOfSpeech + definitionListItem;           
            ul.appendChild(li)
            resultsDiv.append(ul)  
            if( y.example){
                const example = y.example; 
                exampleP.textContent = example
                resultsDiv.append(example)
            }              
        }
    } 
}
 
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
    }

}
searchBtn.addEventListener('click', getDefinitions)