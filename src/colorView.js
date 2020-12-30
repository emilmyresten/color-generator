const ColorView = ({styles}) => {
    return (
        <div 
        className="MainContainer"
        tabIndex="0">
            <div className="PrimaryContainer" style={styles[0]}>
                <div className="PrimaryTitle">
                    <b>Click me!</b>
                </div>
                <div className="PrimaryParagraph">
                    And press space to generate colors
                </div>
                <div>{styles[0].backgroundColor}</div>
            </div>
            <div className="SecondaryContainer" style={styles[1]}>
                <div>2.</div>
                <div>{styles[1].backgroundColor}</div>
                <div className="ThirdContainer" style={styles[2]}>
                    <div>3.</div>
                    <div>{styles[2].backgroundColor}</div>
                    <div className="FourthContainer" style={styles[3]}>
                        <div>4.</div>
                        <div>{styles[3].backgroundColor}</div>
                        <div className="FifthContainer" style={styles[4]}>
                            <div>5.</div>
                            <div>{styles[4].backgroundColor}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ColorView;