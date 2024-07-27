import React from "react";
import styled from "styled-components";
import Draggable from "react-draggable";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    pointer-events: none; /* Prevent interaction with the overlay */
`;

const ModalContainer = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
    border: 2px solid #299792; /* Add a border with color */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Optional: add shadow for better visual */
    pointer-events: auto; /* Allow interaction with the modal */
    position: absolute; /* Keep position absolute */
    top: ${(props) => props.position.top}px;
    left: ${(props) => props.position.left}px;
`;

const ModalHeader = styled.h2`
    margin-top: 0;
    margin-left: 3px;
    font-size: 18px; /* Font size */
    font-weight: bold; /* Bold text */
    margin-bottom: 20px; /* Add margin below header for spacing */
`;

const ModalFooter = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
`;

const ModalButton = styled.button`
    margin-left: 10px;
    padding: 10px 20px;
    border: 1px solid #299792; /* Add border color */
    border-radius: 5px;
    cursor: pointer;
    background-color: white; /* Default background color for buttons */
    color: #299792; /* Default text color for buttons */
`;

const ConfirmButton = styled(ModalButton)`
    background-color: #299792; /* Background color for confirm button */
    color: white; /* Text color for confirm button */
`;

const StyledTextarea = styled.textarea`
    rows: 6;
    width: 100%;
    border: 1px solid #e5e5e5; /* Default border color */
    border-radius: 5px;
    padding: 10px; /* Padding inside textarea */
    font-size: 16px; /* Font size */
    resize: vertical; /* Allow vertical resizing only */
    outline: none; /* Remove default outline */

    &:focus {
        border-color: #299792; /* Border color when focused */
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); /* Optional: add shadow for better focus effect */
    }
`;

const Modal = ({ isOpen, onClose, onConfirm, prompt, setPrompt, position }) => {
    if (!isOpen) return null;

    return (
        <ModalOverlay>
            <Draggable cancel="textarea">
                <ModalContainer position={position}>
                    <ModalHeader>
                        이 부분을 어떻게 수정하고 싶으신가요?
                    </ModalHeader>
                    <StyledTextarea
                        rows="6"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="원하시는 수정사항을 입력해주세요."
                    />
                    <ModalFooter>
                        <ModalButton onClick={onClose}>Cancel</ModalButton>
                        <ConfirmButton onClick={onConfirm}>
                            Confirm
                        </ConfirmButton>
                    </ModalFooter>
                </ModalContainer>
            </Draggable>
        </ModalOverlay>
    );
};

export default Modal;
