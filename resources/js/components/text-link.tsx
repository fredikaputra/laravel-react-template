import type { ComponentProps } from 'react';
import { ClientLink } from '@/components/client-link';
import { cn } from '@/lib/utils';

type Props = ComponentProps<typeof ClientLink>;

export default function TextLink({
    className = '',
    children,
    ...props
}: Props) {
    return (
        <ClientLink
            className={cn(
                'text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500',
                className,
            )}
            {...props}
        >
            {children}
        </ClientLink>
    );
}
