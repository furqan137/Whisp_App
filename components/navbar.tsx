'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Privacy', href: '#privacy' },
    { label: 'Security', href: '#security' },
    { label: 'Pricing', href: '#pricing' },
  ]

  const handleNavClick = (href: string) => {
    setIsOpen(false)

    const element = document.querySelector(href)

    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'border-b border-white/5 bg-[#08111f]/80 backdrop-blur-md'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* Logo */}
            <motion.div
              className="cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
            >
              <Image
                src="/logo.png"
                alt="Whisp Logo"
                width={180}
                height={60}
                priority
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="relative text-sm font-medium text-gray-300 transition-colors hover:text-white"
                  whileHover={{ y: -2 }}
                >
                  {item.label}

                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Desktop CTA */}
            <motion.button
              className="hidden md:flex items-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2.5 text-white font-medium shadow-lg shadow-purple-500/20"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 25px rgba(124,92,255,0.5)',
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('#pricing')}
            >
              Get Started
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2"
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="h-6 w-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="h-6 w-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="border-t border-white/5 md:hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="space-y-2 py-4">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      onClick={() => handleNavClick(item.href)}
                      className="block w-full rounded-lg px-4 py-3 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.05,
                      }}
                    >
                      {item.label}
                    </motion.button>
                  ))}

                  <motion.button
                    onClick={() => handleNavClick('#pricing')}
                    className="mt-3 w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 text-white font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      <div className="h-16 sm:h-20" />
    </>
  )
}