import { BrowserRouter } from 'react-router-dom';
import { DeviceProvider } from '@workspace/ui';
import type { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <BrowserRouter>
      <DeviceProvider>
          {children}
      </DeviceProvider>
    </BrowserRouter>
  );
}