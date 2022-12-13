const questions = [
    {
        question: "What does HTML stands for?", 
        option: ["Hyper Text Markup Language", "Hyper Transfer Marketing Language", "Hier Text Manggement Location", "Hyper Text Markdown Language"], 
        answer: 0
    }, 

    {
        question: "Number of States in India?", 
        option: [10, 35, 28, 20], 
        answer: 2
    }, 
    {
        question: "Who is the Prime Minister of India?", 
        option: ["Manmohan Singh", "Narendra Modi", "Amit shah", "Raj Pawar"], 
        answer: 1
    }, 

    {
        question: "How Many Players are there in one Cricket Match?", 
        option: [10, 11, 20, 15], 
        answer: 1
    }, 
    {
        question: "Which of the following is the national Sports of India?", 
        option: ["Cricket", "Hockey", "Carrom", "Chess"], 
        answer: 1
    }
]

let ans  = new Array(questions.length).fill(-1); 

let currQues = 0; 
const nextBtn = document.querySelector('.next-ques-btn'); 
let prevBtn = document.querySelector('.prev-ques-btn'); 
let quesNo = document.querySelector('.ques__no');
const submitBtn = document.querySelector('.submit_btn'); 




loadQuestion(currQues); 

// const optionsList = document.querySelectorAll('.option'); 

function removCorrect(optionsList){
    optionsList.forEach((option) => {
    option.classList.remove('correct'); 
  })
}





function selectAnswer(e, ind) {
    const optionsList = document.querySelectorAll('.option'); 
    removCorrect(optionsList); 
    ans[currQues] = ind; 
    console.log(ans); 
    e.target.classList.add('correct');     
}


 



nextBtn.addEventListener('click', () => {
    currQues= currQues + 1; 
    loadQuestion(currQues); 
}); 



prevBtn.addEventListener('click', () => {
    currQues = currQues - 1; 
   loadQuestion(currQues); 
}); 




// Load question

function loadQuestion(currQues){
    
    let answered = ans[currQues] == -1?false: true; 


    const question = document.querySelector('.quiz__body h2');
    const options = document.querySelector('.quiz__body .options ul'); 
    
    
    // rendering the question in dom 
    question.innerText = questions[currQues].question; 
    
    let optionList = ""; 
    
    const opts = questions[currQues].option; 
    opts.forEach((singleOpt,ind) => {
        optionList +=  `<li onclick="selectAnswer(event, ${ind})" class="option ${ind == ans[currQues]?"correct": ""}"> ${singleOpt}   <i class="fa-sharp fa-solid fa-circle-check"></i></li>`; 
    }); 
    
    options.innerHTML = optionList; 


    quesNo.innerText = currQues+1; 



    // check if it is first or the last question to disable the buttons
    if(currQues === questions.length-1){
        nextBtn.disabled  = true; 
        nextBtn.classList.add('disabled'); 
        submitBtn.style.display  = "block";
    }else {
        nextBtn.disabled  = false; 
        nextBtn.classList.remove('disabled'); 
        submitBtn.style.display  = "none";
    }

    // similarly
    if(currQues === 0){
        prevBtn.disabled  = true; 
        prevBtn.classList.add('disabled'); 
    }else {
        prevBtn.disabled  = false; 
        prevBtn.classList.remove('disabled'); 
    }

}



// submit Quiz

function submitAnswers(){
    let count=0; 
    for(let a of ans){
        if(a== -1){
            count++; 
        }
    }

    let sure; 
    if(count > 0){
         sure = confirm(`You left ${count} Questions Unanswered. Are sure to Submit?`); 
    }else {
        sure = confirm("Are you sure to Submit?");
    }

    if(sure){
        loadResult(); 
    }
}


// result block 
const resultBlock = document.querySelector('.results'); 


// load results 
function loadResult(){
    let correct=0, incorrect=0; 
    const totalPossibleMarks = 10; 
    let marks =0; 

    questions.forEach((question, ind) => {
        if(question.answer == ans[ind]){
            correct++; 
        }
        else {
            incorrect++; 
        }
    }); 
    marks = correct*2; 

    const totalCorrectUi = document.querySelector('.res .total_correct'); 
    const percentage  = document.querySelector('.percentage');
    const image = document.querySelector('.result_images'); 

    totalCorrectUi.innerText =  correct; 
    let marksInPercentage = (marks*100)/10; 
    let src=""; 
    if(marksInPercentage > 35){        
     src = "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/congratulations%2C-success-design-template-bb8b52bdbb7a4ab627eb10da698a0eda_screen.jpg?ts=1620463475"; 
    }else {
        src = "https://previews.123rf.com/images/gorkemdemir/gorkemdemir1409/gorkemdemir140901262/31998728-better-luck-next-time-red-rubber-stamp-text-vector-over-a-white-background-.jpg"; 
    }

    percentage.innerText  = marksInPercentage; 
    resultBlock.style.display = "block"; 
    image.src = src; 

     ans  = new Array(questions.length).fill(-1); 
    loadQuestion(0); 
    currQues =0;   
    
}


const clear = document.querySelector('.clear-selection'); 
clear.addEventListener('click', (e) => {
    ans[currQues] = -1;
    loadQuestion(currQues);
}); 


const timesIcon = document.querySelector('.times-icon'); 

timesIcon.addEventListener('click', (e) => {
    resultBlock.style.display = 'none';
}); 