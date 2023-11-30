'use client'
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

function Popup({ popUp, setPopUp }) {
    return (
        <AnimatePresence>
            {popUp.stauts && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setPopUp({ stauts: false, data: null })}
                    className='bg-slate-900/20 backdrop-blur p-1 sm:p-6 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer'
                >
                    <motion.div
                        initial={{ scale: 0, rotate: '12.5deg' }}
                        animate={{ scale: 1, rotate: '0deg' }}
                        exit={{ scale: 0, rotate: '0deg' }}
                        z
                        onClick={(e) => e.stopPropagation()}
                        className='bg-gradient-to-br bg-[#161515] top-8 sm:top-0 p-1 sm:p-6 rounded-lg w-full max-w-2xl shadow-xl cursor-default relative overflow-hidden border border-[#D1C3AE] '
                    >
                        <div className='relative z-10'>
                            <div className='text-[#C29269] mb-3 flex flex-col sm:flex-row justify-between items-center'>
                                <h1 className='text-6xl font-bold    '>{popUp.data?.word ?? ""}</h1>
                                <h3 className='text-4xl font-semibold  '>{popUp.data?.prn ?? ""}</h3>
                            </div>
                            <div className='mb-3 bg-[#D1C3AE] text-[#161515] p-3 rounded-xl text-left'>
                                <i className='text-sm font-light'>definition</i>
                                <p className='text-xl font-bold'>
                                    {popUp.data?.def ?? ""}
                                </p>
                            </div>
                            <div className='mb-3 bg-[#D1C3AE] text-[#161515] p-3 rounded-xl text-left'>
                                <i className='text-sm font-light'>examples</i>
                                {
                                    popUp.data?.exp && popUp.data.exp.map((ex, i) => <li key={i} className='text-xl font-bold mb-1'> {ex ?? ""} </li>)
                                }
                            </div>

                            <div className='flex flex-row justify-between items-center gap-3'>
                                <div className=' bg-[#D1C3AE] p-3 rounded-xl gap-2 flex flex-wrap'>
                                    <i className='w-[100%] text-[#161515] text-sm font-light'>synonyms</i>
                                    {
                                        popUp.data?.syn && popUp.data.syn.map((sy, i) => <p key={i} className='p-2 bg-[#161515] text-sm rounded-lg text-[#C29269] font-medium'>{sy ?? ""}</p>)
                                    }
                                </div>
                                <div className='bg-[#D1C3AE] p-3 rounded-xl gap-2 flex flex-wrap'>
                                    <i className='w-[100%] text-[#161515] text-sm font-light'>antonyms</i>
                                    {
                                        popUp.data?.ant && popUp.data.ant.map((an, i) => <p key={i} className='p-2 bg-[#161515] text-sm rounded-lg text-[#C29269] font-medium'>{an ?? ""}</p>)
                                    }
                                </div>
                            </div>

                            <button
                                onClick={() => setPopUp({ stauts: false, data: null })}
                                className='bg-transparent mt-4 hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded'
                            >
                                Yah, go back!
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default React.memo(Popup);