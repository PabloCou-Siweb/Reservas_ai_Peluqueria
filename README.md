# Reservas IA Peluquería - Sistema de Login

Una aplicación React con TypeScript que replica el diseño de la página de login para un sistema de reservas de peluquería.

## Características

- ✅ Diseño responsive que replica exactamente la imagen proporcionada
- ✅ Formulario de login con validación
- ✅ Componentes TypeScript tipados
- ✅ Estilos CSS modernos con gradientes y efectos
- ✅ Iconos SVG integrados
- ✅ Toggle de visibilidad de contraseña
- ✅ Checkbox de términos y condiciones
- ✅ Diseño mobile-first

## Estructura del Proyecto

```
src/
├── components/
│   ├── LoginPage.tsx      # Componente principal de login
│   └── LoginPage.css      # Estilos del componente
├── App.tsx                # Componente raíz
├── App.css               # Estilos globales
├── index.tsx             # Punto de entrada
└── index.css             # Reset CSS
```

## Instalación y Ejecución

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm start
   ```

3. **Abrir en el navegador:**
   La aplicación se abrirá automáticamente en `http://localhost:3000`

## Funcionalidades Implementadas

### Formulario de Login
- Campo de email con validación
- Campo de contraseña con toggle de visibilidad
- Checkbox de términos y condiciones (marcado por defecto)
- Botón de login con diseño especial (mitad negro, mitad blanco)
- Enlace "¿Olvidaste tu contraseña?"
- Enlace de registro

### Sección Promocional
- Diseño con gradiente de fondo
- Burbujas informativas con estadísticas
- Texto principal "Simplifica la gestión de tu peluquería"
- Icono de flecha en la esquina superior derecha

### Diseño Responsive
- Layout de dos columnas en desktop
- Layout de una columna en móvil
- Adaptación de tamaños de fuente y espaciado
- Optimización para diferentes tamaños de pantalla

## Tecnologías Utilizadas

- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **CSS3** - Estilos modernos con flexbox y grid
- **SVG** - Iconos vectoriales

## Personalización

Para personalizar la aplicación:

1. **Colores:** Modifica las variables CSS en `LoginPage.css`
2. **Texto:** Edita los textos en `LoginPage.tsx`
3. **Validación:** Añade lógica de validación en el método `handleSubmit`
4. **API:** Integra con tu backend en el método `handleSubmit`

## Próximos Pasos

- [ ] Integración con API de autenticación
- [ ] Validación de formulario más robusta
- [ ] Animaciones y transiciones
- [ ] Tests unitarios
- [ ] Optimización de rendimiento
