import ColorView from './colorView.js';
import React from 'react';

const ColorGenerator = () => {
    //max är 16777215, min är 0.
    // const [primaryColor, setPrimaryColor] = React.useState(new Array(5).fill("0").map(() => getRandomInt(16777215).toString(16)));
    const [primaryColor, setPrimaryColor] = React.useState(padHexCode(getRandomInt(16777215).toString(16)));
    // const [fontColor, setFontColor] = React.useState("000000");
    const [colors, setColors] = React.useState(generateMonochrome(primaryColor))
    const [colorMode, setColorMode] = React.useState("Monochrome")
    const colorModeFunctions = {
        "Monochrome": () => setColors(generateMonochrome(primaryColor)),
        "Analogous": () => setColors(generateAnalogous(primaryColor)),
        "Evenly Spaced": () => setColors(generateTriadic(primaryColor)),
    }

    React.useEffect(()=> {
        colorModeFunctions[colorMode]()
        
    }, [primaryColor, colorMode])

    const handleSpace = () => {
        setPrimaryColor(padHexCode(getRandomInt(16777215).toString(16)));
    }



    const styles=[
        {backgroundColor: `#${colors[0]}`, color: `#${getLuma(colors[0]) > 0.5 ? "000000" : "FFFFFF"}`},
        {backgroundColor: `#${colors[1]}`, color: `#${getLuma(colors[1]) > 0.5 ? "000000" : "FFFFFF"}`},
        {backgroundColor: `#${colors[2]}`, color: `#${getLuma(colors[2]) > 0.5 ? "000000" : "FFFFFF"}`},
        {backgroundColor: `#${colors[3]}`, color: `#${getLuma(colors[3]) > 0.5 ? "000000" : "FFFFFF"}`},
        {backgroundColor: `#${colors[4]}`, color: `#${getLuma(colors[4]) > 0.5 ? "000000" : "FFFFFF"}`}
    ]

    return (
        <div
        onKeyDown={(e)=> e.key===" " ? handleSpace() : undefined}>
            <ColorView styles={styles} colorMode={colorMode} setColorMode={setColorMode}/>
        </div>
    )
}

export default ColorGenerator;




function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


function getRgb(hexCode) {
    //receives hexcode without #, ex: 374c2c
    //returns rgb dict between 0-255
    const parsed = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexCode);
    const rgb = {r: parseInt(parsed[1], 16), g: parseInt(parsed[2], 16), b: parseInt(parsed[3], 16)};
    return rgb
}

function getHex(rgb) {
    //receives rgb as dict, ex: {r: 133, g: 13, b: 88}
    const r = rgb.r.toString(16).length === 2 ? rgb.r.toString(16) : `0${rgb.r.toString(16)}`
    const g = rgb.g.toString(16).length === 2 ? rgb.g.toString(16) : `0${rgb.g.toString(16)}`
    const b = rgb.b.toString(16).length === 2 ? rgb.b.toString(16) : `0${rgb.b.toString(16)}`
    const hexCode = `${r}${g}${b}`
    if (hexCode.length != 6) {
        return padHexCode(hexCode)
    }
    return hexCode
}


function rgbToHsl(rgb) {
    // receives rgb as dict, ex: {r: 133, g: 13, b: 88}
    // returns hsl as dict, {h: 216, s: 0.2, l: 0.5}
    const normalized = [rgb.r/255, rgb.g/255, rgb.b/255];
    const max =  Math.max(...normalized);
    const min = Math.min(...normalized);

    const hueCalculations = [
        (normalized[1]-normalized[2])/(max-min), 
        2 + (normalized[2]-normalized[0])/(max-min),
        4 + (normalized[0]-normalized[1])/(max-min)
    ]
    
    const luminance = (max+min) / 2;
    const saturation = max === min ? 0 : luminance <= 0.5 ? (max-min)/(max+min) :  (max-min)/(2-max-min)
    const hue = saturation === 0 ? 0 : hueCalculations[normalized.indexOf(max)] < 0 ? ((hueCalculations[normalized.indexOf(max)]*60) + 360): hueCalculations[normalized.indexOf(max)] * 60


    return {
        h: hue,
        s: saturation,
        l: luminance
    }
}

