const ColorView = ({styles, colorMode, setColorMode}) => {
    console.log(colorMode);
    const modes = ["Monochrome", "Analogous", "Evenly Spaced"];
    return (
        <div 
        className="MainContainer"
        tabIndex="0">
            <div className="PrimaryContainer" style={styles[0]}>
                <div className="colorNumber">1. {styles[0].backgroundColor.toUpperCase()}</div>
                <div className="modeSelectors">
                    {modes.map(e => 
                    <div 
                    className="selectorButton"
                    onClick={() => setColorMode(e)}
                    >
                        {e == colorMode ? <span><b>{e}</b></span> : <span>{e}</span>}
                    </div>)}

                </div>
                <div className="howTo">
                    <b></b>
                    <br/>press space to generate <code>{colorMode}</code> colors
                </div>
            </div>
            <div className="SecondaryContainer" style={styles[1]}>
                <div className="colorNumber">2. {styles[1].backgroundColor.toUpperCase()}</div>
                <div className="ThirdContainer" style={styles[2]}>
                    <div className="colorNumber">3. {styles[2].backgroundColor.toUpperCase()}</div>
                    <div className="FourthContainer" style={styles[3]}>
                        <div className="colorNumber">4. {styles[3].backgroundColor.toUpperCase()}</div>
                        <div className="FifthContainer" style={styles[4]}>
                            <div className="colorNumber">5. {styles[4].backgroundColor.toUpperCase()}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ColorView;