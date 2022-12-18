import React, { Component } from 'react';
import styled from 'styled-components';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { Header, Footer } from '~/components/home'
import { AuthActions } from '~/store/actions/auth';
import { RootState } from '~/store/reducers';
import { AuthState } from '~/store/reducers/auth';
import {Content} from "~/components/home";
// import { PAGE_PATHS } from '~/constants';

const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
    width: 0px;
    height: 0px;
    background-color: #aaeb33;
`
interface Props {
    authActions: typeof AuthActions;
    authState: AuthState; 
}

class HomeContainer extends Component<Props> {

    render() {

        return(
            <Wrapper>

                <Header/>
                <Content/>
                <Footer/>

            </Wrapper>
        )
    }
}
const mapStateToProps = (state: RootState) => ({
    authState: state.auth,
});


const mapDispatchToProps = (dispatch: Dispatch) => ({
    authActions: bindActionCreators(AuthActions, dispatch),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer);