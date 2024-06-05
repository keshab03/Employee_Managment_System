import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SuccessModal = ({ message, onClose }) => {
    return (
        <div className="modal show d-block" tabIndex="-1" style={{marginTop:'150px'}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Success</h5>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={onClose}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
