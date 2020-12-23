import axios from 'axios';
import { Platform } from 'react-native';

const ANALYSIS_WAITING = "imgAnalysis/ANALYSIS_WAITING";
const ANALYSIS_SUCCESS = "imgAnalysis/ANALYSIS_SUCCESS";
const ANALYSIS_FAILURE = "imgAnalysis/ANALYSIS_FAILURE";

export const analysisWaiting = () => ({ type: ANALYSIS_WAITING });
export const analysisSuccess = (titles) => ({ type: ANALYSIS_SUCCESS, payload: titles });
export const analysisFailure = () => ({ type: ANALYSIS_FAILURE });

const titles = [ 
    {
        id: "0",
        title: "과목1",
    },
    {
        id: "1",
        title: "과목2",
    },
    {
        id: "2",
        title: "과목3",
    },
    {
        id: "3",
        title: "과목4",
    },
    {
        id: "4",
        title: "과목5",
    },
    {
        id: "5",
        title: "과목6",
    },
];

const createFormData = (uri, base64) => {
    const data = new FormData();

    data.append("file", {
        name: "transfer_img",
        uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
        data: base64,
        type: "image/*",
    });

    return data
}

export function requestAnalyzing(uri, base64){
    
    return async (dispatch) => {
        dispatch(analysisWaiting());
        
        const transfering_img = createFormData(uri, base64)

        return axios.post("http://172.30.1.26:8000/tireco/", { file: transfering_img }).then(
            (response) => {
                console.log("통신 성공 : ", response.data.titles);
                dispatch(analysisSuccess(response.data.titles));
            }
        ).catch((error) => {
            console.log("통신 실패 : ", error.error);
            dispatch(analysisFailure());
        });

    }
}

const initialState = {
    analysisState: "none",
    isWorking: false,
    isSuccess: false,
    titles: [],
}
export default function imgAnalysis(state = initialState, action){
    switch(action.type){
        case ANALYSIS_WAITING:
            return {
                ...state,
                analysisState: "waiting",
                isWorking: true,
                isSuccess: false,
                titles: state.titles.splice(0, 0)
            };
        case ANALYSIS_SUCCESS:
            return {
                ...state,
                analysisState: "success",
                isWorking: false,
                isSuccess: true,
                titles: state.titles.concat(action.payload) 
            };
        case ANALYSIS_FAILURE:
            return {
                ...state,
                analysisState: "failure",
                isWorking: false,
                isSuccess: false,
                titles: state.titles.splice(0, 0)
            }
        default:
            return state;
    }
}
