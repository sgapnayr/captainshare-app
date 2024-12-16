import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import React from 'react';
import { COLORS, icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const VideoCallHistoryDetailsPlayRecordings = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <SafeAreaView style={styles.area}>
      <View style={styles.container}>
        <StatusBar
        />
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Image
              source={icons.back}
              resizeMode='contain'
              style={styles.arrowBackIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}></Text>
        </View>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: 'https://res.cloudinary.com/dho8a1gkq/video/upload/v1716195514/dotor_talking_h61xo3.mp4',
          }}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  arrowBackIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.white
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "Urbanist Bold",
    color: COLORS.white,
    textAlign: "center",
    marginLeft: 16
  },
  headerContainer: {
    position: "absolute",
    top: 16,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 9999
  },
  video: {
    width: "100%",
    height: "100%"
  }
})

export default VideoCallHistoryDetailsPlayRecordings