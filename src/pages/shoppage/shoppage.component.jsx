import React, { Component } from 'react';

import './shoppage.styles.scss';

import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop-actions';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collectionpage/collectionpage.component';

class ShopPage extends Component  {
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
        });
    }

    render() {
        const { match } = this.props;
        return(
            <div className="shop-page">
                <Route exact path={`${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionID`} component={CollectionPage} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);