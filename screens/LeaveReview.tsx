import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import Header from '../components/Header';
import { COLORS, SIZES, illustrations, images } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import Rating from '../components/Rating';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from '../components/Button';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface LeaveReviewProps {
  navigation: any;
}

interface RoundedCheckboxProps {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}

const LeaveReview: React.FC<LeaveReviewProps> = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [selection, setSelection] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const RoundedCheckbox: React.FC<RoundedCheckboxProps> = ({
    label,
    isSelected,
    onSelect,
  }) => (
    <TouchableOpacity onPress={onSelect} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
        {isSelected && <FontAwesome name="check" size={16} color="white" />}
      </View>
      <Text
        style={[
          styles.label,
          {
            color: COLORS.greyscale900,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderModal = (): JSX.Element => (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalSubContainer,
              { backgroundColor: COLORS.white },
            ]}
          >
            <View style={styles.backgroundIllustration}>
              <Image
                source={illustrations.star}
                resizeMode="contain"
                style={styles.modalIllustration}
              />
            </View>
            <Text style={styles.modalTitle}>Review Successful!</Text>
            <Text
              style={[
                styles.modalSubtitle,
                { color: COLORS.black },
              ]}
            >
              Your review has been successfully submitted, thank you very much!
            </Text>
            <Button
              title="Okay"
              filled
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('(tabs)');
              }}
              style={styles.successBtn}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: COLORS.white }]}>
      <View style={[styles.container, { backgroundColor: COLORS.white }]}>
        <Header title="Write a Review" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.background}>
            <Image
              source={images.doctor5}
              resizeMode="contain"
              style={styles.doctorImage}
            />
            <Text
              style={[
                styles.description,
                { color: COLORS.greyscale900 },
              ]}
            >
              How was your experience with Dr. Drake Boeson?
            </Text>
            <View>
              <Rating color={COLORS.primary} />
            </View>
            <View style={styles.separateLine} />
          </View>
          <Text
            style={[
              styles.title,
              { color: COLORS.greyscale900 },
            ]}
          >
            Write Your Review
          </Text>
          <TextInput
            placeholder="Your review here..."
            style={[
              styles.reviewInput,
              {
                backgroundColor: COLORS.tertiaryWhite,
                color: COLORS.greyscale900,
              },
            ]}
            multiline={true}
          />
          <Text
            style={[
              styles.title,
              { color: COLORS.greyscale900 },
            ]}
          >
            Would you recommend Dr. Drake Boeson to your friends?
          </Text>
          <View style={styles.roundedContainer}>
            <RoundedCheckbox
              label="Yes"
              isSelected={selection === 'Yes'}
              onSelect={() => setSelection('Yes')}
            />
            <RoundedCheckbox
              label="No"
              isSelected={selection === 'No'}
              onSelect={() => setSelection('No')}
            />
          </View>
        </ScrollView>
      </View>
      <View
        style={[
          styles.bottomContainer,
          { backgroundColor: COLORS.white },
        ]}>
        <Button
          title="Cancel"
          style={styles.btnCancel}
          onPress={() => navigation.navigate('(tabs)')}
        />
        <Button
          title="Submit"
          filled
          style={styles.btnSubmit}
          onPress={() => setModalVisible(true)}
        />
      </View>
      {renderModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
  },
  background: {
    alignItems: 'center',
  },
  doctorImage: {
    height: 160,
    width: 160,
    borderRadius: 999,
    marginVertical: 16,
  },
  description: {
    fontSize: 20,
    fontFamily: "Urbanist Bold",
    color: COLORS.greyscale900,
    marginVertical: 8,
    textAlign: 'center',
    width: 260,
  },
  separateLine: {
    width: '100%',
    height: 0.2,
    backgroundColor: COLORS.greyscale300,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "Urbanist Bold",
    color: COLORS.greyscale900,
    marginVertical: 8,
  },
  reviewInput: {
    width: '100%',
    height: 100,
    backgroundColor: COLORS.tertiaryWhite,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginVertical: 6,
    paddingVertical: 8,
    borderColor: COLORS.primary,
    textAlignVertical: 'top',
    fontFamily: "Urbanist Regular",
  },
  roundedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
    width: 140,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  label: {
    fontSize: 16,
    fontFamily: "Urbanist Regular",
    color: COLORS.greyscale900,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 112,
    borderRadius: 32,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  btnCancel: {
    width: (SIZES.width - 32) / 2 - 18,
    backgroundColor: COLORS.tansparentPrimary,
    borderWidth: 0,
  },
  btnSubmit: {
    width: (SIZES.width - 32) / 2 - 18,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: "Urbanist Bold",
    color: COLORS.primary,
    textAlign: 'center',
    marginVertical: 12,
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: "Urbanist Regular",
    color: COLORS.black,
    textAlign: 'center',
    marginVertical: 12,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalSubContainer: {
    height: 460,
    width: SIZES.width * 0.85,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalIllustration: {
    height: 180,
    width: 180,
    marginVertical: 22,
  },
  successBtn: {
    width: '100%',
    marginTop: 12,
    borderRadius: 32,
  },
  backgroundIllustration: {
    height: 150,
    width: 150,
    marginVertical: 22,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -999,
  },
});

export default LeaveReview;