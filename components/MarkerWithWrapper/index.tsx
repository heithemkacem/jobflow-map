import React, { useRef, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Marker, MapMarker } from "react-native-maps";
import { Marker as MarkerMap } from "@/components/Marker";
import { PointWithProperties } from "@/app";

type Props = {
  point: PointWithProperties;
  onPointPress: () => void;
  zoom: number;
};

const MarkerWithWrapper = ({ point, onPointPress, zoom }: Readonly<Props>) => {
  const markerRef = useRef<MapMarker>(null);
  const coordinates = point.geometry.coordinates;

  // Memoize content to avoid recomputation on each render
  const markerContent = useMemo(() => {
    if (zoom < 12) {
      return <View style={styles.redDot} />;
    } else {
      const job = point.properties.job;
      return (
        <MarkerMap
          companyLogo={job.company.logoImg?.variants.min_dim_64_url ?? null}
        />
      );
    }
  }, [zoom, point]); // Dependencies that affect the content

  return (
    <Marker
      ref={markerRef}
      tracksViewChanges={false} // Set to false for performance
      coordinate={{
        latitude: coordinates[1],
        longitude: coordinates[0],
      }}
      onPress={zoom < 12 ? undefined : onPointPress} // Only handle press when zoomed in
    >
      {markerContent}
    </Marker>
  );
};

const styles = StyleSheet.create({
  redDot: {
    width: 10, // Small dot size
    height: 10,
    backgroundColor: "red",
    borderRadius: 5, // Circular shape
  },
});

export default MarkerWithWrapper;
