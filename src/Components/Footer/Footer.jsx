import React from 'react'
import './footer.css'
const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer id="footer">

            <marquee behavior="" direction="">
                <p>
                    © Copyright {currentYear} | All Rights Reserved | Keshab Mahanta
                </p>
            </marquee>

        </footer>
    )
}

export default Footer
