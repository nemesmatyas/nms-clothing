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
        this.state.sections.map(section => console.log(section));
        return(
            <div className="directory-menu">
               {
                   this.state.sections.map(({ id, title, size, imageUrl, linkUrl}) => <MenuItem key={id} title={title.toUpperCase()} imageUrl={imageUrl} size={size}/>)
               }
            </div>
        )
    }
}
export default Directory;