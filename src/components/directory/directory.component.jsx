import React from 'react';

import './directory.styles.scss';

import { connect } from 'react-redux';
import { selectDirectorySections } from '../../redux/directory/directory-selectors';
import { createStructuredSelector } from 'reselect';

import MenuItem from '../menu-item/menu-item.component';

const Directory = ({ sections }) => {
        return(
            <div className="directory-menu">
               {
                   sections.map(({ id, title, ...otherSectionProps}) => <MenuItem key={id} title={title.toUpperCase()} {...otherSectionProps} />)
               }
            </div>
        )
    }

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);