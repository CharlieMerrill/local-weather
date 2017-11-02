$(document).ready(function(){

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      var api = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=71799ecba628f24a56375c57e3e2efae';

      $.getJSON(api, function(data){

        $('#description').html(data.weather[0].main);

        if(data.weather[0].icon == "01d" || data.weather[0].icon == "02d" || data.weather[0].icon == "01n" || data.weather[0].icon == "02n"){
          $('.sunny').removeClass('hidden');
          $('.sunny').addClass('active');
        } else if (data.weather[0].icon == "03d" || data.weather[0].icon == "04d" || data.weather[0].icon == "03n" || data.weather[0].icon == "04n"){
          $('.cloudy').removeClass('hidden');
          $('.cloudy').addClass('active');
        } else if (data.weather[0].icon == "09d" || data.weather[0].icon == "10d" || data.weather[0].icon == "50d" || data.weather[0].icon == "09n" || data.weather[0].icon == "10n" || data.weather[0].icon == "50n"){
          $('.rainy').removeClass('hidden');
          $('.rainy').addClass('active');
        } else if (data.weather[0].icon == "11d" || data.weather[0].icon == "11n"){
          $('.thunder-storm').removeClass('hidden');
          $('.thunder-storm').addClass('active');
        } else if (data.weather[0].icon == "13d" || data.weather[0].icon == "13n"){
          $('.flurries').removeClass('hidden');
          $('.flurries').addClass('active');
        }

        var kelvin = Math.trunc(data.main.temp);
        var fahrenheit = Math.trunc(kelvin * (9/5) - 459);
        var celsius = kelvin - 273;
        $('#temp').html(fahrenheit + "&#8457;");
        var lowKelvin = data.main.temp_min;
        var lowFahrenheit = Math.trunc(lowKelvin * (9/5) - 459);
        var lowCelsius = Math.trunc(lowKelvin - 273);
        var highKelvin = data.main.temp_max;
        var highFahrenheit = Math.trunc(highKelvin * (9/5) - 459);
        var highCelsius = Math.trunc(highKelvin - 273);
        $('#low').html(lowFahrenheit);
        $('#high').html(highFahrenheit + "&#8457;");
        var tempSwap = true;
        $('#toggle-temp').click(function(){
          if(tempSwap === false){
            $('#temp').html(fahrenheit + "&#8457;");
            $('#low').html(lowFahrenheit);
            $('#high').html(highFahrenheit + "&#8457;");
            tempSwap = true;
          } else {
            $('#temp').html(celsius + "&#8451;");
            $('#low').html(lowCelsius);
            $('#high').html(highCelsius + "&#8451;");
            tempSwap = false;
          }
        });

        $('#city').html(data.name);

        $("#humidity").html("Humidity: " + data.main.humidity + "%");

        $('#wind-speed').html("Wind: " + data.wind.speed + " MPH");
        var direction = data.wind.deg;
        var directionCSS = "rotate(" + (direction - 45) + "deg)";
        if(direction > 338 && direction < 23){
          var compass = "N";
        } else if (direction > 23 && direction < 68){
          var compass = "NE";
        } else if (direction > 68 && direction < 113){
          var compass = "E";
        } else if (direction > 113 && direction < 158){
          var compass = "SE";
        } else if (direction > 158 && direction < 203){
          var compass = "S";
        } else if (direction > 203 && direction < 248){
          var compass = "SW";
        } else if (direction > 248 && direction < 293){
          var compass = "W";
        } else if (direction > 293 && direction < 338){
          var compass = "NW";
        }
        $('#wind-direction').html(compass);
        $('#wind-icon').css({"transform": directionCSS});

        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        n =  new Date();
        var mins = (n.getMinutes() < 10) ? "0" + n.getMinutes() : n.getMinutes();
        var time = n.getHours() + ":" + mins;
        y = n.getFullYear();
        m = months[n.getMonth()];
        d = n.getDate();
        $('#time').html(time);
        document.getElementById("date").innerHTML = m + " " + d + ", " + y;
      });
    });
  }
});

