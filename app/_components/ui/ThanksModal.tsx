import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

type ThanksModalProps = {
  open?: boolean;
  onClose?: () => void;
  type?: "success" | "failed";
  failText?: JSX.Element;
  successText?: JSX.Element;
  overlayCls?: string;
};

const ThanksModal = ({
  open,
  onClose,
  type,
  overlayCls,
  failText = (
    <h3 className="mb-4 max-w-xs text-center">
      Gửi không thành công. Vui lòng thử lại sau.
    </h3>
  ),
  successText = (
    <>
      <h3 className="mb-4 max-w-xs text-center leading-normal text-3xl md:text-[40px]">
        Cảm ơn bạn đã gửi thông tin đến
        <span className="text-primary-700 font-bold text-6xl ml-2">
          INSTA CARD
        </span>
      </h3>
      <p className="mb-8 text-center text-gray-900 max-md:mb-6">
        Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất
      </p>
    </>
  ),
}: ThanksModalProps) => {
  const isFailed = type === "failed";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0 }}
          className={clsx(
            `fixed inset-0 z-[99] flex items-center justify-center bg-black/70`,
            overlayCls
          )}
          onClick={onClose}
        >
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-4 flex w-full max-w-[600px] flex-col items-center justify-center rounded-2xl bg-white p-8"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {isFailed ? failText : successText}
              <button
                onClick={onClose}
                className="px-[34px] py-4 rounded-full border border-primary text-primary shadow-md overflow-hidden transition-all"
              >
                Đóng
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThanksModal;
