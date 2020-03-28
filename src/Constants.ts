import {SERVER_BASE_URL} from "./Settings";

export let BUS_STOP_TRAFFIC_URL = '{base_url}/traffic/busroute/{bus_num}'.replace('{base_url}', SERVER_BASE_URL);
export let BUS_ROUTE_URL = '{base_url}/route/{start_coordinates_lon}/{start_coordinates_lat}/{end_coordinates_lon}/{end_coordinates_lat}'.replace('{base_url}', SERVER_BASE_URL);

export let TBILISI_COORDINATES_CENTER = [4987528.98, 5121224.22];

