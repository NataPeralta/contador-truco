# 🎴 Contador Truco

Una aplicación web gratuita para llevar el conteo de puntos en partidas de Truco, el popular juego de cartas argentino.

## ✨ Características

- **🎯 Gestión de equipos**: Agregar, editar y eliminar equipos dinámicamente
- **📊 Sistema de cantos**: Flores, Envido, Real Envido, Truco, Re Truco, Vale 4
- **⏳ Puntos pendientes**: Agregar puntos antes de confirmarlos
- **📋 Historial de rondas**: Registro completo de todas las rondas jugadas
- **🌙 Modo oscuro**: Interfaz adaptable con tema claro y oscuro
- **💾 Persistencia**: Los datos se guardan automáticamente en el navegador
- **📱 Responsive**: Diseño adaptativo para móviles y escritorio

## 🚀 Demo

[Ver aplicación en vivo](https://NataPeralta.github.io/contador-truco)

## 🛠️ Tecnologías

- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Herramienta de construcción
- **Tailwind CSS** - Framework de estilos
- **GitHub Pages** - Hosting gratuito
- **GitHub Actions** - CI/CD automático

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/NataPeralta/contador-truco.git
   cd contador-truco
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

4. **Construir para producción**
   ```bash
   npm run build
   ```

## 🎮 Cómo usar

1. **Configurar la partida**:
   - Selecciona el total de puntos para ganar (20, 30, 40)
   - Configura los equipos participantes (mínimo 2)

2. **Durante el juego**:
   - Agrega puntos básicos o cantos a cada equipo
   - Confirma los puntos para registrar la ronda
   - Revisa el historial de rondas

3. **Gestión de equipos**:
   - Agrega nuevos equipos antes de iniciar
   - Edita nombres de equipos existentes
   - Elimina equipos (siempre manteniendo mínimo 2)

## 📁 Estructura del proyecto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes UI reutilizables
│   └── ...             # Componentes específicos
├── hooks/              # Custom hooks
├── types/              # Definiciones de TypeScript
├── data/               # Datos estáticos
└── assets/             # Recursos estáticos
```

## 🚀 Deploy Automático

El proyecto está configurado con **GitHub Actions** para deploy automático:

### Workflows incluidos:

1. **CI (Continuous Integration)**:
   - Se ejecuta en cada push y pull request
   - Verifica que el código compile correctamente
   - Ejecuta el linter
   - Prueba el build en múltiples versiones de Node.js

2. **Deploy Automático**:
   - Se ejecuta automáticamente al hacer push a `main`
   - Construye la aplicación
   - Despliega a GitHub Pages
   - Solo se ejecuta en la rama principal

### Configuración necesaria:

1. **Habilitar GitHub Pages**:
   - Ve a Settings → Pages
   - Source: "GitHub Actions"

2. **Configurar permisos**:
   - Settings → Actions → General
   - Workflow permissions: "Read and write permissions"

### Deploy manual (opcional):

```bash
npm run deploy
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Proceso de desarrollo:

```bash
# 1. Clonar y configurar
git clone https://github.com/NataPeralta/contador-truco.git
cd contador-truco
npm install

# 2. Desarrollo
npm run dev

# 3. Verificar cambios
npm run lint
npm run build

# 4. Commit y push
git add .
git commit -m "feat: nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- Inspirado en el popular juego de cartas argentino Truco
- Diseño moderno y accesible
- Código abierto para la comunidad

---

**¡Disfruta jugando Truco! 🎴**
