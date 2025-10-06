import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
    const getMatches = (query: string): boolean => {
        // Previne o erro "matchMedia not present" em ambientes de server-side rendering
        if (typeof window !== 'undefined') {
        return window.matchMedia(query).matches;
        }
        return false;
    };

    const [matches, setMatches] = useState<boolean>(getMatches(query));

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        
        const handleChange = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
        };

    // Adiciona o listener para mudanças
    mediaQueryList.addEventListener('change', handleChange);

    // Função de limpeza para remover o listener quando o componente for desmontado
    return () => {
        mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]); // O efeito re-executa se a query mudar

    return matches;
}