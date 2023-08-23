const inputEl = document.getElementById("input");
const infotextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchApi(word) {
  try {
    infotextEl.style.display = "block";
    meaningContainerEl.style.display = "none";
    infotextEl.innerHTML = `searching  the meaning of  "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());

    if (result.title) {
      meaningContainerEl.style.display = "block";
      infotextEl.style.display = "none";
      titleEl.innerHTML = word;
      meaningEl.innerHTML = "N/A";
      audioEl.style.display = "none";
    } else {
      infotextEl.style.display = "none";
      meaningContainerEl.style.display = "block";
      audioEl.style.display = "inline-flex";
      titleEl.innerHTML = result[0].word;
      meaningEl.innerHTML = result[0].meanings[0].definitions[0].definition;
      audioEl.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    console.log(error);
    infotextEl.innerHTML = `an error happened,try again later`;
  }
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchApi(e.target.value);
  }
});
