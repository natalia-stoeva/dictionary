//get html elements
const input = document.getElementById('inputField');
const searchBtn = document.getElementById('searchBtn');
const wordQueryDiv = document.getElementById('word');
const resultsLI = document.getElementById('results');
const errorMessage = document.getElementById('errorMessage')
const example = document.getElementById('example');
const sound = document.getElementById('sound');
const audioBtn = document.getElementById('audioBtn');

const resetFields = () => {
    wordQueryDiv.innerHTML = "";
    resultsLI.innerHTML = "";
    errorMessage.innerHTML = "";
    audioBtn.classList.add('hidden');
}

//get only valid audio sorces 
const getAudio = (data) => {
    let audioArr = [];
    for(let i = 0; i < data.length; i++){
        for(let j=0; j< data[i].phonetics.length; j++) {
            let audioIndex = data[i].phonetics[j].audio;
            if(audioIndex != "") {
                audioArr.push(audioIndex)          
             }  
        }
    }
        return audioArr     
    }   

const renderData = (data) => {
    resetFields()
    const audioSRC = getAudio(data)
    const word = data[0].word
    const phonetics = data[0].phonetic;
    // const audio = data[0].phonetics[0].audio
    const audio = audioSRC[0]
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

//render response if no results found
const renderNoResults = (data) => {
    resetFields()
    const response = data.title
    errorMessage.innerHTML = response
    input.value = ""
}
 
