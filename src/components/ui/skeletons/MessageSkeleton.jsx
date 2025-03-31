import React from "react";

export const MessageSkeleton = () => {
  return (
    <div
      className="group flex animate-pulse cursor-default items-start gap-3 rounded-lg p-2"
    >
      <div className="mt-1 h-8 w-8 overflow-hidden rounded-full bg-charcoal">
        <div className="h-full w-full object-cover" />
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="h-3 w-28 rounded-lg bg-charcoal text-sm font-medium"></span>
          <span className="h-3 w-36 rounded-lg bg-charcoal text-xs "></span>
        </div>
        <div className="mt-2 h-4 w-3/4 rounded-lg bg-charcoal text-sm "></div>
      </div>
    </div>
  );
};
