import { Business } from "@humanity.cash/types";
import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Linking, Platform, Dimensions, Image, TouchableOpacity } from 'react-native';
import ReadMore from 'react-native-read-more-text';
import { Text } from "react-native-elements";
import { profilePictureUrl } from "src/utils/common";
import { useBusinesses } from "src/hooks";
import {
  BackBtn,
  CancelBtn,
  Header,
  Modal,
  ModalHeader,
} from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
  modalViewBase,
  underlineHeader,
  viewBase,
  wrappingContainerBase,
} from "src/theme/elements";
import { MerchantEntry } from "src/utils/types";
import { FeedItemProps } from '../../../api/types';
import { getMonthOfTheBusiness } from '../../../api/content';
import { FontFamily } from "src/theme/elements";
import { Industry } from "src/utils/types";

type CategoryViewProps = {
  category: string;
  businesses: MerchantEntry[];
  onSelect: (item: MerchantEntry) => void;
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    fontFamily: FontFamily.bold,
    lineHeight: 40,
  },
  detailHeaderText: {
    fontSize: 24,
    fontFamily: FontFamily.bold,
  },
  underlineView: {
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGreen,
  },
  content: {
    paddingBottom: 40,
  },
  categoryText: {
    fontSize: 10,
    fontFamily: FontFamily.bold,
  },
  popularMerchantView: {
    paddingTop: 20,
    flexDirection: 'row',
    flex: 1
  },
  popularTitle: {
    fontSize: 18,
    lineHeight: 18,
    fontFamily: FontFamily.bold,
    paddingBottom: 10
  },
  popularText: {
    fontSize: 16,
    lineHeight: 20,
    paddingTop: 10
  },
  popularImage: {
    borderRadius: 5
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 5,
  },
  merchantsView: {
    flexDirection: "row",
    overflow: "scroll",
  },
  merchantItem: {
    width: 105,
    alignItems: "center",
  },
  text: {
    fontSize: 10,
    textAlign: "center",
    lineHeight: 12,
    paddingTop: 8
  },
  modalWrap: {
    paddingHorizontal: 10,
    marginBottom: 10,
    flex: 1
  },
  modalHeader: {
    fontSize: 26,
    lineHeight: 34,
  },
  feedView: {
    backgroundColor: colors.lightGreen1,
    padding: 20,
    borderRadius: 4,
    marginTop: 30
  },
  feedImage: {
    alignItems: "center",
    width: "100%",
    height: 203,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  websiteView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  websiteImage: {
    width: 16,
    height: 16,
    marginEnd: 4
  },
  rightText: {
    fontSize: 14,
    textAlign: "right",
    alignSelf: "stretch",
  },
  phoneV: {
    borderBottomWidth: 0.5, 
    alignSelf: 'flex-end'
  },
  detailV: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
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
                source={{ uri: item.image }}
                style={styles.image}
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
    phone: "",
    city: "",
    state: "",
    postalCode: "",
    website: ""
  });
  const [monthBusiness, setMonthBusiness] = useState<FeedItemProps | null>(null)
  const [categoryH, setCategoryH] = useState<number>(0)
  const [bussinessByCategories, setBussinessByCategories] = useState<any>({})
  const [showIndustries, setShowIndustries] = useState<Industry[]>([])
  const [bomH, setBomH] = useState<number>(0)
  const businesses = useBusinesses();
  const mW = Dimensions.get('window').width

  const industries = [
    Industry.SHOPPING,
    Industry.FOOD_DRINK,
    Industry.ARTS_ENTERTAINMENT,
    Industry.HEALTH_WELLNESS,
    Industry.COMMUNITY_EDUCATION,
    Industry.SERVICES,
    Industry.FARMS
  ];

  useEffect(() => {
    const categories: Industry[] = industries.filter((category) => {
      const filters = businesses.filter(({industry}) => {
        return industry.toLowerCase() === category.toLowerCase()
      })
      return filters.length > 0
    })
    let retBusinesses: any = {}
    
    categories.forEach((industry) => {
      const filteredBusinesses = businesses.filter((biz) => {
        return industry.toLowerCase() === biz.industry.toLowerCase()
              || (industry === Industry.COMMUNITY_EDUCATION && biz.industry.toLowerCase() === "communication & education")
      })

      const catBusinesses =  filteredBusinesses.reduce<any>(
        (acc, curr: Business) => {
          const formattedCurr = {
            title: curr.tag,
            description: curr.story,
            //@ts-ignore
            image: profilePictureUrl(`${curr.dwollaId}_banner`),
            addressLine1: curr.address1,
            addressLine2: curr.address2,
            phone: curr.phoneNumber,
            city: curr.city,
            state: curr.state,
            postalCode: curr.postalCode,
            website: curr?.website
          };
          if (acc[industry]) {
            const newValue = [...acc[industry], formattedCurr];
            acc[industry] = newValue;
          } else {
            acc[industry] = [formattedCurr];
          }
          return acc;
        },
        {}
      );
      
      retBusinesses = {...retBusinesses, ...catBusinesses}
    })

    setBussinessByCategories(retBusinesses)
    setShowIndustries(categories)
  }, [businesses])
  
  useEffect(() => {
    fetchMonthOfTheBusiness()
  }, [])

  const fetchMonthOfTheBusiness = async () => {
    const data = await getMonthOfTheBusiness();
    if(data.length > 0) {
      setMonthBusiness(data[0]);
    }
  }

  const formatPhone = (phone: string) => {
      if(!phone) return ''
    const x = phone.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
    if(x) {
      return '(' + x[1] + ') ' + x[2] + '-' + x[3];
    } else {
      return phone
    }
  }

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
      phone: "",
      city: "",
      state: "",
      postalCode: "",
      website: ""
      });
    setIsVisible(false);
  };

  const handleWebsite = (url: string) => {
    Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        Linking.openURL(`https://${url}`);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => {
      console.log(err)
      Linking.openURL(`https://${url}`);
    });
  }

  const handlePhone = (phone: string) => {
    console.log('callNumber ----> ', phone);
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    }
    else  {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        alert('Phone number is not available');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(err => console.log(err));
  }

  const _renderTruncatedFooter = (handlePress: any) => {
    return (
      <Text style={{color: colors.mistakeRed, marginTop: 5}} onPress={handlePress}>
        Read more
      </Text>
    );
  }

  const _renderRevealedFooter = (handlePress: any) => {
    return (
      <Text style={{color: colors.mistakeRed, marginTop: 5}} onPress={handlePress}>
        Show less
      </Text>
    );
  }

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
          {monthBusiness && (
            <View>
              <View style={styles.underlineView}>
                <Text style={styles.categoryText}>FEATURED BUSINESS</Text>
              </View>
                <Image
                  source={{uri: monthBusiness.image}}
                  style={[styles.popularImage, {height: bomH}]}
                  onLayout={(e) => {
                    Image.getSize(monthBusiness.image, (width, height) => {
                      setBomH((mW-20)*height/width)
                    })
                  }}
                />
                <View
                  style={styles.popularMerchantView}
                >
                  <View style={{flex: 1}}>
                    <Text style={styles.popularTitle}>
                      {monthBusiness.textTitle}
                    </Text>
                    <ReadMore
                      numberOfLines={3}
                      renderTruncatedFooter={_renderTruncatedFooter}
                      renderRevealedFooter={_renderRevealedFooter}>
                      <Text style={styles.popularText}>
                        {monthBusiness.text}
                      </Text>
                    </ReadMore>
                  </View>
                </View>
              </View>
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
          <View style={[modalViewBase, {flex: 1, paddingBottom: 40}]}>
            <ModalHeader
              rightComponent={
                <CancelBtn text="Close" onClick={handleDeSelect} />
              }
            />
            <ScrollView style={styles.modalWrap}>
              {/* <View style={underlineHeader}>
                <Text style={styles.modalHeader}>{selected.title}</Text>
              </View> */}
              <View style={styles.feedView}>
                <Text style={styles.detailHeaderText}>{selected.title}</Text>
                <Text style={styles.popularText}>{selected.description}</Text>
                <Image
                    source={{uri: selected.image}}
                    style={[styles.feedImage, {height: categoryH}]}
                    resizeMode='contain'
                    onLayout={(e) => {
                      Image.getSize(selected.image, (width, height) => {
                        setCategoryH((mW-60)*height/width)
                      })
                    }}
                />

                <Text style={styles.rightText}>{selected.addressLine1 && selected.addressLine1}{selected.addressLine2 && `, ${selected.addressLine2}`}</Text>
                <Text style={styles.rightText}>{`${selected.city}, ${selected.state}, ${selected.postalCode}`}</Text>
                <View style={[styles.detailV]}>
                  { selected.website ?
                    <TouchableOpacity
                      style={styles.websiteView}
                      onPress={() => handleWebsite(selected.website)}>
                      <Image
                        source={require("../../../../assets/images/website.png")}
                        style={styles.websiteImage}
                      />
                      <Text 
                        ellipsizeMode='middle' 
                        style={{
                          width: mW-200, 
                          textDecorationLine: "underline"
                        }} 
                        numberOfLines={1}>
                          Website
                        </Text>
                    </TouchableOpacity>
                  : <View/>}
                  <TouchableOpacity 
                    style={styles.phoneV}
                    onPress={() => handlePhone(selected.phone)}>
                    <Text style={styles.rightText}>{selected.phone && formatPhone(selected.phone)}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default MerchantDictionary;
