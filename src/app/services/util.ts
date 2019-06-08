export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US",
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatDates(objects: {date: string}[]) {
  objects.forEach(o => o.date = formatDate(o.date));
}