import stationData from "/public/data/station_coordinate.json";
import { calculateDistance } from "./distance"

const subwayColor = {
    "1호선": "#0052A4",
    "2호선": "#00A84D",
    "3호선": "#EF7C1C",
    "4호선": "#00A5DE",
    "5호선": "#996CAC",
    "6호선": "#CD7C2F",
    "7호선": "#747F00",
    "8호선": "#E6186C",
    "9호선": "#BDB092",
    "경강선": "#003DA5",
    "경의중앙선": "#77C4A3",
    "경춘선": "#0C8E72",
    "공항철도": "#0090D2",
    "김포도시철도": "#AD8605",
    "서해선": "#81A914",
    "수인분당선": "#F5A200",
    "신분당선": "#D4003B",
    "용인경전철": "#509F22",
    "우이신설경전철": "#B7C452",
    "의정부경전철": "#FDA600",
    "인천1호선": "#7CA8D5",
    "인천2호선": "#ED8B00",
}

export const findNearestStation = (lat, lon) => {
    var nearest = null;
    var minDistance = Infinity;

    for (const station of stationData) {
        var distance = calculateDistance(lat, lon, station.lat, station.lng);
        if (distance < minDistance) {
            nearest = station;
            minDistance = distance;
        }
    }

    nearest.distance = minDistance;
    nearest.color = subwayColor[nearest.line];
    return nearest;
}