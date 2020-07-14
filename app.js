
const startBtn = document.getElementById('startBtn');
const container = document.getElementById('container');
const closeModalBtn = document.getElementById('closeBtn');
const modal = document.getElementById('modal');
const title = document.getElementById('title');


let startMsg ='';

let questionsDiplayed = [];
const choicesObj = {
    answer: "",
    allOptions: []
};
// const nextBtn = document.getElementById('nextBtn');


function generateRandomNumber(max){
    return Math.floor(Math.random()*max);
}

function completionMsg(){
    questionsDiplayed=[];
    modal.style.display = "grid";
    
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
        }
    }

    choicesObj.allOptions.push(data[answerIndex].capital);
    
    //shuffles otpions array
    choicesObj.allOptions.sort(() => Math.random() - 0.5);

    html = "<p>"+choicesObj.allOptions[0]+"</p>"+
    "<p>"+choicesObj.allOptions[1]+"</p>"+
    "<p>"+choicesObj.allOptions[2]+"</p>"+
    "<p>"+choicesObj.allOptions[3]+"</p>";

    return html;
}

function questionGenerator(data,countryIndex){
    
    //HTML code to create the question
    let question = "<h3>What is the capital of "+ data[countryIndex]['name']+ "</h3>"+
    choicesGenerator(data, countryIndex) +
    "<button id='nextBtn'>Next Question </button>";

    return question;
}

function displayQuestion(){

     //random number to retrieve a random country
     let countryIndex = generateRandomNumber(5);

    //Empty container
    container.innerHTML = '';

    // startMsg.style.display='none';
    

    fetch("https://restcountries.eu/rest/v2/all")
    .then(res => res.json())
    .then(data => 
    { 
        //Prevents repetion of question and checks if all questions have been asked.
        while(questionsDiplayed.indexOf(countryIndex) >= 0){
            countryIndex = generateRandomNumber(5);
             if(questionsDiplayed.length == 5)
             completionMsg();
        }

        container.insertAdjacentHTML('afterbegin', questionGenerator(data, countryIndex));
        
        questionsDiplayed.push(countryIndex);

        document.getElementById('nextBtn').addEventListener('click', function(){
            displayQuestion();

        choicesObj.allOptions =[];
        });
    });
}

closeModalBtn.addEventListener('click', function(){
    modal.style.display='none';
    container.innerHTML='';
 
    container.insertAdjacentHTML("afterbegin", "<button id='restartBtn'>Start Again</button>");
    const restartBtn = document.getElementById('restartBtn');
    restartBtn.addEventListener('click', function(){
    
        displayQuestion();
       
    });
})

//Executes after user clicks start button
startBtn.addEventListener('click', function(){
    
    displayQuestion();
   
});
