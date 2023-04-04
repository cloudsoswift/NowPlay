import { Dialog } from "@headlessui/react";
import { useState } from "react";
type Props = {
  imageURL: string;
  imageClass: string;
};
export const PopupImage = ({ imageURL, imageClass }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={imageClass}>
      <img src={imageURL} alt="" className={imageClass} onClick={() => setIsOpen(true)} />
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 bg-black bg-opacity-25 z-10"
      >
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
            <img src={`${imageURL}`} className="w-full h-full p-8" />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};
