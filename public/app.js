//selesct elements
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p")
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
var textElement =document.querySelector('input');
const weather = {};

weather.temp = {
    unit: "celcius"
};
const k = 273;

//click operation on search
document.querySelector('button').addEventListener("click",function(){
    notificationElement.style.display="none";
    iconElement.innerHTML="";
    tempElement.innerHTML="Loading ....";
    descElement.innerHTML="-";
    locationElement.innerHTML="-";
    getweather(textElement.value);
});
//get weather at users location
async function getweather(text)
{
    const api=`/${text}`;
    const response=await fetch(api);
    const data=await response.json()
    .then((data)=>{
        console.log(data);
        weather.temp.value = Math.floor(data.main.temp - k);
        weather.description = data.weather[0].description;
        weather.iconid = data.weather[0].icon;
        weather.country = data.sys.country;
        weather.city = data.name;
    })
    .then(function () {
        displayweather();
    })
    .catch(function () {
       notificationElement.style.display = "block";
            notificationElement.innerHTML = "<p> Wrong Location !</p>"
    });
}
//display weather to UI
function displayweather(){
    iconElement.innerHTML=`<img src="icons/${weather.iconid}.png">`;
    tempElement.innerHTML=`${weather.temp.value}&deg;<span>C</span>`;
    descElement.innerHTML=weather.description;
    locationElement.innerHTML=weather.city+", "+weather.country;
    
}
// C to F 
function ctof(temperature){
    return temperature*(9/5) +32;
}
document.querySelector('.temperature-value p').addEventListener("click",function(){
    if(weather.temp.value===undefined)
        return;
    if(weather.temp.unit=="celcius")
    {   
        var f=Math.floor(ctof(weather.temp.value));
        tempElement.innerHTML=`${f}&deg;<span>F</span>`;
        weather.temp.unit="Fahrenheit";
    }
    else{
        tempElement.innerHTML=`${weather.temp.value}&deg;<span>C</span>`;  
        weather.temp.unit="celcius"; 
    }
});