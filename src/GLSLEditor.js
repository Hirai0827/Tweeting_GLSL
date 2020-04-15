import React, {Component} from "react";


import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-glsl";
import "ace-builds/src-noconflict/theme-monokai";


export class GLSLEditor extends Component{
    constructor(props) {
        super(props);
        this.onGLSLChange = this.onGLSLChange.bind(this);
    }

    onGLSLChange(newVal){
        this.props.changeFrag(newVal);
    }

    render() {
        return (
            <div style={{filter:"drop-shadow(2px 2px 4px)"}}>
                <AceEditor
                mode={"glsl"}
                theme={"monokai"}
                fontSize={20}
                value={this.props.frag}
                style={{width:"100%", height:"250px",borderRadius:"8px"}}
                onChange={this.onGLSLChange}
                />
            </div>
        );
    }

}