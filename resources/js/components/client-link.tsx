import { router } from '@inertiajs/react';
import type { ComponentProps, MouseEvent, ReactNode } from 'react';
import { toUrl } from '@/lib/utils';

export type ClientLinkProps = Omit<ComponentProps<'a'>, 'href'> & {
    href: any;
    component?: string;
    children?: ReactNode;
    prefetch?: boolean;
};

export function ClientLink({
    href,
    component,
    children,
    onClick,
    ...props
}: ClientLinkProps) {
    const urlString = toUrl(href);

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (onClick) {
            onClick(e);
        }

        if (e.defaultPrevented) {
            return;
        }

        if (
            !e.metaKey &&
            !e.ctrlKey &&
            !e.shiftKey &&
            !e.altKey &&
            e.button === 0
        ) {
            e.preventDefault();
            const resolvedComponent =
                component ??
                (function () {
                    const path = urlString.split('?')[0].replace(/^\//, '');
                    if (!path) {
                        throw new Error(
                            `[ClientLink] Component name cannot be automatically inferred for path "${urlString}". Please pass an explicit "component" prop.`,
                        );
                    }
                    return path;
                })();

            router.push({
                url: urlString,
                component: resolvedComponent,
            });
        }
    };

    return (
        <a href={urlString} onClick={handleClick} {...props}>
            {children}
        </a>
    );
}

export default ClientLink;
