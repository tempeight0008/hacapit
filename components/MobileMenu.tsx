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

interface MenuItem {
    title: string
    key: string
    hasDropdown?: boolean
    submenu?: MenuItem[]
}

export function MobileMenu({ isOpen, onClose, activeTab, onNavClick }: MobileMenuProps) {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null)
    const [hoveredSubItem, setHoveredSubItem] = useState<string | null>(null)
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

    const menuItems: MenuItem[] = [
        { title: 'Home', key: 'services', hasDropdown: false },
        {
            title: 'Services',
            key: 'services-dropdown',
            hasDropdown: true,
            submenu: [
                {
                    title: 'Income Tax',
                    key: 'income-tax',
                    hasDropdown: true,
                    submenu: [
                        { title: 'NTN Registration', key: 'ntn-registration' },
                        { title: 'Income Tax Return Filing', key: 'income-tax-return-filing' },
                        { title: 'Income Tax Advisory', key: 'income-tax-advisory' }
                    ]
                },
                {
                    title: 'Sales Tax',
                    key: 'sales-tax',
                    hasDropdown: true,
                    submenu: [
                        { title: 'Sales Tax Registration', key: 'sales-tax-registration' },
                        { title: 'Sales Tax Return Filing', key: 'sales-tax-return-filing' },
                        { title: 'Sales Tax Advisory', key: 'sales-tax-advisory' }
                    ]
                },
                {
                    title: 'Business Registration',
                    key: 'business-registration',
                    hasDropdown: true,
                    submenu: [
                        { title: 'Partnership Firm Registration', key: 'partnership-firm-registration' },
                        { title: 'Freelancer Registration', key: 'freelancer-registration' },
                        { title: 'Software House Registration', key: 'software-house-registration' },
                        { title: 'Call Center Registration', key: 'call-center-registration' }
                    ]
                },
                {
                    title: 'Corporate',
                    key: 'corporate',
                    hasDropdown: true,
                    submenu: [
                        { title: 'Company Registration', key: 'company-registration' },
                        { title: 'Corporate Advisory', key: 'corporate-advisory' },
                    ]
                },
            ]
        },
        { title: 'Insights', key: 'news', hasDropdown: false },
        { title: 'About', key: 'about', hasDropdown: false },
        { title: 'Contact', key: 'contact', hasDropdown: false }
    ]

    const renderSubmenu = (items: MenuItem[], level = 1) => (
        <ul
            className={level === 1 ? styles.submenu : styles.submenuNested}
            onMouseEnter={() => level === 1 && setHoveredItem('services-dropdown')}
            onMouseLeave={() => level === 1 && setHoveredItem(null)}
        >
            {items.map((subitem) => (
                <li
                    key={subitem.key}
                    className={styles.submenuItem}
                    onMouseEnter={() => subitem.hasDropdown && setHoveredSubItem(subitem.key)}
                    onMouseLeave={() => subitem.hasDropdown && setHoveredSubItem(null)}
                >
                    <div className={styles.submenuItemContent}>
                        <button
                            className={styles.submenuLink}
                            onClick={() => {
                                if (subitem.hasDropdown) {
                                    setHoveredSubItem((prev) => (prev === subitem.key ? null : subitem.key))
                                    return
                                }
                                handleNavClick('services')
                            }}
                        >
                            {subitem.title}
                        </button>
                        {subitem.hasDropdown && (
                            <span className={`${styles.dropdownIcon} ${hoveredSubItem === subitem.key ? styles.expanded : ''}`}>
                                <IoChevronDown />
                            </span>
                        )}
                    </div>
                    {subitem.hasDropdown && hoveredSubItem === subitem.key && subitem.submenu && renderSubmenu(subitem.submenu, level + 1)}
                </li>
            ))}
        </ul>
    )

    if (!isOpen && !isClosing) return null

    return (
        <div
            className={`${styles.overlay} ${isClosing ? styles.closing : ''}`}
            onClick={handleClose}
        >
            <div
                className={styles.menuContainer}
                onClick={(event) => event.stopPropagation()}
            >
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
                                {item.hasDropdown && hoveredItem === item.key && item.submenu && renderSubmenu(item.submenu)}
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
