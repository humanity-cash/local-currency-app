import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Image,
  SafeAreaView,
  Dimensions
} from "react-native";
import { Text } from "react-native-elements";
import { UserContext } from "src/contexts";
import { Modal, ModalHeader } from "src/shared/uielements";
import { modalViewBase, FontFamily } from "src/theme/elements";
import { colors } from "src/theme/colors";
import { UserType } from "src/auth/types";
import { getFeedContent } from "src/api/content";

const styles = StyleSheet.create({
  modalWrap: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 32,
    lineHeight: 45,
    marginBottom: 20,
    paddingBottom: 10,
  },
  headerTextB: {
    fontSize: 32,
    lineHeight: 45,
    marginBottom: 20,
    paddingBottom: 10,
    color: colors.purple,
  },
  bodyText: {
    fontSize: 16,
    color: colors.bodyText,
    lineHeight: 20,
  },
  bottomView: {
    marginBottom: 20,
  },
  imageView: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 360,
    borderRadius: 20
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  contentView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  contentText: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    lineHeight: 24,
    marginTop: 10,
  },
  contentTextB: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    lineHeight: 24,
    marginTop: 10,
    color: colors.purple,
  },
});

type PaymentPendingProps = {
  visible: boolean;
};

const PaymentPending = ({
  visible = false,
}: PaymentPendingProps): JSX.Element => {
  const { userType } = useContext(UserContext);
  const [image, setImage] = useState<string>("");
  const [imgW, setImgW] = useState<number>(0)
  const [imgH, setImgH] = useState<number>(0)

  useEffect(() => {
    fetchFeedData();
  }, []);

  const fetchFeedData = async () => {
    const feeds = await getFeedContent();
    const index = Math.floor(Math.random() * feeds.length)
    const feed = feeds[index]
    const widthRate = feed.contentType === "Values" ? 5
                    : feed.contentType === "DidYouKnow" ? 3
                    : 1
    setImgW((Dimensions.get('window').width - 40) / widthRate)
    setImage(feed.image);
  };

  return (
    <Modal visible={visible}>
      <View style={modalViewBase}>
        <ModalHeader />
        <ScrollView style={styles.modalWrap}>
          <Text
            style={
              userType === UserType.Customer
                ? styles.headerText
                : styles.headerTextB
            }
          >
            Pending...
          </Text>
          <Text style={styles.bodyText}>This usually takes 5-6 seconds</Text>
          <View style={styles.contentView}>
            <View style={styles.imageView}>
              { image?.length && 
                <Image
                  source={{uri: image}}
                  style={{width: imgW, height: imgH, alignSelf: 'center'}}
                  width={imgW}
                  height={imgH}
                  resizeMode={'contain'}
                  onLayout={(e) => {
                    Image.getSize(image, (width, height) => {
                      setImgH(imgW*height/width)
                    })
                  }}
              />}
            </View>
            <Text
              style={
                userType === UserType.Customer
                  ? styles.contentText
                  : styles.contentTextB
              }
            >
              Great Barrington mountain
            </Text>
          </View>
        </ScrollView>
        <SafeAreaView style={styles.bottomView}>
          <ActivityIndicator
            size="large"
            color={
              userType === UserType.Customer ? colors.darkGreen : colors.purple
            }
          />
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default PaymentPending;
