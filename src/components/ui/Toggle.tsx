import { useFocusRing, useSwitch, VisuallyHidden } from "react-aria";
import { useToggleState } from "react-stately";
import { ChangeEventHandler, ReactNode, useRef } from "react";

interface Props {
  onChange: (on: boolean) => void;
  toggled: boolean;
  children: ReactNode;
}
export const Toggle = (props: Props) => {
  let state = useToggleState({ isSelected: props.toggled });
  let ref = useRef<HTMLInputElement>(null);
  let { inputProps } = useSwitch(props, state, ref);
  let { isFocusVisible, focusProps } = useFocusRing();
  state.setSelected(props.toggled);

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();

    props.onChange(event.target.checked);
  };

  return (
    <label className="group flex cursor-pointer items-center">
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} onChange={onChange} />
      </VisuallyHidden>
      <div
        className={`${
          state.isSelected
            ? "bg-gray-700 ring-sky-50 group-hover:bg-gray-500"
            : "bg-gray-200 ring-gray-700 group-hover:bg-gray-300"
        } ${
          isFocusVisible ? "ring-4" : "ring-0"
        } relative inline-flex h-6 w-11 cursor-pointer items-center rounded-xl`}
      >
        <span
          className={`${
            state.isSelected
              ? "translate-x-6 rtl:-translate-x-6"
              : "translate-x-1 rtl:-translate-x-1"
          } inline-block h-4 w-4 transform rounded-xl bg-white duration-100 motion-safe:transition-transform`}
        />
      </div>
      <span className="pl-2">{props.children}</span>
    </label>
  );
};
