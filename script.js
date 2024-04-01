// Elements
const $form = document.getElementById('form')
const $phrase = document.getElementById('phrase')
const $history = document.getElementById('history')

// Data
const ls = JSON.parse(localStorage.getItem('history'))
const history = ls ? ls : []

// Functions
function displayHistory (history) {
  $history.innerHTML = history.reduce((html, log, index) => html + `
    <li class="list-group-item d-flex align-items-center">
      <strong class="me-2">${log.original}</strong> 
      <em class="me-auto">${log.translation}</em>
      <button type="button" 
        class="delete btn-close"
        aria-label="Delete" 
        data-index="${index}"></button>
    </li>`, '') 
}

// Listeners
$form.addEventListener('submit', async function (e) {
  e.preventDefault();
  const response = await fetch('https://ferb-latin.zoodinkers.com/api/' + $phrase.value)
  const json = await response.json()
  $form.reset()
  
  history.unshift(json)
  localStorage.setItem('history', JSON.stringify(history))
  displayHistory(history)
})

$history.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete')) {
    const index = e.target.dataset.index
    history.splice(index, 1)
    localStorage.setItem('history', JSON.stringify(history))
    displayHistory(history)
  }
})

displayHistory(history)