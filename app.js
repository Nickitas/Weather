window.onload = function() {
  weather(cityID);
  weatherNext(cityID);
}

const key = '80d7077b9d292a6d028eac3d60f67119';
const cityID = 501175;

function weather( cityID ) {
	fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&units=metric&appid=' + key + '&lang=ru')  
	.then(function(resp) { return resp.json() })
	.then(function(data) {
    console.log(data);
    getWeather(data);
	})
	.catch(function() {
		//throw new Error(`${response.status}: ${response.statusText}`);
	});
}

function weatherNext() {
	fetch('https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&units=metric&appid=' + key + '&lang=ru')  
	.then(function(resp) { return resp.json() })
	.then(function(data) {
    console.log(data);
    getWeatherNext(data);
	})
	.catch(function() {
		//throw new Error(`${response.status}: ${response.statusText}`);
	});
}

function getWeather(d) {

  let dateArr = Date(d.dt).split(' ');
  dateArr[0] = checkDayOfWeek(dateArr[0]);
  dateArr[1] = checkMonth(dateArr[1]);
  
  document.getElementById('time').innerHTML = dateArr[4];
  document.getElementById('day').innerHTML = dateArr[0] + ', ' + dateArr[2] + ' ' + dateArr[1] + ' '+ dateArr[3] + 'г.';
  document.getElementById('description').innerHTML = d.weather[0].description;
	document.getElementById('temp').innerHTML = Math.round(parseFloat((d.main.temp_max + d.main.temp_min)/2)) + '&deg;';
  document.getElementById('location').innerHTML = d.name;
}

function getWeatherNext(d){

  let dateArr1 = Date(d.current.dt + 86400).split(' ');
  dateArr1[0] = checkDayOfWeek(dateArr1[0]);

  let dateArr2 = Date(d.current.dt + 86400 + 86400).split(' ');
  dateArr2[0] = checkDayOfWeek(dateArr2[0]);

  let dateArr3 = Date(d.current.dt + 86400 + 86400 + 86400).split(' ');
  dateArr3[0] = checkDayOfWeek(dateArr3[0]);

  document.getElementById('date_1').innerHTML = dateArr1[0];
  document.getElementById('temp_1').innerHTML = Math.round(parseFloat(d.current.temp)) + '&deg;';
  document.getElementById('description_1').innerHTML = d.current.weather[0].description;

  document.getElementById('date_2').innerHTML = dateArr2[0];
  document.getElementById('temp_2').innerHTML = Math.round(parseFloat(d.current.temp)) + '&deg;';
  document.getElementById('description_2').innerHTML = d.current.weather[0].description;

  document.getElementById('date_3').innerHTML = dateArr3[0];
  document.getElementById('temp_3').innerHTML = Math.round(parseFloat(d.current.temp)) + '&deg;';
  document.getElementById('description_3').innerHTML = d.current.weather[0].description;
}

function checkDayOfWeek(dw){
  switch(dw){
    case 'Sun': dw = 'Воскресенье'; break;
    case 'Fri': dw = 'Понедельник'; break;
    case 'Tue': dw = 'Вторник'; break;
    case 'Wen': dw = 'Среда'; break;
    case 'Fri': dw = 'Четверг'; break;
    case 'Thr': dw = 'Пятница'; break;
    case 'Sat': dw = 'Суббота'; break;
  } return dw;
}

function checkMonth(m){
  switch(m){
    case 'Jan': m = 'Января'; break;
    case 'Feb': m = 'Февраля'; break;
    case 'Mar': m = 'Марта'; break;
    case 'Apr': m = 'Апреля'; break;
    case 'May': m = 'Мая'; break;
    case 'Jun': m = 'Июня'; break;
    case 'Jul': m = 'Июля'; break;
    case 'Aug': m = 'Августа'; break;
    case 'Sep': m = 'Сентября'; break;
    case 'Oct': m = 'Октября'; break;
    case 'Nov': m = 'Ноября'; break;
    case 'Dec': m = 'Декабря'; break;
  } return m;
}