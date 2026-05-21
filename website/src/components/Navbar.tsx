"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Fitur", href: "/features" },
  { label: "Harga", href: "/pricing" },
  {
    label: "Sumber Daya",
    href: "#",
    children: [
      { label: "Dokumentasi", href: "https://developers.conviq.id", external: true },
      { label: "GitHub", href: "https://github.com/ridloabelian/conviq", external: true },
    ],
  },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-secondary">conviq</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                  className="flex items-center gap-1 text-sm font-medium text-muted hover:text-secondary transition-colors"
                >
                  {link.label}
                  <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-border py-2"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          target={child.external ? "_blank" : undefined}
                          className="block px-4 py-2 text-sm text-muted hover:text-secondary hover:bg-surface transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-secondary transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="https://app.conviq.id/auth/sign_in"
            className="text-sm font-medium text-muted hover:text-secondary transition-colors px-4 py-2"
          >
            Masuk
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-colors px-5 py-2.5 rounded-xl"
          >
            Coba Gratis
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-secondary"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="space-y-2">
                    <span className="text-sm font-medium text-muted">{link.label}</span>
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        target={child.external ? "_blank" : undefined}
                        className="block pl-4 text-sm text-muted hover:text-secondary"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-sm font-medium text-secondary"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="pt-3 border-t border-border space-y-2">
                <Link
                  href="https://app.conviq.id/auth/sign_in"
                  className="block text-sm font-medium text-muted"
                >
                  Masuk
                </Link>
                <Link
                  href="/pricing"
                  className="block text-center text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-colors px-5 py-2.5 rounded-xl"
                >
                  Coba Gratis
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
