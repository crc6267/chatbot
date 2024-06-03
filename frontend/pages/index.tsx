import Head from 'next/head';
import Chat from '../components/Chat';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Rasa Chatbot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Rasa Chatbot</h1>
        <Chat />
      </main>

      <style jsx>{`
        main {
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default Home;
