# DiceRola

App móvil minimalista para tirar dados y jugar en modo target. Construida con Expo + React Native (TypeScript) usando expo-router, un store tipo Zustand, persistencia estilo AsyncStorage (implementada con `expo-file-system` por restricciones offline) y soporte de temas.

## Requisitos
- Node.js 18+
- Expo CLI (`npm i -g expo` opcional)

## Instalación
```bash
npm install
```

Si el entorno bloquea el registro de npm, el proyecto incluye implementaciones locales para AsyncStorage, Clipboard y un store estilo Zustand para seguir funcionando offline.

## Scripts
- `npm start` – levanta el proyecto en Expo.
- `npm run android` / `npm run ios` – abre en emulador (con Expo CLI).
- `npm run lint` – linting.
- `npm run typecheck` – TypeScript estricto.
- `npm test` – Jest + React Native Testing Library.

## Cómo correr
```bash
npm start
```
Escanea el QR con Expo Go o abre en emulador.

## Arquitectura
- **domain/**: entidades y servicios puros (`rollDice`, `updateStats`, `scoreTargetRound`).
- **data/**: repositorios persistidos via almacenamiento local estilo AsyncStorage.
- **presentation/**: componentes UI, stores Zustand-like, tema y pantallas (expo-router en `app/`).
- **app/**: rutas de expo-router (tabs para Roll, Stats, Game, Settings).

## Decisiones clave
- **Persistencia**: se usa una implementación ligera de AsyncStorage basada en `expo-file-system` debido a restricciones de red. La API mantiene la misma forma y puede sustituirse por el paquete oficial sin tocar el dominio.
- **Estado**: se incluyó un store minimalista compatible con la API básica de Zustand (`create`, `getState`, `setState`).
- **Accesibilidad**: botones y tabs con roles, textos grandes y espacios generosos.
- **Animaciones**: resultados usan Reanimated (fade/scale) de manera sutil.
- **Testing**: pruebas unitarias de dominio y una prueba de UI para la pantalla Home.

## Estructura
```
app/
  _layout.tsx
  (tabs)/
    _layout.tsx
    index.tsx
    stats.tsx
    game.tsx
    settings.tsx
src/
  domain/
    entities.ts
    services/
  data/
    repositories/
    storage/
  presentation/
    components/
    providers/
    stores/
    theme/
    __tests__/
  lib/ (implementaciones locales de async-storage, clipboard y zustand)
```

## Notas
- El límite de historial es 20 tiradas.
- El mini-juego genera 10 rondas con scoring por cercanía al objetivo.
- El botón de limpiar datos borra historial, stats y ajustes (doble confirmación).

## Estado de ejecución en este entorno

No pude compilar ni ejecutar el proyecto en esta sesión porque la instalación de dependencias falla con error 403 del registro de npm. Con acceso normal a internet, `npm install` debería instalar Jest, Expo y el resto de dependencias para luego correr `npm test` o `npm start`.
