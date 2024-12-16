import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Modal, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, icons, images } from '../constants';
import { ScrollView } from 'react-native-virtualized-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import CallCard from '../components/CallCard';
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface DropdownItem {
    label: string;
    value: string;
    icon: any;
}

interface VideoCallHistoryDetailsProps {
    navigation: any;
}

const VideoCallHistoryDetails: React.FC<VideoCallHistoryDetailsProps> = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

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
                // Handle Download Video action
                setModalVisible(false);
                break;
            case 'DeleteVideo':
                // Handle Delete Video action
                setModalVisible(false);
                break;
            default:
                break;
        }
    };

    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={icons.back}
                            resizeMode='contain'
                            style={[styles.backIcon, {
                                tintColor: COLORS.black
                            }]}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, {
                        color: COLORS.black
                    }]}></Text>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Image
                        source={icons.moreCircle}
                        resizeMode='contain'
                        style={[styles.moreIcon, {
                            tintColor: COLORS.black
                        }]}
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
                            name="Dr. Maria Foose"
                            image={images.doctor5}
                            type="Video Call"
                            date="Dec 11, 2024"
                            time="13:00 PM"
                            icon={icons.videoCamera}
                            onPress={() => null}
                        />
                    </View>
                    <View style={styles.separateLine} />
                    <Text style={styles.description}>30 minutes of video calls have been recorded.</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("videocallhistorydetailsplayrecordings")}
                        style={styles.btnContainer}>
                        <Ionicons name="play-circle" size={24} color={COLORS.white} />
                        <Text style={styles.btnText}>Play Video Recordings</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
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
                                        style={{ flexDirection: "row", alignItems: 'center', marginVertical: 12 }}
                                        onPress={() => handleDropdownSelect(item)}>
                                        <Image
                                            source={item.icon}
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
    );
};

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    headerContainer: {
        flexDirection: "row",
        width: SIZES.width - 32,
        justifyContent: "space-between",
        marginBottom: 0
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    backIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: "Urbanist Bold",
        color: COLORS.black,
        marginLeft: 16
    },
    moreIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.black
    },
    separateLine: {
        height: 0.4,
        width: SIZES.width - 32,
        backgroundColor: COLORS.greyscale300,
        marginVertical: 12
    },
    description: {
        fontSize: 16,
        fontFamily: "Urbanist Medium",
        color: COLORS.grayscale700,
        textAlign: "center"
    },
    btnContainer: {
        height: 58,
        width: SIZES.width - 32,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 100,
        marginVertical: 24
    },
    btnText: {
        fontSize: 16,
        fontFamily: "Urbanist Bold",
        color: COLORS.white,
        marginLeft: 16
    }
});

export default VideoCallHistoryDetails;