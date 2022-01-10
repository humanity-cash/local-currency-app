import { Business } from "@humanity.cash/types";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Image, Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useBusinesses } from "src/hooks";
import {
  BackBtn,
  CancelBtn,
  Header,
  Modal,
  ModalHeader
} from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
  modalViewBase,
  underlineHeader,
  viewBase,
  wrappingContainerBase
} from "src/theme/elements";
import { MerchantEntry } from "src/utils/types";

type CategoryViewProps = {
  category: string;
  businesses: MerchantEntry[];
  onSelect: (item: MerchantEntry) => void;
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    fontWeight: "400",
    lineHeight: 40
  },
  underlineView: {
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGreen
  },
  content: {
    paddingBottom: 40
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "bold"
  },
  popularMerchantView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20
  },
  popularTextView: {
    width: "60%",
    fontSize: 16
  },
  popularTitle: {
    fontSize: 18,
    lineHeight: 18,
    fontWeight: "bold"
  },
  popularText: {
    paddingTop: 10,
    fontSize: 16,
    lineHeight: 20
  },
  popularImage: {
    width: 110,
    height: 150,
    borderRadius: 5
  },
  image: {
    width: 96,
    height: 132,
    borderRadius: 5
  },
  merchantsView: {
    flexDirection: "row",
    overflow: "scroll"
  },
  merchantItem: {
    width: 105,
    alignItems: "center"
  },
  text: {
    fontSize: 10,
    textAlign: "center"
  },
  modalWrap: {
    paddingHorizontal: 10,
    marginBottom: 10
  },
  modalHeader: {
    fontSize: 26,
    lineHeight: 45,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGreen
  },
  feedView: {
    backgroundColor: colors.lightGreen1,
    padding: 20
  },
  feedImage: {
    alignItems: "center",
    width: "100%",
    height: 203,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20
  },
  rightText: {
    fontSize: 14,
    textAlign: "right",
    alignSelf: "stretch"
  }
});

const CategoryView = (props: CategoryViewProps) => {
  const category: string = props.category;
  const businesses: MerchantEntry[] = props.businesses;

  return (
    <View>
      <View style={styles.underlineView}>
        <Text style={styles.categoryText}>{category}</Text>
      </View>
      <ScrollView horizontal={true} style={styles.merchantsView}>
        {businesses.map((item: MerchantEntry, idx: number) => (
          <TouchableOpacity
            style={styles.merchantItem}
            key={idx}
            onPress={() => props.onSelect(item)}
          >
            <Image
              source={require("../../../../assets/images/feed1.png")}
              containerStyle={styles.image}
            />
            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const MerchantDictionary = (): JSX.Element => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<MerchantEntry>({
    title: "",
    description: "",
    image: "",
    addressLine1: "",
    addressLine2: "",
    phone: ""
  });
  const businesses = useBusinesses();

  const bussinessByCategories = businesses.reduce<any>(
    (acc, curr: Business) => {
      const formattedCurr = {
        title: curr.tag,
        description: curr.story,
        image: "",
        addressLine1: curr.address1,
        addressLine2: curr.address2,
        phone: curr.phoneNumber
      };
      if (curr.industry) {
        if (acc[curr.industry]) {
          const newValue = [...acc[curr.industry], formattedCurr];
          acc[curr.industry] = newValue;
        } else {
          acc[curr.industry] = [formattedCurr];
        }
      }
      return acc;
    },
    {}
  );

  const handleSelect = (item: MerchantEntry) => {
    setSelected(item);
    setIsVisible(true);
  };

  const handleDeSelect = () => {
    setSelected({
      title: "",
      description: "",
      image: "",
      addressLine1: "",
      addressLine2: "",
      phone: ""
    });
    setIsVisible(false);
  };

  return (
    <View style={viewBase}>
      <Header
        leftComponent={
          <BackBtn text="Home" onClick={() => navigation.goBack()} />
        }
      />
      <View style={wrappingContainerBase}>
        <View style={underlineHeader}>
          <Text style={styles.headerText}>Where to spend</Text>
        </View>
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.underlineView}>
              <Text style={styles.categoryText}>MERCHANT OF THE MONTH</Text>
            </View>
            {Object.keys(bussinessByCategories).length > 0 && (
              <TouchableOpacity
                style={styles.popularMerchantView}
                onPress={() =>
                  handleSelect(
                    bussinessByCategories[
                      Object.keys(bussinessByCategories)[0]
                    ][0]
                  )
                }
              >
                <View style={styles.popularTextView}>
                  <Text style={styles.popularTitle}>
                    {"Best Of The Month Title"}
                  </Text>
                  <Text style={styles.popularText}>
                    {"Best Of The Month Description"}
                  </Text>
                </View>
                <Image
                  source={require("../../../../assets/images/feed1.png")}
                  containerStyle={styles.popularImage}
                />
              </TouchableOpacity>
            )}
            {Object.keys(bussinessByCategories).map(
              (category: string, idx: number) => (
                <CategoryView
                  businesses={bussinessByCategories[category]}
                  category={category}
                  onSelect={handleSelect}
                  key={idx}
                />
              )
            )}
          </View>
        </ScrollView>
      </View>
      {isVisible && (
        <Modal visible={isVisible}>
          <View style={modalViewBase}>
            <ModalHeader
              rightComponent={
                <CancelBtn text="Close" onClick={handleDeSelect} />
              }
            />
            <ScrollView style={styles.modalWrap}>
              <Text style={styles.modalHeader}>{selected.title}</Text>
              <View style={styles.feedView}>
                <Text h2>{selected.title}</Text>
                <Text style={styles.popularText}>{selected.description}</Text>
                <Image
                  source={require("../../../../assets/images/feed1.png")}
                  containerStyle={styles.feedImage}
                />
                <Text style={styles.rightText}>{selected.addressLine1}</Text>
                <Text style={styles.rightText}>{selected.addressLine2}</Text>
                <Text style={styles.rightText}>{selected.phone}</Text>
              </View>
            </ScrollView>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default MerchantDictionary;
