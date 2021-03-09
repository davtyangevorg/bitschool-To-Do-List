import myFetch from '../Api/myFetch.js'

//const SEND_CONTACT_MESSAGE='to-do-list/contactReducer/SEND_CONTACT_MESSAGE'
const apiHost=process.env.REACT_APP_API_HOST

const initalState={

}

const contactReducer=(state=initalState,action)=>{
    switch (action.type) {
        default:{
            return state
        }
    }
}

export default contactReducer

export const sendMessage = (data) => {
    return dispatch => {
        myFetch(`${apiHost}/form`,'POST',data)
            .then(res => {
                console.log(res)
            })
    }
}