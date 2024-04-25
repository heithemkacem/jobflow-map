import React, { useRef, useState, useCallback, useMemo } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MapView, { Circle, PROVIDER_GOOGLE, Region } from "react-native-maps";
import useSupercluster from "use-supercluster";
import MarkerWithWrapper from "@/components/MarkerWithWrapper";
import jobs from "@/constants/jobs.json";
import type { BBox, GeoJsonProperties } from "geojson";
import type { PointFeature } from "supercluster";
import { SearchJobAdRo } from "@/models";
import throttle from "lodash.throttle"; // Import throttle
const DEFAULT_MAP_LOCATION = {
  lat: 52.5067296,
  lng: 13.2599281,
};
const THROTTLE_INTERVAL = 200;
export interface PointProperties {
  cluster: boolean;
  color: string;
  job: any;
  searchJobAd: SearchJobAdRo;
}

export type PointWithProperties = PointFeature<
  GeoJsonProperties & PointProperties
>;

const calculateDeltas = (latitude: number, radius: number) => {
  const earthRadius = 6371; // Earth's radius in kilometers
  const distanceRadians = (radius * 2) / earthRadius;
  const latDelta = distanceRadians * (180 / Math.PI);
  const lonDelta = latDelta / Math.cos((latitude * Math.PI) / 180);
  return { latDelta, lonDelta };
};

const regionToBoundingBox = (region: Region): BBox => {
  const longitudeDelta =
    region.longitudeDelta < 0
      ? region.longitudeDelta + 360
      : region.longitudeDelta;
  return [
    region.longitude - longitudeDelta,
    region.latitude - region.latitudeDelta,
    region.longitude + longitudeDelta,
    region.latitude + region.latitudeDelta,
  ];
};

const App = () => {
  const mapRef = useRef<MapView>(null);
  const [bounds, setBounds] = useState<BBox | undefined>(undefined);
  const [zoom, setZoom] = useState<number>(10);

  const { latDelta, lonDelta } = useMemo(() => {
    return calculateDeltas(DEFAULT_MAP_LOCATION.lat, 75);
  }, []);

  const searchResultJobAds = useMemo(() => {
    return jobs.searchJobAds.slice(0, 300);
  }, []); // Memoize the initial data

  const points = useMemo(
    () => {
      return searchResultJobAds.map((searchJobAd) => {
        return {
          type: "Feature",
          properties: {
            cluster: false,
            color: "blue",
            job: searchJobAd.jobAd,
            searchJobAd,
          },
          geometry: {
            type: "Point",
            coordinates: [
              searchJobAd.primaryLocation.location.lng,
              searchJobAd.primaryLocation.location.lat,
            ],
          },
        } as PointWithProperties;
      });
    },
    [searchResultJobAds] // Ensure the memoization considers the right dependencies
  );

  const onRegionChangeComplete = useCallback(
    throttle((region: Region) => {
      setBounds(regionToBoundingBox(region));
      mapRef.current?.getCamera().then((camera) => {
        setZoom(camera?.zoom ?? 10);
      });
    }, THROTTLE_INTERVAL),
    [] // No dependencies since this is callback and throttle initialization
  );

  const { clusters } = useSupercluster({
    points,
    bounds,
    zoom,
    options: {
      radius: 75,
      maxZoom: 25,
    },
  });

  const renderMarkers = useMemo(
    () =>
      clusters
        .filter((cluster) => !cluster.properties.cluster) // Filter out clusters
        .map((point) => (
          <MarkerWithWrapper
            key={point.properties.searchJobAd.combinedId}
            point={point as PointWithProperties} // Explicitly cast to PointWithProperties
            isSelected={false}
            onPointPress={() => Alert.alert("Clicked on point!")}
            zoom={zoom}
          />
        )),
    [clusters] // Only recompute if clusters change
  );

  return (
    <View style={styles.container}>
      <MapView
        rotateEnabled={false} // Disable map rotation
        pitchEnabled={false} // Disable pitch/tilt
        zoomControlEnabled={false} // Disable zoom controls (if not needed)
        scrollEnabled={true} // Keep basic map navigation
        zoomEnabled={true} // Allow zooming in and out
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: DEFAULT_MAP_LOCATION.lat,
          longitude: DEFAULT_MAP_LOCATION.lng,
          latitudeDelta: latDelta,
          longitudeDelta: lonDelta,
        }}
        onRegionChangeComplete={onRegionChangeComplete}
        showsUserLocation={true}
      >
        <Circle
          center={{
            latitude: DEFAULT_MAP_LOCATION.lat,
            longitude: DEFAULT_MAP_LOCATION.lng,
          }}
          radius={1000 * 50}
          strokeWidth={2}
          strokeColor="blue"
        />
        {renderMarkers}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default App;
