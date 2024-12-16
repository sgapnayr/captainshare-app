import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS } from '../constants';

interface PackageItemProps {
    checked: boolean; // Indicates whether the item is checked
    onPress: () => void; // Callback function to handle press events
    title: string; // Title of the package
    subtitle: string; // Subtitle or description of the package
    price: string; // Price of the package
    duration: string; // Duration of the package
    icon: any; // The icon image source, can be a number or object
}

const PackageItem: React.FC<PackageItemProps> = ({
    checked,
    onPress,
    title,
    subtitle,
    price,
    duration,
    icon,
}) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, {
                backgroundColor: COLORS.white
            }]}>
            <View style={styles.rightContainer}>
                <View style={styles.iconContainer}>
                    <Image
                        source={icon}
                        resizeMode='contain'
                        style={styles.icon}
                    />
                </View>
                <View>
                    <Text style={[styles.title, {
                        color: COLORS.black
                    }]}>{title}</Text>
                    <Text style={[styles.subtitle, {
                        color: "gray"
                    }]}>{subtitle}</Text>
                </View>
            </View>
            <View style={styles.leftContainer}>
                <View>
                    <Text style={[styles.title, {
                        color: COLORS.primary
                    }]}>${price}</Text>
                    <Text style={[styles.subtitle, {
                        color: "gray"
                    }]}>/{duration}</Text>
                </View>
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
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderRadius: 16,
        paddingVertical: 12,
        paddingHorizontal: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
        backgroundColor: COLORS.white
    },
    rightContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    iconContainer: {
        height: 60,
        width: 60,
        backgroundColor: COLORS.tansparentPrimary,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12
    },
    icon: {
        height: 28,
        width: 28,
        tintColor: COLORS.primary
    },
    title: {
        fontSize: 16,
        fontFamily: "Urbanist Bold",
        color: COLORS.black,
        marginBottom: 8
    },
    subtitle: {
        fontSize: 12,
        fontFamily: "Urbanist Medium",
        color: "gray"
    },
    leftContainer: {
        flexDirection: "row",
        alignItems: "center"
    }
})

export default PackageItem;
