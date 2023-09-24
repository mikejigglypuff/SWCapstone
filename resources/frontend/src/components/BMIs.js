import React from "react";

const BMIs = ({calcingBMI}) => {
    function calcBMIInfo(){
        if(calcingBMI <= 18.5)
        {
            return `당신의 BMI 지수는 ${calcingBMI}이고, 당신은 저체중입니다.`;
        }
        else if(calcingBMI <= 25.0)
        {
            return `당신의 BMI 지수는 ${calcingBMI}이고, 당신은 정상입니다.`;
        }
        else if(calcingBMI <= 30.0)
        {
            return `당신의 BMI 지수는 ${calcingBMI}이고, 당신은 과체중입니다.`;
        }
        else if(calcingBMI <= 35.0)
        {
            return `당신의 BMI 지수는 ${calcingBMI}이고, 당신은 1단계 비만입니다.`;
        }
        else if(calcingBMI < 40.0)
        {
           return `당신의 BMI 지수는 ${calcingBMI}이고, 당신은 2단계 비만입니다.`;
        }
        else if(calcingBMI >= 40.0)
        {
           return `당신의 BMI 지수는 ${calcingBMI}이고, 당신은 3단계 비만입니다.`;
        }
        return ""
    };
    
    return(
        <div>
            {calcBMIInfo()}
        </div>
    );
}
export default BMIs