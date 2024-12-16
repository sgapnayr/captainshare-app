import { View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent, StyleProp, ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import { COLORS } from '../constants';

interface LanguageItemProps {
    checked: boolean;
    name: string;
    onPress: (event: GestureResponderEvent) => void;
}

const LanguageItem: React.FC<LanguageItemProps> = ({ checked, name, onPress }) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container as StyleProp<ViewStyle>}>
            <Text style={[styles.name, { color: COLORS.black }] as StyleProp<TextStyle>}>
                {name}
            </Text>
            <View style={styles.roundedChecked as StyleProp<ViewStyle>}>
                {checked && <View style={styles.roundedCheckedCheck as StyleProp<ViewStyle>} />}
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 6
    },
    name: {
        fontSize: 18,
        fontFamily: "Urbanist Medium",
        color: COLORS.black,
        marginBottom: 10
    },
    roundedChecked: {
        width: 20,
        height: 20,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    roundedCheckedCheck: {
        height: 10,
        width: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 999,
    },
})

export default LanguageItem;