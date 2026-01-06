import React, { useMemo, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import styles from 'styles/components/home.module.css'
import localeConfig from '../../site.locale.json'

import type { PageInfo, PageProps } from '@/lib/context/types'

import { PageHead } from '../../components/PageHead'
import HomeNav from './HomeNav'
import { ServicesTOC } from '../ServicesTOC'

export function Home({
  setBackgroundAsset,
  isHeroPaused,
  setIsHeroPaused,
  site,
  siteMap,
  homeRecordMaps,
  isMobile
}: PageProps) {
  const router = useRouter()
  const currentLocale = router.locale || localeConfig.defaultLocale

  const [screenWidth, setScreenWidth] = useState(0)

  const homePages = useMemo(() => {
    if (!siteMap) return []
    return Object.values(siteMap.pageInfoMap).filter(
      (page: PageInfo) => page.type === 'Home' && page.language === currentLocale
    )
  }, [siteMap, currentLocale])

  const getInitialTab = () => {
    return {
      tab: 'services',
      pageId: null
    }
  }

  const [activeTab, setActiveTab] = useState<string>('services')
  const [activeNotionPageId, setActiveNotionPageId] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string>('accounting')

  const accountingRef = useRef<HTMLDivElement>(null)
  const taxationRef = useRef<HTMLDivElement>(null)
  const corporateAdvisoryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Intersection Observer to track active section
  useEffect(() => {
    if (activeTab !== 'services') return

    const observerOptions = {
      root: null,
      rootMargin: '-120px 0px -50% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    }

    let mostVisibleSection = ''
    let highestRatio = 0

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
          highestRatio = entry.intersectionRatio
          mostVisibleSection = entry.target.id
        }
      })

      if (mostVisibleSection) {
        setActiveSection(mostVisibleSection)
      }

      // Reset for next observation
      highestRatio = 0
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    const sections = [accountingRef.current, taxationRef.current, corporateAdvisoryRef.current]
    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [activeTab])

  // Handle locale changes and sync active tab with displayed content
  useEffect(() => {
    if (activeNotionPageId && siteMap) {
      // Find current page info
      const currentPageInfo = siteMap.pageInfoMap[activeNotionPageId]
      if (currentPageInfo && currentPageInfo.type === 'Home') {
        // Look for equivalent page in new locale with same slug
        const equivalentPage = Object.values(siteMap.pageInfoMap).find(
          (page: PageInfo) =>
            page.type === 'Home' &&
            page.language === currentLocale &&
            page.slug === currentPageInfo.slug
        )

        if (equivalentPage) {
          // Found equivalent page, switch to it
          setActiveTab(equivalentPage.pageId)
          setActiveNotionPageId(equivalentPage.pageId)
        } else {
          // No equivalent page found, switch to first home page in new locale
          const firstHomePage = homePages[0]
          if (firstHomePage) {
            setActiveTab(firstHomePage.pageId)
            setActiveNotionPageId(firstHomePage.pageId)
          } else {
            // Fallback to recentPosts if no home pages available
            setActiveTab('recentPosts')
            setActiveNotionPageId(null)
          }
        }
      }
    }
  }, [currentLocale, siteMap, activeNotionPageId, homePages])

  // Sync active tab with displayed Notion page
  useEffect(() => {
    if (activeNotionPageId && siteMap) {
      const currentPageInfo = siteMap.pageInfoMap[activeNotionPageId]
      if (currentPageInfo && currentPageInfo.type === 'Home') {
        setActiveTab(activeNotionPageId)
      }
    }
  }, [activeNotionPageId, siteMap])

  const showTOC = useMemo(() => {
    if (!activeNotionPageId || !homeRecordMaps?.[activeNotionPageId]) return false

    const recordMap = homeRecordMaps[activeNotionPageId]
    const pageInfo = siteMap ? siteMap.pageInfoMap[activeNotionPageId] : null

    if (!pageInfo || !recordMap) return false

    const isBlogPost = pageInfo.type === 'Home' || pageInfo.type === 'Post'
    if (!isBlogPost) return false

    let headerCount = 0
    for (const blockWrapper of Object.values(recordMap.block)) {
      const blockData = (blockWrapper as any)?.value
      if (blockData?.type === 'header' || blockData?.type === 'sub_header' || blockData?.type === 'sub_sub_header') {
        headerCount++
      }
    }

    const minTableOfContentsItems = 3
    return headerCount >= minTableOfContentsItems && !isMobile && screenWidth >= 1200
  }, [activeNotionPageId, homeRecordMaps, siteMap, isMobile, screenWidth])

  const handleNavClick = (tab: string, pageId?: string) => {
    // Normal navigation - just set active state
    setActiveTab(tab)
  }

  const handleSectionClick = (sectionId: string) => {
    const refs = {
      'accounting': accountingRef,
      'taxation': taxationRef,
      'corporate-advisory': corporateAdvisoryRef
    }

    const ref = refs[sectionId as keyof typeof refs]
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(sectionId)
    }
  }

  const renderTabs = () => {
    switch (activeTab) {
      case 'services':
        return (
          <div className={styles.tabContent}>
            <div className={styles.servicesHero}>
              <h1 className={styles.mainHeading}>Accounting and Tax Services</h1>
              <p className={styles.heroDescription}>
                Helping businesses achieve sustainable growth and financial efficiency by providing strategic tax planning and expert compliance management — with secure remote and on-site advisory services.
              </p>
            </div>

            <div className={styles.servicesWithTOC}>
              <div className={styles.servicesSection}>
                {/* <h2 className={styles.sectionHeading}>Comprehensive Services</h2>
                <p className={styles.sectionSubheading}>Detailed financial solutions designed for your business needs</p> */}

                {/* Accounting */}
                <div ref={accountingRef} id="accounting" className={styles.serviceBlock}>
                  <h3 className={styles.serviceTitle}>Accounting</h3>
                  <p className={styles.serviceDescription}>
                    Precise, up-to-date financial record-keeping that provides unparalleled clarity into your business performance and empowers you to make smarter decisions.
                  </p>
                  <div className={styles.serviceGrid}>
                    <div className={styles.serviceCard}>
                      <h4 className={styles.columnTitle}>Key Features</h4>
                      <ul className={styles.featureList}>
                        <li>✓ Management accounts</li>
                        <li>✓ Invoices management</li>
                        <li>✓ Integration with accounting software</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Taxation */}
                <div ref={taxationRef} id="taxation" className={styles.serviceBlock}>
                  <h3 className={styles.serviceTitle}>Taxation</h3>
                  <p className={styles.serviceDescription}>
                    Strategic tax planning and end-to-end compliance management to legally minimize your tax burden and ensure rigorous alignment with all regulatory requirements.
                  </p>
                  <div className={styles.serviceGrid}>
                    <div className={styles.serviceCard}>
                      <h4 className={styles.columnTitle}>Key Features</h4>
                      <ul className={styles.featureList}>
                        <li>✓ Strategic tax planning</li>
                        <li>✓ Expert advocacy of tax cases</li>
                        <li>✓ Preparation and filing of income tax return</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Corporate Advisory */}
                <div ref={corporateAdvisoryRef} id="corporate-advisory" className={styles.serviceBlock}>
                  <h3 className={styles.serviceTitle}>Corporate Advisory</h3>
                  <p className={styles.serviceDescription}>
                    Expert corporate services anchored in the Companies Act, 2017. We provide full-scope assistance for SECP filings and all statutory returns, ensuring your entity is always compliant and legally robust.
                  </p>
                  <div className={styles.serviceGrid}>
                    <div className={styles.serviceCard}>
                      <h4 className={styles.columnTitle}>Key Features</h4>
                      <ul className={styles.featureList}>
                        <li>✓ Company Incorporation & compliances</li>
                        <li>✓ Transfer of shares and further issuance of capital</li>
                        <li>✓ Alternation in memorandum</li>
                        <li>✓ Winding up of company</li>
                        <li>✓ Special assignments assigned by regulatory body</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <ServicesTOC
                activeSection={activeSection}
                onSectionClick={handleSectionClick}
              />
            </div>
          </div>
        )

      case 'news':
        return (
          <div className={styles.tabContent}>
            <h2 className={styles.sectionHeading}>Insights</h2>
            <p className={styles.comingSoon}>Content coming soon...</p>
          </div>
        )

      case 'about':
        return (
          <div className={styles.tabContent}>
            <div className={styles.aboutSection}>
              <h2 className={styles.sectionHeading}>About</h2>
              <p className={styles.aboutText}>
                Financial excellence requires more than just balancing the books. Leveraging seven years of corporate expertise, we provide a holistic approach across Accounting, Taxation, and Corporate Advisory; we go beyond traditional bookkeeping by transforming your financial data into a strategic roadmap for informed decision-making.
              </p>
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className={styles.tabContent}>
            <div className={styles.contactSection}>
              <h2 className={styles.sectionHeading}>Get in Touch</h2>
              <p className={styles.contactSubtitle}>Have questions? Reach out directly.</p>
              <div className={styles.contactButtons}>
                <a href="#" className={`${styles.contactButton} ${styles.whatsappButton}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </a>
                <a href="#" className={`${styles.contactButton} ${styles.emailButton}`}>
                  ✉ Email Direct
                </a>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className={styles.tabContent}>
            <p className={styles.comingSoon}>Select a tab to view content</p>
          </div>
        )
    }
  }

  if (!site || !siteMap) {
    return <div>Loading...</div>
  }

  return (
    <>
      <PageHead
        site={site}
        title={site.name}
        description={site.description}
        url={`/${router.locale}${router.asPath === '/' ? '' : router.asPath}`}
      />

      <div className={styles.homeContainer}>
        {/* Hero component removed - will use static background instead */}
        {/* <Hero
          onAssetChange={setBackgroundAsset || (() => {})}
          isPaused={isHeroPaused || false}
          setIsPaused={setIsHeroPaused || (() => {})}
        /> */}
        <HomeNav
          homePages={homePages}
          activeTab={activeTab}
          onNavClick={handleNavClick}
        />

        {/* Render tab content */}
        <main className={styles.mainContent}>{renderTabs()}</main>
      </div>
    </>
  )
}