function hslToRgb(hsl) {
    if (hsl.s === 0) { // if we have no saturation we have a shade of grey, i.e. all rgb are the same.
        return {r: hsl.l*255, g: hsl.l*255, b: hsl.l*255}
    }
    const t_1 = hsl.l < 0.5 ? hsl.l * (1+hsl.s) : (hsl.l + hsl.s) - (hsl.l * hsl.s);
    const t_2 = 2 * hsl.l - t_1
    
    const hue = hsl.h / 360;

    const t_r = hue + 0.333 < 0 ? hue + 0.333 + 1 : hue + 0.333 > 1 ? hue + 0.333 - 1 : hue + 0.333;
    const t_g = hue;
    const t_b = hue - 0.333 < 0 ? hue - 0.333 + 1 : hue - 0.333 > 1 ? hue - 0.333 - 1 : hue - 0.333;

    return {
        r: Math.round((6 * t_r < 1 ? t_2 + (t_1 - t_2) * 6 * t_r : 2 * t_r < 1 ? t_1 : 3 * t_r < 2 ? t_2 + (t_1 - t_2) * (0.666-t_r) * 6 : t_2) * 255),
        g: Math.round((6 * t_g < 1 ? t_2 + (t_1 - t_2) * 6 * t_g : 2 * t_g < 1 ? t_1 : 3 * t_g < 2 ? t_2 + (t_1 - t_2) * (0.666-t_g) * 6 : t_2) * 255),
        b: Math.round((6 * t_b < 1 ? t_2 + (t_1 - t_2) * 6 * t_b : 2 * t_b < 1 ? t_1 : 3 * t_b < 2 ? t_2 + (t_1 - t_2) * (0.666-t_b) * 6 : t_2) * 255),
    }
}


function getLuma(hexCode) {
    const rgb = getRgb(hexCode);
    const luma = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
    return luma;
}

function padHexCode(hexCode) {
    return new Array(6-hexCode.length).fill("0").join("")+hexCode
}

function generateMonochrome(primaryColor) {
    //want to return an array of lenght 5, with each element being rgb
    // objects based on the primary color with decreasing luminosity.
    const rgb = getRgb(primaryColor);
    const hsl = rgbToHsl(rgb);
    const arr = new Array(5);

    for (let i = 0; i < arr.length; i++) {
        const color = {...hsl} // create a copy of hsl in order to not mutate it.
        color.l /= (i+1)
        arr[i] = color
    }
    return arr.map(hsl => hslToRgb(hsl)).map(rgb => getHex(rgb));
}


function generateAnalogous(primaryColor) {
    // Analogous color schemes are created by using colors that are next to each other on the color wheel.
    //Just change the Hue angle by 30 degrees (or make selectable?).
    const rgb = getRgb(primaryColor);
    const hsl = rgbToHsl(rgb);
    const arr = new Array(5);
    const angle = 12;

    for (let i = 0; i < arr.length; i++) {
        const color = {...hsl} // create a copy of hsl in order to not mutate it.
        color.h = i % 2 === 0 ? color.h + (i*angle) > 360 ? color.h + (i*angle) - 360 : color.h + (i*angle) : color.h - (i*angle) < 0 ? color.h - (i*angle) + 360 : color.h - (i*angle)
        arr[i] = color
    }
    return arr.map(hsl => hslToRgb(hsl)).map(rgb => getHex(rgb));
}

function generateTriadic(primaryColor) {
    // Triadic schemes are made up of hues equally spaced around the color wheel.
    // Just set the hue angles to 72 degrees apart (5 colors).
    const rgb = getRgb(primaryColor);
    const hsl = rgbToHsl(rgb);
    const arr = new Array(5);

    for (let i = 0; i < arr.length; i++) {
        const color = {...hsl} // create a copy of hsl in order to not mutate it.
        color.h = color.h + ((360/arr.length)*i) > 360 ? color.h + ((360/arr.length)*i) - 360 : color.h + ((360/arr.length)*i);
        arr[i] = color
        console.log(arr)
    }
    return arr.map(hsl => hslToRgb(hsl)).map(rgb => getHex(rgb));
}