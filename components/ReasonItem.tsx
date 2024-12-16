import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS } from '../constants';

interface ReasonItemProps {
    checked: boolean;
    onPress: () => void;
    title: string;
}

const ReasonItem: React.FC<ReasonItemProps> = ({ checked, onPress, title }) => {

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.rightContainer}>
                <TouchableOpacity style={{ marginLeft: 8 }} onPress={onPress}>
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            borderRadius: 15,
                            borderWidth: 2,
                            borderColor: COLORS.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 10,
                        }}
                    >
                        {checked && <View style={{
                            height: 10,
                            width: 10,
                            backgroundColor: COLORS.primary,
                            borderRadius: 999
                        }} />}
                    </View>
                </TouchableOpacity>

                <View>
                    <Text style={[styles.title, {
                        color: COLORS.black
                    }]}>{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12
    },
    rightContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        fontSize: 14,
        fontFamily: "Urbanist Regular",
        color: COLORS.black
    }
})

export default ReasonItem;
