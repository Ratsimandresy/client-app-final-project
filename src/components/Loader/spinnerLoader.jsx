import React from 'react';
import {Loader, Dimmer} from 'semantic-ui-react';

import "../../styles/SpinnerLoader.css";

const SpinnerLoader = () => {
    return (
        <div className="spinner-loader">
            <Dimmer active>
                <Loader content='Loading' />
            </Dimmer>
        </div>
    )
}

export default SpinnerLoader;
