const searchBox = document.querySelector('[data-search]')
const searchButton = document.querySelector('[data-enter]')
const locationName = document.querySelector('[data-l-name]')
const todaysDate = document.querySelector('[data-today]')
const currentTemperature = document.querySelector('[data-tempp]')
const weatherDetails = document.querySelector('[data-wdetails]')
const displayChanger = document.querySelector('[data-btn]')
const searchBar = document.querySelector('[data-search-bar]')

displayChanger.addEventListener('click', () =>{
    displayChanger.style.display = "none";
    searchBar.style.display = "flex";
}) // removes button display and enables searchbar display

searchButton.addEventListener('click', () => {
    getWeather(searchBox.value)
}) //triggers an event as soon as  search button is clicked and calls get weather function

searchBox.addEventListener('keypress', e =>{
    if(e.keyCode == 13){
        getWeather(searchBox.value)
    }
}) // triggers an event as soon as "enter" is pressed and call get weather function

let getWeather = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=30f15b4ebd315c621e7659d7cdb3c04e&units=metric`)
    .then((res) => {
        if(res.ok){
            console.log('worrks');
            return res.json();
        }else {
            console.log('Something went wrong');
        }
    })
    .then( data => {
        locationName.innerHTML = `${data.name}, ${data.sys.country}`
        currentTemperature.innerText = `${Math.round(data.main.temp)}°c`
        weatherDetails.innerHTML = `${data.weather[0].main}`
        
        let todayDate = new Date();
        todaysDate.innerText = manageDate(todayDate)

        if(weatherDetails.textContent == "Clouds"){
            document.body.style.backgroundImage = "url('./images/cloud.jpg')"
        }else if(weatherDetails.textContent == "Clear"){
            document.body.style.backgroundImage = "url('./images/clear.jpg')"
        }else if(weatherDetails.textContent == "Rain"){
            document.body.style.backgroundImage = "url('./images/rain.jpg')"
        }else if(weatherDetails.textContent == "Snow"){
            document.body.style.backgroundImage = "url('./images/snow.jpg')"
        }else if(weatherDetails.textContent == "Thunderstorm"){
            document.body.style.backgroundImage = "url('./images/thunderstorm.jpg')"
        }else if(weatherDetails.textContent == "Drizzle"){
            document.body.style.backgroundImage = "url('./images/drizzle.jpg')"
        }else if(weatherDetails.textContent == "aze"){
            document.body.style.backgroundImage = "url('./images/haze.jpg')"
        }
    }).catch((error) => {
        console.log(error)
    })
}
// calls for API and changes the data according to API, also added if/else for changing background color according to weather as well as added date function to get the time

let manageDate = (passDate) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let year = passDate.getFullYear();
    let month = months[passDate.getMonth()];
    let date =  passDate.getDate();
    let day = days[passDate.getDay()];

    return `${date} ${month} ${day}, ${year}`
}
// returns date also returns day and month in string names