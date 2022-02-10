import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import Stamen from 'ol/source/Stamen';
import VectorSource from 'ol/source/Vector';
import * as turf from '@turf/turf';
import * as Source from "ol/source";
import * as Layer from "ol/layer";
import { Stroke, Style } from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { getVectorContext } from 'ol/render';
import { getWidth } from 'ol/extent';
export function addFlightToMap(map) {
    const tileLayer = new TileLayer({
        source: new Stamen({
            layer: 'toner',
        }),
    });


    const style = new Style({
        stroke: new Stroke({
            color: '#EAE911',
            width: 2,
        }),
    });

    const flightsSource = new VectorSource({
        attributions:
            'Flight data by ' +
            '<a href="https://openflights.org/data.html">OpenFlights</a>,',
        loader: function () {
            const url = '/DataDir/Flight/flight.json';
            fetch(url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    const flightsData = json.flights;
                    for (let i = 0; i < flightsData.length; i++) {
                        const flight = flightsData[i];
                        const from = flight[0];
                        const to = flight[1];
                        var start = turf.point(from);
                        var end = turf.point(to);
                        var flightGeometry = turf.greatCircle(start, end, { 'name': 'Seattle to DC' });
                        const features = [];
                        const line = new LineString(flightGeometry.geometry.coordinates);
                        // line.transform('EPSG:4326', 'EPSG:3857');
                        let lineFea = new Feature({
                            geometry: line,
                            finished: false,
                        })
                        lineFea.setStyle(new Style({
                            stroke: new Stroke({
                                color: "#555555", //颜色
                                width: 2, //宽度
                            }),
                        }));
                        features.push(lineFea);
                        // flightGeometry.geometry.coordinates.forEach(function (v) {
                        //     const line = new LineString([v]);
                        //     line.transform('EPSG:4326', 'EPSG:3857');

                        //     features.push(
                        //         new Feature({
                        //             geometry: line,
                        //             finished: false,
                        //         })
                        //     );
                        // });
                        // add the features with a delay so that the animation
                        // for all features does not start at the same time
                        // let vectorSource = new Source.Vector({
                        //     features: features,
                        // });
                        // var vectorLayer = new Layer.Vector({
                        //     source: vectorSource,
                        // });
                        // map.addLayer(vectorLayer);
                        addLater(features, i * 50);
                    }
                    tileLayer.on('postrender', animateFlights);
                });
        },
    });

    const flightsLayer = new VectorLayer({
        source: flightsSource,
        style: function (feature) {
            // if the animation is still active for a feature, do not
            // render the feature with the layer style
            if (feature.get('finished')) {
                return style;
            } else {
                return null;
            }
        },
    });

    map.addLayer(flightsLayer);
    map.addLayer(tileLayer)
    const pointsPerMs = 0.02;
    function animateFlights(event) {
        const vectorContext = getVectorContext(event);
        const frameState = event.frameState;
        vectorContext.setStyle(style);

        const features = flightsSource.getFeatures();
        for (let i = 0; i < features.length; i++) {
            const feature = features[i];
            if (!feature.get('finished')) {
                // only draw the lines for which the animation has not finished yet
                const coords = feature.getGeometry().getCoordinates();
                const elapsedTime = frameState.time - feature.get('start');
                if (elapsedTime >= 0) {
                    const elapsedPoints = elapsedTime * pointsPerMs;

                    if (elapsedPoints >= coords.length) {
                        feature.set('finished', true);
                    }

                    const maxIndex = Math.min(elapsedPoints, coords.length);
                    const currentLine = new LineString(coords.slice(0, maxIndex));

                    // animation is needed in the current and nearest adjacent wrapped world
                    const worldWidth = getWidth(map.getView().getProjection().getExtent());
                    const offset = Math.floor(map.getView().getCenter()[0] / worldWidth);

                    // directly draw the lines with the vector context
                    currentLine.translate(offset * worldWidth, 0);
                    vectorContext.drawGeometry(currentLine);
                    currentLine.translate(worldWidth, 0);
                    vectorContext.drawGeometry(currentLine);
                }
            }
        }
        // tell OpenLayers to continue the animation
        map.render();
    }

    function addLater(features, timeout) {
        window.setTimeout(function () {
            let start = Date.now();
            features.forEach(function (feature) {
                debugger
                feature.set('start', start);
                flightsSource.addFeature(feature);
                const duration =
                    (feature.getGeometry().getCoordinates().length - 1) / pointsPerMs;
                start += duration;
            });
        }, timeout);
    }
}