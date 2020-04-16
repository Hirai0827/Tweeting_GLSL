import React, {Component} from "react";

export class GLSLErrorLog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let hasError = this.props.errorLog;
        let text = "Compile Succeeded!";
        if(hasError){
            text = this.props.errorLog.split("\n")[0];
            let sp = text.split(':');
            sp[2] = (parseInt(sp[2])-8).toString();
            text = sp.join(':');
        }
        return (
            <div>
                <div style={{lineHeight:"32px",width:"100%",textAlign:"left",backgroundColor:"black",color:(hasError?"pink":"lightgreen"),borderRadius:"4px",overflow:"hidden",whiteSpace:"nowrap"}}>
                    {text}

                </div>
            </div>
        );
    }

}