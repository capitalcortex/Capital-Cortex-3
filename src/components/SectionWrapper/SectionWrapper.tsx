import React from 'react'
const SectionWrapper = ({ children }: any) => {
    return (
        <div className="theme-container py-4 sm:py-12">
            {children}
        </div>
    )
}

export default SectionWrapper