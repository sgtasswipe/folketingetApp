import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 150,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#a6192e", // Pale red title
  },
  inputStyle: {
    width: "100%",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#a6192e",
    backgroundColor: "#f5f5f5", // Light gray background
    fontSize: 16,
  },
  buttonStyle: {
    width: "100%",
    padding: 12,
    backgroundColor: "#a6192e",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
