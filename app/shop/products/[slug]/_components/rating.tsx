import { StarHalfIcon, StarIcon } from "lucide-react";

export function Rating() {
    return (
        <div className="flex items-center gap-2">
              <div className="flex items-center relative -top-0.5">
                <StarHalfIcon className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                <StarIcon className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                <StarIcon className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                <StarIcon className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                <StarIcon className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
              </div>
              <div className="font-bold text-gray-600">4.5 </div>
              <div className="text-sm text-gray-400">15 نظر</div>
            </div>
    )
}