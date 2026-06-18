import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';

export default function App() {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  
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
        <Text style={styles.cargaTexto}>Cargando rutas/datos...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      
      {/* SECCIÓN DE HOTFIX DE MANTENIMIENTO INTEGRADA */}
      <View style={styles.mantenimientoBox}>
        <Text style={styles.alertaTexto}>⚠️ Modo Pruebas de Mantenimiento Activo</Text>
      </View>

      {/* FUNCIONALIDAD PRINCIPAL: CONSUMO DE API */}
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
  // Estilos de la base y la API
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 10 },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  cargaTexto: { marginTop: 10, fontSize: 14, color: '#555' },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 15, color: '#1a365d' },
  tarjeta: { backgroundColor: '#fff', padding: 15, marginHorizontal: 15, marginVertical: 6, borderRadius: 8, elevation: 2 },
  nombre: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  detalle: { fontSize: 14, color: '#666', marginTop: 4 },
  
  // Estilos del Hotfix de Mantenimiento fusionados
  mantenimientoBox: { backgroundColor: '#f8d7da', padding: 12, marginHorizontal: 15, marginTop: 20, borderRadius: 6, borderWidth: 1, borderColor: '#f5c6cb' },
  alertaTexto: { color: '#721c24', fontWeight: 'bold', fontSize: 14, textAlign: 'center' }
});