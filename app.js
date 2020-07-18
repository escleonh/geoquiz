
const startBtn = document.getElementById('startBtn');
const container = document.getElementById('container');
const containerWrapper = document.getElementById('containerWrapper');
const closeModalBtn = document.getElementById('closeBtn');
const modal = document.getElementById('modal');
const title = document.getElementById('title');
const results = document.getElementById('results');
let region = document.getElementById('region');
let regionForm = document.getElementById('regionForm');
let startMsg ='';
let questionsDiplayed = [];
const choicesObj = {
    answer: "",
    allOptions: []
};
let counter = 0;
// const nextBtn = document.getElementById('nextBtn');


function generateRandomNumber(max){
    return Math.floor(Math.random()*max);
}

function completionMsg(totalQuestions){
    questionsDiplayed=[];
    modal.style.display = "grid";
    results.innerHTML = counter +'/'+ totalQuestions;
    
}

function choicesGenerator(data, answerIndex){
    
    let randomChoiceIndex = generateRandomNumber(data.length);
    let html;

    choicesObj.answer = data[answerIndex].capital;

    while(choicesObj.allOptions.length<3){
        if(choicesObj.allOptions.indexOf(data[randomChoiceIndex].capital) >=0){
            randomChoiceIndex = generateRandomNumber(data.length);
        }
        else{
        choicesObj.allOptions.push(data[randomChoiceIndex].capital);
        console.log(data[randomChoiceIndex].name);
        }
    }

    choicesObj.allOptions.push(data[answerIndex].capital);
    
    //shuffles otpions array
    choicesObj.allOptions.sort(() => Math.random() - 0.5);


    html = "<div id='options' ><input type='radio' id='option1' name='option' value='"+choicesObj.allOptions[0] +"'>"+
    "<label for='option2'>"+choicesObj.allOptions[0] +"</label><br>"+
    "<input type='radio' name='option' id='option1' value='"+choicesObj.allOptions[1] +"'>"+
    "<label for='option3' >"+choicesObj.allOptions[1] +"</label><br>"+
    "<input type='radio' id='option1' name='option' value='"+choicesObj.allOptions[2] +"'>"+
    "<label for='option4'>"+choicesObj.allOptions[2] +"</label><br>"+
    "<input type='radio' id='option1' name='option' value='"+choicesObj.allOptions[3] +"'>"+
    "<label for='option4'>"+choicesObj.allOptions[3] +"</label><br></div>";

    return html;
}

function questionGenerator(data,countryIndex){
    console.log(data[countryIndex].capital);
    //HTML code to create the question
    let question = "<div id='question'><h3>What is the capital of "+ data[countryIndex]['name']+ "</h3>"+
    choicesGenerator(data, countryIndex) +
    "</div><button id='nextBtn'>Next Question </button>";

    return question;
}

function displayQuestion(){
    event.preventDefault();
     //random number to retrieve a random country
    let countryIndex = generateRandomNumber(5);
     
    let selectedRegion = regionForm.region.value;

    if(selectedRegion=='all')
        selectedRegion = "all";
    else
        selectedRegion= 'region/'+selectedRegion;
    //Empty container
    container.innerHTML = '';

    // startMsg.style.display='none';
    

    fetch("https://restcountries.eu/rest/v2/"+selectedRegion)
    .then(res => res.json())
    .then(data => 
    { 
        //Prevents repetion of question and checks if all questions have been asked.
        while(questionsDiplayed.indexOf(countryIndex) >= 0){
            countryIndex = generateRandomNumber(5);
             if(questionsDiplayed.length == 5)
             completionMsg(5);
        }

        container.insertAdjacentHTML('afterbegin', questionGenerator(data, countryIndex));
        
        questionsDiplayed.push(countryIndex);

        document.getElementById('nextBtn').addEventListener('click', function(){
           
            let radios = document.getElementsByName('option');
            for(let i =0; i<radios.length; i++){
                if(radios[i].checked ){
                     if(radios[i].value == data[countryIndex].capital){
                    counter++;
                    }
                }
            }
            displayQuestion();

        choicesObj.allOptions =[];
        });
    });
}

closeModalBtn.addEventListener('click', function(){
    modal.style.display='none';
    container.innerHTML='';
 
    container.insertAdjacentHTML("afterbegin",'<h2 id="title">Test your knoledge about countries\' capitals</h2>'+

    '<form action="" id="regionForm" onsubmit="displayQuestion()">'+
    

    '<label id="lRegion">Select a region: '+
    '<select id="region" name="region" required>'+
        '<option value="" selected  disabled>Region</option>'+
        '<option value="all">All Countries</option>'+
        '<option value="Americas">America</option>'+
        '<option value="Europe">Europe</option>'+
        '<option value="Oceania">Asia</option>'+
        '<option value="Africa">Africa</option>'+
    '</select>'+
'</label>'+
'<button id="restartBtn">Start</button>'+
'</form>');
    
    regionForm = document.getElementById('regionForm');
    
    const restartBtn = document.getElementById('restartBtn');
    restartBtn.addEventListener('click', function(){
    
        displayQuestion();
    });
})

//Executes after user clicks start button
// startBtn.addEventListener('click', function(){
   
//     displayQuestion(regionForm.region.value);
// });


// region.addEventListener('change', function(){
//     const region = document.getElementById('regionForm');
// });
