import { StatusHistory } from "@/@types/models/booking";
import { cn } from "@/utils";
import dayjs from "dayjs";
import React from "react";
import {
  ReceiptTextIcon,
  ClipboardCheckIcon,
  UtensilsIcon,
  StarIcon,
} from "lucide-react";

interface StepperProps {
  statusHistory: Array<StatusHistory>;
  allSteps: Array<string>;
  labelMap: Record<string, string>;
}
const Stepper = ({ statusHistory, allSteps, labelMap }: StepperProps) => {
  const historyMap = Object.fromEntries(
    statusHistory.map((s) => [s.status, s])
  );
  const currentIndex = statusHistory.length - 1;

  return (
    <div className="flex items-start justify-between w-full max-w-4xl mx-auto mt-8 lg:px-4">
      {allSteps.map((step, index) => {
        const isDone = index < statusHistory.length;
        const isCurrent = index === currentIndex;
        const history = historyMap[step];

        return (
          <div
            key={step}
            className="flex-1 flex flex-col items-center relative"
          >
            {index > 0 && (
              <div
                className={cn("absolute -left-1/2 top-5 h-1 w-full -z-1", {
                  "bg-green-500": index <= currentIndex,
                  "bg-gray-300": index > currentIndex,
                })}
              />
            )}

            <div
              className={cn(
                "w-[2.75rem] h-[2.75rem] lg:w-[2.75rem] lg:h-[2.75rem] rounded-full flex items-center justify-center border-2 mb-2 z-10",
                {
                  "bg-green-500 text-white border-green-500":
                    step === "COMPLETED" || (isDone && !isCurrent),
                  "bg-yellow-400 text-white border-yellow-400":
                    isCurrent && step !== "COMPLETED",
                  "bg-gray-200 text-gray-500 border-gray-300": !isDone,
                }
              )}
            >
              {step === "PENDING" ? (
                <ReceiptTextIcon />
              ) : step === "CONFIRMED" ? (
                <ClipboardCheckIcon />
              ) : step === "IN_PROGRESS" ? (
                <UtensilsIcon />
              ) : (
                <StarIcon />
              )}
            </div>

            <div className="text-center text-sm font-medium">
              {labelMap[step]}
            </div>
            {history && (
              <div className="text-xs text-gray-500 mt-1 text-center">
                {dayjs(history.updatedAt).format("DD/MM/YYYY HH:mm")}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
