'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Lock, MessageCircle, Zap, Shield, Eye, Volume2, Download, Play, Star, Check, Menu, X } from 'lucide-react'
import Image from 'next/image'


const APK_URL =
  'https://github.com/furqan137/Whisp/releases/download/Whisp_v1.0.1/Whisp_v2.apk'

// Navbar Component
const Navbar = () => {
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
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#08111f]/80 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
           <motion.div
  className="cursor-pointer flex items-center"
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
    alt="Whisp"
    width={220}
    height={60}
    priority
    className="h-12 sm:h-14 md:h-16 w-auto object-contain"
  />
</motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-300 hover:text-white text-sm font-medium transition-colors relative group"
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

            {/* CTA Button - Desktop */}
            <motion.button
              className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('#pricing')}
            >
              Get Started
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="md:hidden pb-4 border-t border-white/5"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col gap-3 pt-4">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      onClick={() => handleNavClick(item.href)}
                      className="text-gray-300 hover:text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-white/5 transition-colors text-left"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                  <motion.button
                    className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all mt-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavClick('#pricing')}
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-16 sm:h-20" />
    </>
  )
}

// Floating Particles Background
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.5,
    duration: 4 + Math.random() * 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-purple-500/30 rounded-full blur-sm"
          initial={{ opacity: 0, x: `${particle.x}%`, y: `${particle.y}%` }}
          animate={{
            opacity: [0, 0.6, 0],
            y: [0, -100, -200],
            x: particle.x + (Math.random() - 0.5) * 50,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  )
}

const MockupsSection = () => {
const screenshots = [
{
image: '/mockups/whisp-1.png',
title: 'Secure Account Creation',
description:
'Create your private identity in seconds with military-grade encryption and anonymous profiles.',
},
{
image: '/mockups/whisp-2.png',
title: 'Private Messaging',
description:
'Send messages instantly with end-to-end encryption and complete privacy protection.',
},
{
image: '/mockups/whisp-3.png',
title: 'Built-in VPN & Security',
description:
'Stay protected everywhere with integrated VPN features and advanced security controls.',
},
{
image: '/mockups/whisp-4.png',
title: 'Voice Effects & Privacy',
description:
'Communicate securely while protecting your identity using powerful voice masking tools.',
},
]

return ( <section
   id="screenshots"
   className="relative overflow-hidden py-32"
 > <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />


  <div className="mx-auto max-w-7xl px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="inline-flex rounded-full border border-purple-500/20 bg-purple-500/10 px-5 py-2 text-sm font-semibold text-purple-300">
        APP EXPERIENCE
      </div>

      <h2 className="mt-6 text-5xl font-bold text-white lg:text-7xl">
        Beautiful & Secure
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
        Experience private messaging through a premium interface
        designed for speed, security and complete anonymity.
      </p>
    </motion.div>

    <div className="mt-24 space-y-28">
      {screenshots.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: index * 0.1,
          }}
          className={`flex flex-col items-center gap-14 ${
            index % 2 === 0
              ? 'lg:flex-row'
              : 'lg:flex-row-reverse'
          }`}
        >
          <div className="flex-1">
            <div className="overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_rgba(124,92,255,0.25)] transition-all duration-500 hover:scale-[1.02]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 max-w-xl">
            <div className="inline-flex rounded-full bg-purple-500/20 px-4 py-2 text-sm font-semibold text-purple-300">
              Feature {index + 1}
            </div>

            <h3 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
              {item.title}
            </h3>

            <p className="mt-6 text-lg leading-relaxed text-gray-400">
              {item.description}
            </p>

            <div className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


)
}



// Glowing Background Orbs
const GlowingOrbs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Purple orb top left */}
      <motion.div
        className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-glow"
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ left: '-100px', top: '-100px' }}
      />
      
      {/* Blue orb bottom right */}
      <motion.div
        className="absolute w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-glow"
        animate={{
          x: [0, -50, 50, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{
          duration: 8,
          delay: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ right: '-100px', bottom: '-100px' }}
      />

      {/* Additional accent orb */}
      <motion.div
        className="absolute w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{
          duration: 10,
          delay: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ left: '50%', top: '50%', marginLeft: '-144px', marginTop: '-144px' }}
      />
    </div>
  )
}

