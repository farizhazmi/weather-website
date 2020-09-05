console.log("success")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationTag = document.querySelector('#location')
const forecastTag = document.querySelector('#forecast')
const temperatureTag = document.querySelector('#temperature')
const iconTag     = document.getElementById("icon-weather")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    
    temperatureTag.textContent = ''
    locationTag.textContent = 'Loading...'
    forecastTag.textContent = ''
    iconTag.textContent     = ''
    iconTag.src             = ''

    fetch('http://localhost:3000/weather?address='+location+'').then((response) =>{
        response.json().then((data) => {
            if(data.error){
                locationTag.textContent = data.error
                forecastTag.textContent = ''
            }else{
                temperatureTag.textContent = data.temperature
                locationTag.textContent = data.location
                forecastTag.textContent = data.forecast
                iconTag.src = data.icon;
                
                
            }
        })
    })
    
})