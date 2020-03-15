import React from 'react';

import './shoppage.styles.scss';

import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collectionpage/collectionpage.component';

const ShopPage = ({ match }) => {
    
    return(
        <div className="shop-page">
            <Route exact path={`${match.path}`} component={CollectionsOverview} />
            <Route path={`${match.path}/:collectionID`} component={CollectionPage} />
        </div>
    )
}


export default ShopPage;