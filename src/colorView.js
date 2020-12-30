const ColorView = ({styles, colorMode, setColorMode}) => {
    console.log(colorMode);
    const modes = ["Monochrome", "Analogous", "Evenly Spaced"];
    return (
        <div 
        className="MainContainer"
        tabIndex="0">
            <div className="PrimaryContainer" style={styles[0]}>
                <div className="modeSelectors">
                    {modes.map(e => 
                    <div className="selectorButton">
                        {e == colorMode ? <span><b>{e}</b></span> : <span>{e}</span>}
                    </div>)}

                </div>
                <div className="PrimaryTitle">
                    <b>Click me!</b>
                </div>
                <div className="PrimaryParagraph">
                    And press space to generate colors
                </div>
                <div className="hexcode">{styles[0].backgroundColor}</div>
            </div>
            <div className="SecondaryContainer" style={styles[1]}>
                <div>2.</div>
                <div className="hexcode">{styles[1].backgroundColor}</div>
                <div className="ThirdContainer" style={styles[2]}>
                    <div>3.</div>
                    <div className="hexcode">{styles[2].backgroundColor}</div>
                    <div className="FourthContainer" style={styles[3]}>
                        <div>4.</div>
                        <div className="hexcode">{styles[3].backgroundColor}</div>
                        <div className="FifthContainer" style={styles[4]}>
                            <div>5.</div>
                            <div className="hexcode">{styles[4].backgroundColor}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ColorView;