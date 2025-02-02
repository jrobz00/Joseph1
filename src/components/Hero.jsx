'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { motion } from 'framer-motion'
import {
  Bars3Icon,
  XMarkIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon, // Use DevicePhoneMobileIcon from Heroicons v2
  PencilSquareIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Contact', href: '#portfolio' },
]

const features = [
  {
    name: 'Responsive Design',
    description:
      'I craft modern, mobile-first websites that adapt perfectly to every device – from smartphones to desktops.',
    icon: DevicePhoneMobileIcon,
  },
  {
    name: 'Custom Development',
    description:
      'I deliver tailored web solutions using the latest front-end and back-end technologies to meet your unique needs.',
    icon: CodeBracketIcon,
  },
  {
    name: 'UX/UI Excellence',
    description:
      'I design intuitive, user-friendly interfaces that not only look professional but also deliver an exceptional user experience.',
    icon: PencilSquareIcon,
  },
  {
    name: 'Ongoing Support',
    description:
      'I provide reliable maintenance and support to keep your website secure, performant, and up-to-date.',
    icon: WrenchScrewdriverIcon,
  },
]

const timelineProjects = [
  {
    title: 'AltixPayments',
    date: '2025',
    description:
      'A client project for AltixPayments, a company offering Payment Solutions for All Businesses.',
    link: 'https://altixpayments.com/',
  },
  {
    title: 'FlowersBarKitchen',
    date: '2025',
    description:
      'Developed the main restaurant website for FlowersBarKitchen, a prestigious restaurant based in London, Mayfair.',
    link: 'https://flowersbarkitchen.com/',
  },
  {
    title: 'PaletteBloom',
    date: '2024',
    description:
      'A personal platform to showcase my capabilities in web development and design.',
    link: 'https://palettebloom.com/',
  },
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Force dark mode by always adding the "dark" class.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Function to copy Discord username to clipboard.
  const handleCopyDiscord = () => {
    navigator.clipboard
      .writeText("josephrobinson1")
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch((error) => {
        console.error("Failed to copy Discord username:", error)
      })
  }

  return (
    <div className="bg-black">
      {/* Header */}
      <header className="animate-fadeIn absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a
              href="#home"
              className="text-lg font-bold text-white no-underline hover:scale-105 transition-transform duration-300"
            >
              Joseph Robinson
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white hover:scale-105 transition-transform duration-300"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-white no-underline hover:scale-105 transition-transform duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
            <a
              href="/auth"
              className="text-sm font-semibold text-white no-underline hover:scale-105 transition-transform duration-300"
            >
              Client Portal <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>

        {/* Mobile Menu */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="animate-fadeIn fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-800">
            <div className="flex items-center justify-between">
              <a
                href="#home"
                className="text-lg font-bold text-white no-underline hover:scale-105 transition-transform duration-300"
              >
                Joseph Robinson
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-white hover:scale-105 transition-transform duration-300"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-800">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-base font-semibold text-white no-underline hover:bg-gray-800 hover:scale-105 transition-transform duration-300"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#contact"
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold text-white no-underline hover:bg-gray-800 hover:scale-105 transition-transform duration-300"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Hero Section */}
      <section id="home" className="animate-fadeIn relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-600 to-purple-900 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm text-gray-300 ring-1 ring-gray-800 hover:ring-gray-600 transition-all duration-300">
              Professional Web Developer.
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
              Joseph Robinson
            </h1>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#contact"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 no-underline hover:scale-105 transition-transform duration-300"
              >
                Hire Me
              </a>
              <a
                href="#portfolio"
                className="text-sm font-semibold text-white no-underline hover:scale-105 transition-transform duration-300"
              >
                See my work <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-indigo-600 to-purple-900 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="animate-fadeIn bg-black py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold text-indigo-600">My Expertise</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              What I Offer
            </p>
            <p className="mt-6 text-lg text-gray-300">
              From responsive design to custom development and ongoing support, I provide comprehensive freelance web solutions.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16 hover:scale-105 transition-transform duration-300">
                  <dt className="text-base font-semibold text-white">
                    <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base text-gray-300">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Portfolio Section using Framer Motion */}
      <section id="portfolio" className="animate-fadeIn bg-black py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold text-indigo-600">My Projects</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Freelance Project Timeline
            </p>
            <p className="mt-6 text-lg text-gray-300">
              Explore some of the freelance projects I have completed, showcasing my skills in web development.
            </p>
          </div>
          <div className="mt-16">
            <div className="relative border-l border-gray-800">
              {timelineProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="mb-10 ml-6 hover:scale-105 transition-transform duration-300"
                >
                  <span className="absolute -left-3.5 mt-1.5 h-7 w-7 rounded-full bg-indigo-600"></span>
                  <h3 className="mb-1 text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                    {project.date}
                  </time>
                  <p className="mb-4 text-base font-normal text-gray-400">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    className="inline-flex items-center text-sm font-medium text-indigo-600 hover:underline transition-all duration-300"
                  >
                    See more
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section with Discord Button */}
      <section id="contact" className="animate-fadeIn bg-black py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold text-indigo-600">Contact</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Get In Touch
            </p>
            <p className="mt-6 text-lg text-gray-300">
              Click the button below to add me on Discord.
            </p>
            <button
              onClick={handleCopyDiscord}
              className="mt-6 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-all duration-300"
            >
              Add me on Discord
            </button>
            {copied && <p className="mt-2 text-sm text-green-500">Discord username copied!</p>}
          </div>
        </div>
      </section>
    </div>
  )
}
