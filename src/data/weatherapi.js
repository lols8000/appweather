import axios from "axios";

const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';
const apikey = 'b231f726d700160985e756e4e6b2db04';

export const getWeatherData = async (cityname) => {
    try{
        const {data} = await axios.get(baseUrl + `q=${cityname}&appid=${apikey}`);
        return data;
    }catch(error){
        throw error;
    }
}

