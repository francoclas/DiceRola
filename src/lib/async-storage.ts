import * as FileSystem from 'expo-file-system';

const STORAGE_DIR = `${FileSystem.documentDirectory || ''}async-storage/`;

async function ensureDir() {
  const info = await FileSystem.getInfoAsync(STORAGE_DIR);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(STORAGE_DIR, { intermediates: true });
  }
}

async function getPath(key: string) {
  await ensureDir();
  return `${STORAGE_DIR}${encodeURIComponent(key)}.json`;
}

export async function getItem(key: string): Promise<string | null> {
  const path = await getPath(key);
  try {
    const info = await FileSystem.getInfoAsync(path);
    if (!info.exists) return null;
    return FileSystem.readAsStringAsync(path);
  } catch (error) {
    console.warn('AsyncStorage getItem failed', error);
    return null;
  }
}

export async function setItem(key: string, value: string): Promise<void> {
  const path = await getPath(key);
  try {
    await FileSystem.writeAsStringAsync(path, value);
  } catch (error) {
    console.warn('AsyncStorage setItem failed', error);
  }
}

export async function removeItem(key: string): Promise<void> {
  const path = await getPath(key);
  try {
    const info = await FileSystem.getInfoAsync(path);
    if (info.exists) {
      await FileSystem.deleteAsync(path);
    }
  } catch (error) {
    console.warn('AsyncStorage removeItem failed', error);
  }
}

export async function clear(): Promise<void> {
  try {
    const info = await FileSystem.getInfoAsync(STORAGE_DIR);
    if (info.exists) {
      await FileSystem.deleteAsync(STORAGE_DIR, { idempotent: true });
    }
  } catch (error) {
    console.warn('AsyncStorage clear failed', error);
  }
}

const AsyncStorage = { getItem, setItem, removeItem, clear };
export default AsyncStorage;
