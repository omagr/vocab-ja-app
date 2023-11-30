import { Providers } from './providers';
import { Poppins } from 'next/font/google';
import '/src/styles/global.scss';
import { Logo, Twitter } from '@/components/logo';
import Link from 'next/link';

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
    title: 'vocab - your ultimate vocabulary solution',
    description: 'database and tool for vocabulary management',
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className={poppins.className}>
                <Providers>
                    <span className='absolute top-2 left-2 text-2xl flex flex-row gap-2'>
                        <Link href='https://twitter.com/om_agr'> <Twitter /> </Link>
                    </span>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
