import React from 'react';
import { List } from 'react-native-paper';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DATA from './const';
const History = ({ navigation }) => {
  const [data, setData] = React.useState([]);
  const getData = async () => {
    try {
      let datas = await AsyncStorage.getItem(DATA.KEY_SAVE);
      datas = JSON.parse(data);
      setData(datas);
    } catch (error) {
      console.log('get error', error);
    }
  };
  const filterData =()=>{
    console.log(data)
  }
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
      setTimeout(() => {
             filterData()
            }, 1000);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, marginTop: 100, marginHorizontal: 50 }}>
      {data
        ? data.map((item, idx) => (
            <List.Item
              style={{ backgroundColor: '#fcd7dc', marginVertical: 5 }}
              key={idx}
              title={item.text}
              description={new Date(
                item.time
              ).toLocaleTimeString()}></List.Item>
          ))
        : ''}
    </View>
  );
};

export default History;
