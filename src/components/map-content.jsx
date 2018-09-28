import React from 'react'
import { maps } from '../services/maps'
import '../assets/map-content.css'
//this component renders the map
export default class MapContent extends React.Component {
    mapContainer;
    map;
    maps;
    static defaultProps = {
        maps
    };

    initMap = async () => {
        this.maps = await this.props.maps();

        this.map = new this.maps.Map(this.mapContainer, {
            zoom: 11,
            center: { lat: 22.372081, lng: 114.107877 }
        });
    };


    preparePositionsFromPath = path => {
        return path.map(([lat, lng]) => new this.maps.LatLng(lat, lng));
    };

    /**
     * @description Plot the received points on map as route directions
     * @param Object Response object returned from the Api containing the path points
     */
    drawDirections = ({ path }) => {
        const directionsService = new this.maps.DirectionsService();
        const directionsRenderer = new this.maps.DirectionsRenderer();

        directionsRenderer.setMap(this.map);

        const positions = this.preparePositionsFromPath(path);
        const waypoints = positions
            .slice(1, positions.length - 1)
            .map(location => ({ location, stopover: false }));

        // request for the google map directions api
        const request = {
            origin: positions[0],
            destination: positions[positions.length - 1],
            waypoints,
            optimizeWaypoints: true,
            travelMode: this.maps.TravelMode.DRIVING
        };

        // get the route from directionService and then plot with the help of directionsRenderer
        directionsService.route(request, (response, status) => {
            if (status === this.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
            } else {
                alert('Error in direction service response');
            }
        });
    };

    componentDidMount() {
        this.initMap();
    }

    getSnapshotBeforeUpdate() {
        const { directions } = this.props;
        if (directions) {
            this.drawDirections(directions);
        }
        else {
            return null;
        }
    }

    componentDidUpdate() { }

    render() {
        return (
            <div className='mapcontainer'>

                <div className='mapcontainerinner' ref={el => (this.mapContainer = el)} />
            </div>
        );
    }
}


