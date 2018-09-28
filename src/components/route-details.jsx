import React from 'react';

export const RouteDetails = (props) => {

    return (

        <div style={{ margin: '10%', paddingTop: '5%' }} >
            <p>
                <span style={{ fontSize: '1.5em' }} >Total distance: </span>
                <span style={{ fontWeight: "bold", fontSize: '1.5em' }}>{props.total_distance}</span>
            </p>
            <p>
                <span style={{ fontSize: '1.5em' }}>Total Time: </span>
                <span style={{ fontWeight: "bold", fontSize: '1.5em' }}>{props.total_time}</span>
            </p>
        </div>
    )
}

