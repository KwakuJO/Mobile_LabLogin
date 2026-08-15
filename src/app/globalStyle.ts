import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        gap: 40
    },
    h1: {
        textAlign: "center",
        fontSize: 30,
        color: "rgb(20,20,20)"
    },
    p: {
        textAlign: "center",
        fontSize: 15,
        marginTop: 10
    },
    button: {
        width: "100%",
        height: "7%",
        backgroundColor: "rgb(100, 180, 255)",
        borderRadius: 20,
        justifyContent: "center",
        margin: 20
    },
    inputsContainer: {
        alignItems: "center",
        width: "100%",
        gap: 20
    },
    textInput: {
        backgroundColor: "white",
        borderRadius: 15,
        fontSize: 20,
        width: "100%",
        height: 50,
        textAlign:"center"
    },
    submit: {
        width: "100%",
        height: 50,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(100, 180, 255)",
    },
    loading: {
        flex: 1,
        justifyContent: "center",
    }
});

export default styles;