
import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/';
import { images, icons, COLORS, FONTS, SIZES } from '../constants';

const OptionItem = ({ bgColor, icon, label, onPress }) => {
    return (
        <TouchableOpacity
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            onPress={onPress}
        >
            <View style={[styles.shadow, { width: 60, height: 60 }]}>
                <LinearGradient
                    style={[{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: 'red' }]}
                    colors={bgColor}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    <Image
                        source={icon}
                        resizeMode="cover"
                        style={{
                            tintColor: COLORS.white,
                            width: 45,
                            height: 45,
                        }}
                    />
                </LinearGradient>
            </View>
            <Text style={{ marginTop: SIZES.base, color: COLORS.gray, ...FONTS.body3 }}>{label}</Text>
        </TouchableOpacity>
    )
}

const Home = ({ navigation }) => {

    // Dummy Data
    const [destinations, setDestinations] = React.useState([
        {
            id: 0,
            name: "Ski Villa",
            img: images.skiVilla,
        },
        {
            id: 1,
            name: "Climbing Hills",
            img: images.climbingHills,
        },
        {
            id: 2,
            name: "Frozen Hills",
            img: images.frozenHills,
        },
        {
            id: 3,
            name: "Beach",
            img: images.beach,
        },
    ]);

    // Render

    function renderDestinations(item, index, radius) {
        var destinationStyle = {};

        if (index == 0) {
            destinationStyle = { marginLeft: SIZES.padding, }
        }

        return (
            <TouchableOpacity
                style={{ justifyContent: 'center', marginHorizontal: SIZES.base, ...destinationStyle, alignItems: radius > 50 ? 'center' : 'flex-start' }}
                onPress={() => { navigation.navigate("ReadDetail") }}
            >
                <Image
                    source={item.img}
                    resizeMode="cover"
                    style={{
                        width: SIZES.width * 0.28,
                        height: '78%',
                        borderRadius: radius || 15
                    }}
                />

                <Text style={{ marginTop: SIZES.base / 2, ...FONTS.h4, color: COLORS.gray }}>{item.name}</Text>

            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView>
            <ScrollView style={{ flexDirection: 'column', backgroundColor: COLORS.lightGray }}>
                {/* Buttons options */}
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', marginTop: SIZES.padding, paddingHorizontal: SIZES.base }}>
                        <OptionItem
                            icon={icons.bible}
                            bgColor={['#46aeff', '#5884ff']}
                            label="Bíblia"
                            onPress={() => { console.log("Flight") }}
                        />
                        <OptionItem
                            icon={icons.school}
                            bgColor={['#fddf90', '#fcda13']}
                            label="Leitura"
                            onPress={() => { console.log("Train") }}
                        />
                        <OptionItem
                            icon={icons.church}
                            bgColor={['#e973ad', '#da5df2']}
                            label="Igrejas"
                            onPress={() => { console.log("Bus") }}
                        />
                        <OptionItem
                            icon={icons.newspaper}
                            bgColor={['#fcaba8', '#fe6bba']}
                            label="Notícias"
                            onPress={() => { console.log("Taxi") }}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: SIZES.radius, paddingHorizontal: SIZES.base }}>
                        <OptionItem
                            icon={icons.microphone}
                            bgColor={['#ffc465', '#ff9c5f']}
                            label="Hinário"
                            onPress={() => { console.log("Hotel") }}
                        />
                        <OptionItem
                            icon={icons.missions}
                            bgColor={['#7cf1fb', '#4ebefd']}
                            label="Missões"
                            onPress={() => { console.log("Eats") }}
                        />
                        <OptionItem
                            icon={icons.compass}
                            bgColor={['#7be993', '#46caaf']}
                            label="Jovens"
                            onPress={() => { console.log("Adventure") }}
                        />
                        <OptionItem
                            icon={icons.event}
                            bgColor={['#fca397', '#fc7b6c']}
                            label="Eventos"
                            onPress={() => { console.log("Event") }}
                        />
                    </View>
                </View>
                <View style={{ display: 'flex', marginBottom: 0, height: 200 }}>
                    <Text style={{ marginTop: SIZES.body2, marginBottom: SIZES.body2, marginHorizontal: SIZES.padding, ...FONTS.h2, color: COLORS.black, fontWeight: 'bold' }}>Destaque</Text>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={destinations}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item, index }) => renderDestinations(item, index)}
                    />
                </View>
                <View style={{ display: 'flex', marginBottom: 0, height: 200 }}>
                    <Text style={{ marginTop: SIZES.body2, marginBottom: SIZES.body2, marginHorizontal: SIZES.padding, ...FONTS.h2, color: COLORS.black, fontWeight: 'bold' }}>Podcast</Text>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={destinations}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item, index }) => renderDestinations(item, index, 80)}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
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

export default Home;
