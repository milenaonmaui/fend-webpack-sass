

const getWeatherData = async(baseURL, zip=90000, API_KEY) =>{ 
    const url = baseURL + zip + '&units=imperial&appid=' + API_KEY;
    try {
        const response = await fetch(url)
        const json = await response.json()
        return json;
    } catch (error) {
        console.log(error);
    }   
}
