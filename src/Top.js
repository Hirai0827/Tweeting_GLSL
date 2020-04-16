import React, {Component} from "react";
import "./Top.css";
import {Grid} from "@material-ui/core";

import {GLSLController} from "./GLSLController";

export class Top extends Component{
    constructor(props) {
        super(props);
        this.state={
            isDescriptionIOpen:false
        }
        this.openInstruction = this.openInstruction.bind(this);

    }

    openInstruction(){
        this.setState({isDescriptionOpen:!this.state.isDescriptionOpen});
        console.log("clicked");

        let target = document.getElementById("description");
        if(this.state.isDescriptionOpen){
            target.classList.add("Open");
        }else{
            target.classList.remove("Open");
        }
    }

    render() {
        return (
            <div>
                <BackGround/>
                <div style={{textAlign:"center"}}>
                    <div className={"TopFrame"} style={{backgroundColor:"#FF0461",transformOrigin:"bottom right"}} id={"description"}>
                        <div style={{textAlign:"right", fontSize:"20px",fontWeight:"bold",color:"white"}}>
                            <div style={{fontSize:"28px"}}>
                                EasyMode Uniforms
                            </div>
                            p = (FragCoord/resolution) <br/>
                            R = resolution <br/>
                            F = FragCoord <br/>
                            t = time <br/>
                            o = FragColor <br/>
                            <br/>
                            <div style={{fontSize:"28px"}}>
                                Using packages
                            </div>
                            <a href="https://github.com/securingsincity/react-ace" target="_blank" style={{color:"white"}}>react-ace</a><br/>
                            <a href="https://material-ui.com/" target="_blank" style={{color:"white"}}>material-ui</a><br/>
                            <a href="https://github.com/antimatter15/jsgif" target="_blank" style={{color:"white"}}>jsgif</a><br/>
                            <br/>
                            <div style={{fontSize:"28px"}}>
                            Presented by
                        </div>
                            <a href="https://twitter.com/lucknknock" target="_blank" style={{color:"white"}}>避雷(@lucknknock)</a>
                        </div>
                    </div>
                    <div className={"TopFrame"}>
                        <div className={"TopEditorFrame"}>
                            <Grid container>
                                <Grid item xs={2} style={{textAlign:"left"}}>
                                    <img src="icon.png" alt="" width={80}/>
                                </Grid>
                                <Grid item xs={8}>
                                    <div style={{textAlign:"left",fontSize:"32px",fontWeight:"bold"}}>つぶやきGLSL</div>
                                    <div style={{textAlign:"left",fontSize:"24px",color:"gray"}}>@tweeting_GLSL</div>
                                </Grid>
                                <Grid item xs={2} style={{textAlign:"right"}}>

                                    <img src="info.png" alt="" style={{width:"32px"}} onClick={this.openInstruction}/>
                                </Grid>
                            </Grid>
                            <div style={{height:25}}/>
                            <GLSLController/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class BackGround extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={"TopBackGround"}>

            </div>
        );
    }

}