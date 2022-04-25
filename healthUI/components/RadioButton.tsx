import { View } from 'react-native';
import React, { FC, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';


export type Props = {
    /**
     * Value of the radio button
     */
    value: string;
    /**
     * Status of radio button.
     */
    status?: 'checked' | 'unchecked';
    /**
     * Whether radio is disabled.
     */
    selected?: boolean;

    /**
     * Function to execute on press.
     */
    onPress?: () => void;
    /**
     * Custom color for unchecked radio.
     */
    uncheckedColor?: string;
    /**
     * Custom color for radio.
     */
    color?: string;
};


// type Props = {
//     value: boolean
// }


export function RadioButton(props: Props) {

    // const [isChecked, setChecked] = useState<boolean>(value)

    return (

        <TouchableOpacity >
            <View style={[{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
            }, props.style]}>
                {
                    props.selected ?
                        <View style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: '#000',
                        }} />
                        : null
                }
            </View>

        </TouchableOpacity>

        // <TouchableOpacity onPress={() => setChecked(!isChecked)}>
        //     {isChecked ? <Feather name={'check-square'} size={24} color={'black'} />
        //         : <Feather name={'square'} size={24} color={'black'} />}
        // </TouchableOpacity>
    );



}