import { format } from "date-fns";

export function groupTasksByDate(tasks: task[]): Record<string, task[]> {
  return tasks.reduce((groups: Record<string, task[]>, task: task) => {
    const date = format(new Date(task.createdAt), "yyyy-MM-dd");

    if (!groups[date]) {
      groups[date] = [];
    }

    groups[date].push(task);
    return groups;
  }, {});
}
