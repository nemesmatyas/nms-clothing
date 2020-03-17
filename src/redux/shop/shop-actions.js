import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: 'FETCH_COLLECTIONS_START'
})

export const fetchCollectionsSuccess = collectionsMap => ({
    type: 'FETCH_COLLECTIONS_SUCCESS',
    payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: 'FETCH_COLLECTIONS_FAILURE',
    payload: errorMessage
})

/**
 * Thunk: an action creator, that returns a function that gets the dispatch (similar to mapDispatchToProps)
 * Instead of returning an object, it returns a function, that returns another function, that gets dispatch in it
 */
export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());

        collectionRef.get()
        .then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        })
        .catch(error => dispatch(fetchCollectionsFailure(error.message)))
    }
}