import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Modal, TouchableWithoutFeedback, FlatList, ImageSourcePropType } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Clipboard from '@react-native-clipboard/clipboard';
import { NavigationProp, useNavigation } from '@react-navigation/native';

// Transaction ereceipt
const TopupEReceipt = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const dropdownItems = [
    { label: 'Share E-Receipt', value: 'share', icon: icons.shareOutline },
    { label: 'Download E-Receipt', value: 'downloadEReceipt', icon: icons.download2 },
    { label: 'Print', value: 'print', icon: icons.documentOutline },
  ];

  const handleDropdownSelect = (item: any) => {
    setSelectedItem(item.value);
    setModalVisible(false);

    // Perform actions based on the selected item
    switch (item.value) {
      case 'share':
        // Handle Share action
        setModalVisible(false);
        navigation.navigate("(tabs)")
        break;
      case 'downloadEReceipt':
        // Handle Download E-Receipt action
        setModalVisible(false);
        navigation.navigate("(tabs)")
        break;
      case 'print':
        // Handle Print action
        setModalVisible(false)
        navigation.navigate("(tabs)")
        break;
      default:
        break;
    }
  };
  /*
  * Render header
  */
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Image
              source={icons.back as ImageSourcePropType}
              resizeMode='contain'
              style={[styles.backIcon, {
                tintColor: COLORS.black
              }]} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, {
            color: COLORS.black
          }]}>E-Receipt</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={icons.moreCircle as ImageSourcePropType}
            resizeMode='contain'
            style={[styles.moreIcon, {
              tintColor: COLORS.black
            }]}
          />
        </TouchableOpacity>
      </View>
    )
  }
  /**
   * Render content
   */
  const renderContent = () => {
    const transactionId = 'SKD354822747'; // Replace with your actual transaction ID

    const handleCopyToClipboard = () => {
      Clipboard.setString(transactionId);
      Alert.alert('Copied!', 'Transaction ID copied to clipboard.');
    };

    return (
      <View style={{ marginVertical: 22 }}>
        <Barcode
          format="EAN13"
          value="0123456789012"
          text="0123456789012"
          width={SIZES.width - 64}
          height={72}
          style={{
            marginBottom: 40,
            backgroundColor: COLORS.white,
          }}
          lineColor={COLORS.black}
          textStyle={{
            color: COLORS.black
          }}
          maxWidth={SIZES.width - 64}
        />
        <View style={[styles.summaryContainer, {
          backgroundColor: COLORS.white,
          borderRadius: 6,
        }]}>
          <View style={styles.viewContainer}>
            <Text style={[styles.viewLeft, {
              color: "gray"
            }]}>Name</Text>
            <Text style={[styles.viewRight, {
              color: COLORS.black
            }]}>Daniel Austion</Text>
          </View>
          <View style={styles.viewContainer}>
            <Text style={[styles.viewLeft, {
              color: "gray"
            }]}>Address</Text>
            <Text style={[styles.viewRight, {
              color: COLORS.black
            }]}>6993 Meadow Valley Terrace</Text>
          </View>
          <View style={styles.viewContainer}>
            <Text style={[styles.viewLeft, {
              color: "gray"
            }]}>Email</Text>
            <Text style={[styles.viewRight, {
              color: COLORS.black
            }]}>danielaustin@gmail.com</Text>
          </View>
          <View style={styles.viewContainer}>
            <Text style={[styles.viewLeft, {
              color: "gray"
            }]}>Phone</Text>
            <Text style={[styles.viewRight, {
              color: COLORS.black
            }]}>+1 111 467 378 399</Text>
          </View>
          <View style={styles.viewContainer}>
            <Text style={[styles.viewLeft, {
              color: "gray"
            }]}>Category</Text>
            <Text style={[styles.viewRight, {
              color: COLORS.black
            }]}>Topup</Text>
          </View>
          <View style={styles.viewContainer}>
            <Text style={[styles.viewLeft, {
              color: "gray"
            }]}>ID</Text>
            <Text style={[styles.viewRight, {
              color: COLORS.black
            }]}>TOPUP XT134</Text>
          </View>
        </View>

        <View style={[styles.summaryContainer, {
          backgroundColor: COLORS.white,
          borderRadius: 6,
        }]}>
          <View style={styles.viewContainer}>
            <Text style={[styles.viewLeft, {
              color: "gray"
            }]}>Amount</Text>
            <Text style={[styles.viewRight, {
              color: COLORS.black
            }]}>$3200</Text>
          </View>
          <View style={styles.viewContainer}>
            <Text style={[styles.viewLeft, {
              color: "gray"
            }]}>Tax</Text>
            <Text style={[styles.viewRight, {
              color: COLORS.black
            }]}>$5.55</Text>
          </View>
          <View style={styles.viewContainer}>
            <Text style={[styles.viewLeft, {
              color: "gray"
            }]}>Country</Text>
            <Text style={[styles.viewRight, {
              color: COLORS.black
            }]}>United States</Text>
          </View>
        </View>
        <View style={[styles.summaryContainer, {
          backgroundColor: COLORS.white,
          borderRadius: 6,
        }]}>
          <View style={styles.viewContainer}>
            <Text style={[styles.viewLeft, {
              color: "gray"
            }]}>Total</Text>
            <Text style={[styles.viewRight, {
              color: COLORS.black
            }]}>$605.55</Text>
          </View>
          <View style={styles.viewContainer}>
            <Text style={[styles.viewLeft, {
              color: "gray"
            }]}>Payment Methods</Text>
            <Text style={[styles.viewRight, {
              color: COLORS.black
            }]}>Credit Card</Text>
          </View>
          <View style={styles.viewContainer}>
            <Text style={[styles.viewLeft, {
              color: "gray"
            }]}>Date</Text>
            <Text style={[styles.viewRight, {
              color: COLORS.black
            }]}>Dec 16, 2026 | 12:23:45 PM</Text>
          </View>
          <View style={styles.viewContainer}>
            <Text style={[styles.viewLeft, {
              color: "gray"
            }]}>Transaction ID</Text>
            <View style={styles.copyContentContainer}>
              <Text style={styles.viewRight}>{transactionId}</Text>
              <TouchableOpacity style={{ marginLeft: 8 }} onPress={handleCopyToClipboard}>
                <MaterialCommunityIcons name="content-copy" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.viewContainer}>
            <Text style={[styles.viewLeft, {
              color: "gray"
            }]}>Status</Text>
            <TouchableOpacity style={[styles.statusBtn, {
              backgroundColor: COLORS.tansparentPrimary,
            }]}>
              <Text style={[styles.statusBtnText, {
                color: COLORS.primary
              }]}>Paid</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={[styles.area, { backgroundColor: COLORS.white }]}>
      <View style={[styles.container, { backgroundColor: COLORS.white }]}>
        {renderHeader()}
        <ScrollView
          style={[styles.scrollView, { backgroundColor: COLORS.tertiaryWhite }]}
          showsVerticalScrollIndicator={false}>
          {renderContent()}
        </ScrollView>
      </View>
      {/* Modal for dropdown selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={{ position: "absolute", top: 112, right: 12 }}>
            <View style={{
              width: 202,
              padding: 16,
              backgroundColor: COLORS.tertiaryWhite,
              borderRadius: 8
            }}>
              <FlatList
                data={dropdownItems}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: 'center',
                      marginVertical: 12
                    }}
                    onPress={() => handleDropdownSelect(item)}>
                    <Image
                      source={item.icon as ImageSourcePropType}
                      resizeMode='contain'
                      style={{
                        width: 20,
                        height: 20,
                        marginRight: 16,
                        tintColor: COLORS.black
                      }}
                    />
                    <Text style={{
                      fontSize: 14,
                      fontFamily: "Urbanist SemiBold",
                      color: COLORS.black
                    }}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16
  },
  scrollView: {
    backgroundColor: COLORS.tertiaryWhite
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  backIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
    marginRight: 16
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Urbanist Bold",
    color: COLORS.black
  },
  moreIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black
  },
  summaryContainer: {
    width: SIZES.width - 32,
    backgroundColor: COLORS.white,
    alignItems: "center",
    padding: 16,
    marginVertical: 8
  },
  viewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 12
  },
  viewLeft: {
    fontSize: 12,
    fontFamily: "Urbanist Regular",
    color: "gray"
  },
  viewRight: {
    fontSize: 14,
    fontFamily: "Urbanist Medium",
    color: COLORS.black
  },
  copyContentContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  statusBtn: {
    width: 72,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.tansparentPrimary,
    borderRadius: 6
  },
  statusBtnText: {
    fontSize: 12,
    fontFamily: "Urbanist Medium",
    color: COLORS.primary
  }
})

export default TopupEReceipt