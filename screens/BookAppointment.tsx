import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { ScrollView } from 'react-native-virtualized-view';
import { COLORS, SIZES } from '../constants';
import { getFormatedDate } from "react-native-modern-datepicker";
import { hoursData } from '../data';
import Button from '../components/Button';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import DatePickerView from '../components/DatePickerView';

interface BookAppointmentProps {
    navigation: {
        navigate: (screen: string) => void;
    };
}

const BookAppointment: React.FC<BookAppointmentProps> = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const [openStartDatePicker, setOpenStartDatePicker] = useState<boolean>(false);
    const [selectedHour, setSelectedHour] = useState<string | null>(null);

    const today = new Date();
    const startDate = getFormatedDate(
        new Date(today.setDate(today.getDate() + 1)),
        "YYYY/MM/DD"
    );

    const [startedDate, setStartedDate] = useState<string>("12/12/2023");

    const handleOnPressStartDate = () => {
        setOpenStartDatePicker(!openStartDatePicker);
    };

    // Function to handle hour selection
    const handleHourSelect = (hourId: string) => {
        setSelectedHour(hourId);
    };

    // Render each hour as a selectable button
    const renderHourItem = ({ item }: { item: { id: string; hour: string; } }) => {
        return (
            <TouchableOpacity
                style={[
                    styles.hourButton,
                    selectedHour === item.id && styles.selectedHourButton]}
                onPress={() => handleHourSelect(item.id)}>
                <Text style={[styles.hourText,
                selectedHour === item.id && styles.selectedHourText]}>{item.hour}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: COLORS.white }]}>
            <View style={[styles.container, { backgroundColor: COLORS.white }]}>
                <Header title="Book Appointment" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={[styles.title, { color: COLORS.greyscale900 }]}>Select Date</Text>
                    <View style={styles.datePickerContainer}>
                        <DatePickerView
                            startDate={startDate}
                            selectedDate={startedDate}
                            onChangeStartDate={(date) => setStartedDate(date)}
                        />
                    </View>
                    <Text style={[styles.title, { color: COLORS.greyscale900 }]}>Select Hour</Text>
                    <FlatList
                        data={hoursData}
                        renderItem={renderHourItem}
                        numColumns={3}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        style={{ marginVertical: 12 }}
                    />
                </ScrollView>
            </View>
            <View style={[styles.bottomContainer, {
                backgroundColor: COLORS.white
            }]}>
                <Button
                    title="Next"
                    filled
                    style={styles.btn}
                    onPress={() => navigation.navigate("selectpackage")}
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
    title: {
        fontSize: 20,
        fontFamily: "Urbanist Bold",
        color: COLORS.black,
        marginTop: 12
    },
    datePickerContainer: {
        marginVertical: 12
    },
    hourButton: {
        borderRadius: 32,
        marginHorizontal: 5,
        borderColor: COLORS.primary,
        borderWidth: 1.4,
        width: (SIZES.width - 32) / 3 - 9,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 6
    },
    selectedHourButton: {
        backgroundColor: COLORS.primary,
    },
    selectedHourText: {
        fontSize: 16,
        fontFamily: "Urbanist SemiBold",
        color: COLORS.white
    },
    hourText: {
        fontSize: 16,
        fontFamily: "Urbanist SemiBold",
        color: COLORS.primary
    },
    bottomContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 99,
        borderRadius: 32,
        backgroundColor: COLORS.white,
        alignItems: "center",
        justifyContent: "center"
    },
    btn: {
        width: SIZES.width - 32,
        marginBottom: 12
    }
})

export default BookAppointment;