// Hero Section with Parallax
const HeroSection = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <GlowingOrbs />
      </motion.div>

      <FloatingParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Logo and Branding */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 w-fit"
            >
              <Image
  src="/logo.png"
  alt="Whisp"
  width={220}
  height={60}
  className="h-14 w-auto"
/>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Whisp
              </span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl lg:text-7xl font-bold text-white leading-tight"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-300">
                  Private. Secure. Anonymous.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-400 leading-relaxed max-w-xl"
              >
                The next generation messaging platform with secure chats, private groups, disappearing messages, voice effects, encrypted sharing, and built-in VPN privacy tools.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
            <motion.a
  href={APK_URL}
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{
    scale: 1.05,
    boxShadow: '0 0 40px rgba(124, 92, 255, 0.6)',
  }}
  whileTap={{ scale: 0.95 }}
  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2"
>
  <Download className="w-5 h-5" />
  Download APK
</motion.a>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(63, 169, 255, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10"
            >
              {[
                { number: '100K+', label: 'Messages Protected' },
                { number: '50K+', label: 'Private Conversations' },
                { number: '10K+', label: 'Groups Created' },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-2xl font-bold text-purple-400">{stat.number}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative w-64 h-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border-8 border-gray-700 shadow-2xl shadow-purple-500/20"
            >
              <div className="absolute inset-4 bg-gradient-to-b from-purple-900/40 to-blue-900/40 rounded-2xl overflow-hidden backdrop-blur-sm">
                <div className="w-full h-full bg-gray-950 flex flex-col items-center justify-center p-4 space-y-4">
                  <MessageCircle className="w-16 h-16 text-purple-400" />
                  <p className="text-white font-semibold text-center">Secure messaging at your fingertips</p>
                  <div className="flex gap-2 mt-6">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
              <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-t-2xl flex items-center justify-center">
                <div className="w-32 h-1 bg-gray-800 rounded-full" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Trust Section with Glass Cards
const TrustSection = () => {
  const features = [
    { icon: Lock, title: 'End-to-End Privacy', desc: 'Military-grade encryption' },
    { icon: Shield, title: 'Secure Messaging', desc: 'Zero-knowledge architecture' },
    { icon: Eye, title: 'Anonymous Profiles', desc: 'Complete anonymity' },
    { icon: Zap, title: 'Self Destruct Messages', desc: 'Auto-delete after timer' },
    { icon: Volume2, title: 'Voice Effects', desc: 'Transform your voice' },
    { icon: MessageCircle, title: 'VPN Protection', desc: 'Hide your location' },
  ]

  return (
    <section className="relative w-full py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Why Choose Whisp?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Built with privacy first, security always. Trust us with your conversations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5, 
                boxShadow: '0 0 40px rgba(124, 92, 255, 0.3)',
              }}
              className="group glass p-6 rounded-2xl cursor-pointer transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300"
              >
                <feature.icon className="w-6 h-6 text-white" />
              </motion.div>

              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      title: 'Private Messaging',
      desc: 'Chat freely with secure one-to-one conversations',
      icon: '💬',
    },
    {
      title: 'Group Chats',
      desc: 'Create groups and communicate with multiple members instantly',
      icon: '👥',
    },
    {
      title: 'Self-Destruct Messages',
      desc: 'Messages disappear automatically after a selected timer',
      icon: '💨',
    },
    {
      title: 'Voice Effects',
      desc: 'Transform voice messages with AI-powered effects',
      icon: '🎙️',
    },
  ]

  return (
    <section className="relative w-full py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center mb-24 last:mb-0`}
          >
            <div className="flex-1">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass rounded-2xl p-8 h-80 flex items-center justify-center text-6xl"
              >
                {feature.icon}
              </motion.div>
            </div>

            <div className="flex-1 space-y-4">
              <h3 className="text-3xl lg:text-4xl font-bold text-white">{feature.title}</h3>
              <p className="text-lg text-gray-400">{feature.desc}</p>
              <motion.button
                whileHover={{ x: 5 }}
                className="text-purple-400 font-semibold flex items-center gap-2 mt-6 hover:text-purple-300 transition-colors"
              >
                Learn more →
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// Comparison Table
const ComparisonSection = () => {
  const comparisons = [
    { feature: 'Private Messaging', whisp: true, traditional: true },
    { feature: 'Self Destruct Messages', whisp: true, traditional: false },
    { feature: 'Voice Effects', whisp: true, traditional: false },
    { feature: 'Anonymous Identity', whisp: true, traditional: false },
    { feature: 'VPN Integration', whisp: true, traditional: false },
    { feature: 'Privacy Controls', whisp: true, traditional: false },
  ]

  return (
    <section className="relative w-full py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            How Whisp Compares
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left text-white font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Whisp</th>
                  <th className="px-6 py-4 text-center text-gray-400 font-semibold">Traditional Messengers</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="px-6 py-4 text-white">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      {row.whisp ? (
                        <Check className="w-5 h-5 text-green-400 mx-auto" />
                      ) : (
                        <span className="text-gray-600">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.traditional ? (
                        <Check className="w-5 h-5 text-green-400 mx-auto" />
                      ) : (
                        <span className="text-gray-600">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Privacy Advocate',
      content: 'Finally, a messaging app that takes privacy seriously. Whisp is exactly what I\'ve been waiting for.',
      rating: 5,
    },
    {
      name: 'James Wilson',
      role: 'Tech Journalist',
      content: 'The voice effects are incredible, but the real standout is the military-grade encryption.',
      rating: 5,
    },
    {
      name: 'Emma Rodriguez',
      role: 'Cybersecurity Expert',
      content: 'After auditing the code, I can confidently recommend Whisp to anyone concerned about privacy.',
      rating: 5,
    },
  ]

  return (
    <section className="relative w-full py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Loved by Privacy Advocates
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-300 mb-6">{testimonial.content}</p>

              <div>
                <p className="text-white font-semibold">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Privacy Section
const PrivacySection = () => {
  return (
    <section id="privacy" className="relative w-full py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <GlowingOrbs />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-8xl"
            >
              🔒
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Your Conversations Belong To You
            </h2>

            <p className="text-lg text-gray-400">
              Whisp is designed around privacy, control, and secure communication. Your messages, groups, voice notes, and personal information remain under your control. We don&apos;t collect data, we don&apos;t sell it, and we never will.
            </p>

            <ul className="space-y-3">
              {['No ads, no tracking', 'Open source code', '100% encrypted', 'Zero-knowledge servers'].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// CTA Section
const CTASection = () => {
  return (
    <section id="pricing" className="relative w-full py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0">
        <GlowingOrbs />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white">
            Start Secure Messaging Today
          </h2>

          <p className="text-lg text-gray-400">
            Join thousands of users protecting their privacy with Whisp.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(124, 92, 255, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              Download for iOS
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(63, 169, 255, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              Download for Android
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => {
  return (
    <footer className="relative w-full py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
                <Image
  src="/logo.png"
  alt="Whisp"
  width={220}
  height={60}
  className="h-14 w-auto"
/>
              <span className="text-lg font-bold text-white">Whisp</span>
            </div>
            <p className="text-gray-500 text-sm">Private. Secure. Anonymous.</p>
          </div>

          {[
            { title: 'Product', links: ['Features', 'Download', 'Security'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers'] },
            { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Contact'] },
          ].map((col, i) => (
            <div key={i} className="space-y-4">
              <h3 className="text-white font-semibold">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2026 Whisp. All Rights Reserved.</p>
          <p className="text-gray-500 text-sm">support@whisp.app</p>
        </div>
      </div>
    </footer>
  )
}

// Main Page
export default function Home() {
  return (
    <main className="w-full bg-[#08111f] overflow-hidden">
      <Navbar />
      <HeroSection />
     <TrustSection />
      <FeaturesSection />
      <ComparisonSection />
      <MockupsSection />
      <TestimonialsSection />
      <PrivacySection />
      <CTASection />
      <Footer />
    </main>
  )
}
