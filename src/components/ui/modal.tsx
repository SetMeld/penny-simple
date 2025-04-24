import { ReactNode } from "react";
import ReactModal from "react-modal";
import { MdClose } from "react-icons/md";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
  onAfterClose?: () => void;
  contentLabel?: string;
  size?: "full" | "sm";
}

export const Modal = (props: Props) => {
  const paddingClasses =
    props.size === "sm" ? "p-5 md:py-20 md:px-40 lg:px-60 xl:px-96" : "p-5";

  return (
    <ReactModal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      onAfterClose={props.onAfterClose}
      contentLabel={props.contentLabel}
      overlayClassName={{
        base: `${paddingClasses} transition-opacity duration-150 motion-safe:opacity-0 bg-opacity-90 bg-gray-900 fixed top-0 left-0 right-0 bottom-0 overscroll-contain`,
        afterOpen: "motion-safe:opacity-100",
        beforeClose: "",
      }}
      className={{
        base: "mx-auto rounded bg-white p-5 shadow-lg transition-opacity duration-150 motion-safe:opacity-0 md:p-10",
        afterOpen: "motion-safe:opacity-100",
        beforeClose: "",
      }}
      closeTimeoutMS={150}
    >
      <div className="-mr-4 -mt-4 flex flex-row-reverse md:-mr-8 md:-mt-8">
        <button onClick={props.onRequestClose}>
          <MdClose aria-label="Close" />
        </button>
      </div>
      {props.children}
    </ReactModal>
  );
};
