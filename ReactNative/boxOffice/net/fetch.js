import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const fetch = async (url) => {
  try {
    let result = await AsyncStorage.getItem(url);
    if (result !== null) {
      return JSON.parse(result);
    }
    const response = await axios.get(url);
    AsyncStorage.setItem(url, JSON.stringify(response));
    return response.data;
  } catch (e) {
    alert(e.message);
  }
};

export default fetch;
