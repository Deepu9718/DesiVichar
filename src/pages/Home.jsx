import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/feed');
      }
    });
    return () => unsub();
  }, []);

  return (
    <div
      style={{
        background: 'linear-gradient(to bottom, #FF9933, #FFFFFF, #138808)',
        minHeight: '100vh',
        padding: '30px',
        fontFamily: 'sans-serif'
      }}
    >
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#222' }}>
        Welcome to <span style={{ color: '#000080' }}>DesiVichar</span>
      </h1>
      <p style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '10px', color: '#333' }}>
        DesiVichar – <span style={{ color: 'darkred' }}>“Aapke Vicharon Ki Awaaz”</span>
      </p>

      {/* Founder Message */}
      <div
        style={{
          marginTop: '40px',
          padding: '25px',
          borderLeft: '6px solid #000',
          borderRadius: '8px',
          boxShadow: '0 0 8px rgba(0,0,0,0.2)',
        }}
      >
        <h2 style={{ fontWeight: 'bold', marginBottom: '15px' }}>📢 Founder’s Message:</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
          <strong>Radhe Radhe 🙏</strong><br /><br />
          "Main bhi apna bahut saara content dalta hu, lekin ab tak aisa koi platform nahi mila jahan main
          sirf likhne ya bolne se apni pehchaan, respect ya earning bana sakun. Isiliye maine socha, kyu na
          ek aisa desi platform ho jahan log apne vicharon se naam kama saken, bina kisi bias ke.
          <br /><br />
          Jo sapna har poet, musician, writer, motivational artist, aur youth ka hota hai — us sapne ko
          pura karne ke liye hi ‘DesiVichar’ ka janm hua hai.
          <br /><br />
          <strong>DesiVichar na keval aapki popularity ka sapna pura karega, balki aapke vicharon se aapko
            earning ka haq bhi dega — bina kisi shortcut ke.</strong><br /><br />
          ✨ <strong>Yahan aapko wahi izzat, popularity aur earning milegi jo aap deserve karte hain.</strong>
          <br /><br />
          — Deepanshu, Founder of DesiVichar
        </p>

        {/* Vision Add-on */}
        <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '15px' }}>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
            🔰 <strong>DesiVichar ek reward-based social platform hai</strong>, jahan aapko milta hai:
            <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
              <li>🎖️ <strong>Badges & Rewards</strong> aapki daily activity aur creativity ke liye</li>
              <li>✅ <strong>Red Tick</strong> sirf un logon ke liye jinki originality aur impact sabse khaas hoti hai</li>
              <li>💰 <strong>Desi Coins</strong> aapko motivate karne ke liye daily login, invites aur engagement par</li>
            </ul>
            <br />
            🔒 <strong style={{ color: 'darkred' }}>
              Dhyaan rahe: Sirf apna original content hi upload karein. Copied content se aapka profile block bhi ho sakta hai aur popularity affect hogi.
            </strong>
          </p>
        </div>
      </div>

      {/* Hashtags */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '10px' }}>🔥 Trending Hashtags:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {['#Motivation', '#DesiWriter', '#RealTalk', '#DesiVibes', '#Kavita', '#Poetry', '#OriginalThoughts', '#DesiInspiration'].map(tag => (
            <span
              key={tag}
              style={{
                background: '#000',
                color: '#fff',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.9rem'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Poetic Add-on Section */}
      <div style={{ marginTop: '50px', backgroundColor: '#fff9ec', padding: '25px', borderRadius: '10px', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', fontStyle: 'italic', color: '#333' }}>
          Har kisi ke paas hoti hai ek kahani... ek vichaar...<br />
          Sometimes in poetry, sometimes in rap, sometimes in silent quotes.<br /><br />
          Yahan har tasveer, har alfaaz, ek jazba ban jaata hai.<br /><br />
          <strong style={{ color: '#b30000' }}>DesiVichaar ek platform nahi, ek andolan hai</strong> — jahan har Indian apne
          jazbaat, andaaz aur awaaz ke saath connect karta hai.<br /><br />
          Dost bano, likes kamao, apna profile chamkao, aur duniya tak apni baat pahunchao!<br /><br />
          Shayari ho ya jokes, rap ho ya heartbreak — <strong>DesiVichaar pe har jazba safe hai.</strong><br /><br />
          <span style={{ fontWeight: 'bold', color: '#555' }}>© DealVichaar 2025. All rights reserved.</span>
        </p>
      </div>

      {/* Join Now Button */}
      <div style={{ marginTop: '50px' }}>
        <Link to="/register">
          <button className="bg-red-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-red-700 transition-all animate-bounce hover:scale-105 duration-300">
  🚀      Join Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;