import React, {Component} from "react";
import {Switch,FormControlLabel} from "@material-ui/core";

export class GLSLOptions extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <FormControlLabel control={<Switch checked={this.props.isEasyMode} onChange={this.props.changeIsEasyMode}/>} label={"EasyMode"}/>
                <FormControlLabel control={<Switch checked={this.props.isLDOn} onChange={this.props.changeIsLDOn}/>} label={"Loop Detection(alpha)"}/>

            </div>
        );
    }

}