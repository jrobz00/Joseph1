'use client'

import { useState, useEffect } from 'react'
import { Dialog, Menu } from '@headlessui/react'
import { motion } from 'framer-motion'
import {
  Bars3Icon,
  XMarkIcon,
  BellIcon,
} from '@heroicons/react/24/outline'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import emailjs from 'emailjs-com'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [tickets, setTickets] = useState([]) // Empty ticket array initially.
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTicket, setNewTicket] = useState({ title: '', description: '' })
  const navigate = useNavigate()

  // Force dark mode and subscribe to auth state changes.
  useEffect(() => {
    document.documentElement.classList.add('dark')
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
    return () => unsubscribe()
  }, [])

  // Load tickets from localStorage when the user changes.
  useEffect(() => {
    if (currentUser) {
      const savedTickets = localStorage.getItem(`tickets_${currentUser.email}`)
      if (savedTickets) {
        setTickets(JSON.parse(savedTickets))
      }
    }
  }, [currentUser])

  // Save tickets to localStorage whenever they change.
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`tickets_${currentUser.email}`, JSON.stringify(tickets))
    }
  }, [tickets, currentUser])

  const handleNewTicketChange = (e) => {
    const { name, value } = e.target
    setNewTicket((prev) => ({ ...prev, [name]: value }))
  }

  const handleTicketSubmit = async (e) => {
    e.preventDefault()
    if (newTicket.title && newTicket.description && currentUser) {
      const newId = tickets.length + 1
      const ticket = {
        id: newId,
        title: newTicket.title,
        description: newTicket.description,
        status: 'Open',
        userEmail: currentUser.email,
      }
      setTickets([...tickets, ticket])

      const templateParams = {
        title: newTicket.title,
        description: newTicket.description,
        status: ticket.status,
        email: currentUser.email,
      }

      try {
        const response = await emailjs.send(
          'service_ceu2i8g',   // Your EmailJS service ID
          'template_84jn7h5',  // Your EmailJS template ID
          templateParams,
          'v92p6KVVAr1FaEir9'  // Your EmailJS public key
        )
        console.log('Email sent successfully!', response.status, response.text)
      } catch (error) {
        console.error('Failed to send email:', error)
      }

      setNewTicket({ title: '', description: '' })
      setIsModalOpen(false)
    }
  }

  // Function to simulate marking a ticket as closed (i.e. email response received)
  const markTicketClosed = (ticketId) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: 'Closed' } : ticket
      )
    )
  }

  // Filter tickets for the logged-in user.
  const userTickets = currentUser
    ? tickets.filter((ticket) => ticket.userEmail === currentUser.email)
    : []

  // Logout handler.
  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/') // Redirect to homepage after logout.
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-md">
        <nav className="flex items-center justify-between px-6 py-4">
          {/* Navbrand with explicit white text */}
          <a
            href="#dashboard"
            className="text-2xl font-bold text-white no-underline hover:text-indigo-400 transition-colors duration-300"
          >
            Client Dashboard
          </a>

          <div className="flex items-center space-x-4">
            {/* Notification Dropdown */}
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="relative p-2 hover:text-indigo-400 transition-colors duration-300 focus:outline-none">
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-7 w-7" />
                {userTickets.length > 0 && (
                  <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                    {userTickets.length}
                  </span>
                )}
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-10 focus:outline-none">
                <div className="p-4">
                  {userTickets.length > 0 ? (
                    <>
                      <p className="mb-2 text-sm font-semibold text-gray-800">Your Tickets:</p>
                      <ul className="max-h-40 overflow-y-auto">
                        {userTickets.map((ticket) => (
                          <Menu.Item key={ticket.id}>
                            {({ active }) => (
                              <li className={`${active ? 'bg-indigo-100' : ''} px-3 py-1 rounded`}>
                                <span className="text-sm text-gray-800">{ticket.title}</span>
                              </li>
                            )}
                          </Menu.Item>
                        ))}
                      </ul>
                      <div className="mt-2 text-xs text-gray-500">
                        We have received your ticket(s) and will respond shortly.
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-gray-800">No new tickets.</p>
                  )}
                </div>
              </Menu.Items>
            </Menu>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500 transition-colors duration-300"
            >
              Logout
            </button>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex items-center justify-center rounded-md p-2 hover:text-indigo-400 transition-colors duration-300 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="md:hidden">
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-gray-900 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <a
                href="#dashboard"
                className="text-2xl font-bold text-white no-underline hover:text-indigo-400 transition-colors duration-300"
              >
                Client Dashboard
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:text-indigo-400 transition-colors duration-300 focus:outline-none"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            {/* Additional mobile navigation links removed */}
          </Dialog.Panel>
        </Dialog>
      </header>

      {/* Main Content */}
      <main className="px-6 pt-16 pb-10">
        <h1 className="mb-10 text-4xl font-bold tracking-wide">Dashboard</h1>

        {/* Tickets Section */}
        <section id="tickets">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Tickets</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold hover:bg-indigo-500 transition-colors duration-300"
            >
              New Ticket
            </button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentUser ? (
              userTickets.length > 0 ? (
                userTickets.map((ticket) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-lg bg-gray-800 p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">{ticket.title}</h3>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          ticket.status === 'Open'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-600 text-gray-200'
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <p className="mt-4 text-gray-300">{ticket.description}</p>
                    {ticket.status === 'Open' && (
                      <button
                        onClick={() => markTicketClosed(ticket.id)}
                        className="mt-4 inline-block rounded-md bg-indigo-600 px-3 py-1 text-xs font-semibold hover:bg-indigo-500 transition-colors duration-300"
                      >
                        Simulate Email Response (Close Ticket)
                      </button>
                    )}
                  </motion.div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-400">
                  You have no tickets. Create one above!
                </p>
              )
            ) : (
              <p className="col-span-full text-center text-gray-400">
                Please log in to view your tickets.
              </p>
            )}
          </div>
        </section>
      </main>

      {/* New Ticket Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-lg bg-white p-6 shadow-2xl transition-all">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              Create New Ticket
            </Dialog.Title>
            <form onSubmit={handleTicketSubmit} className="mt-6 space-y-5">
              <div>
                <label htmlFor="ticketTitle" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="ticketTitle"
                  value={newTicket.title}
                  onChange={handleNewTicketChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="ticketDescription" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  id="ticketDescription"
                  value={newTicket.description}
                  onChange={handleNewTicketChange}
                  required
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
