import React, { useState, FC } from 'react';
import { View, Text, StyleSheet, TextInput, TextInputProps, Image, ImageSourcePropType } from 'react-native';
import { COLORS, SIZES } from '../constants';

interface InputProps extends TextInputProps {
    id: string;
    icon?: string;
    errorText?: string[];
    onInputChanged: (id: string, text: string) => void;
}

const Input: FC<InputProps> = (props) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const onChangeText = (text: string) => {
        props.onInputChanged(props.id, text);
    };

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.inputContainer,
                    {
                        borderColor: isFocused ? COLORS.primary : COLORS.greyscale500,
                        backgroundColor: isFocused ? COLORS.tansparentPrimary : COLORS.greyscale500,
                    },
                ]}
            >
                {props.icon && (
                    <Image
                        source={props.icon as ImageSourcePropType}
                        style={[
                            styles.icon,
                            {
                                tintColor: isFocused ? COLORS.primary : '#BCBCBC',
                            },
                        ]}
                    />
                )}
                <TextInput
                    {...props}
                    onChangeText={onChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={[styles.input, { color: COLORS.black }]}
                    placeholder={props.placeholder}
                    placeholderTextColor={props.placeholderTextColor}
                    autoCapitalize="none"
                />
            </View>
            {props.errorText && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errorText}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding2,
        borderRadius: 12,
        borderWidth: 1,
        marginVertical: 5,
        flexDirection: 'row',
        height: 52,
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
        height: 20,
        width: 20,
        tintColor: '#BCBCBC',
    },
    input: {
        color: COLORS.black,
        flex: 1,
        fontFamily: "Urbanist Regular",
        fontSize: 14,
        paddingTop: 0,
    },
    errorContainer: {
        marginVertical: 4,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
});

export default Input;