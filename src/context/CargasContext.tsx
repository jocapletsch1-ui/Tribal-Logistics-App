import { createContext, useContext, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';

import { cargasIniciaisData } from '@/data/cargas';
import type { Cargo, NovaCarga } from '@/data/cargas';

type CargasContextValue = {
  cargas: Cargo[];
  adicionarCarga: (novaCarga: NovaCarga) => void;
};

const CargasContext = createContext<CargasContextValue | null>(null);

export function CargasProvider({ children }: PropsWithChildren) {
  const [cargas, setCargas] = useState(cargasIniciaisData);

  const value = useMemo(
    () => ({
      cargas,
      adicionarCarga: (novaCarga: NovaCarga) => {
        setCargas((atuais) => {
          const proximoId = atuais.reduce((maiorId, carga) => Math.max(maiorId, carga.id), 0) + 1;
          return [{ ...novaCarga, id: proximoId, status: 'Pendente' }, ...atuais];
        });
      },
    }),
    [cargas],
  );

  return <CargasContext.Provider value={value}>{children}</CargasContext.Provider>;
}

export function useCargas() {
  const context = useContext(CargasContext);
  if (!context) {
    throw new Error('useCargas deve ser usado dentro de CargasProvider.');
  }
  return context;
}
