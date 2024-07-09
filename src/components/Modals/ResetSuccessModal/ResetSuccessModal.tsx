import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import BasicModal from "../BasicModal";
import Image from "next/image";
import Button from "@/components/Buttons/Button";
import { useRouter } from "next/router";
const ResetSuccessModal = NiceModal.create(
  ({ setstate, setPopup, hideCloseButton, ...props }: any) => {
    const modal = useModal();
    // console.log(props);
    const router = useRouter();
    return (
      <BasicModal
        hideCloseButton={hideCloseButton}
        hide={modal.hide}
        show={modal.visible}
      >
        <div className="flex flex-col justify-center items-center h-full py-8 sm:py-[4.5rem] px-4 sm:px-12">
          <Image
            src="https://capitalcortstorage.blob.core.windows.net/app-assets/tick.gif"
            height={170}
            width={170}
            className="lg:mb-[4.5rem]"
            alt="Success Gif"
            aria-hidden={true}
          />
          <h5 className="h2 font-semibold mb-4 text-center">{props.title}</h5>
          <p className="text-center text-theme-gray-325 mb-8 h5">
            {props.description}
          </p>
          <Button
            onClick={() => {
              modal.hide();
            }}
            variant="black"
            size="large"
            className="px-16"
          >
            {props.buttonText}
          </Button>
        </div>
      </BasicModal>
    );
  }
);

export default ResetSuccessModal;
