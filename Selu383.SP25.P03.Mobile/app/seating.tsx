import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button, Image } from 'react-native';
import { useRouter } from 'expo-router';

const NUM_ROWS = 5;
const SEATS_PER_ROW = 6;

const Seating = () => {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [purchasedSeats, setPurchasedSeats] = useState<Set<string>>(new Set());
  const [removeMode, setRemoveMode] = useState(false); 
  const router = useRouter(); 

  const handleSeatPress = (seatId: string) => {
    
    if (purchasedSeats.has(seatId)) {
      if (removeMode) {
        setPurchasedSeats((prev) => {
          const newSeats = new Set(prev);
          newSeats.delete(seatId); 
          return newSeats;
        });
        setSelectedSeat(null); 
        alert(`Seat ${seatId} has been removed.`);
      }
    } else {
      if (selectedSeat === seatId) {
        setSelectedSeat(null); 
        setModalVisible(false);
      } else {
        setSelectedSeat(seatId);
        setModalVisible(true);
      }
    }
  };

  const handlePurchaseSeat = () => {
    if (selectedSeat) {
      setPurchasedSeats((prev) => new Set(prev).add(selectedSeat)); 
      alert(`Seat ${selectedSeat} purchased!`);
      setModalVisible(false);
      setSelectedSeat(null); 
    }
  };

  const renderSeats = () => {
    const seats = [];

    for (let row = 0; row < NUM_ROWS; row++) {
      const seatRow = [];
      for (let seat = 0; seat < SEATS_PER_ROW; seat++) {
        const seatId = `${String.fromCharCode(65 + row)}${seat + 1}`;
        const isPurchased = purchasedSeats.has(seatId);
        const isSelected = selectedSeat === seatId;
        seatRow.push(
          <TouchableOpacity
            key={seatId}
            style={[
              styles.seat,
              isPurchased && styles.purchasedSeat, 
              isSelected && styles.selectedSeat,
            ]}
            onPress={() => handleSeatPress(seatId)}
            disabled={isPurchased && !removeMode} 
          >
            <Text style={styles.seatText}>{seatId}</Text>
          </TouchableOpacity>
        );
      }
      seats.push(
        <View key={row} style={styles.row}>
          {seatRow}
        </View>
      );
    }

    return seats;
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenBox}>
        <Text style={styles.screenText}>This is where the screen of the movie is</Text>
      </View>
      <Image
        source={{ uri: 'https://example.com/screen-image.jpg' }} 
        style={styles.screenImage}
      />
      <Text style={styles.title}>Select Your Seat</Text>
      {renderSeats()}

      {/* Confirmation Modal */}
      {selectedSeat && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Text style={styles.modalText}>Buy seat {selectedSeat}?</Text>
              <Button title="Confirm" onPress={handlePurchaseSeat} />
              <View style={{ marginTop: 10 }}>
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Remove Mode Toggle */}
      <TouchableOpacity
        style={[
          styles.toggleButton,
          removeMode && styles.toggleButtonRed, 
        ]}
        onPress={() => setRemoveMode(!removeMode)}
      >
        <Text style={styles.toggleButtonText}>
          {removeMode ? 'Disable Remove Mode' : 'Enable Remove Mode'}
        </Text>
      </TouchableOpacity>

      {/* Next Button to navigate to the next page */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.push('/concessions')} 
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 30,
    alignItems: 'center',
  },
  screenBox: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  screenText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  screenImage: {
    width: '100%',
    height: 10, 
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    color: 'white',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  seat: {
    width: 40,
    height: 40,
    backgroundColor: '#3a3a3a',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  purchasedSeat: {
    backgroundColor: 'purple',
  },
  selectedSeat: {
    backgroundColor: 'blue',
  },
  seatText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  modalBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'center',
    marginTop: 20,
  },
  toggleButton: {
    backgroundColor: '#444', 
    padding: 10,
    borderRadius: 5,
    marginRight: 10, 
  },
  toggleButtonRed: {
    backgroundColor: 'red', 
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#00BFFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Seating;
