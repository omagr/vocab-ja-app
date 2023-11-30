'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Popup from './popup';

const FormInput = () => {
    const [Word, setWord] = useState('');
    const [loading, setloading] = useState(false);
    const [popUp, setPopUp] = useState({ stauts: false, data: null });

    const getDatafromAPi = async (e) => {
        e.preventDefault();
        if (Word == '' || loading) return;
        setloading(true);
        const rsp = await axios.post("/api/dict", { word: Word });
        const { status, data } = await rsp.data;
        setloading(false)
        if (status != 200) return alert("something went wrong!");
        setPopUp({ stauts: true, data: data });
        // posting to notion DB 
        axios.post('/api/notion', { data });
    };
    return (
        <>
            <form
                onSubmit={getDatafromAPi}
                className='input w-full gap-4 px-8 flex flex-col sm:grid sm:place-content-center items-stretch  justify-center'
            >
                <input
                    onChange={(e) => setWord(e.target.value)}
                    autoFocus
                    type='text'
                    disabled={loading}
                    placeholder='Paste the Word Here!'
                    className='w-full py-4 px-8 bg-[#D1C3AE] text-[#161515] placeholder-[#161515b5] border-none font-bold text-xl rounded-xl sm:w-[480px] border border-[#D1C3AE]'
                />
                <div className='w-full text-center'>
                    {!loading
                        ? <button
                            type='submit'
                            className='disabled:bg-[#744d2c] py-2 font-bold text-base rounded-xl w-[180px] px-4 border border-[#D1C3AE] bg-[#C29269] text-[#161515]'
                        >
                            Post
                        </button>
                        : <div className='flex items-center justify-center text-[#D1C3AE]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g stroke="currentColor"><circle cx="12" cy="12" r="9.5" fill="none" stroke-linecap="round" stroke-width="3"><animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150" /><animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59" /></circle><animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></g></svg>
                        </div>
                    }
                </div>
            </form>
            <Popup popUp={popUp} setPopUp={setPopUp} />
        </>
    );
};

export default FormInput;
