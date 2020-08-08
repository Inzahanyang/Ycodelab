import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const fetch = async (url) => {
  let result = await AsyncStorage.getItem(url);
  let timestamp = await AsyncStorage.getItem('T' + url);

  if (result !== null) {
    timestamp = Number(timestamp);
    const now = new Date().getTime();
    if (now - timestamp < 86400000) {
      return JSON.parse(result);
    }
  }

  const response = await axios.get(url);
  result = response.data;
  AsyncStorage.setItem(url, JSON.stringify(result));
  AsyncStorage.setItem('T' + url, new Date().getTime().toString());
  return result;
};

export default fetch;
