console.log('App loaded')

const weatherDisplay = document.querySelector('.weather')
const nameIdSearch = document.querySelector('#name-id')
const longLatSearch = document.querySelector('#long-lat')
const APIKEY = '360e8777ac9194f30e107ccb32cfb293'


let name, zip, long, lat

const grabNameIdData = (name, id) => {

    if(typeof id === 'object') {
        const idData = axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${id[0]}&lon=${id[1]}&appid=${APIKEY}&units=imperial`)

        const nameData = axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=${APIKEY}&units=imperial`)

        return Promise.all([nameData.catch(err=>err), idData.catch(err=>err)])
    } else {
        const idData = axios.get(`api.openweathermap.org/data/2.5/weather?zip=${id}&APPID=${APIKEY}&units=imperial`)

        const nameData = axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=${APIKEY}&units=imperial`)

        return Promise.all([nameData.catch(err=>err), idData.catch(err=>err)])
    }
}

const processNameZipData = (name, zip) => {
    return grabNameIdData(name, zip)
    .then(response => response)
}

const renderHtml = (data) => {
    const descData = data.weather[0]
    const tempData = data.main
    
    weatherDisplay.innerHTML = 
    `<i class="owf owf-${descData.id} owf-5x"></i>
    <div class="sub-info">
        <h3>Sky</h3>
        <p>${descData.main}</p>
    </div>
    <div class="sub-info">
        <h3>Temperature</h3>
        <p>${tempData.temp}°F</p>
        <h6>Feels Like</h6>
        <p>${tempData.feels_like}°F</p>
    </div>
    <div class="sub-info">
        <h3>Humidity<h3>
        <p>${tempData.humidity}%</p>
    </div>`

}

nameIdSearch.addEventListener('click', () => {
    if(document.querySelector('#name-zip-value').value.includes('/')) {
        id = document.querySelector('#name-zip-value').value.split('/')
        
    } else {
        id = document.querySelector('#name-zip-value').value
        name = document.querySelector('#name-zip-value').value
    }
    
    processNameZipData(name, id)
    .then(response => response)
    .then((data) => (data[0].data ? data[0].data : data[1].data))
    .then(weather => renderHtml(weather))
})

