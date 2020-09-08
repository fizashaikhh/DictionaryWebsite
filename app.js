let button = document.getElementById("button");
button.addEventListener('click', fetchDefinition);
let input = document.getElementById('input');
function fetchDefinition() {
  let html = "";
  if (input.value === '') {

    let message = document.getElementById('message')
    let html = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Warning!</strong> Inavlid input given.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      </button>
    </div>`
    message.innerHTML = html
    setTimeout(() => {
      message.innerHTML = ''
    }, 3000);
  }
  else {
    let xhr = new XMLHttpRequest()

    xhr.open('GET', 'https://api.dictionaryapi.dev/api/v1/entries/en/' + input.value, true);
    xhr.onload = function () {
      let wordList = JSON.parse(xhr.responseText);

      let meaningDisplay = document.getElementById('meaningDisplay')
      if (xhr.status === 200) {
       let word =  wordList[0].word.charAt(0).toUpperCase() + wordList[0].word.slice(1)
        
        html = `<div class="media">
    <div class="media-body">
      <h1 class="mt-0 mb-1 capitalize"><b>${word}</b></h1>
    <p style="font-size:25px"> <b>Definition: </b>${wordList[0].meaning.noun[0].definition}<br><b>Phonetics: </b> ${wordList[0].phonetics[0].text}</p>
    <button type="button" class="btn btn-primary btn-lg my-3" id="audioBtn"">Pronunciation</button><br><p style="font-size:25px"><b>Example: </b>${wordList[0].meaning.noun[0].example}<br><b>Synonyms: </b>${wordList[0].meaning.noun[0].synonyms[0]}, ${wordList[0].meaning.noun[0].synonyms[1]}</p>
    </div>`
        meaningDisplay.innerHTML = html
        let audioBtn = document.getElementById('audioBtn')
        audioBtn.addEventListener('click', () => {
          let audio = new Audio(wordList[0].phonetics[0].audio)
          audio.play()
        })

        return;
      }
      else {
        container.innerHTML = `<div class="card">
      <div class="card-body">
      ${wordList.message}
      </div>
    </div>`
      }
    }
    xhr.send()
  }
}
