import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>⚠️ Modo Pruebas de Mantenimiento Activo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8d7da' },
  texto: { color: '#721c24', fontWeight: 'bold', fontSize: 16 }
});