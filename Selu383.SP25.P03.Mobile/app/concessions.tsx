import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

type Item = {
  id: number;
  name: string;
  price: number;
};

const CONCESSION_ITEMS: Item[] = [
  { id: 1, name: 'Popcorn', price: 5 },
  { id: 2, name: 'Soda', price: 3 },
  { id: 3, name: 'Candy', price: 4 },
];

export default function ConcessionPage() {
  const [cart, setCart] = useState<Item[]>([]);
  const router = useRouter();
  const { seat } = useLocalSearchParams(); // optional if you want to pass a seat number

  const addToCart = (item: Item) => {
    setCart([...cart, item]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Concessions</Text>

      <FlatList
        data={CONCESSION_ITEMS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => addToCart(item)}>
            <Text style={styles.itemText}>{item.name} - ${item.price}</Text>
            <Text style={styles.addBtn}>+ Add</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.cart}>
        <Text style={styles.cartTitle}>Cart ({cart.length} items): ${total}</Text>
        {cart.length > 0 && (
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => {
              // TODO: Replace this with your checkout logic
              alert(`Order placed to seat ${seat || 'your seat'}!`);
              setCart([]);
            }}
          >
            <Text style={styles.checkoutText}>Send to Seat</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* No Thanks Button */}
      <TouchableOpacity
        style={styles.noThanksButton}
        onPress={() => router.back()} // Navigate back to the previous screen
      >
        <Text style={styles.noThanksText}>No Thanks</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 16,
  },
  addBtn: {
    color: '#007AFF',
    fontWeight: '600',
  },
  cart: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 10,
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutBtn: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontWeight: '600',
  },
  noThanksButton: {
    backgroundColor: '#FF6347', // A red color to make the button stand out
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  noThanksText: {
    color: '#fff',
    fontWeight: '600',
  },
});
