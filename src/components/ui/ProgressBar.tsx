import { AriaProgressBarProps, useProgressBar } from "react-aria";

export type Props = AriaProgressBarProps;
export const ProgressBar = ({ ...props }: Props) => {
  const { progressBarProps, labelProps } = useProgressBar(props);

  const percentage =
    typeof props.value === "undefined" || typeof props.maxValue === "undefined"
      ? null
      : (props.value - (props.minValue ?? 0)) /
        (props.maxValue - (props.minValue ?? 0));
  const barWidth =
    percentage !== null ? `${Math.round(percentage * 100)}%` : "calc(100% / 3)";

  return (
    <div {...progressBarProps} className="flex flex-col gap-2">
      <div className="flex justify-between">
        {props.label && <span {...labelProps}>{props.label}</span>}
      </div>
      <style>
        {`
          @media (prefers-reduced-motion: reduce) {
            @keyframes progress {
              0% {
                  transform:  translateX(90%);
              }
              5% {
                  transform:  translateX(90%);
              }
              95% {
                  transform:  translateX(110%);
              }
              100% {
                  transform:  translateX(110%);
              }
            }
          }
          @media (prefers-reduced-motion: no-preference) {
            @keyframes progress {
              0% {
                  transform:  translateX(0);
              }
              5% {
                  transform:  translateX(0);
              }
              95% {
                  transform:  translateX(200%);
              }
              100% {
                  transform:  translateX(200%);
              }
            }
          }
          `}
      </style>
      <div className="h-6 rounded bg-gray-300">
        <div
          className={`h-6 rounded bg-gray-700 transition-[width] ${
            percentage === null ? "translate-x-full animate-pulse" : ""
          }`}
          style={{
            width: barWidth,
            animation:
              percentage === null
                ? "progress 1.2s infinite alternate ease-in-out"
                : undefined,
          }}
        />
      </div>
    </div>
  );
};
