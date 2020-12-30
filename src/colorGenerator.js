import ColorView from './colorView.js';
import React from 'react';

const ColorGenerator = () => {
    //max är 16777215, min är 0.
    const [primaryColor, setPrimaryColor] = React.useState(new Array(5).fill("0").map(() => getRandomInt(16777215).toString(16)));
    const [fontColor, setFontColor] = React.useState(new Array(5).fill("000000"));

    React.useEffect(()=> {
        for (let i = 0; i < primaryColor.length; i++) {
            if (primaryColor[i].length !== 6) {
                primaryColor[i] = new Array(6-primaryColor.length).fill("0").join("")+primaryColor[i];
            }
            getLuma(primaryColor[i]) > 0.5 ? fontColor[i] = "000000" : fontColor[i] = "FFFFFF";
        }
    }, [primaryColor])

    const handleSpace = () => {
        setPrimaryColor(new Array(5).fill("0").map(() => getRandomInt(16777215).toString(16)));
    }



    const styles=[
        {backgroundColor: `#${primaryColor[0]}`, color: `#${fontColor[0]}`},
        {backgroundColor: `#${primaryColor[1]}`, color: `#${fontColor[1]}`},
        {backgroundColor: `#${primaryColor[2]}`, color: `#${fontColor[2]}`},
        {backgroundColor: `#${primaryColor[3]}`, color: `#${fontColor[3]}`},
        {backgroundColor: `#${primaryColor[4]}`, color: `#${fontColor[4]}`}
    ]

    return (
        <div
        onKeyDown={(e)=> e.key===" " ? handleSpace() : undefined}>
            <ColorView styles={styles} handleSpace={handleSpace}/>
        </div>
    )
}

export default ColorGenerator;




function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


function getLuma(hexCode) {
    const parsed = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexCode);
    const rgb = {r: parseInt(parsed[1], 16), g: parseInt(parsed[2], 16), b: parseInt(parsed[3], 16)};
    const luma = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
    return luma;
}