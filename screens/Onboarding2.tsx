import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageContainer from '../components/PageContainer';
import DotsView from '../components/DotsView';
import Button from '../components/Button';
import Onboarding1Styles from '../styles/OnboardingStyles';
import { COLORS, images } from '../constants';
import { useNavigation } from '@react-navigation/native';

type Nav = {
    navigate: (value: string) => void
}

const Onboarding2 = () => {
    const { navigate } = useNavigation<Nav>();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 1) {
                    clearInterval(intervalId);
                    return prevProgress;
                }
                return prevProgress + 0.5;
            });
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (progress >= 1) {
            // navigate to the onboarding3 screen 
            navigate('onboarding3')
        }
    }, [progress, navigate]);

    return (
        <SafeAreaView style={[Onboarding1Styles.container, {
            backgroundColor: COLORS.white
        }]}>
            <PageContainer>
                <View style={Onboarding1Styles.contentContainer}>
                    <Image
                        source={images.doctor1}
                        resizeMode="contain"
                        style={Onboarding1Styles.illustration}
                    />
                    <Image
                        source={images.ornament}
                        resizeMode='contain'
                        style={Onboarding1Styles.ornament}
                    />
                    <View style={Onboarding1Styles.buttonContainer}>
                        <View style={Onboarding1Styles.titleContainer}>
                            <Text style={Onboarding1Styles.title}>Find Your Perfect</Text>
                            <Text style={Onboarding1Styles.subTitle}>MEDICAL CARE</Text>
                        </View>

                        <Text style={Onboarding1Styles.description}>
                            We simplify the process of finding the ideal medical care or specialist in the healthcare industry.
                        </Text>

                        <View style={Onboarding1Styles.dotsContainer}>
                            {progress < 1 && <DotsView progress={progress} numDots={4} />}
                        </View>
                        <Button
                            title="Next"
                            filled
                            onPress={() => navigate('onboarding2')}
                            style={Onboarding1Styles.nextButton}
                        />
                        <Button
                            title="Skip"
                            onPress={() => navigate('login')}
                            textColor={COLORS.primary}
                            style={Onboarding1Styles.skipButton}
                        />
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    );
};

export default Onboarding2;