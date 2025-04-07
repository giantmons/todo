import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent />
      <SidebarGroup>
        <SidebarGroupLabel>Task Groups</SidebarGroupLabel>
      </SidebarGroup>
    </Sidebar>
  )
}
