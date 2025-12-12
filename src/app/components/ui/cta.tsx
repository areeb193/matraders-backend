import React from 'react'
import CallButton from './callButton';
import BrowseButton from './browseButton';
const CTA = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-sky-50 via-emerald-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl py-2 md:text-5xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm mb-6">
                Ready to Start Your Solar Journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                Get a free consultation and quote for your solar installation
                project today!
              </p>
    
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-8">
                <CallButton />
                <BrowseButton path="/projects" name="View our work" />
              </div>
            </div>
          </section>
  )
}

export default CTA