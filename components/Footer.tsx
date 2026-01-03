import cs from 'classnames'
import * as React from 'react'
import styles from 'styles/components/common.module.css'

import * as config from '@/lib/config'

import { PageSocial } from './PageSocial'

export function FooterImpl({ isMobile }: { isMobile: boolean }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div
        className={cs(
          styles.footerContent,
          !isMobile && styles.footerContentWithSideNav
        )}
      >
        <div style={{
          width: '100%',
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}>
            <div className={styles.copyright} style={{ order: isMobile ? 2 : 1 }}>
              © {currentYear} HAcapital. All rights reserved.
            </div>
            <div style={{ order: isMobile ? 1 : 2 }}>
              <PageSocial />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export const Footer = React.memo(FooterImpl)
