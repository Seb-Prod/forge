# DeviceContext

Un système de détection avancé pour React permettant d'identifier le type d'appareil, l'orientation, le système d'exploitation et le mode PWA de votre application.

> ⚠️ **Ce contexte fait partie du package `@workspace/ui`**

## 🎯 Caractéristiques

- ✅ Détection du type d'appareil (mobile, tablette, desktop)
- ✅ Breakpoints alignés sur Tailwind CSS
- ✅ Détection de l'orientation (portrait/landscape)
- ✅ Identification du système d'exploitation
- ✅ Support tactile
- ✅ Détection du mode PWA
- ✅ SSR-safe (Next.js, Remix, etc.)
- ✅ Optimisé avec debounce sur resize
- ✅ TypeScript natif

## 📦 Installation

### Dans un autre package du monorepo

Ajoutez la dépendance `@workspace/ui` dans le `package.json` de votre app :

```json
{
  "dependencies": {
    "@workspace/ui": "workspace:*"
  }
}
```

Puis lancez :

```bash
pnpm install
```

### Structure dans le package

```
packages/ui/
├── src/
│   ├── components/
│   ├── contexts/
│   │   └── device/
│   │       ├── DeviceContext.tsx
│   │       ├── device.constants.ts
│   │       ├── device.detectors.ts
│   │       ├── device.helpers.ts
│   │       ├── device.types.ts
│   │       ├── index.ts
│   │       └── README.md (ce fichier)
│   ├── functions/
│   ├── hooks/
│   └── layouts/
│   ├── routing/
└── package.json
```

## 🚀 Utilisation de base

### 1. Wrappez votre application avec le Provider

```tsx
import { DeviceProvider } from '@workspace/ui/contexts/device';

function App() {
  return (
    <DeviceProvider>
      <YourApp />
    </DeviceProvider>
  );
}
```

### 2. Utilisez le hook dans vos composants

```tsx
import { useDevice } from '@workspace/ui/contexts/device';

function MyComponent() {
  const { device, orientation, os, isTouch, isReady } = useDevice();

  if (!isReady) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <p>Appareil : {device}</p>
      <p>Orientation : {orientation}</p>
      <p>OS : {os}</p>
      <p>Tactile : {isTouch ? 'Oui' : 'Non'}</p>
    </div>
  );
}
```

## 📚 API Reference

### `DeviceContextValue`

Le contexte expose les valeurs suivantes :

| Propriété | Type | Description |
|-----------|------|-------------|
| `device` | `"mobile" \| "tablet" \| "desktop"` | Type d'appareil basé sur la largeur d'écran |
| `breakpoint` | `"sm" \| "md" \| "lg" \| "xl"` | Breakpoint Tailwind actuel |
| `orientation` | `"portrait" \| "landscape"` | Orientation de l'écran |
| `os` | `"ios" \| "android" \| "windows" \| "macos" \| "linux" \| "unknown"` | Système d'exploitation détecté |
| `isTouch` | `boolean` | Support des interactions tactiles |
| `pwaMode` | `false \| "pwaMobile" \| "pwaTablet" \| "pwaDesktop"` | Mode PWA selon le device |
| `isReady` | `boolean` | Indique si la détection est terminée |

### Breakpoints

Les breakpoints sont alignés sur Tailwind CSS :

| Breakpoint | Largeur minimale |
|------------|------------------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

### Helpers

Des hooks utilitaires sont fournis pour simplifier les cas d'usage courants :

```tsx
import { 
  useIsMobile, 
  useIsTablet, 
  useIsDesktop, 
  useIsPwaMobile 
} from '@workspace/ui/contexts/device';

function MyComponent() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  const isPwaMobile = useIsPwaMobile();

  if (isMobile) {
    return <MobileView />;
  }

  return <DesktopView />;
}
```

## 💡 Exemples d'utilisation

### Affichage conditionnel selon l'appareil

```tsx
function Navigation() {
  const { device } = useDevice();

  return (
    <>
      {device === 'mobile' && <MobileMenu />}
      {device === 'desktop' && <DesktopMenu />}
    </>
  );
}
```

### Adaptation selon l'orientation

```tsx
function Gallery() {
  const { orientation } = useDevice();

  return (
    <div className={orientation === 'portrait' ? 'grid-cols-2' : 'grid-cols-4'}>
      {/* Images */}
    </div>
  );
}
```

### Détection PWA

```tsx
function InstallPrompt() {
  const { pwaMode } = useDevice();

  if (pwaMode) {
    return null; // Déjà installé
  }

  return <InstallButton />;
}
```

### Adaptation selon le système d'exploitation

```tsx
function KeyboardShortcuts() {
  const { os } = useDevice();

  const modKey = os === 'macos' ? '⌘' : 'Ctrl';

  return <span>Enregistrer : {modKey} + S</span>;
}
```

### Comportement tactile

```tsx
function InteractiveElement() {
  const { isTouch } = useDevice();

  return (
    <button
      className={isTouch ? 'p-4' : 'p-2'}
      onMouseEnter={!isTouch ? handleHover : undefined}
    >
      Cliquez-moi
    </button>
  );
}
```

## ⚠️ Notes importantes

### SSR (Server-Side Rendering)

Le contexte est **SSR-safe**. Lors du rendu côté serveur, `isReady` sera `false` et les valeurs par défaut seront utilisées :

```tsx
function MyComponent() {
  const { isReady, device } = useDevice();

  // Pendant le SSR ou avant l'hydration
  if (!isReady) {
    return <div>Chargement...</div>;
  }

  // Après l'hydration côté client
  return <div>Appareil : {device}</div>;
}
```

### Performance

- Le resize est **debouncé** (150ms par défaut) pour éviter les re-renders excessifs
- La détection n'est effectuée que côté client
- Le timeout est nettoyé au démontage du composant

### Modification des breakpoints

Pour ajuster les breakpoints, modifiez `device.constants.ts` :

```typescript
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536, // Ajout d'un nouveau breakpoint
} as const;
```

N'oubliez pas de mettre à jour le type `Breakpoint` dans `device.types.ts`.

## 🔧 Configuration avancée

### Modification du délai de debounce

Changez la valeur dans `device.constants.ts` :

```typescript
export const RESIZE_DEBOUNCE_DELAY = 200; // 200ms au lieu de 150ms
```

### Ajout de nouveaux helpers

Créez vos propres helpers dans `device.helpers.ts` :

```typescript
export const useIsLandscape = (): boolean => {
  const { orientation, isReady } = useDevice();
  return isReady && orientation === 'landscape';
};

export const useIsIOS = (): boolean => {
  const { os, isReady } = useDevice();
  return isReady && os === 'ios';
};
```

## 🤝 Compatibilité

- React 18+
- TypeScript 4.5+
- Navigateurs modernes (ES2020+)

## 📄 Licence

Ce code est libre d'utilisation dans vos projets.

---