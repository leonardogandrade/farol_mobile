import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Sound from 'react-native-sound';
import { COLORS } from '../constants';

Sound.setCategory('Playback');

let audio;

export default function CustomPlayer({ audioURL }) {
    const [playing, setPlaying] = useState();

    useEffect(() => {
        audio = new Sound(
            audioURL, null,
            error => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }
                // if loaded successfully
                console.log(
                    'duration in seconds: ' +
                    audio.getDuration() +
                    'number of channels: ' +
                    audio.getNumberOfChannels(),
                );
            },
        );
        audio.setVolume(1);
        return () => {
            audio.release();
        };
    }, [audioURL]);

    const PlaySound = () => {
        if (audio.isPlaying()) {
            audio.pause();
            setPlaying(false);
        } else {
            setPlaying(true);
            audio.play(success => {
                if (success) {
                    setPlaying(false);
                    console.log('successfully finished playing');
                } else {
                    setPlaying(false);
                    console.log('playback failed due to audio decoding errors');
                }
            });
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={PlaySound}>
                <Icon
                    name={playing ? 'pause-circle-outline' : 'play-circle-outline'}
                    size={70}
                    color={COLORS.blue}
                />
            </TouchableOpacity>
            <Slider
                style={styles.player}
                minimumTrackTintColor={COLORS.blue}
                maximumTrackTintColor={COLORS.blue}
                thumbTintColor={COLORS.blue}
                minimumValue={0}
                maximumValue={1}
                onValueChange={(value) => {
                    audio.setCurrentTime(value * audio.getDuration());
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 330,
        height: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    player: {
        width: 250,
        height: 40,
    },
});
