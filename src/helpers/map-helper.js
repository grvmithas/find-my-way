import { restClient } from '../services/backend-api';
import { API_CONSTANTS } from '../config';


const fetchRoute = async token => {
    const url = `${API_CONSTANTS.route}/${token}`;
    const response = await restClient.get(url);
    const { data } = response;

    return data;
};

const fetchToken = async (from, to) => {
    const url = API_CONSTANTS.route;
    const request = {
        from,
        to
    };

    const response = await restClient.post(url, request);

    const { data } = response;

    return data.token;
};


const fetchDirections = async (from, to) => {
    const token = await fetchToken(from, to);
    let result = await fetchRoute(token);

    // if status is 'in progress' then retry the request again
    if (
        result &&
        result.status &&
        result.status.toLowerCase() === 'in progress'
    ) {
        result = await fetchDirections(from, to);
    }

    return result;
};

export { fetchDirections, fetchToken, fetchRoute };
