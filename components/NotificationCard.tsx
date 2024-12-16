import { View, Text, TouchableOpacity, StyleSheet, Image, GestureResponderEvent } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../constants';
import { getTimeAgo } from '../utils/date';

interface NotificationCardProps {
    icon: any; // You may want to specify a more precise type for images if possible
    title: string;
    description: string;
    date: string; // Adjust according to the actual date type you are using
    onPress: (event: GestureResponderEvent) => void; // Function type for onPress
}

const NotificationCard: React.FC<NotificationCardProps> = ({
    icon,
    title,
    description,
    date,
    onPress
}) => {

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}>
            <View style={styles.leftContainer}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Image
                        source={icon}
                        resizeMode='cover'
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <View>
                    <Text style={[styles.title, {
                        color: COLORS.greyscale900
                    }]}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View>
            <Text style={styles.date}>{getTimeAgo(date)}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 12,
        width: SIZES.width - 32,
    },
    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1
    },
    iconContainer: {
        height: 44,
        width: 44,
        backgroundColor: COLORS.black2,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        marginRight: 12
    },
    icon: {
        width: 22,
        height: 22,
        tintColor: COLORS.white
    },
    title: {
        fontSize: 14,
        fontFamily: "Urbanist Medium",
        color: COLORS.black,
        marginBottom: 6
    },
    description: {
        fontSize: 14,
        fontFamily: "Urbanist Regular",
        color: "gray"
    },
    date: {
        fontSize: 12,
        fontFamily: "Urbanist Regular",
        color: "gray",
    }
})

export default NotificationCard;
