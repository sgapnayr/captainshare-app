import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { COLORS, SIZES } from '../constants';

const error = console.error;
console.error = (...args: any[]) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

interface DatePickerViewProps {
    startDate: string; // Expected format: "YYYY/MM/DD"
    selectedDate?: string; // Optional, expected format: "YYYY/MM/DD"
    onChangeStartDate?: (date: string) => void; // Optional callback
}

const DatePickerView: React.FC<DatePickerViewProps> = ({
    startDate,
    selectedDate,
    onChangeStartDate,
}) => {
    const [selectedStartDate, setSelectedStartDate] = useState<string>(
        selectedDate || new Date().toISOString().split('T')[0]
    );

    useEffect(() => {
        if (selectedDate) {
            setSelectedStartDate(selectedDate);
        }
    }, [selectedDate]);

    const handleDateChange = (date: string) => {
        setSelectedStartDate(date);
        if (onChangeStartDate) {
            onChangeStartDate(date);
        }
    };

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <DatePicker
                    mode="datepicker"
                    minimumDate={startDate}
                    style={{
                        width: SIZES.width - 32,
                        borderRadius: 12,
                        paddingBottom: 0,
                    }}
                    selected={selectedStartDate}
                    onDateChange={handleDateChange}
                    options={{
                        backgroundColor: COLORS.primary,
                        textHeaderColor: COLORS.white,
                        textDefaultColor: '#FFFFFF',
                        selectedTextColor: COLORS.primary,
                        mainColor: COLORS.white,
                        textSecondaryColor: '#FFFFFF',
                        borderColor: COLORS.primary,
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default DatePickerView;
