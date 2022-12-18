import React, { Component } from 'react';
import styled from 'styled-components';
import ProgressBar from "@ramonak/react-progress-bar";

const Wrapper = styled.footer`
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    min-height: 125px;
    max-height: 200px;
    overflow: auto;
    padding: 6px;
    z-index: 0;
    margin-bottom:25px;
    background-color: #eeeeee;
    & form {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
        & textarea, button {
            display: inline-block;
            border: none;
            outline: none;
        }
        & textarea {
            width: 100%;
            resize: none;
            height: 100%;
            min-height:110px;
            margin: 0;
            padding: 10px 10px;
            font-size:25px;
        }
        & button {
            font-size: 30px;
            width: 100px;
            height: 110px;
            background: #ffeb33;
            margin-left:10px;
            &.canSubmit {
                cursor: pointer;
                pointer-events: all;
                color: #000;
            }
            &.cannotSubmit {
                pointer-events: none;
                color: #b4b4b4;
            }
        }
    }
    
`;

interface Props {
    // chatActions: typeof ChatActions;
    // profileActions: typeof ProfileActions;
    // userActions: typeof UserActions;
    percent:number;
}
// class ChattingRoomContainer extends Component<Props> {
class Progress extends Component<Props> {
    // console.log(percentTo);

    state = {
        percent: 0
    }
    constructor(props: Props) {
        super(props);
        this.state = {
            percent : this.props.percent
        }
    }
    changePercent = (newPercent : number) => {
        this.setState({
            percent:newPercent
        });

    }

    componentDidUpdate(prevProps : Props){
        if (this.props.percent !== prevProps.percent) {
            // console.log('업뎃?',prevProps,prevState,this.props.percent); 
            this.setState({
                ...this.state,
                percent : this.props.percent
           });
        }
              
            }
    render() {

        return (
            <Wrapper>
                <ProgressBar labelAlignment="right" completed={this.state.percent}/>
            </Wrapper>
        )
    }
}

export default Progress;