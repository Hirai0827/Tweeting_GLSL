import React, {Component} from "react";
import "./Top.css";
import {Grid} from "@material-ui/core";

import {GLSLController} from "./GLSLController";

export class Top extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <BackGround/>
                <div style={{textAlign:"center"}}>
                    <div className={"TopFrame"}>
                        <div className={"TopEditorFrame"}>
                            <Grid container>
                                <Grid item xs={2} style={{textAlign:"left"}}>
                                    <img src="icon.png" alt="" width={80}/>
                                </Grid>
                                <Grid item xs={10}>
                                    <div style={{textAlign:"left",fontSize:"32px",fontWeight:"bold"}}>つぶやきGLSL</div>
                                    <div style={{textAlign:"left",fontSize:"24px",color:"gray"}}>@tweeting_GLSL</div>
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