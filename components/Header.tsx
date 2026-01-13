import React from 'react';

interface HeaderProps {
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'shadow-md py-3 bg-white/80 backdrop-blur-sm' : 'shadow-sm py-4 bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:p-8 flex items-center justify-center">
         <span className="text-3xl mr-3" role="img" aria-label="Pie">🥧</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 tracking-tight" style={{ fontFamily: "'Georgia', 'serif'"}}>
          Empadão Goiano da Tânia
        </h1>
      </div>
    </header>
  );
};

export default Header;