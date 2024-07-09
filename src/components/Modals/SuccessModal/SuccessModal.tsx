import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import BasicModal from "../BasicModal";
import Image from "next/image";
import Button from "@/components/Buttons/Button";
import { useRouter } from "next/router";

const SuccessModal = NiceModal.create(
  ({ setstate, setPopup, hideCloseButton, ...props }: any) => {
    const modal = useModal();
    const router = useRouter();
    return (
      <BasicModal
        hideCloseButton={true}
        hide={modal.hide}
        show={modal.visible}
      >
        <div className="flex flex-col justify-center items-center h-full p-8 sm:p-[4.5rem]">
          <Image
            src="https://capitalcortstorage.blob.core.windows.net/app-assets/tick.gif"
            height={170}
            width={170}
            className="mb-[4.5rem]"
            alt="Success Gif"
            aria-hidden={true}
          />
          <h5 className="h2 font-semibold mb-4">{props.title}</h5>
          <p className="text-center text-theme-gray-325 mb-8 h5">
            {props.description}
          </p>
          <Button
            onClick={() => {
              modal.hide();
            }}
            variant="black"
            size="large"
            className="px-16 rounded-lg"
          >
            {props.buttonText}
          </Button>
        </div>
      </BasicModal>
    );
  }
);

export default SuccessModal;
