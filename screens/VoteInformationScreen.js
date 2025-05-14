import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { formatDate } from "../utilities/dateFormatter";

const VoteInformationScreen = ({ route }) => {
  const { item } = route.params;
  const [voteDetails, setVoteDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVoteDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://oda.ft.dk/api/Afstemning(${item.id})`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const details = await response.json();
        setVoteDetails(details);
      } catch (e) {
        console.error("Failed to fetch vote details:", e);
        setError("Kunne ikke hente afstemningsdetaljer.");
      } finally {
        setLoading(false);
      }
    };

    fetchVoteDetails();
  }, [item.id]);

  const parseVotesFromConclusion = (conclusion) => {
    if (!conclusion) return { ja: 0, nej: 0, uden: 0 };
    
    console.log("Parsing conclusion:", conclusion);

    // Danish formats:
    // "For stemte X (parties)"
    const jaMatch = conclusion.match(/For stemte (\d+)/i);
    
    // "Imod stemte X (parties)"
    const nejMatch = conclusion.match(/Imod stemte (\d+)/i);
    
    // "hverken for eller imod stemte X"
    let udenMatch = conclusion.match(/hverken for eller imod stemte (\d+)/i);
    
    let udenVal = 0;
    if (udenMatch) {
      udenVal = parseInt(udenMatch[1], 10);
    }

    const ja = jaMatch ? parseInt(jaMatch[1], 10) : 0;
    const nej = nejMatch ? parseInt(nejMatch[1], 10) : 0;
    const uden = udenVal;
    
    console.log("Parsed votes:", { ja, nej, uden });
    
    return { ja, nej, uden };
  };

  // Get votes from either the voteDetails or directly from the item
  const conclusion = voteDetails?.konklusion || item?.konklusion || "";
  const { ja, nej, uden } = parseVotesFromConclusion(conclusion);

  const total = ja + nej + uden || 1; // Default to 1 to avoid division by zero

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#a6192e" />
        <Text>Henter detaljer...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const displayTitle =
    item?.Sagstrin?.Sag?.titel ??
    voteDetails?.Sagstrin?.Sag?.titel ??
    "Ukendt Titel";
  const displayKonklusion =
    voteDetails?.konklusion ?? item?.konklusion ?? "Ingen konklusion";
  const displayOpdateringsdato =
    voteDetails?.opdateringsdato ?? item?.opdateringsdato;
  const displayTypeId = voteDetails?.typeid ?? item?.typeid ?? "N/A";
  const displayMødeId = voteDetails?.mødeid ?? item?.mødeid ?? "N/A";
  const displayNummer = voteDetails?.nummer ?? item?.nummer ?? "N/A";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{displayTitle}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Type ID:</Text>
        <Text style={styles.value}>{displayTypeId}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Møde ID:</Text>
        <Text style={styles.value}>{displayMødeId}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Nummer:</Text>
        <Text style={styles.value}>{displayNummer}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Konklusion:</Text>
        <Text style={styles.value}>{displayKonklusion}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Opdateringsdato:</Text>
        <Text style={styles.value}>
          {displayOpdateringsdato ? formatDate(displayOpdateringsdato) : "N/A"}
        </Text>
      </View>

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#a6192e",
    marginBottom: 16,
    textAlign: "center",
  },
  infoRow: { flexDirection: "row", marginBottom: 12 },
  label: { fontWeight: "600", color: "#333", width: 120 },
  value: { color: "#333", flex: 1, flexWrap: "wrap" },
  chartLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 20,
    marginBottom: 8,
  },
  chartContainer: {
    height: 20,
    marginBottom: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
  },
  barContainer: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
  },
  bar: {
    height: "100%",
  },
  legendContainer: { marginTop: 12 },
  legendItem: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  legendColor: { width: 16, height: 16, marginRight: 8, borderRadius: 4 },
  legendText: { fontSize: 14, color: "#333" },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});

export default VoteInformationScreen;