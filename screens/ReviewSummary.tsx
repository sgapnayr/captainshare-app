import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, icons, images } from '../constants';
import Header from '../components/Header';
import { ScrollView } from 'react-native-virtualized-view';
import Button from '../components/Button';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const ReviewSummary = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <SafeAreaView style={[styles.area, {
      backgroundColor: COLORS.tertiaryWhite
    }]}>
      <View style={[styles.container, {
        backgroundColor: COLORS.tertiaryWhite
      }]}>
        <Header title="Review Summary" />
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={{
            backgroundColor: COLORS.tertiaryWhite,
            marginTop: 22
          }}>
            <View style={[styles.doctorCard, {
              backgroundColor: COLORS.white,
            }]}>
              <Image
                source={images.doctor5}
                resizeMode='contain'
                style={styles.doctorImage}
              />
              <View>
                <Text style={[styles.doctorName, {
                  color: COLORS.greyscale900
                }]}>Dr.  Jenny Watson</Text>
                <View style={[styles.separateLine, {
                  backgroundColor: COLORS.grayscale200,
                }]} />
                <Text style={[styles.doctorSpeciality, {
                  color: COLORS.greyScale800
                }]}>Immunologists</Text>
                <Text style={[styles.doctorHospital, {
                  color: COLORS.greyScale800
                }]}>Christ Hospital in London, UK</Text>
              </View>
            </View>
          </View>

          <View style={[styles.summaryContainer, {
            backgroundColor: COLORS.white,
          }]}>
            <View style={styles.view}>
              <Text style={[styles.viewLeft, {
                color: COLORS.grayscale700
              }]}>Consultation Type</Text>
              <Text style={[styles.viewRight, { color: COLORS.greyscale900 }]}>General</Text>
            </View>
            <View style={styles.view}>
              <Text style={[styles.viewLeft, {
                color: COLORS.grayscale700
              }]}>Address</Text>
              <Text style={[styles.viewRight, { color: COLORS.greyscale900 }]}>6993 Meadow Valley Terrace</Text>
            </View>

            <View style={styles.view}>
              <Text style={[styles.viewLeft, {
                color: COLORS.grayscale700
              }]}>Name</Text>
              <Text style={[styles.viewRight, { color: COLORS.greyscale900 }]}>Daniel Austin</Text>
            </View>
            <View style={styles.view}>
              <Text style={[styles.viewLeft, {
                color: COLORS.grayscale700
              }]}>Phone</Text>
              <Text style={[styles.viewRight, { color: COLORS.greyscale900 }]}>+1 111 467 378 399</Text>
            </View>
            <View style={styles.view}>
              <Text style={[styles.viewLeft, {
                color: COLORS.grayscale700
              }]}>Booking Date</Text>
              <Text style={[styles.viewRight, { color: COLORS.greyscale900 }]}>December 23, 2024</Text>
            </View>
            <View style={styles.view}>
              <Text style={[styles.viewLeft, {
                color: COLORS.grayscale700
              }]}>Time</Text>
              <Text style={[styles.viewRight, { color: COLORS.greyscale900 }]}>09:00 AM</Text>
            </View>
          </View>

          <View style={[styles.summaryContainer, {
            backgroundColor: COLORS.white,
          }]}>
            <View style={styles.view}>
              <Text style={[styles.viewLeft, {
                color: COLORS.grayscale700
              }]}>Amount</Text>
              <Text style={[styles.viewRight, { color: COLORS.greyscale900 }]}>$20</Text>
            </View>
            <View style={styles.view}>
              <Text style={[styles.viewLeft, {
                color: COLORS.grayscale700
              }]}>Duration (30 mins)</Text>
              <Text style={[styles.viewRight, { color: COLORS.greyscale900 }]}>1 x $20</Text>
            </View>
            <View style={[styles.separateLine, {
              backgroundColor: COLORS.grayscale200
            }]} />
            <View style={styles.view}>
              <Text style={[styles.viewLeft, {
                color: COLORS.grayscale700
              }]}>Total</Text>
              <Text style={[styles.viewRight, { color: COLORS.greyscale900 }]}>$20</Text>
            </View>
          </View>

          <View style={[styles.cardContainer, {
            backgroundColor: COLORS.white
          }]}>
            <View style={styles.cardLeft}>
              <Image
                source={icons.creditCard}
                resizeMode='contain'
                style={styles.creditCard}
              />
              <Text style={[styles.creditCardNum, {
                color: COLORS.greyscale900
              }]}>
                •••• •••• •••• •••• 4679</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("addnewcard")}>
              <Text style={styles.changeBtnText}>Change</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
        <Button
          title="Continue"
          onPress={() => navigation.navigate("enteryourpin")}
          filled
          style={styles.continueBtn}
        />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16
  },
  btnContainer: {
    width: SIZES.width - 32,
    height: 300,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
    marginBottom: 16,
    backgroundColor: "#FAFAFA"
  },
  premiumIcon: {
    width: 60,
    height: 60,
    tintColor: COLORS.primary
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12
  },
  price: {
    fontSize: 32,
    fontFamily: "Urbanist Bold",
    color: COLORS.greyscale900
  },
  priceMonth: {
    fontSize: 18,
    fontFamily: "Urbanist Medium",
    color: COLORS.grayscale700,
  },
  premiumItemContainer: {
    marginTop: 16
  },
  premiumItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6
  },
  premiumText: {
    fontSize: 16,
    fontFamily: "Urbanist Medium",
    color: COLORS.greyScale800,
    marginLeft: 24
  },
  summaryContainer: {
    width: SIZES.width - 32,
    borderRadius: 16,
    padding: 16,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 1,
    marginBottom: 12,
    marginTop: 12,
  },
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12
  },
  viewLeft: {
    fontSize: 14,
    fontFamily: "Urbanist Medium",
    color: COLORS.grayscale700
  },
  viewRight: {
    fontSize: 14,
    fontFamily: "Urbanist SemiBold",
    color: COLORS.greyscale900
  },
  separateLine: {
    width: "100%",
    height: 1,
    backgroundColor: COLORS.grayscale200
  },
  creditCard: {
    width: 44,
    height: 34
  },
  creditCardNum: {
    fontSize: 18,
    fontFamily: "Urbanist Bold",
    color: COLORS.greyscale900,
    marginLeft: 12
  },
  changeBtnText: {
    fontSize: 16,
    fontFamily: "Urbanist Bold",
    color: COLORS.primary
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 72,
    width: SIZES.width - 32,
    height: 80,
    borderRadius: 16,
    padding: 16,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 1
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  continueBtn: {
    borderRadius: 32,
    position: "absolute",
    bottom: 16,
    width: SIZES.width - 32,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    right: 16,
    left: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: "Urbanist Bold",
    color: COLORS.primary,
    textAlign: "center",
    marginVertical: 12
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: "Urbanist Regular",
    color: COLORS.black,
    textAlign: "center",
    marginVertical: 12
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  modalSubContainer: {
    height: 520,
    width: SIZES.width * 0.9,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  modalIllustration: {
    height: 180,
    width: 180,
    marginVertical: 22
  },
  successBtn: {
    width: "100%",
    marginTop: 12,
    borderRadius: 32
  },
  receiptBtn: {
    width: "100%",
    marginTop: 12,
    borderRadius: 32,
    backgroundColor: COLORS.tansparentPrimary,
    borderColor: COLORS.tansparentPrimary
  },
  editPencilIcon: {
    width: 42,
    height: 42,
    tintColor: COLORS.white,
    zIndex: 99999,
    position: "absolute",
    top: 54,
    left: 58,
  },
  backgroundIllustration: {
    height: 150,
    width: 150,
    marginVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    zIndex: -999
  },
  doctorCard: {
    height: 142,
    width: SIZES.width - 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
  },
  doctorImage: {
    height: 110,
    width: 110,
    borderRadius: 16,
    marginHorizontal: 16
  },
  doctorName: {
    fontSize: 18,
    color: COLORS.greyscale900,
    fontFamily: "Urbanist Bold"
  },
  doctorSpeciality: {
    fontSize: 12,
    color: COLORS.greyScale800,
    fontFamily: "Urbanist Medium",
    marginBottom: 8
  },
  doctorHospital: {
    fontSize: 12,
    color: COLORS.greyScale800,
    fontFamily: "Urbanist Medium"
  },
})

export default ReviewSummary