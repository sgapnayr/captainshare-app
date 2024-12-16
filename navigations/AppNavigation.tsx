import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  AddNewAddress,
  AddNewCard,
  Address,
  ArticlesDetails,
  ArticlesSeeAll,
  BookAppointment,
  CancelAppointment,
  CancelAppointmentPaymentMethods,
  Categories,
  ChangeEmail,
  ChangePassword,
  ChangePIN,
  Chat,
  CreateNewPassword,
  CreateNewPIN,
  CustomerService,
  DoctorDetails,
  DoctorReviews,
  EditProfile,
  EnterYourPIN,
  Ereceipt,
  Favourite,
  FillYourProfile,
  Fingerprint,
  ForgotPasswordEmail,
  ForgotPasswordMethods,
  ForgotPasswordPhoneNumber,
  Home,
  LeaveReview,
  Login,
  Messaging,
  MyAppointmentMessaging,
  MyAppointmentVideoCall,
  MyAppointmentVoiceCall,
  MyBookmarkedArticles,
  Notifications,
  Onboarding1,
  Onboarding2,
  Onboarding3,
  Onboarding4,
  OtpVerification,
  PatientDetails,
  PaymentMethods,
  RescheduleAppointment,
  ReviewSummary,
  Search,
  SelectPackage,
  SelectRescheduleAppointmentDate,
  SessionEnded,
  SettingsHelpCenter,
  SettingsInviteFriends,
  SettingsLanguage,
  SettingsNotifications,
  SettingsPayment,
  SettingsPrivacyPolicy,
  SettingsSecurity,
  Signup,
  TopDoctors,
  TopupConfirmPIN,
  TopupEreceipt,
  TopupEwalletAmount,
  TopupMethods,
  TrendingArticles,
  VideoCall,
  VideoCallHistoryDetails,
  VideoCallHistoryDetailsPlayRecordings,
  VoiceCall,
  VoiceCallHistoryDetails,
  VoiceCallhistoryDetailsRecordings,
  Welcome,
} from '../screens';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkIfFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem('alreadyLaunched');
        if (value === null) {
          await AsyncStorage.setItem('alreadyLaunched', 'true');
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        setIsFirstLaunch(false);
      }
      setIsLoading(false); // Set loading state to false once the check is complete
    };

    checkIfFirstLaunch();
  }, []);

  if (isLoading) {
    return null; // Render a loader or any other loading state component
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        // replace the second onboaring1 with login in order to make the user not to see the onboarding
        // when login the next time
        initialRouteName={isFirstLaunch ? 'onboarding1' : 'welcome'}>
        <Stack.Screen name="addnewaddress" component={AddNewAddress} />
        <Stack.Screen name="addnewcard" component={AddNewCard} />
        <Stack.Screen name="address" component={Address} />
        <Stack.Screen name="articlesdetails" component={ArticlesDetails} />
        <Stack.Screen name="articlesseeall" component={ArticlesSeeAll} />
        <Stack.Screen name="bookappointment" component={BookAppointment} />
        <Stack.Screen name="cancelappointment" component={CancelAppointment} />
        <Stack.Screen
          name="cancelappointmentpaymentmethods"
          component={CancelAppointmentPaymentMethods}
        />
        <Stack.Screen name="categories" component={Categories} />
        <Stack.Screen name="changeemail" component={ChangeEmail} />
        <Stack.Screen name="changepassword" component={ChangePassword} />
        <Stack.Screen name="changepin" component={ChangePIN} />
        <Stack.Screen name="chat" component={Chat} />
        <Stack.Screen name="createnewpassword" component={CreateNewPassword} />
        <Stack.Screen name="createnewpin" component={CreateNewPIN} />
        <Stack.Screen name="customerservice" component={CustomerService} />
        <Stack.Screen name="doctordetails" component={DoctorDetails} />
        <Stack.Screen name="doctorreviews" component={DoctorReviews} />
        <Stack.Screen name="editprofile" component={EditProfile} />
        <Stack.Screen name="enteryourpin" component={EnterYourPIN} />
        <Stack.Screen name="ereceipt" component={Ereceipt} />
        <Stack.Screen name="favourite" component={Favourite} />
        <Stack.Screen name="fillyourprofile" component={FillYourProfile} />
        <Stack.Screen name="fingerprint" component={Fingerprint} />
        <Stack.Screen
          name="forgotpasswordemail"
          component={ForgotPasswordEmail}
        />
        <Stack.Screen
          name="forgotpasswordmethods"
          component={ForgotPasswordMethods}
        />
        <Stack.Screen
          name="forgotpasswordphonenumber"
          component={ForgotPasswordPhoneNumber}
        />
        <Stack.Screen name="index" component={Home} />
        <Stack.Screen name="leavereview" component={LeaveReview} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="messaging" component={Messaging} />
        <Stack.Screen
          name="myappointmentvoicecall"
          component={MyAppointmentVoiceCall}
        />
        <Stack.Screen
          name="myappointmentmessaging"
          component={MyAppointmentMessaging}
        />
        <Stack.Screen
          name="myappointmentvideocall"
          component={MyAppointmentVideoCall}
        />
        <Stack.Screen
          name="mybookmarkedarticles"
          component={MyBookmarkedArticles}
        />
        <Stack.Screen name="notifications" component={Notifications} />
        <Stack.Screen name="onboarding1" component={Onboarding1} />
        <Stack.Screen name="onboarding2" component={Onboarding2} />
        <Stack.Screen name="onboarding3" component={Onboarding3} />
        <Stack.Screen name="onboarding4" component={Onboarding4} />
        <Stack.Screen name="otpverification" component={OtpVerification} />
        <Stack.Screen name="patientdetails" component={PatientDetails} />
        <Stack.Screen name="paymentmethods" component={PaymentMethods} />
        <Stack.Screen
          name="rescheduleappointment"
          component={RescheduleAppointment}
        />
        <Stack.Screen name="reviewsummary" component={ReviewSummary} />
        <Stack.Screen name="search" component={Search} />
        <Stack.Screen name="selectpackage" component={SelectPackage} />
        <Stack.Screen
          name="selectrescheduleappointmentdate"
          component={SelectRescheduleAppointmentDate}
        />
        <Stack.Screen name="sessionended" component={SessionEnded} />
        <Stack.Screen
          name="settingshelpcenter"
          component={SettingsHelpCenter}
        />
        <Stack.Screen
          name="settingsinvitefriends"
          component={SettingsInviteFriends}
        />
        <Stack.Screen name="settingslanguage" component={SettingsLanguage} />
        <Stack.Screen
          name="settingsnotifications"
          component={SettingsNotifications}
        />
        <Stack.Screen name="settingspayment" component={SettingsPayment} />
        <Stack.Screen
          name="settingsprivacypolicy"
          component={SettingsPrivacyPolicy}
        />
        <Stack.Screen name="settingssecurity" component={SettingsSecurity} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="topdoctors" component={TopDoctors} />
        <Stack.Screen name="trendingarticles" component={TrendingArticles} />
        <Stack.Screen name="videocall" component={VideoCall} />
        <Stack.Screen
          name="videocallhistorydetails"
          component={VideoCallHistoryDetails}
        />
        <Stack.Screen
          name="videocallhistorydetailsplayrecordings"
          component={VideoCallHistoryDetailsPlayRecordings}
        />
        <Stack.Screen name="voicecall" component={VoiceCall} />
        <Stack.Screen
          name="voicecallhistorydetails"
          component={VoiceCallHistoryDetails}
        />
        <Stack.Screen
          name="voicecallhistorydetailsplayrecordings"
          component={VoiceCallhistoryDetailsRecordings}
        />
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="topupconfirmpin" component={TopupConfirmPIN} />
        <Stack.Screen name="topupereceipt" component={TopupEreceipt} />
        <Stack.Screen name="topupmethods" component={TopupMethods} />
        <Stack.Screen
          name="topupewalletamount"
          component={TopupEwalletAmount}
        />
        <Stack.Screen name="(tabs)" component={BottomTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
