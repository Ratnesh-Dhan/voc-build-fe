//Font import
import { Poppins } from 'next/font/google';

const poppins = Poppins({
   weight: '400',
   style: ['normal'],
   subsets: ['latin'],
   display: 'swap'
});

export {poppins};