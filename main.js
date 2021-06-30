Webcam.set({
width : 400,
height : 300,
img_format :"png",
png_quality : 90
});

var camera =document.getElementById("camera");


Webcam.attach("#camera");


function takeSnapshot(){
    Webcam.snap(function(datauri){
        document.getElementById("result").innerHTML = "<img id='capture_image ' src= '"+ datauri + "'/>";
    }
    );
}
console.log(ml5.version,"ml5.version");
 
var classifier =ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/a1hjnp_SM/model.json",modeloaded);


function modeloaded(){
    console.log("model is loaded");

}
function speak(){
    var synth = window.speechSynthesis;
    var speak1 = "First Prediction" + Prediction1;
    var speak2 = "Second Prediction" + Prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak1 + speak2);
    synth.speak(utterThis);
}

function predict(){
    var img = document.getElementById("capture_image");
    classifier.classify(img,gotResult);
}
function gotResult(error, results){
if (error){
    console.log("Going To Log");
    console.error(error);
}
else{
    console.log(results);
    document.getElementById("emoji_name_1").innerHTML = results[0].label;
    document.getElementById("emoji_name_2").innerHTML = results[1].label;
    Prediction1 =  results[0].label;
    Prediction2 =  results[1].label;
    speak();
    if( results[0].label ==  "Happy" ){
        document.getElementById("emoji1").innerHTML = "&#128522;";
    }
    if( results[0].label ==  "Sad" ){
        document.getElementById("emoji1").innerHTML = "&#128532;";
    }
    if( results[0].label ==  "Angry" ){
        document.getElementById("emoji1").innerHTML = "&#128548;";
    }
    if( results[1].label ==  "Happy" ){
        document.getElementById("emoji2").innerHTML = "&#128522;";
    }
    if( results[1].label ==  "Sad" ){
        document.getElementById("emoji2").innerHTML = "&#128532;";
    }
    if( results[1].label ==  "Angry" ){
        document.getElementById("emoji2").innerHTML = "&#128548;";
    }
}
}




