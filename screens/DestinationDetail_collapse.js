import React, { useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    Animated,
} from 'react-native';

const H_MAX_HEIGHT = 150;
const H_MIN_HEIGHT = 52;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

const scrollOffsetY = new Animated.Value(0);

const headerScrollHeight = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
    extrapolate: 'clamp',
});

const DestinationDetail = ({ navigation }) => {

    // Render

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

                    <View style={{ padding: 20 }}>
                        <Text>React Native Collapsible Header</Text>
                    </View>

                    <View style={{ padding: 20, height: 200, backgroundColor: 'red' }}>
                        <Text>View 1</Text>
                    </View>

                    <View style={{ padding: 20, height: 200, backgroundColor: 'yellow' }}>
                        <Text>View 1</Text>
                    </View>

                    <View style={{ padding: 20, height: 200, backgroundColor: 'green' }}>
                        <Text>View 1</Text>
                    </View>

                    <View style={{ padding: 20, height: 200, backgroundColor: 'green' }}>
                        <Text>View 1</Text>
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
                <Image
                    source={{ uri: 'https://via.placeholder.com/300' }}
                    style={{ flex: 1 }}
                    resizeMode={'contain'}
                />
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
        padding: 10,
        backgroundColor: 'blue'
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
});

export default DestinationDetail;
