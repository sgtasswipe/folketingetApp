import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/VoteInformationScreenStyles";
import { formatDate } from "../utilities/dateFormatter";
import { saveFavorite } from "../utilities/fireStoreFunctions";
import VoteResultChart from "../components/VoteResultChart";

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

    const jaMatch = conclusion.match(/For stemte (\d+)/i);
    const nejMatch = conclusion.match(/Imod stemte (\d+)/i);
    const udenMatch = conclusion.match(/hverken for eller imod stemte (\d+)/i);

    const ja = jaMatch ? parseInt(jaMatch[1], 10) : 0;
    const nej = nejMatch ? parseInt(nejMatch[1], 10) : 0;
    const uden = udenMatch ? parseInt(udenMatch[1], 10) : 0;

    return { ja, nej, uden };
  };

  const conclusion = voteDetails?.konklusion || item?.konklusion || "";
  const { ja, nej, uden } = parseVotesFromConclusion(conclusion);

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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => saveFavorite(item)}
      >
        <Text style={styles.buttonText}>Gem</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{displayTitle}</Text>

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

      <VoteResultChart ja={ja} nej={nej} uden={uden} />
    </ScrollView>
  );
};

export default VoteInformationScreen;
