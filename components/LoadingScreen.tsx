import React from 'react'

export function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-label="Loading hacap">
      <div className="loading-orbit" aria-hidden="true" />
      <div className="loading-mark">H</div>
      <div className="loading-copy">
        <span>HACAP</span>
        <span>Accounting · Tax · Advisory</span>
      </div>
    </div>
  )
}
