export const isStraightRunSlug = (slug?: string): boolean => {
  if (!slug) return false;
  const workoutSlugs = [
    'hill-run-km',
    'long-hill-reps-km',
    'short-hill-reps-km',
    'long-downhill-reps-km',
    'short-downhill-reps-km',
    'uphill-downhill-reps-km',
    'downhill-uphill-reps-1-km',
    'downhill-uphill-reps-2-km',
    'hill-accelerator-km',
    'hill-run-mile',
    'long-hill-reps-mile',
    'short-hill-reps-mile',
    'long-downhill-reps-mile',
    'short-downhill-reps-mile',
    'uphill-downhill-reps-mile',
    'downhill-uphill-reps-1-mile',
    'downhill-uphill-reps-2-mile',
    'hill-accelerators-mile',
  ];

  return workoutSlugs.includes(slug);
};
