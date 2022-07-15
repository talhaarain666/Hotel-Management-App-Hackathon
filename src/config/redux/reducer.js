const INITIAL_STATE = {
    user:null,
}

export default (state = INITIAL_STATE,action) =>{
if(action.type == "DATAFROMLOGIN"){
    state.user = action.payload
    return {...state};
}
    return state;
}