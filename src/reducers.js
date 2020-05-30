import { 
    CHANGE_IMAGE_URL,
    CHANGE_INPUT,
    REQUEST_FACES_PENDING,
    REQUEST_FACES_SUCCESS,
    REQUEST_FACES_FAILED,
    UPDATE_ENTRIES
} from './constants';

// INPUT CHANGE
const initialStateInput = {
    input: '',
}

export const inputChange = (state = initialStateInput, action = {}) => {
    switch(action.type) {
        case CHANGE_INPUT:
            return Object.assign({}, state, {input: action.payload});
        default:
            return state;
    }
}

// IMAGE URL CHANGE
const initialStateImageUrl = {
    imageUrl: ''
}

export const setImageUrl = (state = initialStateImageUrl, action = {}) => {
    switch (action.type) {
        case CHANGE_IMAGE_URL:
            return Object.assign({}, state, { imageUrl: action.payload });
            // return { ...state, imageUrl: action.payload };
        default:
            return state;
    }
}

// REQUEST FACES
const initialStateRequestFaces = {
    boxes: [],
    isPending: false,
    error: ''
}

export const requestFaces = (state = initialStateRequestFaces, action = {}) => {
    switch (action.type) {
        case REQUEST_FACES_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_FACES_SUCCESS:
            return Object.assign({}, state, { boxes: action.payload, isPending: false});
        case REQUEST_FACES_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false});
        default:
            return state;
    }
}

// UPDATE ENTRIES
const initialStateUser = {
    entries: 0
}

export const updateEntries = (state = initialStateUser, action = {}) => {
    switch(action.type) {
        case UPDATE_ENTRIES:
            return Object.assign({}, state, { entries: action.payload });
        default:
            return state;
    }
}