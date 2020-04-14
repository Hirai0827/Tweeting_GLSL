import React, {Component} from "react";
import {GLSLEditor} from "./GLSLEditor";
import {GLSLPreview} from "./GLSLPreview";
import {GLSLPost} from "./GLSLPost";

export class GLSLController extends Component{
    constructor(props) {
        super(props);
        let frag =
            "#define PI 3.1415\n" +
            "o=vec4(uv.x,uv.y,sin(t*PI)*0.5+0.5,1.0);\n";
        this.state = {
            frag
        }
        this.changeFrag = this.changeFrag.bind(this);
    }

    changeFrag(val){
        this.setState({frag:val});
        //console.log(this.state.frag);
    }

    render() {
        return (
            <div>
                <GLSLEditor frag={this.state.frag} changeFrag={this.changeFrag}/>
                <div style={{height:"32px"}}></div>
                <GLSLPreview frag={this.state.frag}/>
                <GLSLPost frag={this.state.frag}/>
            </div>
        );
    }

}