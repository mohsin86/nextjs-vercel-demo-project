
import Head from 'next/head'
import Navigation from '@/components/Navigation';

export default function About() {
    return (
        <>
            <Head>
                <title>About Us - My Website</title>
                <meta name="keywords" content="about us, company, team" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
             <Navigation />
            <h1>About Us</h1>
            <p>Welcome to the about page!</p>
        </div>
        </>
        
    );
}