import React, { useState } from 'react';
import { Image, StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, ActivityIndicator, StatusBar, FlatList, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Constants from 'expo-constants'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { GoogleGenerativeAI } from '@google/generative-ai';

import Dropdown from '@/components/Dropdown';

export default function TabIternaryPlanner() {
  const [isLoading, setIsLoading] = useState(false);

  const [selectedDestination, setSelectedDestination] = useState();
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [fromShow, setFromShow] = useState(false);
  const [toShow, setToShow] = useState(false);
  const [noOfPax, onPaxChange] = useState();
  const [budget, onBudgetChange] = useState();
  const [currencyValue, setCurrencyValue] = useState();

  const [itenaryResponse, getItenaryResponse] = useState();

  const dataDestination = [
    { label: 'Azerbaijan', value: 'Azerbaijan' },
    { label: 'USA', value: 'USA' },
    { label: 'India', value: 'India' },
    { label: 'Japan', value: 'Japan' },
    { label: 'Europe', value: 'Europe' },
  ];

  const currencyList = [
    { label: 'INR', value: 'INR' },
    { label: 'USD', value: 'USD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'JPY', value: 'JPY' },
    { label: 'CAD', value: 'CAD' },
    { label: 'GBP', value: 'GBP' },
    { label: 'AED', value: 'AED' },
    { label: 'SAR', value: 'SAR' },
    { label: 'RUB', value: 'RUB' },
    { label: 'QAR', value: 'QAR' },
    { label: 'SGD', value: 'SGD' },
    { label: 'IDR', value: 'IDR' },
    { label: 'MYR', value: 'MYR' },
  ];

  const onChangeFrom = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate;
    setFromShow(false);
    setFromDate(currentDate);
  };
  const showFromMode = () => {
    setFromShow(true);
  };

  const onChangeTo = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate;
    setToShow(false);
    setToDate(currentDate);
  };
  const showToMode = () => {
    setToShow(true);
  };

  const searchResult = async () => {
    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Plan a travel itenary to ${selectedDestination.value} during dates ${fromDate.toLocaleDateString()} ${toDate.toLocaleDateString()} within the budget ${currencyValue.value} ${budget} for ${noOfPax} passengers`;
      const result = await model.generateContent(prompt);
      getItenaryResponse(result.response.text());
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
      <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start' }}>
        <ScrollView>
          <Image
            source={require('@/assets/images/travel.png')}
            style={styles.headerLogo}
          />
          <ActivityIndicator animating={isLoading} size='large' color='#0000ff' />
          <Text>{itenaryResponse}</Text>
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={styles.searchView}>
        <Dropdown label='Select Destination' data={dataDestination} onSelect={setSelectedDestination} />

        <SafeAreaView style={styles.dateTimeContainer}>
          <TouchableOpacity style={styles.buttonWrapper} onPress={showFromMode}>
            <MaterialCommunityIcons name='sort-calendar-descending' size={20} style={styles.iconStyle} />
            <Text style={styles.dateButton}>{fromDate ? fromDate.toLocaleDateString() : 'From'}</Text>
            {fromShow && (
              <DateTimePicker
                testID="dateTimePickerFrom"
                value={fromDate}
                mode={'date'}
                is24Hour={true}
                onChange={onChangeFrom}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonWrapper} onPress={showToMode}>
            <MaterialCommunityIcons name='sort-calendar-ascending' size={20} style={styles.iconStyle} />
            <Text style={styles.dateButton}>{toDate ? toDate.toLocaleDateString() : 'To'}</Text>
            {toShow && (
              <DateTimePicker
                testID="dateTimePickerTo"
                value={toDate}
                minimumDate={fromDate}
                mode={'date'}
                is24Hour={true}
                onChange={onChangeTo}
              />
            )}
          </TouchableOpacity>
        </SafeAreaView>

        {/* budget - dropdown (for currency list) + number input */}
        <SafeAreaView style={styles.budgetWrapper}>
          <SafeAreaView style={styles.currencyDropdown}>
            <Dropdown label={currencyList[0].label} data={currencyList} onSelect={setCurrencyValue} />
          </SafeAreaView>
          <TextInput
            style={styles.budgetInput}
            keyboardType='numeric'
            placeholder='Budget'
            onChangeText={onBudgetChange}
            value={budget}
            maxLength={10}
          />
        </SafeAreaView>

        {/* purpose - multiselect */}
        {/* number of people - number input */}
        <TextInput
          style={styles.textInput}
          keyboardType='numeric'
          placeholder='Number of Passengers'
          onChangeText={onPaxChange}
          value={noOfPax}
          maxLength={10}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchResult}>
          <Text>Search</Text>
        </TouchableOpacity>
      </ SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerLogo: {
    marginTop: Constants.statusBarHeight,
    height: 150,
    alignSelf: 'center',
  },
  searchView: {
    justifyContent: 'flex-end',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  searchButton: {
    borderRadius: 15,
    backgroundColor: 'lightblue',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    width: '50%',
    zIndex: 1,
    borderRadius: 15,
  },
  dateButton: {
    flex: 1,
    textAlign: 'left',
  },
  iconStyle: {
    marginLeft: 10,
    marginRight: 5,
  },
  textInput: {
    backgroundColor: '#efefef',
    borderRadius: 15,
    height: 50,
    textAlign: 'center',
    marginTop: 5,
  },
  budgetWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  budgetInput: {
    backgroundColor: '#efefef',
    borderRadius: 15,
    height: 50,
    textAlign: 'center',
    width: '80%',
  },
  currencyDropdown: {
    borderRadius: 15,
    height: 50,
    width: '20%',
  },

  header: {
    height: 150,
    overflow: 'hidden',
  },
});
