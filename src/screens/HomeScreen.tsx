import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import UserCard from '../components/UserCard';

const HomeScreen = ({navigation}: any) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

  //Fetching user on first time app run
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false); // Stop loading state if user is fetched
      })
      .catch(error => {
        console.error(error);
        setLoading(false); // Stop loading in case of any error
      });
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users); // Reset to original state
    } else {
      //Searching user by there name
      const result = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredUsers(result);
    }
  };

  const handleInputChange = (text: string) => {
    setSearchTerm(text);
    if (text.trim() === '') {
      setFilteredUsers(users); // Reset to original state
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users List</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search by name..."
          value={searchTerm}
          onChangeText={handleInputChange}
        />
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: searchTerm.trim() === '' ? '#ccc' : '#ed58dc'},
          ]}
          onPress={handleSearch}
          disabled={searchTerm.trim() === ''}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {filteredUsers.length === 0 ? (
        <Text style={styles.notFound}>No users found</Text>
      ) : (
        <FlatList
          data={filteredUsers}
          renderItem={({item}) => (
            <UserCard navigation={navigation} item={item} />
          )}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  button: {
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  notFound: {
    fontSize: 18,
    color: '#FF6347',
    textAlign: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
