import React from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";

const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Om Afstemningsdata</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Afstemningstype (typeId)</Text>
        <Text style={styles.text}>
          En numerisk kode, som angiver hvilken type afstemning der er tale om:
          {"\n"}• 1 – Lovforslag
          {"\n"}• 2 – Beslutningsforslag
          {"\n"}• 3 – Forespørgsel m.m.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Partiforkortelser</Text>
        <Text style={styles.text}>
          I andre datafelter, fx stemmeoplysninger, vil du kunne se forkortelser som "S", "V", "Ø", osv. som står for partier:
          {"\n"}• A – Socialdemokratiet
          {"\n"}• V - Venstre
          {"\n"}• DD - Danmarksdemokraterne
          {"\n"}• SF - Socialistisk Folkeparti
          {"\n"}• LA - Liberal Alliance
          {"\n"}• M - Moderaterne
          {"\n"}• KF - Det Konservative Folkeparti
          {"\n"}• EL - Enhedslisten
          {"\n"}• DF - Dansk Folkeparti
          {"\n"}• RV - Radikale Venstre
          {"\n"}• ALT - Alternativet
          {"\n"}• BP - Borgerens Parti
          {"\n"}• UFG - Uden for gruppe
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Møde ID (mødeid)</Text>
        <Text style={styles.text}>
          ID'et på det folketingsmøde, hvor afstemningen fandt sted. Det bruges til at spore hvilken dag og kontekst afstemningen blev gennemført i.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Nummer</Text>
        <Text style={styles.text}>
          Nummeret på afstemningen i databasen – bruges som en slags indeks for rækkefølgen.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Konklusion</Text>
        <Text style={styles.text}>
          En kort tekst, som forklarer resultatet og betydningen af afstemningen. Vises normalt sammen med vedtaget/ikke vedtaget.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Opdateringsdato</Text>
        <Text style={styles.text}>
          Datoen hvor afstemningen sidst blev opdateret i systemet. Dette kan være forskelligt fra selve mødedatoen.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 19,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#a6192e',
    marginBottom: 16,
    textAlign: 'center',
    paddingTop: 25,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#a6192e',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  text: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});

export default AboutScreen;
