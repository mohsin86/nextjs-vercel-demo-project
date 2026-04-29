
import Head from 'next/head'
import Navigation from '@/components/Navigation';


export const metadata = {
  title: 'About Us - My Website',
  description: 'About our company and team',
  keywords: ['about us', 'company', 'team'],
};


export default function About() {
    return (
        <>
            
            <div> 
             <Navigation />
            <h1>About Us</h1>
            <p>Welcome to the about page!</p>
        </div>
        </>
        
    );
}