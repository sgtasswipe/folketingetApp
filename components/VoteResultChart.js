import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/VoteInformationScreenStyles"; // Or create a separate style file for this if you'd like

const VoteResultChart = ({ ja, nej, uden }) => {
  const total = ja + nej + uden || 1; // avoid division by zero

  return (
    <>
      {total > 0 ? (
        <>
          <Text style={styles.chartLabel}>Resultater</Text>
          <View style={styles.chartContainer}>
            <View style={styles.barContainer}>
              {ja > 0 && (
                <View
                  style={[
                    styles.bar,
                    {
                      backgroundColor: "#4CAF50",
                      flex: ja,
                    },
                  ]}
                />
              )}
              {nej > 0 && (
                <View
                  style={[
                    styles.bar,
                    {
                      backgroundColor: "#F44336",
                      flex: nej,
                    },
                  ]}
                />
              )}
              {uden > 0 && (
                <View
                  style={[
                    styles.bar,
                    {
                      backgroundColor: "#BDBDBD",
                      flex: uden,
                    },
                  ]}
                />
              )}
            </View>
          </View>

          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#4CAF50" }]}
              />
              <Text style={styles.legendText}>{ja} Ja</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#F44336" }]}
              />
              <Text style={styles.legendText}>{nej} Nej</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#BDBDBD" }]}
              />
              <Text style={styles.legendText}>{uden} Ingen stemme</Text>
            </View>
          </View>
        </>
      ) : (
        <Text style={styles.chartLabel}>Resultater ikke tilgængelige</Text>
      )}
    </>
  );
};

export default VoteResultChart;
