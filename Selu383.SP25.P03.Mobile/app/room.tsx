import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const ROOMS = [1, 2, 3, 4];

export default function RoomPage() {
  const router = useRouter();
  const { movie } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick a Room for: {movie}</Text>
      {ROOMS.map((room) => (
        <TouchableOpacity
          key={room}
          style={styles.item}
          onPress={() => router.push(`/seating?movie=${encodeURIComponent(String(movie))}&room=${room}`)}
        >
          <Text style={styles.text}>Room {room}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  item: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#e9e9e9',
    borderRadius: 10,
  },
  text: { fontSize: 18 },
});
