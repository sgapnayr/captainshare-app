import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { CancelledBooking, CompletedBooking, UpcomingBooking } from '../tabs';
import { COLORS, icons, images, SIZES } from '../constants';

// Types
interface AppointmentProps {
  navigation: any;
}

const renderScene = SceneMap({
  first: UpcomingBooking,
  second: CompletedBooking,
  third: CancelledBooking,
});

type Route = {
  key: string;
  title: string;
};

type RenderLabelProps = {
  route: Route;
  focused: boolean;
};

const Appointment: React.FC<AppointmentProps> = ({ navigation }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState<number>(0);
  const [routes] = useState<Route[]>([
    { key: 'first', title: 'Upcoming' },
    { key: 'second', title: 'Completed' },
    { key: 'third', title: 'Cancelled' },
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: COLORS.primary,
      }}
      style={{
        backgroundColor: COLORS.white,
      }}
      activeColor={COLORS.primary}
      inactiveColor={COLORS.greyscale900}
      renderLabel={({ route, focused }: { route: Route; focused: boolean }) => (
        <Text style={[{
          color: focused ? COLORS.primary : "gray",
          fontSize: 16,
          fontFamily: "Urbanist SemiBold",
        }]}>
          {route.title}
        </Text>
      )}
    />
  );

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={images.logo}
              resizeMode='contain'
              style={styles.logoIcon}
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: COLORS.greyscale900 }]}>
            My Appointment
          </Text>
        </View>
        <TouchableOpacity>
          <Image
            source={icons.moreCircle}
            resizeMode='contain'
            style={[styles.moreIcon, { tintColor: COLORS.greyscale900 }]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: COLORS.white }]}>
      <View style={[styles.container, { backgroundColor: COLORS.white }]}>
        {renderHeader()}
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    width: SIZES.width - 32,
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIcon: {
    height: 24,
    width: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Urbanist Bold",
    color: COLORS.black,
    marginLeft: 16,
  },
  moreIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },
});

export default Appointment;