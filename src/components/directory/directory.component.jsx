import React, { Component } from 'react';

import './directory.styles.scss';

import sections from '../../data/shop.data';
import MenuItem from '../menu-item/menu-item.component';

class Directory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sections: sections
        };
    }

    render() {
        return(
            <div className="directory-menu">
               {
                   this.state.sections.map(({ id, title, ...otherSectionProps}) => <MenuItem key={id} title={title.toUpperCase()} {...otherSectionProps} />)
               }
            </div>
        )
    }
}
export default Directory;