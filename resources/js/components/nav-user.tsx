import { Deferred, usePage } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { Spinner } from '@/components/ui/spinner';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { useIsMobile } from '@/hooks/use-mobile';
import type { Auth } from '@/types';

export function NavUser() {
    const { auth } = usePage<{ auth?: Auth }>().props;
    const { state } = useSidebar();
    const isMobile = useIsMobile();

    return (
        <Deferred
            data="auth"
            fallback={
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="opacity-70">
                            <Spinner className="size-4" />
                            <span className="text-xs text-muted-foreground">
                                Loading user...
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            }
        >
            {auth?.user && (
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent"
                                    data-test="sidebar-menu-button"
                                >
                                    <UserInfo user={auth.user} />
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                align="end"
                                side={
                                    isMobile
                                        ? 'bottom'
                                        : state === 'collapsed'
                                          ? 'left'
                                          : 'bottom'
                                }
                            >
                                <UserMenuContent />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            )}
        </Deferred>
    );
}
