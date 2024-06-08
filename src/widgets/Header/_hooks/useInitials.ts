export const useInitials = (name: string | null): string => {
  if (name) {
    name = name.trim();

    if (name.length <= 3) {
      return name;
    }

    return name
      .split(/\s+/)
      .map((w) => [...w][0])
      .slice(0, 3)
      .join('');
  }

  return 'U';
};
