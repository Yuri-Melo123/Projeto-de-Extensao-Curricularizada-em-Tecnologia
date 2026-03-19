import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstagram } from "../store/analyticsSlice";

import { LineChart, BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function Dashboard() {
  const dispatch = useDispatch();
  const { instagram, loading } = useSelector((state) => state.analytics);

  // 🚀 Evita loop infinito
  useEffect(() => {
    if (!instagram) {
      dispatch(fetchInstagram());
    }
  }, []);

  // ⏳ Tela de carregamento segura
  if (loading || !instagram) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  const posts = instagram.posts || [];

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        📊 Dashboard
      </Text>

      {/* 📌 Métricas principais */}
      <Text style={{ marginTop: 10 }}>
        👥 Seguidores: {instagram.followers}
      </Text>
      <Text>
        ❤️ Engajamento: {instagram.engagement}%
      </Text>

      {/* 📈 Crescimento de seguidores */}
      <Text style={{ marginTop: 20 }}>
        📈 Crescimento de Seguidores
      </Text>

      <LineChart
        data={{
          labels: ["Jan", "Fev", "Mar", "Abr"],
          datasets: [
            {
              data: [
                instagram.followers - 300,
                instagram.followers - 200,
                instagram.followers - 100,
                instagram.followers,
              ],
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#1E2923",
          backgroundGradientTo: "#08130D",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 255, 136, ${opacity})`,
        }}
        style={{ borderRadius: 10 }}
      />

      {/* 📊 Likes por post */}
      <Text style={{ marginTop: 20 }}>
        👍 Likes por Post
      </Text>

      <BarChart
        data={{
          labels: posts.map((_, i) => `P${i + 1}`),
          datasets: [
            {
              data: posts.map((p) => p.likes || 0),
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#000",
          backgroundGradientTo: "#222",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
        }}
        style={{ borderRadius: 10 }}
      />

      {/* 💬 Comentários */}
      <Text style={{ marginTop: 20 }}>
        💬 Comentários por Post
      </Text>

      <BarChart
        data={{
          labels: posts.map((_, i) => `P${i + 1}`),
          datasets: [
            {
              data: posts.map((p) => p.comments || 0),
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#111",
          backgroundGradientTo: "#333",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
        }}
        style={{ borderRadius: 10 }}
      />
    </ScrollView>
  );
}