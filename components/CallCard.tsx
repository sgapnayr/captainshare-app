import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../constants';

interface CallCardProps {
    name: string;
    image: ImageSourcePropType;
    type: string;
    date: string;
    time: string;
    icon: ImageSourcePropType;
    onPress: () => void;
}

const CallCard: React.FC<CallCardProps> = ({
    name,
    image,
    type,
    date,
    time,
    icon,
    onPress
}) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.cardContainer, {
                backgroundColor: COLORS.white,
            }]}>
            <View style={styles.doctorCard}>
                <Image
                    source={image}
                    resizeMode='contain'
                    style={styles.doctorImage}
                />
                <View>
                    <Text style={[styles.doctorName, {
                        color: COLORS.greyscale900,
                    }]}>{name}</Text>
                    <Text style={[styles.doctorSpeciality, {
                        color: COLORS.greyScale800,
                    }]}>{type}</Text>
                    <Text style={[styles.doctorHospital, {
                        color: COLORS.greyScale800,
                    }]}>{date} | {time}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={onPress}>
                <Image
                    source={icon}
                    resizeMode='contain'
                    style={styles.nextIcon}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        height: 142,
        width: SIZES.width - 32,
        borderRadius: 32,
        backgroundColor: COLORS.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8,
    },
    doctorCard: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    doctorImage: {
        height: 110,
        width: 110,
        borderRadius: 16,
        marginHorizontal: 16,
    },
    doctorName: {
        fontSize: 18,
        color: COLORS.greyscale900,
        fontFamily: "Urbanist Bold",
        marginBottom: 8,
    },
    separateLine: {
        height: 1,
        width: "100%",
        backgroundColor: COLORS.grayscale200,
        marginVertical: 12,
    },
    doctorSpeciality: {
        fontSize: 12,
        color: COLORS.greyScale800,
        fontFamily: "Urbanist Medium",
        marginBottom: 8,
    },
    doctorHospital: {
        fontSize: 12,
        color: COLORS.greyScale800,
        fontFamily: "Urbanist Medium",
    },
    iconContainer: {
        height: 60,
        width: 60,
        backgroundColor: COLORS.tansparentPrimary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999,
        marginRight: 8,
    },
    nextIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.primary,
    },
});

export default CallCard;
