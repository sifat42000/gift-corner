import React from 'react';

interface SkeletonProps {
  className?: string;
}

/**
 * A reusable skeleton component for loading states.
 * 
 * @param className - Tailwind classes to customize the skeleton's shape and size
 */
export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div 
      className={`relative overflow-hidden rounded-xl bg-stone-100 dark:bg-slate-800 ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 animate-shimmer" />
    </div>
  );
};

/**
 * A skeleton for a product card.
 */
export const ProductSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-square w-full rounded-3xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  );
};

/**
 * A skeleton for a dashboard tab content.
 */
export const DashboardSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-6">
        <Skeleton className="h-24 w-24 rounded-3xl" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};
