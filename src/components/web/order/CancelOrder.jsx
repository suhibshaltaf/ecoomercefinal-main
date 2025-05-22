import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

export default function CancelOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  const [showModal, setShowModal] = useState(true);
  const [processing, setProcessing] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    navigate("/profile/orders");
  };

  const handleConfirm = async () => {
    setProcessing(true);
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/order/cancel/${id}`, {}, {
        headers: { Authorization: `Tariq__${token}` },
      });
      toast.success("Order cancelled successfully.");
    } catch (error) {
      toast.error("Failed to cancel order.");
    } finally {
      setProcessing(false);
      setShowModal(false);
      navigate("/profile/orders");
    }
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel this order?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={processing}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirm} disabled={processing}>
            {processing ? "Cancelling..." : "Yes, Cancel Order"}
          </Button>
        </Modal.Footer>
      </Modal>

      {!showModal && <h2 className="text-center mt-5">Processing...</h2>}
    </>
  );
}
