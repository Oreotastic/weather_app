console.log('App loaded')

const weatherDisplay = document.querySelector('.weather')
const nameIdSearch = document.querySelector('#name-id')
const longLatSearch = document.querySelector('#long-lat')
const APIKEY = '360e8777ac9194f30e107ccb32cfb293'


let name, zip, long, lat

const grabNameIdData = (name, zip) => {
    const nameData = axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=${APIKEY}&units=imperial`)

    const zipData = axios.get(`api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${APIKEY}&units=imperial`)

    const map = axios.get(`https://tile.openweathermap.org/map/${'precipitation_new'}/${2}/${1}/${1}.png?appid=${APIKEY}`)

    return Promise.all([nameData.catch(err=>err), zipData.catch(err=>err), map.catch(err=>err)])
}

const processNameZipData = (name, zip) => {
    return grabNameIdData(name, zip)
    .then(response => response)
}

const renderHtml = (data) => {
    const descData = data.weather[0]
    const tempData = data.main
    console.log(data)
    weatherDisplay.innerHTML = 
    `<i class="owf owf-${descData.id} owf-5x"></i>
    <div class="sub-info">
        <h3>Sky</h3>
        <p>${descData.main}</p>
    </div>
    <div class="sub-info">
        <h3>Temperature</h3>
        <p>${tempData.temp}F</p>
        <h6>Feels Like</h6>
        <p>${tempData.feels_like}</p>
    </div>
    <div class="sub-info">
        <h3>Humidity<h3>
        <p>${tempData.humidity}%</p>
    </div>`

}

nameIdSearch.addEventListener('click', () => {
    name = document.querySelector('#name-zip-value').value
    id = document.querySelector('#name-zip-value').value
    
    processNameZipData(name, zip)
    .then(response => response)
    .then((data) => (data[0].data ? data[0].data : data[1].data))
    .then(weather => renderHtml(weather))
})

