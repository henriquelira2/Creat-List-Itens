import './styles.css'

import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisH, faMinus } from "@fortawesome/free-solid-svg-icons";

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
                                <FontAwesomeIcon icon={faEllipsisH as IconProp} className="font-icon" />
                            ) : (
                                <FontAwesomeIcon icon={faMinus as IconProp} style={{ fontSize: '40px' }} />
                            )}
                        </button>
                    </div>
                </div>
                <div className="border-bottom collaps-text">
                    {isOpen && (
                        <div className="p-3 collaps-upload">
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Collapsible;
