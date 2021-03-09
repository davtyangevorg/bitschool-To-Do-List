import myFetch from '../Api/myFetch.js'

//const SEND_CONTACT_MESSAGE='to-do-list/contactReducer/SEND_CONTACT_MESSAGE'

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
        myFetch(`http://localhost:3001/form`,'POST',data)
            .then(res => {
                console.log(res)
            })
    }
}
