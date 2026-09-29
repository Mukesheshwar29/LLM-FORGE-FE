import React, { useState, useEffect } from 'react';
import { Dna, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Traits Catalog', href: '#traits' },
    { name: 'Pedigree Explorer', href: '#pedigree' },
    { name: 'Role Workspaces', href: '#workspaces' },
    { name: 'Recurrence Calculator', href: '#simulator' },
    { name: 'How It Works', href: '#workflow' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-midnight/90 backdrop-blur-xl border-b border-cyan-electric/15 shadow-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-surface-card border border-cyan-electric/30 flex items-center justify-center shadow-glow-cyan group-hover:border-cyan-electric transition-all">
              <Dna className="w-5 h-5 text-cyan-electric group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg text-text-primary tracking-tight group-hover:text-cyan-electric transition-colors">
                GenInherit<span className="text-cyan-electric font-mono text-xs ml-1 px-1.5 py-0.5 rounded bg-cyan-electric/10 border border-cyan-electric/20 font-bold">LLM</span>
              </span>
              <span className="text-[10px] font-mono text-text-muted tracking-wider uppercase">
                Multigenerational Intelligence
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold text-text-secondary hover:text-cyan-electric transition-colors tracking-wide"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#traits"
              className="text-xs font-semibold text-text-secondary hover:text-text-primary px-3 py-2 transition-colors"
            >
              Demo Reports
            </a>
            <a
              href="#traits"
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-electric to-cyan-deep text-midnight font-bold px-4 py-2.5 rounded-xl text-xs shadow-glow-cyan hover:opacity-95 active:scale-95 transition-all"
            >
              <span>Upload DNA / Start</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-surface-card border border-cyan-electric/20 text-text-primary hover:text-cyan-electric"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-midnight/98 backdrop-blur-2xl border-b border-cyan-electric/20 px-6 py-6 shadow-2xl animate-in slide-in-from-top-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-text-secondary hover:text-cyan-electric py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4">
              <a
                href="#workspaces"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm text-text-secondary font-medium"
              >
                Sign In
              </a>
              <a
                href="#pedigree"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-electric to-lavender-muted text-midnight font-semibold py-3 rounded-lg text-sm"
              >
                <span>Explore the Platform</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
