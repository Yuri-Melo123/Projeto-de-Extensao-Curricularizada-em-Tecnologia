import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { fetchInstagram } from "../store/analyticsSlice";

import {
  LineChart,
  BarChart,
} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function Dashboard() {
  const dispatch = useDispatch();

  const { instagram, loading } = useSelector(
    (state) => state.analytics
  );

  useEffect(() => {
    if (!instagram) {
      dispatch(fetchInstagram());
    }
  }, []);

  // Loading
  if (loading || !instagram) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />

        <Text style={styles.loadingText}>
          Carregando analytics...
        </Text>
      </View>
    );
  }

  const posts = instagram.posts || [];

  // ===== INSIGHTS =====

  const bestPost = posts.reduce(
    (best, current) =>
      current.likes > (best?.likes || 0)
        ? current
        : best,
    null
  );

  const totalLikes = posts.reduce(
    (sum, post) => sum + (post.likes || 0),
    0
  );

  const totalComments = posts.reduce(
    (sum, post) => sum + (post.comments || 0),
    0
  );

  const engagementRate =
    instagram.followers > 0
      ? (
          ((totalLikes + totalComments) /
            instagram.followers) *
          100
        ).toFixed(2)
      : 0;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <Text style={styles.title}>
        📊 Social Analytics Dashboard
      </Text>

      <Text style={styles.subtitle}>
        Instagram Insights • Alpha November
      </Text>

      {/* CARDS */}
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            👥 Seguidores
          </Text>

          <Text style={styles.cardValue}>
            {instagram.followers || 0}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            📸 Posts
          </Text>

          <Text style={styles.cardValue}>
            {instagram.media_count || 0}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            ❤️ Likes
          </Text>

          <Text style={styles.cardValue}>
            {totalLikes}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            💬 Comentários
          </Text>

          <Text style={styles.cardValue}>
            {totalComments}
          </Text>
        </View>
      </View>

      {/* LINE CHART */}
      <Text style={styles.chartTitle}>
        📈 Crescimento de Seguidores
      </Text>

      <LineChart
        data={{
          labels: ["Jan", "Fev", "Mar", "Abr"],
          datasets: [
            {
              data: [
                Math.max(
                  instagram.followers - 3,
                  0
                ),
                Math.max(
                  instagram.followers - 2,
                  0
                ),
                Math.max(
                  instagram.followers - 1,
                  0
                ),
                instagram.followers,
              ],
            },
          ],
        }}
        width={screenWidth - 32}
        height={220}
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#6C63FF",
          backgroundGradientFrom: "#6C63FF",
          backgroundGradientTo: "#8E85FF",
          decimalPlaces: 0,

          color: (opacity = 1) =>
            `rgba(255,255,255,${opacity})`,

          labelColor: (opacity = 1) =>
            `rgba(255,255,255,${opacity})`,

          style: {
            borderRadius: 16,
          },

          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#fff",
          },
        }}
        bezier
        style={styles.chart}
      />

      {/* BAR CHART */}
      <Text style={styles.chartTitle}>
        ❤️ Likes por Post
      </Text>

      <BarChart
        data={{
          labels:
            posts.length > 0
              ? posts.map((_, i) => `P${i + 1}`)
              : ["P1"],

          datasets: [
            {
              data:
                posts.length > 0
                  ? posts.map(
                      (p) => p.likes || 0
                    )
                  : [0],
            },
          ],
        }}
        width={screenWidth - 32}
        height={250}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: "#FF6584",
          backgroundGradientFrom: "#FF6584",
          backgroundGradientTo: "#FF8FA3",

          decimalPlaces: 0,

          color: (opacity = 1) =>
            `rgba(255,255,255,${opacity})`,

          labelColor: (opacity = 1) =>
            `rgba(255,255,255,${opacity})`,
        }}
        style={styles.chart}
      />

      {/* INSIGHTS */}
      <View style={styles.insightsContainer}>
        <Text style={styles.insightsTitle}>
          🧠 Insights Automáticos
        </Text>

        <Text style={styles.insightText}>
          🏆 Melhor Post:
        </Text>

        <Text style={styles.insightValue}>
          {bestPost?.caption || "Sem legenda"}
        </Text>

        <Text style={styles.insightText}>
          ❤️ Likes:
        </Text>

        <Text style={styles.insightValue}>
          {bestPost?.likes || 0}
        </Text>

        <Text style={styles.insightText}>
          💬 Comentários:
        </Text>

        <Text style={styles.insightValue}>
          {bestPost?.comments || 0}
        </Text>

        <Text style={styles.insightText}>
          📈 Engajamento Médio:
        </Text>

        <Text style={styles.insightValue}>
          {engagementRate}%
        </Text>
      </View>

      {/* POSTS */}
      <Text style={styles.postsTitle}>
        📸 Últimos Posts
      </Text>

      {posts.map((post, index) => (
        <View key={post.id} style={styles.postCard}>
          <Text style={styles.postTitle}>
            Post #{index + 1}
          </Text>

          <Text style={styles.postCaption}>
            {post.caption || "Sem legenda"}
          </Text>

          <Text style={styles.postStats}>
            ❤️ {post.likes || 0} Likes
          </Text>

          <Text style={styles.postStats}>
            💬 {post.comments || 0} Comentários
          </Text>
        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    padding: 16,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },

  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    backgroundColor: "#fff",
    width: "48%",
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 14,
    color: "#666",
  },

  cardValue: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
    color: "#222",
  },

  chartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
    color: "#222",
  },

  chart: {
    borderRadius: 16,
  },

  insightsContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    marginTop: 25,
    elevation: 4,
  },

  insightsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  insightText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },

  insightValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },

  postsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
  },

  postCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    elevation: 3,
  },

  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  postCaption: {
    fontSize: 15,
    color: "#444",
    marginBottom: 10,
  },

  postStats: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});