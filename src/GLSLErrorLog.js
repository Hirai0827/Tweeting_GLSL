import React, {Component} from "react";

export class GLSLErrorLog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let hasError = this.props.errorLog;
        return (
            <div>
                <div style={{lineHeight:"32px",width:"100%",textAlign:"left",backgroundColor:"black",color:(hasError?"pink":"lightgreen"),borderRadius:"4px"}}>
                    {!hasError?"Compile Succeeded!":this.props.errorLog.split("\n")[0]}
                </div>
            </div>
        );
    }

}