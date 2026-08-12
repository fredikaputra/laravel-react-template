import { Deferred, Link, router, usePage } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';
import { ClientLink } from '@/components/client-link';
import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import { edit } from '@/routes/user-profile';
import type { Auth } from '@/types';

export function UserMenuContent() {
    const { auth } = usePage<{ auth?: Auth }>().props;
    const user = auth?.user;
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    const fallbackLabel = (
        <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Guest User</span>
            <span className="truncate text-xs text-muted-foreground">
                Profile unavailable
            </span>
        </div>
    );

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Deferred
                        data="auth"
                        fallback={
                            <div className="flex flex-1 items-center gap-2">
                                <Skeleton className="size-8 rounded-full" />
                                <div className="grid flex-1 gap-1">
                                    <Skeleton className="h-3.5 w-24" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                            </div>
                        }
                        rescue={fallbackLabel}
                    >
                        {user ? (
                            <UserInfo user={user} showEmail={true} />
                        ) : (
                            fallbackLabel
                        )}
                    </Deferred>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <ClientLink
                        className="block w-full cursor-pointer"
                        href={edit()}
                        component="user-profile/edit"
                        onClick={cleanup}
                    >
                        <Settings className="mr-2" />
                        Settings
                    </ClientLink>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link
                    className="block w-full cursor-pointer"
                    href={logout()}
                    as="button"
                    onClick={handleLogout}
                    data-test="logout-button"
                >
                    <LogOut className="mr-2" />
                    Log out
                </Link>
            </DropdownMenuItem>
        </>
    );
}
