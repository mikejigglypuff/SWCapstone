const uheight = document.querySelector("#height");
const uweight = document.querySelector("#weight");
const BMIbtn = document.querySelector("#resultbtn");
const loginRender = require("../loginRender");

function calcBMI(){
    let hei = parseFloat(uheight.value);
    let wei = parseFloat(uweight.value);
    let result = document.querySelector("#resultBMI");
    
    let BMI = (wei/(Math.pow(hei, 2)/10000)).toFixed(2);

    if(BMI <= 18.5)
    {
        result.innerText = `당신의 BMI는 ${BMI}이고, 당신은 저체중입니다.`;
    }
    else if(BMI <= 25.0)
    {
        result.innerText = `당신의 BMI는 ${BMI}이고, 당신은 정상입니다.`;
    }
    else if(BMI <= 30.0)
    {
        result.innerText = `당신의 BMI는 ${BMI}이고, 당신은 과체중입니다.`;
    }
    else if(BMI <= 35.0)
    {
        result.innerText = `당신의 BMI는 ${BMI}이고, 당신은 1단계 비만입니다.`;
    }
    else if(BMI < 40.0)
    {
        result.innerText = `당신의 BMI는 ${BMI}이고, 당신은 2단계 비만입니다.`;
    }
    else if(BMI >= 40.0)
    {
        result.innerText = `당신의 BMI는 ${BMI}이고, 당신은 3단계 비만입니다.`;
    }
}

BMIbtn.addEventListener("click", calcBMI);

const choice = document.getElementById("choiceOtherHealth");

let exerciese = ["등", "가슴", "어깨", "팔", "하체"];
localStorage.setItem("exercises", JSON.stringify(exerciese));

function OUNCHU(){
    let talk = document.getElementById("todayExercise");
    let undong, checkUndong;
    let num;

    num = Math.floor(Math.random() * 5);

    if(localStorage.getItem('exercises') == null){
        undong = [];
    }
    else{
        undong = JSON.parse(localStorage.getItem('exercises'));
    }
    checkUndong = undong[num];
    talk.innerText = `오늘 운동은 ${checkUndong} 각입니다.`;
}

choice.addEventListener("click", OUNCHU);


document.getElementById("backbtn").addEventListener(
    "click", () => {
        location.href = "/resources/login/login.html";
    }
);

loginRender("/");