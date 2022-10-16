import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notification,{ schedulePushNotification } from './notif';
import DATA from './const';

const Front = ({ navigation }) => {
  const [text, setText] = React.useState('');
  const [date, setDate] = useState('');
  useFocusEffect(
    React.useCallback(() => {
      setDate('');
      setText('');
    }, [])
  );
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    console.log(selectedDate);
  };
  const showTimepicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange,
      mode: 'time',
      is24Hour: true,
    });
  };
  const handleSave = async () => {
    try {
      let data = await AsyncStorage.getItem(DATA.KEY_SAVE);
      data = JSON.parse(data);
      if (data !== null) {
        data.push({ text: text, time: date.toISOString() });
      } else {
        data = [{ text: text, time: date.toISOString() }];
      }
      await AsyncStorage.setItem(DATA.KEY_SAVE, JSON.stringify(data));
      (async () => {
        await schedulePushNotification(text, date)
          .then((res) => {
            console.log(res);
          })
          .catch((e) => console.log(e));
      })();
    } catch (error) {
      console.log('Save error', error);
    }
  };
  return (
    <View style={{ flex: 1, marginTop: 100, marginHorizontal: 50 }}>
      <TextInput
        style={{ marginBottom: 50 }}
        label="ingetin?"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <Button
        style={{ marginBottom: 25 }}
        onPress={showTimepicker}
        mode="contained">
        {'Pilih Waktu'}
      </Button>
      {date != '' ? (
        <Button
          onPress={() => {
            handleSave();
            setTimeout(() => {
              navigation.navigate('History');;
            }, 1000);
            
          }}
          style={{ backgroundColor: '#FF69B4' }}
          mode="contained">
          {'ingatkan di jam ' +
            date
              .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              .substr(0, 5)}
        </Button>
      ) : (
        ''
      )}
      <Notification/>
    </View>
  );
};

export default Front;
