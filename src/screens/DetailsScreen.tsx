import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const DetailsScreen = ({route}: any) => {
  const {user} = route.params; // Get the user data from HomeScreen using params

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.avatar}>{user.name.charAt(0)}</Text>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>📧 {user.email}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Company</Text>
        <Text style={styles.companyName}>{user.company.name}</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Address</Text>
        <Text style={styles.addressText}>{user.address.street}</Text>
        <Text style={styles.addressText}>
          {user.address.city}, {user.address.zipcode}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  avatar: {
    backgroundColor: '#ed58dc',
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    width: 80,
    height: 80,
    textAlign: 'center',
    lineHeight: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    width: '80%',
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 5,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addressText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
});

export default DetailsScreen;
