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
  const { id } = route.params;
  const [voteDetails, setVoteDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resumeExpanded, setResumeExpanded] = useState(false);

  useEffect(() => {
    const fetchVoteDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://oda.ft.dk/api/Afstemning(${id})?$expand=Sagstrin,Sagstrin/Sag`
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
  }, [id]);

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

  const conclusion = voteDetails?.konklusion || "";
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
    (() => {
      if (voteDetails?.typeid === 1) {
        return voteDetails?.Sagstrin?.Sag?.titel;
      }
      if (voteDetails?.typeid === 3) {
        return voteDetails?.Sagstrin?.Sag?.titelkort;
      }
      return null;
    })() ?? "Ukendt Titel";

  const displayResume =
    (() => {
      if (voteDetails?.typeid === 1) {
        return voteDetails?.Sagstrin?.Sag?.resume;
      }
      if (voteDetails?.typeid === 3) {
        return voteDetails?.Sagstrin?.Sag?.titel;
      }
      return null;
    })() ?? "Ukendt Titel";

  const displayKonklusion = voteDetails?.konklusion ?? "Ingen konklusion";

  const displayOpdateringsdato = voteDetails?.opdateringsdato;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{displayTitle}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Resume:</Text>
        <View style={{ flex: 1 }}>
          <Text
            style={styles.value}
            numberOfLines={resumeExpanded ? undefined : 5}
            ellipsizeMode="tail"
          >
            {displayResume}
          </Text>
          {displayResume.length > 200 && (
            <TouchableOpacity
              onPress={() => setResumeExpanded(!resumeExpanded)}
            >
              <Text style={styles.expandedText}>
                {resumeExpanded ? "Vis mindre ▲" : "Vis mere ▼"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
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

      <VoteResultChart ja={ja} nej={nej} uden={uden} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => saveFavorite(voteDetails)}
      >
        <Text style={styles.buttonText}>Gem afstemning</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default VoteInformationScreen;
