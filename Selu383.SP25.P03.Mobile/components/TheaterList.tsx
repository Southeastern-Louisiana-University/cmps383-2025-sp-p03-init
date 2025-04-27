import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

interface TheaterDto {
  id: number;
  name: string;
  address: string;
  seatCount: number;
  managerId: number | null;
}

const API_URL = 'https://kingfish-actual-probably.ngrok-free.app/api/theaters';

const TheaterList = () => {
  const [theaters, setTheaters] = useState<TheaterDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<string | null>(null); // Error state

  const fetchTheaters = async () => {
    setLoading(true);
    setError(null); 
    try {
      const response = await axios.get(API_URL);
      setTheaters(response.data); 
      setVisible(true); 
    } catch (error) {
      console.error('Error fetching theaters:', error);
      setError('Error fetching theaters. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheaters();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Theaters</Text>
      
      <Button title="Fetch Theaters" onPress={fetchTheaters} disabled={loading} />
      
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      
      {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>} {/* Error message */}

      {visible && (
        <FlatList
          data={theaters}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10 }}>
              <Text>{item.name} (ID: {item.id})</Text>
              <Text>{item.address}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default TheaterList;
