import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Animated,
} from 'react-native';

import api from '../service/api';
import { images, icons, COLORS, FONTS, SIZES } from '../constants';
import CustomPlayer from '../components/CustomPlayer';
const StarReview = ({ rate }) => {
    var starComponents = [];
    var fullStar = Math.floor(rate)
    var noStar = Math.floor(5 - rate)
    var halfStar = 5 - fullStar - noStar

    // Full Star
    for (var i = 0; i < fullStar; i++) {
        starComponents.push(
            <Image
                key={`full-${i}`}
                source={icons.starFull}
                resizeMode="cover"
                style={{
                    width: 20,
                    height: 20,
                }}
            />
        )
    }

    // Half Star
    for (var i = 0; i < halfStar; i++) {
        starComponents.push(
            <Image
                key={`half-${i}`}
                source={icons.starHalf}
                resizeMode="cover"
                style={{
                    width: 20,
                    height: 20,
                }}
            />
        )
    }

    // No Star
    for (var i = 0; i < noStar; i++) {
        starComponents.push(
            <Image
                key={`empty-${i}`}
                source={icons.starEmpty}
                resizeMode="cover"
                style={{
                    width: 20,
                    height: 20,
                }}
            />
        )
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {starComponents}
            {/* <Text style={{ marginLeft: SIZES.base, color: COLORS.gray, ...FONTS.body3 }}>{rate}</Text> */}
        </View>
    )
}

const IconLabel = ({ icon, label }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Image
                source={icon}
                resizeMode="cover"
                style={{
                    width: 50,
                    height: 50,
                }}
            />
            <Text style={{ marginTop: SIZES.padding, color: COLORS.gray, ...FONTS.h3 }}>{label}</Text>
        </View>
    )
}

const H_MAX_HEIGHT = 350;
const H_MIN_HEIGHT = 210;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

const scrollOffsetY = new Animated.Value(0);

const headerScrollHeight = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
    extrapolate: 'clamp',
});

const ReadDetail = ({ navigation }) => {
    const [devotional, setDevotional] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                let date = new Date();
                const cur_month = date.getMonth() + 1
                const month = cur_month.toString().padStart(2, '0');
                const current_date = `${date.getFullYear()}-${month}-${date.getDate()}`;
                const result = await api.get(`/devotional/${current_date}`);
                setDevotional(result.data);
            } catch (err) {
                console.log(`ERROR: ${err}`);
            }
        };
        getData();
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                    { useNativeDriver: false })}
                scrollEventThrottle={16}
            >
                <View style={{ paddingTop: H_MAX_HEIGHT }}>
                    {/** Page contant goes here **/}


                    <View style={{ flex: 1.5 }}>
                        {/* Icons */}
                        <View style={{
                            flexDirection: 'row',
                            marginTop: SIZES.base,
                            paddingHorizontal: SIZES.padding * 2,
                            justifyContent: 'space-between',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {/* <IconLabel
                                icon={icons.villa}
                                label="Villa"
                            />

                            <IconLabel
                                icon={icons.parking}
                                label="Parking"
                            />

                            <IconLabel
                                icon={icons.wind}
                                label="4 °C"
                            /> */}
                            <CustomPlayer audioURL={'https://thready.com.br/wp-content/uploads/2022/05/Ensina-nos-a-viver.mp3'} />
                        </View>

                        {/* About */}
                        <View style={{ marginTop: SIZES.padding, paddingHorizontal: SIZES.padding }}>
                            <Text style={{ ...FONTS.h2, color: COLORS.black }}>Meditação</Text>
                            <Text style={{ marginTop: SIZES.radius, color: COLORS.gray, ...FONTS.body3, textAlign: 'justify' }}>
                                {devotional.meditation?.replace(/[.*]\n/g, '\n\n')}
                            </Text>
                            <Text style={{ ...FONTS.h2, color: COLORS.black, marginTop: SIZES.radius }}>Aplicação</Text>
                            <Text style={{ marginTop: SIZES.radius, color: COLORS.gray, ...FONTS.body3, textAlign: 'justify' }}>
                                {devotional.application?.replace(/[.*]\n/g, '\n\n')}
                            </Text>
                            <Text style={{ ...FONTS.h2, color: COLORS.black, marginTop: SIZES.radius }}>Oração</Text>
                            <Text style={{ marginTop: SIZES.radius, color: COLORS.gray, ...FONTS.body3, textAlign: 'justify' }}>
                                {devotional.pray?.replace(/[.*]\n/g, '\n\n')}
                            </Text>
                            <Text></Text>
                        </View>
                    </View>

                </View>
            </ScrollView>

            {
                /** 
                 * We put the header at the bottom of
                 * our JSX or it will not take priority
                 * on Android (for some reason, simply
                 * setting zIndex does not work)
                 **/
            }
            <Animated.View
                style={styles.header}
            >
                <View style={styles.container}>
                    <View style={{ flex: 2 }}>
                        <Image
                            source={{ uri: 'https://www.snopes.com/tachyon/2021/04/la-jument-1989-e1619716892518.jpg?resize=865%2C452&crop_strategy=smart' }}
                            resizeMode="cover"
                            style={{
                                width: '100%',
                                height: '80%',
                            }}
                        />
                        <View
                            style={[{
                                position: 'absolute',
                                bottom: "5%",
                                left: "2%",
                                right: "2%",
                                borderRadius: 15,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.white,
                            }, styles.shadow]}
                        >
                            <View style={{ flexDirection: 'row', marginBottom: -18 }}>
                                <View style={styles.shadow}>
                                    <Image
                                        source={images.walter}
                                        resizeMode="cover"
                                        style={{
                                            width: 75,
                                            height: 75,
                                            borderRadius: 15,
                                        }}
                                    />
                                </View>

                                <View style={{ marginHorizontal: SIZES.radius, height: 40 }}>
                                    <Text style={{ ...FONTS.h3, color: COLORS.black }}>Aquele que domina o tempo.</Text>
                                    <Text style={{ color: COLORS.gray, ...FONTS.body3, marginTop: 0, marginBottom: 10 }}>Por: Walter Alexander</Text>

                                    <StarReview
                                        rate={5}
                                    />
                                </View>
                            </View>

                            <View style={{ marginTop: SIZES.radius }}>
                                <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
                                    {/* Ski Villa offers simple rooms with mountain views in front of the ski lift to the Ski Resort */}
                                </Text>
                            </View>
                        </View>

                        {/* Header Buttons */}
                        <View
                            style={{
                                position: 'absolute',
                                top: 15,
                                left: 20,
                                right: 20,
                                height: 50,
                                flexDirection: 'row',
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    onPress={() => { navigation.navigate('Home') }}
                                >
                                    <Image
                                        source={icons.back}
                                        resizeMode="cover"
                                        style={{
                                            width: 30,
                                            height: 30,
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <TouchableOpacity
                                    onPress={() => { console.log("Menu on pressed") }}
                                >
                                    <Image
                                        source={icons.menu}
                                        resizeMode="cover"
                                        style={{
                                            width: 30,
                                            height: 30,
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: headerScrollHeight,
        width: '100%',
        overflow: 'hidden',
        zIndex: 999,
        borderBottomColor: '#EFEFF4',
        borderBottomWidth: 2,
        padding: 0,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#efefef',
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
});

export default ReadDetail;
