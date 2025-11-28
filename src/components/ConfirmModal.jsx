import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmModal({ show, onConfirm, onCancel, message }) {
  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="confirm-modal"
          initial={{ scale: 0.8, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
        >
          <h3>Xác nhận</h3>
          <p>{message}</p>
          <div className="modal-actions">
            <button className="btn-confirm" onClick={onConfirm}>
              Xác nhận
            </button>
            <button className="btn-cancel" onClick={onCancel}>
              Hủy
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
