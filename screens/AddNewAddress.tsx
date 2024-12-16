import { View, Text, StyleSheet, TouchableOpacity, Alert, StatusBar, Image } from 'react-native';
import React, { useRef, useEffect, useReducer, useCallback, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, SIZES, COLORS, FONTS } from '../constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import { commonStyles } from '../styles/CommonStyles';
import Input from '../components/Input';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducers';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { mapStandardStyle } from '../data/mapData';

const initialState = {
  inputValues: {
    address: '',
    street: '',
    postalCode: '',
    appartment: '',
  },
  inputValidities: {
    address: false,
    street: false,
    postalCode: false,
    appartment: false,
  },
  formIsValid: false,
}

type Nav = {
  navigate: (value: string) => void
}

const AddNewAddress = () => {
  const { navigate } = useNavigation<Nav>();
  const bottomSheetRef = useRef<any>(null);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [selectedLabel, setSelectedLabel] = useState(null);

  const handleLabelSelection = (label: any) => {
    setSelectedLabel(label)
  };

  const inputChangedHandler = useCallback(
    (inputId: string, inputValue: string) => {
      const result = validateInput(inputId, inputValue)
      dispatchFormState({
        inputId,
        validationResult: result,
        inputValue,
      })
    }, [dispatchFormState]);

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error)
    }
  }, [error]);

  // open the bottom sheet on component mount
  useEffect(() => {
    bottomSheetRef.current.open();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar hidden={true} />
      <View
        style={{
          position: 'absolute',
          marginHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          top: 22,
          zIndex: 999,
        }}>
        <TouchableOpacity
          onPress={() => navigate("address")}
          style={{
            height: 45,
            width: 45,
            borderRadius: 22.5,
            backgroundColor: COLORS.black,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16,
            zIndex: 9999,
          }}>
          <Image
            source={icons.arrowLeft}
            resizeMode="contain"
            style={{
              height: 24,
              width: 24,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
        <Text style={{ ...FONTS.body3 }}>Add New Address</Text>
      </View>
      <MapView
        style={styles.map}
        customMapStyle={mapStandardStyle}
        initialRegion={{
          latitude: 48.8566,
          longitude: 2.3522,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: 48.8566,
            longitude: 2.3522,
          }}
          image={icons.googleMaps}
          title="Move"
          description="Address"
          onPress={() => console.log('Move to another screen')}>
          <Callout tooltip>
            <View>
              <View style={styles.bubble}>
                <Text
                  style={{
                    ...FONTS.body4,
                    fontWeight: 'bold',
                    color: COLORS.black,
                  }}>
                  User Address
                </Text>
              </View>
              <View style={styles.arrowBorder} />
              <View style={styles.arrow} />
            </View>
          </Callout>
        </Marker>
      </MapView>
      <RBSheet
        ref={bottomSheetRef}
        height={500}
        openDuration={250}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: COLORS.gray2,
            width: 100,
          },
          container: {
            backgroundColor: COLORS.white,
            paddingVertical: 16
          }
        }}>
        <View
          style={{
            width: SIZES.width - 32,
            marginHorizontal: 16,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginVertical: 0 }}>
              <View
                style={{
                  marginTop: 0,
                  width: SIZES.width - 32,
                }}>
                <Text style={[commonStyles.inputHeader, {
                  color: COLORS.greyscale900
                }]}>
                  Address
                </Text>
                <Input
                  id="address"
                  onInputChanged={inputChangedHandler}
                  errorText={formState.inputValidities['address']}
                  placeholder="3235 Royal Ln. mesa, new jersy 34567"
                  placeholderTextColor={COLORS.black}
                />
              </View>
              <View style={{ marginTop: 12 }}>
                <Text style={[commonStyles.inputHeader, {
                  color: COLORS.greyscale900
                }]}>
                  Appartment
                </Text>
                <Input
                  id="appartment"
                  onInputChanged={inputChangedHandler}
                  errorText={formState.inputValidities['appartment']}
                  placeholder="2143"
                  placeholderTextColor={COLORS.black}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 12,
                }}>
                <View
                  style={{ width: (SIZES.width - 32) / 2 - 10 }}>
                  <Text style={[commonStyles.inputHeader, {
                    color: COLORS.greyscale900
                  }]}>
                    Street
                  </Text>
                  <Input
                    id="street"
                    onInputChanged={inputChangedHandler}
                    errorText={formState.inputValidities['street']}
                    placeholder="hason nagar"
                    placeholderTextColor={COLORS.black}
                  />
                </View>
                <View
                  style={{ width: (SIZES.width - 32) / 2 - 10 }}>
                  <Text style={[commonStyles.inputHeader, {
                    color: COLORS.greyscale900
                  }]}>
                    Post Code
                  </Text>
                  <Input
                    id="postalCode"
                    onInputChanged={inputChangedHandler}
                    errorText={formState.inputValidities['postalCode']}
                    placeholder="3456"
                    placeholderTextColor={COLORS.black}
                  />
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Urbanist Regular",
                marginBottom: 2,
                color: COLORS.greyscale900
              }}>
              AVAILABLE TIME
            </Text>
            <View
              style={{ flexDirection: 'row', marginVertical: 13 }}>
              <TouchableOpacity
                style={[
                  styles.checkboxContainer,
                  selectedLabel === 'home' &&
                  styles.selectedCheckbox,
                  {
                    borderColor: COLORS.greyscale900
                  }
                ]}
                onPress={() => handleLabelSelection('home')}>
                <Text
                  style={[
                    selectedLabel === 'home' &&
                    styles.checkboxText,
                    {
                      color: selectedLabel === 'home' ? COLORS.white : COLORS.greyscale900
                    }
                  ]}>
                  Home
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.checkboxContainer,
                  selectedLabel === 'work' &&
                  styles.selectedCheckbox,
                  {
                    borderColor: COLORS.greyscale900
                  }
                ]}
                onPress={() => handleLabelSelection('work')}>
                <Text
                  style={[
                    selectedLabel === 'work' &&
                    styles.checkboxText, {
                      color: selectedLabel === 'work' ? COLORS.white : COLORS.greyscale900
                    }
                  ]}>
                  Work
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.checkboxContainer,
                  selectedLabel === 'other' &&
                  styles.selectedCheckbox,
                  {
                    borderColor: COLORS.greyscale900
                  }
                ]}
                onPress={() => handleLabelSelection('other')}>
                <Text
                  style={[
                    selectedLabel === 'other' &&
                    styles.checkboxText,
                    {
                      color: selectedLabel === 'other' ? COLORS.white : COLORS.greyscale900
                    }
                  ]}>
                  Other
                </Text>
              </TouchableOpacity>
            </View>
            <Button
              filled
              title="SAVE LOCATION"
              onPress={() => {
                bottomSheetRef.current.close()
                navigate('(tabs)')
              }}
              style={{
                borderRadius: 30
              }}
            />
          </View>
        </View>
      </RBSheet>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    zIndex: 1,
  },
  // Callout bubble
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 'auto',
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  body3: {
    fontSize: 12,
    color: COLORS.grayscale700,
    marginVertical: 3,
  },
  h3: {
    fontSize: 12,
    color: COLORS.grayscale700,
    marginVertical: 3,
    fontFamily: "Urbanist Bold",
    marginRight: 6,
  },
  btn1: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn2: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderColor: COLORS.primary,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginBottom: 12,
  },
  roundedCheckBoxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 48,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.gray,
    marginRight: 12,
  },
  selectedCheckbox: {
    backgroundColor: COLORS.primary,
  },
  checkboxText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: "Urbanist Regular",
  },
  starContainer: {
    height: 48,
    width: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
})

export default AddNewAddress