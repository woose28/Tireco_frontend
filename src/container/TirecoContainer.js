import React from "react";
import { connect } from "react-redux";
import Tireco from "../component/Tireco";


import { analysisWaiting, analysisSuccess, analysisFailure, requestAnalyzing } from "../store/modules/imgAnalysis";
import { loadBefore, loadSuccess, loadFailure } from "../store/modules/imgLoad";

const TirecoContainer = (props) => {
    const handleLoadSuccess = (uri, base64) => {
        props.loadSuccess(uri, base64);
    }

    const handleLoadFailure = () => {
        props.loadFailure();
    }
    
    const handleRequestAnalyzing = (uri, base64) => {
        props.requestAnalyzing(uri, base64);
    }
    return (
        <Tireco
            isLoading={props.isLoading}
            isWorking={props.isWorking}
            uri={props.uri}
            base64={props.base64}
            isSuccess={props.isSuccess}
            titles={props.titles}
            handleLoadSuccess={handleLoadSuccess}
            handleLoadFailure={handleLoadSuccess}
            handleRequestAnalyzing={handleRequestAnalyzing}
        />
    );
}

const mapStateToProps = (state) => ({
    isLoading: state.imgLoad.isLoading,
    uri: state.imgLoad.uri,
    base64: state.imgLoad.base64,
    isSuccess: state.imgAnalysis.isSuccess,
    titles: state.imgAnalysis.titles,
    isWorking: state.imgAnalysis.isWorking,
});

const mapDispatchToProps = (dispatch) => ({
    loadSuccess: (uri, base64) => { dispatch(loadSuccess(uri, base64)) },
    loadFailure: () => { dispatch(loadFailure()) },
    requestAnalyzing: (uri, base64) => { dispatch(requestAnalyzing(uri, base64)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(TirecoContainer);
