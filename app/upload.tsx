import { useState } from 'react';
import { Alert, Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadService } from '@/src/shared/apis/services/upload';
import { ENV } from '@/src/config';

export default function Index() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // ← only images, since the service uploads an image
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // ← bail out BEFORE uploading if the user cancelled
    if (result.canceled) return;

    const asset = result.assets[0];

    try {
      const res = await uploadService.uploadImage({
        uri: asset.uri,
        name: asset.fileName ?? 'photo.jpg',
        type: asset.mimeType ?? 'image/jpeg',
      });

      const imageUrl = (( ENV.apiUrlWithoutSuffixApi + res?.data?.url));
      Alert.alert('Success', 'Image uploaded successfully: ' + res.message);

      setImage(imageUrl);

    } catch (err: any) {
      Alert.alert('Upload failed', err?.message ?? 'Something went wrong');
    }
  };

  const takePhoto = async () => {
    try {
      console.log('▶️ takePhoto: requesting camera permission');
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      console.log('▶️ permission result:', permissionResult);

      if (!permissionResult.granted) {
        Alert.alert(
          'Permission required',
          'Permission to access the camera is required.'
        );
        return;
      }

      console.log('▶️ launching camera');
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,       // ← temporarily disable to rule out iOS bug
        aspect: [4, 3],
        quality: 0.5, // Try 0.2 to 0.5 for a good balance
      });
      console.log('▶️ camera result:', result);

      if (result.canceled) {
        console.log('▶️ user canceled');
        return;
      }

      const asset = result.assets[0];
      console.log('▶️ asset:', asset);

      setImage(asset.uri);

      const payload = {
        uri: asset.uri,
        name: asset.fileName ?? `photo_${Date.now()}.jpg`,
        type: asset.mimeType ?? 'image/jpeg',
      };
      console.log('▶️ upload payload:', payload);

      const res = await uploadService.uploadImage(payload);
      console.log('▶️ upload response:', res);

      Alert.alert('Success', 'Image uploaded successfully: ' + res.message);
    } catch (err: any) {
      console.error('❌ takePhoto error:', err);
      Alert.alert('Upload failed', err?.message ?? JSON.stringify(err));
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Take a photo" onPress={takePhoto} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
