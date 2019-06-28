Project Title
##MEME Generator##


#Getting Started#

1) User can load new image from his/her mobile phone from add image screen.
2) Once the user picks up an image from mobile, the user can add two texts(Top and bottom text) on the loaded image into add text screen. From this screen, the user can change the image as well. 
3) Once the user is done with text then they can save that particular image with text and user can also change color and move text and  save into his/her phone.
4) User can also see this all the edited(Bottom and top text) images with this application into my memes screen. 

#Prerequisites#
 
 version
 react-native-cli - 2.0.1
 react-native: 0.59.5
 
#Installing#

1) npm install -g react-native-cli
2) react-native init YourProjectName
3) cd YourProjectName
4) react-native run-android



#Running the tests#

1) react-native start
2) react-native run-android
3) react-native log-android

#Dependencies#

for image picker

1)yarn add react-native-image-picker

react-native link react-native-image-picker

import ImagePicker from 'react-native-image-picker';

2)yarn add react-native-view-shot

react-native link react-native-view-shot

import { captureScreen } from "react-native-view-shot";

3)yarn add rn-fetch-blob

react-native link rn-fetch-blob

import RNFetchBlob from "rn-fetch-blob";

4)yarn add react-native-fs

react-native link react-native-fs

import RNFS from 'react-native-fs'

5)yarn add native-base

react-native link native-base

import { Container, Header, Content, Card, CardItem, Body } from 'native-base'

#Built With#
React-native - The web framework used

