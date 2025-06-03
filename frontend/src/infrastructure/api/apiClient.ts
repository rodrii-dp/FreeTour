import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiClient = axios.create({
  baseURL: 'https://hollow-lucretia-rodrigo-de-prat-9197ad55.koyeb.app/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token
apiClient.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error al obtener token:', error);
    }
    return config;
  },
  error => Promise.reject(error),
);

// Interceptor para manejar errores 401 y refrescar el token
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No hay refresh token disponible');
        }

        // Solicitar un nuevo access_token
        const {data} = await axios.post('http://10.0.2.2:3000/auth/refresh', {
          refresh_token: refreshToken,
        });

        // Guardar el nuevo access_token
        await AsyncStorage.setItem('access_token', data.access_token);

        // Actualizar el header Authorization y reintentar la solicitud original
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Error al refrescar el token:', refreshError);

        if (
          refreshError.response?.status === 401 ||
          refreshError.response?.status === 403
        ) {
          // Si el refresh token es inválido, eliminar ambos tokens
          await AsyncStorage.removeItem('access_token');
          await AsyncStorage.removeItem('refresh_token');
          // Redirigir al usuario a la pantalla de inicio de sesión
          // Aquí puedes usar tu lógica de navegación para redirigir
          // navigation.navigate('SignInScreen'); // Descomentar si usas React Navigation
        }
      }
    }

    return Promise.reject(error);
  },
);
