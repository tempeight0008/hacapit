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
    const [expandedItems, setExpandedItems] = useState<string[]>([])

    const toggleExpanded = (key: string) => {
        setExpandedItems(prev =>
            prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key]
        )
    }

    const handleNavClick = (tab: string) => {
        onNavClick(tab)
        onClose()
    }

    const menuItems = [
        { title: 'Home', key: 'services', hasDropdown: false },
        {
            title: 'Services',
            key: 'services-dropdown',
            hasDropdown: true,
            submenu: [
                { title: 'Accounting', key: 'accounting' },
                { title: 'Taxation', key: 'taxation' },
                { title: 'Corporate Advisory', key: 'corporate-advisory' }
            ]
        },
        { title: 'Insights', key: 'news', hasDropdown: false },
        { title: 'About', key: 'about', hasDropdown: false },
        { title: 'Contact', key: 'contact', hasDropdown: false }
    ]

    if (!isOpen) return null

    return (
        <div className={styles.overlay}>
            <div className={styles.menuContainer}>
                <div className={styles.header}>
                    <div className={styles.logo}>
                        <span className={styles.logoText}>HAcapital</span>
                    </div>
                    <button className={styles.closeButton} onClick={onClose} aria-label="Close menu">
                        <IoClose />
                    </button>
                </div>

                <nav className={styles.nav}>
                    <ul className={styles.menuList}>
                        {menuItems.map((item) => (
                            <li key={item.key} className={styles.menuItem}>
                                <div className={styles.menuItemContent}>
                                    <button
                                        className={`${styles.menuLink} ${activeTab === item.key ? styles.active : ''}`}
                                        onClick={() => handleNavClick(item.key)}
                                    >
                                        {item.title}
                                    </button>
                                    {item.hasDropdown && (
                                        <button
                                            className={`${styles.dropdownToggle} ${expandedItems.includes(item.key) ? styles.expanded : ''}`}
                                            onClick={() => toggleExpanded(item.key)}
                                            aria-label={`Toggle ${item.title}`}
                                        >
                                            <IoChevronDown />
                                        </button>
                                    )}
                                </div>
                                {item.hasDropdown && expandedItems.includes(item.key) && item.submenu && (
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
