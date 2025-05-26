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
import { parseVotesFromConclusion } from "../utilities/parseVotesFromConclusion";
import VoteResultChart from "../components/VoteResultChart";

const VoteInformationScreen = ({ route }) => {
  const { id } = route.params;
  const [voteDetails, setVoteDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resumeExpanded, setResumeExpanded] = useState(false);
  const [textIsTruncated, setTextIsTruncated] = useState(false);

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
  }, []);

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
    })() ?? "Ingen Titel";

  const displayResume =
    (() => {
      if (voteDetails?.typeid === 1) {
        return voteDetails?.Sagstrin?.Sag?.resume;
      }
      if (voteDetails?.typeid === 3) {
        return voteDetails?.Sagstrin?.Sag?.titel;
      }
      return null;
    })() ?? "Intet Resume";

  const displayKonklusion = voteDetails?.konklusion ?? "Ingen konklusion";

  const displayOpdateringsdato = voteDetails?.opdateringsdato ?? "Ingen dato";

  const parsedVoteResults = parseVotesFromConclusion(voteDetails?.konklusion);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{displayTitle}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Resume:</Text>
        <View style={{ flex: 1 }}>
          <Text
            onTextLayout={(e) => {
              if (e.nativeEvent.lines.length > 5) {
                setTextIsTruncated(true);
              }
            }}
            numberOfLines={resumeExpanded ? undefined : 5}
          >
            {displayResume}
          </Text>
          {textIsTruncated && (
            <TouchableOpacity
              onPress={() => setResumeExpanded(!resumeExpanded)}
            >
              <Text>{resumeExpanded ? "Vis mindre ▲" : "Vis mere ▼"}</Text>
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

      <VoteResultChart
        //DID YOU GET THE CHANGES OTTO???//
        ja={parsedVoteResults.ja}
        nej={parsedVoteResults.nej}
        uden={parsedVoteResults.uden}
      />

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
