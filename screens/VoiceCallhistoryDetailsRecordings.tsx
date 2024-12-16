import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Modal, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES, icons, images } from '../constants';
import { ScrollView } from 'react-native-virtualized-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import CallCard from '../components/CallCard';
import Button from '../components/Button';
import Sound from 'react-native-sound';
import { NavigationProp, useNavigation } from '@react-navigation/native';

// Define types for props and dropdown items
interface DropdownItem {
  label: string;
  value: string;
  icon: any;
}

interface VoiceCallHistoryDetailsPlayRecordingsProps {
  navigation: any;
}

const VoiceCallHistoryDetailsPlayRecordings: React.FC<VoiceCallHistoryDetailsPlayRecordingsProps> = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [sound, setSound] = useState<any>(null);

  const dropdownItems: DropdownItem[] = [
    { label: 'Download Video', value: 'downloadVideo', icon: icons.download2 },
    { label: 'Delete Video', value: 'DeleteVideo', icon: icons.trash },
  ];

  const handleDropdownSelect = (item: DropdownItem) => {
    setSelectedItem(item.value);
    setModalVisible(false);

    // Perform actions based on the selected item
    switch (item.value) {
      case 'downloadVideo':
        setModalVisible(false);
        break;
      case 'DeleteVideo':
        setModalVisible(false);
        break;
      default:
        break;
    }
  };

  const playSound = () => {
    console.log('Loading Sound');
    const soundInstance = new Sound(require('../assets/audios/audio_doctor.mp3'), Sound.MAIN_BUNDLE, (error: any) => {
      if (error) {
        console.error('Failed to load the sound', error);
        return;
      }
      setSound(soundInstance);

      console.log('Playing Sound');
      soundInstance.play((success: any) => {
        if (success) {
          console.log('Successfully finished playing');
        } else {
          console.log('Playback failed due to audio decoding errors');
        }
      });
    });
  };
  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  /**
   * Render header
   */
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={icons.back}
              resizeMode="contain"
              style={[styles.backIcon, { tintColor: COLORS.black }]}
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: COLORS.black }]}></Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={icons.moreCircle}
            resizeMode="contain"
            style={[styles.moreIcon, { tintColor: COLORS.black }]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: COLORS.white }]}>
      <View style={[styles.container, { backgroundColor: COLORS.white }]}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ backgroundColor: COLORS.tertiaryWhite }}>
            <CallCard
              name="Dr. Jenny Watson"
              image={images.doctor5}
              type="Voice Call"
              date="Dec 11, 2024"
              time="13:00 PM"
              icon={icons.telephone}
              onPress={() => null}
            />
          </View>
          <View style={styles.separateLine} />
          <Text style={styles.description}>30 minutes of voice calls have been recorded.</Text>
          <View style={styles.bottomContainer}>
            <Button title="Stop" style={styles.stopBtn} onPress={playSound} />
            <Button title="Pause" filled style={styles.pauseBtn} onPress={() => null} />
          </View>
        </ScrollView>
      </View>
      {/* Modal for dropdown selection */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={{ position: "absolute", top: 112, right: 12 }}>
            <View style={{ width: 202, padding: 16, backgroundColor: COLORS.tertiaryWhite, borderRadius: 8 }}>
              <FlatList
                data={dropdownItems}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: 'center', marginVertical: 12 }}
                    onPress={() => handleDropdownSelect(item)}>
                    <Image
                      source={item.icon}
                      resizeMode="contain"
                      style={{ width: 20, height: 20, marginRight: 16, tintColor: COLORS.black }}
                    />
                    <Text style={{ fontSize: 14, fontFamily: "Urbanist SemiBold", color: COLORS.black }}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    flexDirection: "row",
    width: SIZES.width - 32,
    justifyContent: "space-between",
    marginBottom: 0,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Urbanist Bold",
    color: COLORS.black,
    marginLeft: 16,
  },
  moreIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },
  separateLine: {
    height: 0.4,
    width: SIZES.width - 32,
    backgroundColor: COLORS.greyscale300,
    marginVertical: 12,
  },
  description: {
    fontSize: 16,
    fontFamily: "Urbanist Medium",
    color: COLORS.grayscale700,
    textAlign: "center",
  },
  bottomContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 24,
  },
  stopBtn: {
    width: (SIZES.width - 32) / 2 - 18,
    backgroundColor: COLORS.tansparentPrimary,
    borderWidth: 0,
  },
  pauseBtn: {
    width: (SIZES.width - 32) / 2 - 18,
  },
});

export default VoiceCallHistoryDetailsPlayRecordings;