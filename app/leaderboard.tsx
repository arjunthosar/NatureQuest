import { useLocalSearchParams } from "expo-router"
import React from "react"
import { StyleSheet, Text, View, ScrollView } from "react-native"

export default function Leaderboard() {
    const points = useLocalSearchParams().points
    const realPlayers = [
        { name: "You", score: points },
        { name: "Sana", score: 18 },
        { name: "Rayyan", score: 17 },
        { name: "Amina", score: 15 },
        { name: "Ali", score: 14 },
    ]

    const fakePlayers = [
        { name: "TreeSniffer21", score: 16 },
        { name: "GrassGoddess", score: 13 },
        { name: "LeafyBoi", score: 12 },
        { name: "FernWarrior", score: 11 },
        { name: "OutdoorLover", score: 10 },
    ]

    const allPlayers = [...realPlayers, ...fakePlayers]
    const sortedPlayers = allPlayers.sort(
        (a, b) => (b.score as number ?? 0) - (a.score as number ?? 0)
    )

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>🌿 Final Leaderboard 🌿</Text>
            {sortedPlayers.map((player, index) => (
                <View key={index} style={styles.row}>
                    <Text style={styles.rank}>{index + 1}.</Text>
                    <Text style={[styles.name, player.name === "You" && styles.you]}>
                        {player.name}
                    </Text>
                    <Text style={styles.score}>
                        {player.score !== null ? `${player.score} pts` : "-"}
                    </Text>
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 25,
        backgroundColor: "#F3FAEF",
        flexGrow: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30,
        color: "#2E7D32",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2,
    },
    rank: {
        fontSize: 18,
        fontWeight: "600",
        color: "#555",
    },
    name: {
        flex: 1,
        fontSize: 18,
        marginLeft: 12,
        color: "#333",
    },
    score: {
        fontSize: 18,
        fontWeight: "600",
        color: "#2E7D32",
    },
    you: {
        fontWeight: "bold",
        color: "#1B5E20",
    },
})
