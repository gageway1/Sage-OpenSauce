import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blinkingCursor: {
    height: 30,
    width: StyleSheet.hairlineWidth,
    color: "white",
    backgroundColor: "white",
    position: "absolute",
    zIndex: 1,
    borderColor: "red",
    borderWidth: 1,
  },
  inner: {
    padding: 0,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    marginHorizontal: 5,
    width: "30%",
    height: 50,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#525464",
  },
  inputLabel: {
    color: "white",
    fontSize: 20,
    fontFamily: "Arial",
    marginBottom: 10,
    position: "relative",
  },
  form: {
    position: "relative",
    margin: "auto",
    height: "auto",
    width: "100%",
    zIndex: 0,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 8,
  },
  textArea: {
    backgroundColor: "#40414f",
    fontFamily: "Arial",
    width: "95%",
    height: 120,
    borderRadius: 10,
    borderColor: "#525464",
    borderWidth: 1,
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 16,
    paddingLeft: 16,
    color: "white",
    fontSize: 16,
  },
  textInContainer: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    justifyContent: "center",
  },
  textArrayItem: {
    marginTop: 23,
    marginLeft: 1,
    fontSize: 20,
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  textAreaContainer: {
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    height: 512,
    width: "95%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#525464",
  },
  loadingIndicator: {
    position: "relative",
    top: 200,
    flex: 0,
  },
});
