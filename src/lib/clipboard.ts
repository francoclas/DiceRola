import { Alert, Platform, Share } from 'react-native';

export async function setStringAsync(value: string): Promise<void> {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch (error) {
      // fallthrough
    }
  }

  if (Platform.OS !== 'web') {
    try {
      await Share.share({ message: value });
      return;
    } catch (error) {
      // ignore
    }
  }

  Alert.alert('Clipboard', 'Copy is not available in this environment.');
}

export async function getStringAsync(): Promise<string> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.readText) {
    try {
      return await navigator.clipboard.readText();
    } catch (error) {
      // ignore
    }
  }
  return '';
}
