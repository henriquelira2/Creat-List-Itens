import './styles.css'

import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faMinus } from "@fortawesome/fontawesome-free-solid";

interface IProps {
    open?: boolean;
    title: string;
    children: React.ReactNode;
}

const Collapsible: React.FC<IProps> = ({ open, children }) => {
    const [isOpen, setIsOpen] = useState(open);

    const handleFilterOpening = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <>
            <div className="collapsible-u">
                <div>
                    <div className="p-3 border-bottom d-flex justify-content-between collaps-icon">
                        <button type="button" className="btn-collaps" onClick={handleFilterOpening}>
                            {!isOpen ? (
                                <FontAwesomeIcon icon={faEllipsisH} className="font-icon" />
                            ) : (
                                <FontAwesomeIcon icon={faMinus} style={{ fontSize: '40px' }} />
                            )}
                        </button>
                    </div>
                </div>

                <div className="border-bottom collaps-text">
                    <button className="">{isOpen && <div className="p-3 collaps-upload">{children}</div>}</button>
                </div>
            </div>
        </>
    );
};

export default Collapsible;