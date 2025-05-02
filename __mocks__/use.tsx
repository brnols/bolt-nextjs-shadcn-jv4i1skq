import { jest } from '@jest/globals';

// useState
export const useState = <T,>(initialValue: T): [T, jest.Mock] => {
    const setState = jest.fn();
    return [initialValue, setState];
};

// useEffect
export const useEffect = (callback: () => unknown, deps?: unknown[]): () => void => { 
    callback(); 
    return () => {}; 
};

// useRouter
export const useRouter = jest.fn().mockImplementation(() => ({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
    events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn()
    },
    isFallback: false,
    basePath: '',
    locale: 'pt-BR',
    locales: ['pt-BR', 'en-US'],
    defaultLocale: 'pt-BR',
    isReady: true,
    isPreview: false
}));