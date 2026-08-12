import { Deferred } from '@inertiajs/react';
import { type ReactNode, useSyncExternalStore } from 'react';

/** Tracks browser online/offline network connectivity */
function useOnlineStatus(): boolean {
    return useSyncExternalStore(
        (callback) => {
            window.addEventListener('online', callback);
            window.addEventListener('offline', callback);

            const connection =
                typeof navigator !== 'undefined' && 'connection' in navigator
                    ? (navigator as Navigator & { connection?: EventTarget })
                          .connection
                    : undefined;

            connection?.addEventListener('change', callback);

            return () => {
                window.removeEventListener('online', callback);
                window.removeEventListener('offline', callback);
                connection?.removeEventListener('change', callback);
            };
        },
        () => (typeof navigator !== 'undefined' ? navigator.onLine : true),
        () => true,
    );
}

type DataSlotProps = {
    data: string | string[];
    fallback: ReactNode;
    rescue: ReactNode | ((error: unknown) => ReactNode);
    children: ReactNode;
};

/**
 * A simple wrapper around Inertia's <Deferred> component supporting fallback and rescue.
 */
export function DataSlot({ data, fallback, rescue, children }: DataSlotProps) {
    const isOnline = useOnlineStatus();

    const offlineFallback =
        typeof rescue === 'function' ? rescue(null) : rescue;

    return (
        <Deferred
            data={data}
            fallback={!isOnline ? offlineFallback : fallback}
            rescue={rescue}
        >
            {children}
        </Deferred>
    );
}
