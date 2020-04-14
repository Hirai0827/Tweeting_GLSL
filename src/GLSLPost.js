import React, {Component} from "react";
import {Button,Grid} from "@material-ui/core";

export class GLSLPost extends Component{
    constructor(props) {
        super(props);
        this.state = {
            date:new Date()
        }
    }
    componentDidMount() {
        this.si = setInterval(() => {
            this.setState({date:new Date()})
        });
    }
    componentWillUnmount() {
        clearInterval(this.si);
    }

    render() {
        return (
            <div style={{textAlign:"right"}}>
                <Grid container>
                    <Grid item xs={6} style={{textAlign:"left",fontSize:"20px",color:"gray"}}>
                        {this.state.date.toLocaleString()}
                    </Grid>
                    <Grid item xs={4} style={{textAlign:"right",fontSize:"20px"}}>
                        <LimitIndicator textLength={this.props.frag.length}/>
                    </Grid>
                    <Grid item xs={2}>
                        <Button style={{backgroundColor:"teal", color:"white",fontSize:"18px",fontWeight:"bold"}}>
                            投 稿
                        </Button>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

export class LimitIndicator extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={{display:"inline", padding:"5px 5px 5px 5px", fontSize:"18px", fontWeight:"bold"}}>
                {this.props.textLength}/140
            </div>
        );
    }

}