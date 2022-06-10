import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { COLORS, icons } from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList } from 'react-native-gesture-handler';
export default function SearchScreen({ navigation }) {
    const DATA = [
        {
            id: 1,
            title: 'Este é o texto do artigo',
            author: 'Walter Alexander',
            imageURL: 'https://www.snopes.com/tachyon/2021/04/la-jument-1989-e1619716892518.jpg?resize=865%2C452&crop_strategy=smart',
        },
        {
            id: 2,
            title: 'Este é o texto do artigo',
            author: 'Walter Alexander',
            imageURL: 'https://www.snopes.com/tachyon/2021/04/la-jument-1989-e1619716892518.jpg?resize=865%2C452&crop_strategy=smart',
        },
        {
            id: 3,
            title: 'Este é o texto do artigo',
            author: 'Walter Alexander',
            imageURL: 'https://www.snopes.com/tachyon/2021/04/la-jument-1989-e1619716892518.jpg?resize=865%2C452&crop_strategy=smart',
        },
        {
            id: 4,
            title: 'Este é o texto do artigo',
            author: 'Walter Alexander',
            imageURL: 'https://www.snopes.com/tachyon/2021/04/la-jument-1989-e1619716892518.jpg?resize=865%2C452&crop_strategy=smart',
        },
        {
            id: 5,
            title: 'Este é o texto do artigo',
            author: 'Walter Alexander',
            imageURL: 'https://www.snopes.com/tachyon/2021/04/la-jument-1989-e1619716892518.jpg?resize=865%2C452&crop_strategy=smart',
        },
        {
            id: 6,
            title: 'Este é o texto do artigo',
            author: 'Walter Alexander',
            imageURL: 'https://www.snopes.com/tachyon/2021/04/la-jument-1989-e1619716892518.jpg?resize=865%2C452&crop_strategy=smart',
        },
    ];

    const Item = ({ item }) => (
        <TouchableOpacity onPress={() => { navigation.navigate('ReadDetail'); }}>
            <View style={styles.item}>
                <Image
                    source={{ uri: item.imageURL }}
                    resizeMode="cover"
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 5,
                    }}
                />
                <View style={{ paddingLeft: 10, justifyContent: 'center' }}>
                    <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>{item.title}</Text>
                    <Text style={{ color: COLORS.gray }}>Por: {item.author}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Image
                                source={icons.br_flag}
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 3
                                }}
                            />
                        </View>
                        <View>
                            <Image
                                source={icons.uk_flag}
                                style={{
                                    width: 20,
                                    height: 20
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity >
    );

    const renderItem = ({ item }) => (
        <Item item={item} />
    );

    return (
        <SafeAreaView>
            <View style={styles.header}>
                <View style={styles.searchbar}>
                    <TouchableOpacity>
                        <TextInput style={styles.textInput} />
                    </TouchableOpacity>
                    <Icon
                        name="magnify"
                        size={30}
                        color={COLORS.gray}
                    />
                </View>
            </View>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    searchbar: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingRight: 5,
        borderRadius: 5,
        marginTop: 10,
    },
    textInput: {
        width: 295,
        height: 45,
        backgroundColor: COLORS.white,
        color: COLORS.gray,
        borderRadius: 5,
    },
    item: {
        backgroundColor: COLORS.white,
        borderRadius: 5,
        padding: 10,
        marginVertical: 3,
        marginHorizontal: 16,
        height: 100,
        flexDirection: 'row',
    },
});
