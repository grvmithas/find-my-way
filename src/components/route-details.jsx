import React from 'react';
import '../assets/route-details.css'
import { Message } from 'semantic-ui-react'
export const RouteDetails = (props) => {

    return (
        <Message info style={{marginLeft:'5%'}}>
            <div className='div-route-details' >
                <p>
                    <span className='span-label'>Total distance: </span>
                    <span className='span-value'>{props.total_distance}</span>
                </p>
                <p>
                    <span className='span-label'>Total Time: </span>
                    <span className='span-value'>{props.total_time}</span>
                </p>
            </div>
        </Message>
    )
}

