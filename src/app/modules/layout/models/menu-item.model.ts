export interface MenuItem {
    id: string,
    title: string,
    icon: string | null,
    url?: string | null,
    children?: MenuItem[]
}