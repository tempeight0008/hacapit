import React, { useState } from 'react'
import { IoClose, IoChevronDown } from 'react-icons/io5'
import { FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import styles from '../styles/components/MobileMenu.module.css'

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
    activeTab: string
    onNavClick: (tab: string) => void
}

export function MobileMenu({ isOpen, onClose, activeTab, onNavClick }: MobileMenuProps) {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null)
    const [isClosing, setIsClosing] = useState(false)

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => {
            setIsClosing(false)
            onClose()
        }, 400)
    }

    const handleNavClick = (tab: string) => {
        onNavClick(tab)
        handleClose()
    }

    const menuItems = [
        { title: 'Home', key: 'services', hasDropdown: false },
        {
            title: 'Services',
            key: 'services-dropdown',
            hasDropdown: true,
            submenu: [
                { title: 'Income Tax Return', key: 'income-tax-return' },
                { title: 'Advisory', key: 'advisory' },
                { title: 'Sales Tax', key: 'sales-tax' },
                { title: 'Virtual Accounting', key: 'virtual-accounting' },
                { title: 'Business Registration', key: 'business-registration' },
                { title: 'Partnership Registration', key: 'partnership-registration' },
                { title: 'Sole Proprietorship', key: 'sole-proprietorship' },
                { title: 'Insurance Registration', key: 'insurance-registration' },
                { title: 'PSP Registration (AML)', key: 'psp-registration' },
                { title: 'Seeker Registration (EOBI)', key: 'seeker-registration' },
                { title: 'Call Center', key: 'call-center' },
                { title: 'Tax Lawyer', key: 'tax-lawyer' }
            ]
        },
        { title: 'Insights', key: 'news', hasDropdown: false },
        { title: 'About', key: 'about', hasDropdown: false },
        { title: 'Contact', key: 'contact', hasDropdown: false }
    ]

    if (!isOpen && !isClosing) return null

    return (
        <div className={`${styles.overlay} ${isClosing ? styles.closing : ''}`}>
            <div className={styles.menuContainer}>
                <div className={styles.header}>
                    <div className={styles.logo}>
                        <span className={styles.logoText}>HAcapital</span>
                    </div>
                    <button className={styles.closeButton} onClick={handleClose} aria-label="Close menu">
                        <IoClose />
                    </button>
                </div>

                <nav className={styles.nav}>
                    <ul className={styles.menuList}>
                        {menuItems.map((item) => (
                            <li
                                key={item.key}
                                className={styles.menuItem}
                                onMouseEnter={() => item.hasDropdown && setHoveredItem(item.key)}
                                onMouseLeave={() => item.hasDropdown && setHoveredItem(null)}
                            >
                                <div className={styles.menuItemContent}>
                                    <button
                                        className={`${styles.menuLink} ${activeTab === item.key ? styles.active : ''}`}
                                        onClick={() => handleNavClick(item.key)}
                                    >
                                        {item.title}
                                    </button>
                                    {item.hasDropdown && (
                                        <span className={`${styles.dropdownIcon} ${hoveredItem === item.key ? styles.expanded : ''}`}>
                                            <IoChevronDown />
                                        </span>
                                    )}
                                </div>
                                {item.hasDropdown && hoveredItem === item.key && item.submenu && (
                                    <ul className={styles.submenu}>
                                        {item.submenu.map((subitem: any) => (
                                            <li key={subitem.key}>
                                                <button
                                                    className={styles.submenuLink}
                                                    onClick={() => {
                                                        handleNavClick('services')
                                                        // Scroll to section logic can be added here
                                                    }}
                                                >
                                                    {subitem.title}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className={styles.footer}>
                    <a href="tel:03111555678" className={styles.ctaButton}>
                        03 111 555 678
                    </a>
                    <div className={styles.socialLinks}>
                        <a href="https://linkedin.com/in/alemem64" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            <FaLinkedin />
                        </a>
                        <a href="https://twitter.com/alemem64" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            <FaXTwitter />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
