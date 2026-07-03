'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Book {
  title: string;
  sub: string;
  author: string;
  bg: string;
  text: string;
}

interface BookshelfCarouselProps {
  books: Book[];
}

export default function BookshelfCarousel({ books }: BookshelfCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  
  // To demonstrate the 5-second rotation while keeping 2 shelves (10 books), 
  // we'll duplicate the array if there are exactly 10 books so it has something to rotate to.
  const displayBooks = books.length === 10 ? [...books, ...books.reverse()] : books;
  
  const itemsPerPage = 10;
  const totalPages = Math.ceil(displayBooks.length / itemsPerPage);

  useEffect(() => {
    if (totalPages <= 1) return;
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000); // 5 second auto delay
    return () => clearInterval(interval);
  }, [totalPages]);

  const currentBooks = displayBooks.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  
  // Split into 2 shelves of 5
  const shelf1 = currentBooks.slice(0, 5);
  const shelf2 = currentBooks.slice(5, 10);

  const renderBook = (book: Book, i: number) => (
    <div 
      key={i} 
      className={`h-28 md:h-44 ${book.bg} ${book.text} rounded-sm p-1 md:p-2 flex flex-col relative shadow-[2px_0_5px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-2 cursor-pointer border-l border-white/20`}
    >
      <div className="flex-1 flex flex-col pt-1 md:pt-2">
        <h4 className="font-bold text-[6px] md:text-[10px] leading-[1.1] text-center tracking-tight" style={{fontFamily: 'serif'}}>{book.title}</h4>
        {book.sub && <p className="text-[5px] md:text-[7px] text-center mt-0.5 md:mt-1 opacity-80 leading-[1.1]">{book.sub}</p>}
      </div>
      <div className="text-[5px] md:text-[8px] text-center pb-1 md:pb-2 opacity-90 font-semibold">{book.author}</div>
      {/* Book spine line styling */}
      <div className="absolute left-0.5 md:left-1 top-0 bottom-0 w-[1px] bg-white/20" />
    </div>
  );

  return (
    <div className="bg-[#b48050] rounded-sm p-4 shadow-inner relative border-[12px] border-[#915a30] flex flex-col gap-4 overflow-hidden" style={{ boxShadow: 'inset 0 0 20px rgba(0,0,0,0.4)' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 w-full"
        >
          {/* Shelf 1 */}
          <div className="grid grid-cols-5 gap-1.5 md:gap-3 pb-3 border-b-8 border-[#7a4823]" style={{ boxShadow: '0 8px 10px -4px rgba(0,0,0,0.5)' }}>
            {shelf1.map(renderBook)}
          </div>
          
          {/* Shelf 2 */}
          {shelf2.length > 0 && (
            <div className="grid grid-cols-5 gap-1.5 md:gap-3 pb-3 border-b-8 border-[#7a4823]" style={{ boxShadow: '0 8px 10px -4px rgba(0,0,0,0.5)' }}>
              {shelf2.map(renderBook)}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Pagination dots below bookshelf */}
      {totalPages > 1 && (
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentPage === idx ? 'bg-[#008e59]' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
