import React, {Component} from "react";
import {GLSLEditor} from "./GLSLEditor";
import {GLSLPreview} from "./GLSLPreview";
import {GLSLPost} from "./GLSLPost";
import {GLSLOptions} from "./GLSLOptions";
import {GLSLErrorLog} from "./GLSLErrorLog";

export class GLSLController extends Component{
    constructor(props) {
        super(props);
        let frag =
            "#define PI 3.1415\n" +
            "o=vec4(p.x,p.y,sin(t*PI)*0.5+0.5,1.0);\n";
        this.state = {
            frag,
            isGenBegin:false,
            currentGenFrame:0,
            isEasyMode:true,
            isLDon:false,
            errorLog:""
        }
        this.changeFrag = this.changeFrag.bind(this);
        this.changeIsGenBegin = this.changeIsGenBegin.bind(this);
        this.changeCurrentGenFrame = this.changeCurrentGenFrame.bind(this);
        this.changeIsEasyMode = this.changeIsEasyMode.bind(this);
        this.changeErrorLog = this.changeErrorLog.bind(this);
        this.changeIsLDOn = this.changeIsLDOn.bind(this);
    }

    changeFrag(val){
        this.setState({frag:val});
        //console.log(this.state.frag);
    }
    changeIsGenBegin(val){
        this.setState({isGenBegin:val});
    }
    changeCurrentGenFrame(val){
        this.setState({currentGenFrame:this.state.currentGenFrame + val});
    }
    changeIsEasyMode(){
        this.setState({isEasyMode:!this.state.isEasyMode});
    }
    changeErrorLog(val){
        this.setState({errorLog:val});
    }
    changeIsLDOn(){
        this.setState({isLDOn:!this.state.isLDOn});
    }


    render() {
        return (
            <div>
                <GLSLEditor frag={this.state.frag} changeFrag={this.changeFrag}/>
                <div style={{height:"16px"}}></div>
                <GLSLErrorLog errorLog={this.state.errorLog}/>
                <GLSLOptions isEasyMode={this.state.isEasyMode} changeIsEasyMode={this.changeIsEasyMode} isLDOn={this.state.isLDOn} changeIsLDOn={this.changeIsLDOn}/>
                <div style={{height:"16px"}}></div>
                <GLSLPreview frag={this.state.frag} isGenBegin={this.state.isGenBegin} currentGenFrame={this.state.currentGenFrame} isEasyMode={this.state.isEasyMode} changeErrorLog={this.changeErrorLog}/>
                <div style={{height:"32px"}}></div>
                <GLSLPost frag={this.state.frag} changeIsGenBegin={this.changeIsGenBegin} changeCurrentGenFrame={this.changeCurrentGenFrame} isLDOn={this.state.isLDOn}/>
            </div>
        );
    }

}