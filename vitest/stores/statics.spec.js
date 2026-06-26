import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import axios from 'axios';
import { useStaticsStore } from '@/stores/statics.js';
import { useConfigStore } from '@/stores/config.js';

vi.mock('axios', () => ({
    default: { get: vi.fn() },
}));

describe('useStaticsStore', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        setActivePinia(createPinia());
        vi.spyOn(console, 'log').mockImplementation(() => {});
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('starts with an empty statics object', () => {
        const store = useStaticsStore();
        expect(store.statics).toEqual({});
        expect(store.has).toBe(false);
    });

    describe('init()', () => {
        it('sets statics directly when given non-empty data', () => {
            useConfigStore().init({ apiUrl: 'https://example.com' });
            const store = useStaticsStore();

            store.init({ api_version: 'v2', version: '4.2.0' });

            expect(store.statics).toEqual({ api_version: 'v2', version: '4.2.0' });
            expect(axios.get).not.toHaveBeenCalled();
        });

        it('fetches statics from the server when given no data', async () => {
            useConfigStore().init({ apiUrl: 'https://example.com' });
            axios.get.mockResolvedValue({
                data: { results: { api_version: 'v3', version: '5.0.0' } },
            });

            const store = useStaticsStore();
            store.init();

            expect(axios.get).toHaveBeenCalledWith('https://example.com/api/statics');

            await vi.waitFor(() => {
                expect(store.statics).toEqual({ api_version: 'v3', version: '5.0.0' });
            });
        });

        it('logs an error when the fetch fails', async () => {
            useConfigStore().init({ apiUrl: 'https://example.com' });
            axios.get.mockRejectedValue(new Error('network down'));

            const store = useStaticsStore();
            store.init();

            await vi.waitFor(() => {
                expect(console.error).toHaveBeenCalledWith(
                    'Error loading statics:',
                    expect.any(Error),
                );
            });
        });
    });

    describe('get()', () => {
        it('returns the value for a given key', () => {
            const store = useStaticsStore();
            store.statics = { api_version: 'v2' };

            expect(store.get('api_version')).toBe('v2');
        });

        it('returns undefined for a missing key', () => {
            const store = useStaticsStore();
            store.statics = { api_version: 'v2' };

            expect(store.get('missingKey')).toBeUndefined();
        });
    });

    it('getAll() returns the whole statics object', () => {
        const store = useStaticsStore();
        store.statics = { api_version: 'v2', version: '4.2.0' };

        expect(store.getAll()).toEqual({ api_version: 'v2', version: '4.2.0' });
    });

    describe('has', () => {
        it('is true once statics has data', () => {
            const store = useStaticsStore();
            store.statics = { api_version: 'v2' };

            expect(store.has).toBe(true);
        });
    });

    describe('apiVersion', () => {
        it('returns null when api_version is not set', () => {
            const store = useStaticsStore();
            store.statics = { version: '4.2.0' };

            expect(store.apiVersion).toBeNull();
        });

        it('returns the api_version when it is in the allowed list', () => {
            const store = useStaticsStore();
            store.statics = { api_version: 'v3' };

            expect(store.apiVersion).toBe('v3');
        });

        it('falls back to the raw api_version when it is not in the allowed list', () => {
            const store = useStaticsStore();
            store.statics = { api_version: 'v9' };

            expect(store.apiVersion).toBe('v9');
        });
    });

    describe('fullApiUrl', () => {
        it('returns null when apiUrl is not configured', () => {
            const store = useStaticsStore();
            store.statics = { api_version: 'v3' };

            expect(store.fullApiUrl).toBeNull();
        });

        it('includes the api version in the URL when one is set', () => {
            useConfigStore().init({ apiUrl: 'https://example.com' });
            const store = useStaticsStore();
            store.statics = { api_version: 'v3' };

            expect(store.fullApiUrl).toBe('https://example.com/api/v3');
        });

        it('omits the version segment when no api_version is set', () => {
            useConfigStore().init({ apiUrl: 'https://example.com' });
            const store = useStaticsStore();
            store.statics = {};

            expect(store.fullApiUrl).toBe('https://example.com/api');
        });
    });
});
