const express= require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();//initialize new express
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
   res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
    console.log(req.body.cityName);
    const query=req.body.cityName;
    const apiKey="22a17c4431af7bb55040ccf8461468ee";
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey + "&units="+ unit
   https.get(url,function(response){
       console.log(response.statusCode);
   response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      console.log(temp);
      const weatherDescription=weatherData.weather[0].description;
      console.log(weatherDescription);
      const icons=weatherData.weather[0].icon;
    const imageUrl="https://openweathermap.org/img/wn/" + icons +"@2x.png";
      res.write("<h1> The weather is currently "+ weatherDescription +"</h1>");
      res.write("<h1> The tempearture in " + query+ " is " + temp + " degree Celcius. </h1>");
      res.write("<img src="+imageUrl+">");
      res.send();
   });
});
})


app.listen(3000,function(){
    console.log("Server is running");
})
