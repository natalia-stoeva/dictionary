//get html elements
const input = document.getElementById('inputField');
const searchBtn = document.getElementById('searchBtn');
const wordQueryDiv = document.getElementById('word');
const resultsLI = document.getElementById('results');
const example = document.getElementById('example');
const sound = document.getElementById('sound');
const audioBtn = document.getElementById('audioBtn');

const resetFields = () => {
    wordQueryDiv.innerHTML = ""
    resultsLI.innerHTML = ""
}

const renderData = (data) => {
    resetFields()
    const word = data[0].word
    const phonetics = data[0].phonetic;
    const audio = data[0].phonetics[0].audio
    const meanings = data[0].meanings
    //display word query 
    wordQueryDiv.innerHTML = `<p class="word">${word} <span class="phonetics">${phonetics}</span></p>`
    //play sound
    sound.setAttribute('src', audio);
    audioBtn.addEventListener('click', () => {
        sound.play();
     });    
       audioBtn.classList.remove('hidden')    
     //display all the definitions and examples if available
    for(let x of meanings){
        for(let y of x.definitions) {
            const partOfSpeech =  `<span class="partOfSpeech">${x.partOfSpeech}</span>`;
            const definitionListItem = y.definition;
            if(y.example){
              resultsLI.innerHTML += `<li>${partOfSpeech} ${definitionListItem}<p class="example">${y.example}</p></li>`  
            } else {
                resultsLI.innerHTML += `<li>${partOfSpeech} ${definitionListItem}</li>`
            }          
        }
    } 
    input.value = ""
}
 
