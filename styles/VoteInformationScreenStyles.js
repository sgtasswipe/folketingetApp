import { StyleSheet } from "react-native";

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

export default styles;
