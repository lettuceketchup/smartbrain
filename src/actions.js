import {
    CHANGE_IMAGE_URL,
    CHANGE_INPUT,
    REQUEST_FACES_PENDING,
    REQUEST_FACES_SUCCESS,
    REQUEST_FACES_FAILED,
    UPDATE_ENTRIES
} from './constants';

// SET INPUT
export const setInput = (text) => ({
    type: CHANGE_INPUT,
    payload: text
})

// SET IMAGE URL
export const setImageUrl = (input) => ({
    type: CHANGE_IMAGE_URL,
    payload: input
})

// REQUEST FACES
// CALCULATE LOCATIONS
const calculateFaceLocations = (data) => {
    // const faces = data.outputs[0].data.regions
    const faces = data
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    const boxes = [];

    for (let face of faces) {
        // const face = box.region_info.bounding_box;
        boxes.push({
            leftCol: face.left_col * width,
            topRow: face.top_row * height,
            rightCol: width * (1 - face.right_col),
            bottomRow: height * (1 - face.bottom_row),
            hover: false
        })
    }
    return boxes
}

// RETURN THE BOXES/LOCATIONS
const displayFaceBoxes = (resp) => {
    let boxes = [];
    boxes = calculateFaceLocations(resp);
    return {
        type: REQUEST_FACES_SUCCESS,
        payload: boxes
    }
}

// REQUEST THE FACES
export const requestFaces = (hostUrl, imageUrl, user) => (dispatch) => {
    dispatch({ type: REQUEST_FACES_PENDING });
    // console.log(imageUrl);
    fetch(`${hostUrl}imageurl`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            input: imageUrl
        })
    })
        .then(response => response.json())
        .then(response => {
            if (response) {
                fetch(`${hostUrl}image`, {
                    method: 'put',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: user.id
                    })
                })
                    .then(response => response.json())
                    .then(count => {
                        dispatch({ type: UPDATE_ENTRIES, payload: count });
                        // this.setState(Object.assign(user, { entries: count }))
                    })
                    .catch(err => console.log);
            }
            // console.log(response);
            dispatch(displayFaceBoxes(response));
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: REQUEST_FACES_FAILED, payload: err});
        });
}