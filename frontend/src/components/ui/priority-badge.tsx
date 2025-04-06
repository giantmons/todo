import { Badge } from "./badge";

export function PriorityBadge({ priority }: { priority: string }) {
  const renderPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge variant="high">{priority}</Badge>;
      case "Medium":
        return <Badge variant="medium">{priority}</Badge>;
      case "Low":
        return <Badge variant="low">{priority}</Badge>;
      default:
        return <Badge variant="secondary">Priority not set</Badge>;
    }
  };

  return renderPriorityBadge(priority); // ✅ Now it's returning a valid ReactNode
}
