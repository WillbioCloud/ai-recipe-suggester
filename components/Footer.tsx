import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-12 py-4 shadow-inner-top">
      <div className="container mx-auto px-4 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Empadão Goiano da Tânia. Todos os direitos reservados.</p>
        <p>Caldas Novas - GO</p>
      </div>
       <style>{`
        .shadow-inner-top {
          box-shadow: inset 0 1px 3px 0 rgb(0 0 0 / 0.05);
        }
      `}</style>
    </footer>
  );
};

export default Footer;