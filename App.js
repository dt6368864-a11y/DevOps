import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';

export default function App() {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Justificación: useEffect se dispara cuando el componente se monta para traer los datos inmediatamente
  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    try {
      // Consumimos una API pública estable
      const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
      const resultado = await respuesta.json();
      setDatos(resultado);
    } catch (error) {
      console.error("Error cargando los datos de la API:", error);
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando rutas/datos...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Lista de Rutas / Usuarios</Text>
      <FlatList
        data={datos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.tarjeta}>
            <Text style={styles.nombre}>{item.name}</Text>
            <Text style={styles.detalle}>📧 {item.email}</Text>
            <Text style={styles.detalle}>🌐 {item.website}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 40 },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 15 },
  tarjeta: { backgroundColor: '#fff', padding: 15, marginHorizontal: 15, marginVertical: 6, borderRadius: 8, elevation: 2 },
  nombre: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  detalle: { fontSize: 14, color: '#666', marginTop: 4 }
});