import React, { Component } from 'react';
import { Sidebar, MapContent } from './';
import { RouteDetails } from './route-details'
import { fetchDirections } from '../helpers/map-helper';
import { Loader } from '../loader/loader';
import { Grid, Label } from 'semantic-ui-react';

//this is a wrapper component which calls route-details , sidebar and map
class Directions extends Component {

    constructor() {
        super();

        // initial state
        this.state = {
            directionsResponse: null,
            isLoading: false,
            errorMessage: ''
        };
    }


    getDirections = async (from, to) => {
        this.toggleLoader(true);
        // directions result, if error then show error messgae
        const response = await fetchDirections(from, to).catch(e => {
            this.showErrorMessage('Internal server error');
        });

        this.toggleLoader(false);

        // check for response error
        if (response && response.error) {

            this.showErrorMessage(response.error);
            return;
        }

        // check for directions data, if available then set the data to state
        if (response && response.path) {

            this.setState(() => ({
                directionsResponse: response,
                errorMessage: ''
            }));
        }
    };

    /**
     * @description Hide and show loader
     * @param isLoading Boolean indicating that loader is shown or not
     */
    toggleLoader = isLoading => {
        this.setState(() => ({
            isLoading
        }));
    };

    
    showErrorMessage = message => {
        this.toggleLoader(false);
        this.setState(() => ({
            directionsResponse: null,
            errorMessage: message
        }));

    };

    /**
     * @description Render method of the component
     */
    render() {
        const { directionsResponse, isLoading } = this.state;
        return (
            <div>
                <Loader isLoading={isLoading} />
                <Grid columns={2} divided relaxed stackable>
                    <Grid.Column width={4}>
                        <Sidebar getDirections={this.getDirections} />


                        {directionsResponse && (
                            <RouteDetails {...directionsResponse} />
                        )}
                        {
                            this.state.errorMessage.length > 0 ?
                                (<Label style={{ marginLeft: '10%', fontSize: '1em' }}
                                    color='red'>{this.state.errorMessage}</Label>) : '' //show error message when error occurs
                        }
                    </Grid.Column>

                    <Grid.Column width={12}>

                        <MapContent directions={directionsResponse} />

                    </Grid.Column>
                </Grid>
            </div>

        );
    }
}

export default Directions;
