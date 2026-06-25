import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useConfigStore } from '../config.js';

describe('useConfigStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('starts with an empty config', () => {
        const store = useConfigStore();
        expect(store.config).toEqual({});
    });

    it('init() sets the config', () => {
        const store = useConfigStore();
        store.init({ apiUrl: 'https://example.com', interface: 'AppView' });
        expect(store.config).toEqual({ apiUrl: 'https://example.com', interface: 'AppView' });
    });

    it('get() returns the value for a given key', () => {
        const store = useConfigStore();
        store.init({ apiUrl: 'https://example.com' });
        expect(store.get('apiUrl')).toBe('https://example.com');
    });

    it('get() returns undefined for a missing key', () => {
        const store = useConfigStore();
        store.init({ apiUrl: 'https://example.com' });
        expect(store.get('missingKey')).toBeUndefined();
    });

    it('get() reflects the latest config after re-init', () => {
        const store = useConfigStore();
        store.init({ apiUrl: 'https://old.example.com' });
        expect(store.get('apiUrl')).toBe('https://old.example.com');

        store.init({ apiUrl: 'https://new.example.com' });
        expect(store.get('apiUrl')).toBe('https://new.example.com');
    });
});
