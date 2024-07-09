import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import BasicModal from "../BasicModal";
import Image from "next/image";
import Button from "@/components/Buttons/Button";
import { useRouter } from "next/router";

const VerificationEmailSentModal = NiceModal.create(
  ({ setstate, setPopup, hideCloseButton, ...props }: any) => {
    const modal = useModal();
    const router = useRouter();
    return (
      <BasicModal
        hideCloseButton={hideCloseButton}
        hide={modal.hide}
        show={modal.visible}
      >
        <div className="flex flex-col justify-center items-center h-full p-8 sm:px-20 sm:py-[4rem]">
            <Image 
              src="https://capitalcortstorage.blob.core.windows.net/app-assets/email-sent.svg"
              height={250}
              width={250}
              className="mb-[4rem]"
              alt="Success Gif"
              aria-hidden={true}
              unoptimized={true}
            />
          <h2 className="h2 font-semibold mb-4">{props.title}</h2>
          <p className="text-center text-sm font-normal text-dolphin mb-8">
            {props.description}
          </p>
          <Button
            onClick={() => {
              modal.hide();
              router.push("/verify-email");
            }}
            className="bg-theme-gray-575 text-white py-5 px-16"
          >
            {props.buttonText}
          </Button>
        </div>
      </BasicModal>
    );
  }
);

export default VerificationEmailSentModal;
