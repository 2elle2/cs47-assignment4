import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';


export default function SoundPreviewScreen( {route} ) {
    const navigation = useNavigation();
    const { url } = route.params;

    return (
        <WebView
            source={{
                uri: url
            }}
        />
    )
}