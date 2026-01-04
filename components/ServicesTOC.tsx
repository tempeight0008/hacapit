import React from 'react'
import styles from '../styles/components/ServicesTOC.module.css'

interface ServicesTOCProps {
    activeSection: string
    onSectionClick: (section: string) => void
}

export function ServicesTOC({ activeSection, onSectionClick }: ServicesTOCProps) {
    const sections = [
        { id: 'accounting', label: 'Accounting' },
        { id: 'taxation', label: 'Taxation' },
        { id: 'corporate-advisory', label: 'Corporate Advisory' }
    ]

    return (
        <div className={styles.tocContainer}>
            <div className={styles.tocContent}>
                <h4 className={styles.tocTitle}>Services</h4>
                <ul className={styles.tocList}>
                    {sections.map((section) => (
                        <li
                            key={section.id}
                            className={`${styles.tocItem} ${activeSection === section.id ? styles.active : ''}`}
                            onClick={() => onSectionClick(section.id)}
                        >
                            {section.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
