const LOAD_BEFORE = "imgLoad/LOAD_BEFORE";
const LOAD_SUCCESS = "imgLoad/LOAD_SUCCESS";
const LOAD_FAILURE = "imgLoad/LOAD_FAILURE";

export const loadBefore = () => ({ type: LOAD_BEFORE });
export const loadSuccess = (uri, base64) => ({ type: LOAD_SUCCESS, payload: { uri: uri, base64: base64 } });
export const loadFailure = () => ({ type: LOAD_FAILURE });

const initialState = {
    loadState: "none",
    isLoading: false,
    uri: "",
    base64: "",
};

export default function imgLoad(state = initialState, action){
    switch(action.type){
        case LOAD_BEFORE:
            return {
                ...state,
                loadState: "before",
                isLoading: false,
                uri: "",
                base64: "",
            };
        case LOAD_SUCCESS:
            return {
                ...state,
                loadstate: "success",
                isLoading: true,
                uri: action.payload.uri,
                base64: action.payload.base64,
            };
        case LOAD_FAILURE:
            return {
                ...state,
                loadState: "failure",
                isLoading: false,
                uri: "",
                base64: "",
            };
        default:
            return state
    }
}