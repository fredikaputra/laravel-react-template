/// <reference types="vite-plugin-pwa/client" />

import type { Auth } from '@/types/auth';
import type { FlashToast } from '@/types/ui';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        flashDataType: {
            toast?: FlashToast;
        };
        sharedPageProps: {
            appName: string;
            auth: Auth;
            [key: string]: unknown;
        };
    }
}
